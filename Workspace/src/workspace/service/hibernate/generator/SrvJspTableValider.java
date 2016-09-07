// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvJspTableValider.java

package workspace.service.hibernate.generator;

import framework.beandata.BeanFindList;
import framework.beandata.BeanGenerique;
import framework.convoyeur.CvrData;
import framework.convoyeur.CvrField;
import framework.ressource.FrmWrkServlet;
import framework.ressource.bean.BeanData;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.xml.parsers.*;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import workspace.adaptateur.AdpXmlHibernate;
import workspace.adaptateur.AdpXmlServlet;
import workspace.adaptateur.bean.*;
import workspace.util.UtilPath;

public class SrvJspTableValider extends SrvGenerique
{

    public SrvJspTableValider()
    {
        hbnTableName = new Hashtable();
        hbnFileName = new Hashtable();
        hbnClassByTable = new Hashtable();
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        try
        {
            Document dom = (Document)session.getAttribute("resultDom");
            String destination = (String)bean.getParameterDataByName("destination");
            String schema = (String)bean.getParameterDataByName("schema");
            Integer cbxCount = (Integer)bean.getParameterDataByName("cbxCount");
            Integer modelCount = (Integer)bean.getParameterDataByName("modelCount");
            String xml = (String)bean.getParameterDataByName("xml");
            String xmldestination = (String)bean.getParameterDataByName("xmldestination");
            String hbnpath = (String)bean.getParameterDataByName("hbnpath");
            if(UtilString.isNotEmpty(destination) && UtilString.isNotEmpty(schema) && UtilString.isNotEmpty(xml) && UtilString.isNotEmpty(xmldestination) && UtilString.isNotEmpty(hbnpath) && cbxCount != null && cbxCount.intValue() > 0)
            {
                File fXml = new File(UtilPath.formatPath(dom, xml));
                File fXmlDestination = new File(UtilPath.formatPath(dom, xmldestination));
                File fDestination = new File(UtilPath.formatPath(dom, destination));
                if(fXml.exists() && fDestination.exists())
                {
                    iniHbnClass(dom, context, hbnpath);
                    DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
                    Document resultDom = docBuilder.parse(fXml);
                    request.setAttribute("schema", schema);
                    int iModelCount = modelCount.intValue();
                    for(int i = 0; i < iModelCount; i++)
                        resultDom = writeTableColumn(request, response, resultDom, bean, i);

                    if(resultDom != null)
                        UtilXML.writeXml(new File(fXmlDestination, fXml.getName()), resultDom);
                }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
            System.out.println(ex.getMessage());
        }
    }

    protected Document writeTableColumn(HttpServletRequest request, HttpServletResponse response, Document resultDom, BeanGenerique bean, int cnt)
        throws FileNotFoundException, IOException, ParserConfigurationException, SAXException, TransformerException
    {
        HttpSession session = request.getSession();
        Document dom = (Document)session.getAttribute("resultDom");
        ServletContext context = session.getServletContext();
        String destination = (String)bean.getParameterDataByName("destination");
        String xmlpathtarget = (String)bean.getParameterDataByName("xmlpathtarget");
        String model = request.getParameter((new StringBuilder("model")).append(cnt).toString());
        String destName = request.getParameter((new StringBuilder("destName")).append(cnt).toString());
        String modelIns = request.getParameter((new StringBuilder("modelIns")).append(cnt).toString());
        String modelUpd = request.getParameter((new StringBuilder("modelUpd")).append(cnt).toString());
        String modelLst = request.getParameter((new StringBuilder("modelLst")).append(cnt).toString());
        String modelSel = request.getParameter((new StringBuilder("modelSel")).append(cnt).toString());
        String modelDel = request.getParameter((new StringBuilder("modelDel")).append(cnt).toString());
        String servName = request.getParameter((new StringBuilder("servName")).append(cnt).toString());
        String schema = (String)bean.getParameterDataByName("schema");
        Integer cbxCount = (Integer)bean.getParameterDataByName("cbxCount");
        boolean bModelIns = (new Boolean("on".equals(modelIns))).booleanValue();
        boolean bModelUpd = (new Boolean("on".equals(modelUpd))).booleanValue();
        boolean bModelLst = (new Boolean("on".equals(modelLst))).booleanValue();
        boolean bModelSel = (new Boolean("on".equals(modelSel))).booleanValue();
        boolean bModelDel = (new Boolean("on".equals(modelDel))).booleanValue();
        int iCbxCount = cbxCount.intValue();
        String szTxtTableNameFk = null;
        File fDestination = new File(UtilPath.formatPath(dom, destination));
        String szPathTableFile;
        if(UtilString.isNotEmpty(xmlpathtarget))
            szPathTableFile = xmlpathtarget;
        else
            szPathTableFile = destination.substring(destination.indexOf('/'));
        if(!szPathTableFile.endsWith("/"))
            szPathTableFile = (new StringBuilder(String.valueOf(szPathTableFile))).append("/").toString();
        if(UtilString.isNotEmpty(model))
        {
            File fModel = new File(UtilPath.formatPath(dom, model));
            model = UtilFile.read(fModel);
        } else
        {
            model = "<%@ taglib uri='Framework_Taglib_Html.tld' prefix='html' %>\r\n" + "<html>\r\n<head>\r\n<title>{TABLE_NAME}</title>\r\n</head>\r\n" + "<body>\r\n<table>\r\n<tr><td>{FORM_FIELD}</td></tr>\r\n" + "<tr><td>{TABLE_FOREIGN_KEY_LINK}</td></tr>\r\n</table>\r\n</body>\r\n" + "</html>";
        }
        List listLoopColumn = UtilString.extractPart(model, "{LOOP_COLUMN_BEGIN", "}", "{LOOP_COLUMN_END", "}");
        List listLoopColumnText = null;
        List listLoopPk = UtilString.extractPart(model, "{LOOP_PRIMARY_KEY_BEGIN", "}", "{LOOP_PRIMARY_KEY_END", "}");
        List listLoopPkText = null;
        List listLoopFk = UtilString.extractPart(model, "{LOOP_FOREIGN_KEY_BEGIN", "}", "{LOOP_FOREIGN_KEY_END", "}");
        List listLoopFkText = null;
        Hashtable hashEventName = new Hashtable();
        for(int i = 1; i <= iCbxCount; i++)
        {
            String szCbxTable = request.getParameter((new StringBuilder("cbxTable")).append(i).toString());
            if(UtilString.isEqualsIgnoreCase(szCbxTable, "on"))
            {
                String szTxtTableName = request.getParameter((new StringBuilder("txtTableName")).append(i).toString());
                if(UtilString.isNotEmpty(szTxtTableName))
                {
                    String szBeanListName = (new StringBuilder("beanList")).append(szTxtTableName).toString();
                    String szBeanItemName = (new StringBuilder("beanItem")).append(szTxtTableName).toString();
                    String szBeanExecName = (new StringBuilder("beanExec")).append(szTxtTableName).toString();
                    listLoopColumnText = new Vector();
                    for(int j = 0; j < listLoopColumn.size(); j++)
                        listLoopColumnText.add("");

                    listLoopPkText = new Vector();
                    for(int j = 0; j < listLoopPk.size(); j++)
                        listLoopPkText.add("");

                    listLoopFkText = new Vector();
                    for(int j = 0; j < listLoopFk.size(); j++)
                        listLoopFkText.add("");

                    String szTxtClassName = classNameByTable(dom, context, szTxtTableName);
                    if(UtilString.isEmpty(szTxtClassName))
                        szTxtClassName = szTxtTableName;
                    String szEventLst = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventLst = UtilString.replaceAll(szEventLst, "{TABLE_NAME}", szTxtTableName);
                    szEventLst = UtilString.replaceAll(szEventLst, "{EVENT}", "Lst");
                    String szEventSel = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventSel = UtilString.replaceAll(szEventSel, "{TABLE_NAME}", szTxtTableName);
                    szEventSel = UtilString.replaceAll(szEventSel, "{EVENT}", "Sel");
                    String szEventAdd = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventAdd = UtilString.replaceAll(szEventAdd, "{TABLE_NAME}", szTxtTableName);
                    szEventAdd = UtilString.replaceAll(szEventAdd, "{EVENT}", "Add");
                    String szEventUpd = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventUpd = UtilString.replaceAll(szEventUpd, "{TABLE_NAME}", szTxtTableName);
                    szEventUpd = UtilString.replaceAll(szEventUpd, "{EVENT}", "Upd");
                    String szEventDel = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventDel = UtilString.replaceAll(szEventDel, "{TABLE_NAME}", szTxtTableName);
                    szEventDel = UtilString.replaceAll(szEventDel, "{EVENT}", "Del");
                    String szItemName = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).toString();
                    request.setAttribute("table", szTxtTableName);
                    BeanFindList beanColumnList = (BeanFindList)loadBean(request, response, "beanColumnList");
                    if(beanColumnList != null)
                    {
                        StringBuffer sbSqlPkHbn = new StringBuffer();
                        StringBuffer sbSqlPkSql = new StringBuffer();
                        int iSqlPk = 0;
                        StringBuffer sbSqlCol = new StringBuffer();
                        StringBuffer sbSqlUpd = new StringBuffer();
                        StringBuffer sbSqlInsCol = new StringBuffer();
                        StringBuffer sbSqlInsVal = new StringBuffer();
                        String paramName = "";
                        String paramType = "";
                        String paramFormatIn = "";
                        String paramNamePk = "";
                        String paramTypePk = "";
                        String paramFormatInPk = "";
                        String paramNameIns = "";
                        String paramTypeIns = "";
                        String paramFormatInIns = "";
                        int iSqlCol = 0;
                        int iSqlUpd = 0;
                        int iSqlIns = 0;
                        Long lMaxLength = null;
                        List listAdpXmlBeanSel = new ArrayList();
                        for(int j = 0; j < beanColumnList.getSize().intValue(); j++)
                        {
                            CvrData cvr = (CvrData)UtilSafe.safeListGetElementAt(beanColumnList, j);
                            String szColumnName = (String)((CvrField)cvr.get("COLUMN_NAME")).getData();
                            lMaxLength = (Long)((CvrField)cvr.get("CHARACTER_MAXIMUM_LENGTH")).getData();
                            String szNullable = (String)((CvrField)cvr.get("IS_NULLABLE")).getData();
                            String szDefault = (String)((CvrField)cvr.get("COLUMN_DEFAULT")).getData();
                            String szKey = (String)((CvrField)cvr.get("COLUMN_KEY")).getData();
                            String szExtra = (String)((CvrField)cvr.get("EXTRA")).getData();
                            String szDataType = (String)((CvrField)cvr.get("DATA_TYPE")).getData();
                            if(UtilString.isEqualsIgnoreCase(szKey, "PRI"))
                            {
                                String szFieldName = idNameByColumn(dom, szTxtTableName, szColumnName);
                                if(iSqlPk > 0)
                                {
                                    sbSqlPkHbn.append(" AND");
                                    sbSqlPkSql.append(" AND");
                                }
                                sbSqlPkHbn.append(" ").append(szFieldName).append(" = :").append(szFieldName);
                                sbSqlPkSql.append(" ").append(szColumnName).append(" = ?");
                                iSqlPk++;
                                paramNamePk = (new StringBuilder(String.valueOf(paramNamePk))).append(szFieldName).append(";").toString();
                                paramTypePk = (new StringBuilder(String.valueOf(paramTypePk))).append("INTEGER;").toString();
                                paramFormatInPk = (new StringBuilder(String.valueOf(paramFormatInPk))).append(";").toString();
                            } else
                            {
                                String szFieldName = fieldNameByColumn(dom, szTxtTableName, szColumnName);
                                if(UtilString.isEqualsIgnoreCase(szKey, "MUL") && listLoopFk.size() > 0 && bModelSel)
                                {
                                    request.setAttribute("column", szColumnName);
                                    BeanFindList beanFkColumnList = (BeanFindList)loadBean(request, response, "beanFkColumnList");
                                    cvr = (CvrData)UtilSafe.safeListGetElementAt(beanFkColumnList, 0);
                                    String szRefSchemaName = (String)((CvrField)cvr.get("TABLE_SCHEMA")).getData();
                                    String szRefTableName = (String)((CvrField)cvr.get("TABLE_NAME")).getData();
                                    String szRefColumnName = (String)((CvrField)cvr.get("COLUMN_NAME")).getData();
                                    if(UtilString.isNotEmpty(szRefSchemaName) && UtilString.isNotEmpty(szRefTableName) && UtilString.isNotEmpty(szRefColumnName))
                                    {
                                        String szBeanItemNameFk = (new StringBuilder("beanItem")).append(szRefTableName).toString();
                                        String szTxtClassNameFk = classNameByTable(dom, context, szRefTableName);
                                        String szFieldNameFk = idNameByColumn(dom, szRefTableName, szRefColumnName);
                                        szFieldName = manyToOneNameByColumn(dom, szTxtTableName, szColumnName);
                                        String paramNameFk = szFieldNameFk;
                                        String paramTypeFk = "INTEGER";
                                        String paramBeanFk = (new StringBuilder(String.valueOf(szBeanItemName))).append(".").append(szFieldName).toString();
                                        String szQuery = (new StringBuilder("FROM ")).append(szTxtClassNameFk).toString();
                                        szQuery = (new StringBuilder(String.valueOf(szQuery))).append(" WHERE ").append(szFieldNameFk).append(" = :").append(szFieldNameFk).toString();
                                        BeanAdpXmlQuery beanAdpXmlQuery = new BeanAdpXmlQuery("HIBERNATE", szQuery, "1");
                                        BeanAdpXmlBean beanAdpXmlBean = new BeanAdpXmlBean(szBeanItemNameFk, "framework.service.SrvFindData", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNameFk, paramTypeFk, paramBeanFk);
                                        listAdpXmlBeanSel.add(beanAdpXmlBean);
                                    }
                                }
                                if(iSqlCol > 0)
                                    sbSqlCol.append(" ,");
                                sbSqlCol.append(" ").append(szColumnName);
                                iSqlCol++;
                                if(iSqlUpd > 0)
                                    sbSqlUpd.append(" ,");
                                sbSqlUpd.append(" ").append(szColumnName).append(" = ?");
                                iSqlUpd++;
                                if(iSqlIns > 0)
                                {
                                    sbSqlInsCol.append(" ,");
                                    sbSqlInsVal.append(" ,");
                                }
                                sbSqlInsCol.append(" ").append(szColumnName);
                                sbSqlInsVal.append(" ?");
                                paramName = (new StringBuilder(String.valueOf(paramName))).append(szFieldName).append(";").toString();
                                paramType = (new StringBuilder(String.valueOf(paramType))).append(convertDataType(szDataType)).append(";").toString();
                                paramFormatIn = (new StringBuilder(String.valueOf(paramFormatIn))).append(defaultFormatIn(szDataType)).append(";").toString();
                                iSqlIns++;
                            }
                        }

                        paramNameIns = paramName;
                        paramTypeIns = paramType;
                        paramFormatInIns = paramFormatIn;
                        paramName = (new StringBuilder(String.valueOf(paramName))).append(paramNamePk).toString();
                        paramType = (new StringBuilder(String.valueOf(paramType))).append(paramTypePk).toString();
                        paramFormatIn = (new StringBuilder(String.valueOf(paramFormatIn))).append(paramFormatInPk).toString();
                        if(!paramName.equals(""))
                            paramName = paramName.substring(0, paramName.length() - 1);
                        if(!paramType.equals(""))
                            paramType = paramType.substring(0, paramType.length() - 1);
                        if(!paramFormatIn.equals(""))
                            paramFormatIn = paramFormatIn.substring(0, paramFormatIn.length() - 1);
                        if(!paramNamePk.equals(""))
                            paramNamePk = paramNamePk.substring(0, paramNamePk.length() - 1);
                        if(!paramTypePk.equals(""))
                            paramTypePk = paramTypePk.substring(0, paramTypePk.length() - 1);
                        if(!paramFormatInPk.equals(""))
                            paramFormatInPk = paramFormatInPk.substring(0, paramFormatInPk.length() - 1);
                        if(!paramNameIns.equals(""))
                            paramNameIns = paramNameIns.substring(0, paramNameIns.length() - 1);
                        if(!paramTypeIns.equals(""))
                            paramTypeIns = paramTypeIns.substring(0, paramTypeIns.length() - 1);
                        if(!paramFormatInIns.equals(""))
                            paramFormatInIns = paramFormatInIns.substring(0, paramFormatInIns.length() - 1);
                        String szTxtTableFile = UtilString.replaceAll(destName, "{SCHEMA}", schema);
                        szTxtTableFile = UtilString.replaceAll(destName, "{TABLE_NAME}", szTxtTableName);
                        if(resultDom != null)
                            try
                            {
                                String szQuery = null;
                                BeanAdpXmlQuery beanAdpXmlQuery = null;
                                BeanAdpXmlBean beanAdpXmlBeanGlobal = null;
                                BeanAdpXmlBean beanAdpXmlBean = null;
                                BeanAdpXmlServlet beanAdpXmlServlet = null;
                                if(bModelLst)
                                {
                                    szQuery = (new StringBuilder("FROM ")).append(szTxtClassName).toString();
                                    beanAdpXmlQuery = new BeanAdpXmlQuery("HIBERNATE", szQuery, "0");
                                    beanAdpXmlBeanGlobal = new BeanAdpXmlBean(szBeanListName, "framework.service.SrvFindList", "framework.beandata.BeanFindList", "request", beanAdpXmlQuery, null, null);
                                    resultDom = AdpXmlServlet.addBeanDom(context, resultDom, beanAdpXmlBeanGlobal);
                                    beanAdpXmlBean = new BeanAdpXmlBean(szBeanListName, null, null, null, null, null, null);
                                    beanAdpXmlServlet = new BeanAdpXmlServlet(szEventLst, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                    resultDom = AdpXmlServlet.addServletDom(context, resultDom, beanAdpXmlServlet);
                                    beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                    beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                }
                                if(bModelSel)
                                {
                                    szQuery = (new StringBuilder("FROM ")).append(szTxtClassName).toString();
                                    if(iSqlPk > 0)
                                        szQuery = (new StringBuilder(String.valueOf(szQuery))).append(" WHERE").append(sbSqlPkHbn.toString()).toString();
                                    beanAdpXmlQuery = new BeanAdpXmlQuery("HIBERNATE", szQuery, Integer.toString(iSqlPk));
                                    beanAdpXmlBean = new BeanAdpXmlBean(szBeanItemName, "framework.service.SrvFindData", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNamePk, paramTypePk, null, paramFormatInPk);
                                    beanAdpXmlServlet = new BeanAdpXmlServlet(szEventSel, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                    resultDom = AdpXmlServlet.addServletDom(context, resultDom, beanAdpXmlServlet);
                                    resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                    beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                    beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                    for(int j = 0; j < listAdpXmlBeanSel.size(); j++)
                                        resultDom = AdpXmlServlet.addServletBeanDom(context, resultDom, beanAdpXmlServlet, (BeanAdpXmlBean)listAdpXmlBeanSel.get(j));

                                }
                                if(bModelIns)
                                {
                                    szQuery = (new StringBuilder("INSERT INTO ")).append(szTxtTableName).append(" (").append(sbSqlInsCol.toString()).append(") VALUES (").append(sbSqlInsVal.toString()).append(")").toString();
                                    beanAdpXmlQuery = new BeanAdpXmlQuery("EXECUTE", szQuery, Integer.toString(iSqlIns));
                                    beanAdpXmlBean = new BeanAdpXmlBean(szBeanExecName, "framework.service.SrvDatabase", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNameIns, paramTypeIns, null, paramFormatInIns);
                                    beanAdpXmlServlet = new BeanAdpXmlServlet(szEventAdd, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                    resultDom = AdpXmlServlet.addServletDom(context, resultDom, (BeanAdpXmlServlet)beanAdpXmlServlet.clone(szEventAdd));
                                    resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                    beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                    beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                }
                                if(iSqlPk > 0)
                                {
                                    if(bModelDel)
                                    {
                                        szQuery = (new StringBuilder("DELETE FROM ")).append(szTxtTableName).append(" WHERE").append(sbSqlPkSql.toString()).toString();
                                        beanAdpXmlQuery = new BeanAdpXmlQuery("EXECUTE", szQuery, Integer.toString(iSqlPk));
                                        beanAdpXmlBean = new BeanAdpXmlBean(szBeanExecName, "framework.service.SrvDatabase", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramNamePk, paramTypePk, null, paramFormatInPk);
                                        beanAdpXmlServlet = new BeanAdpXmlServlet(szEventDel, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                        resultDom = AdpXmlServlet.addServletDom(context, resultDom, (BeanAdpXmlServlet)beanAdpXmlServlet.clone(szEventDel));
                                        resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                        beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                        beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                    }
                                    if(bModelUpd)
                                    {
                                        szQuery = (new StringBuilder("UPDATE ")).append(szTxtTableName).append(" SET ").append(sbSqlUpd.toString()).append(" WHERE").append(sbSqlPkSql.toString()).toString();
                                        beanAdpXmlQuery = new BeanAdpXmlQuery("EXECUTE", szQuery, Integer.toString(iSqlIns + iSqlPk));
                                        beanAdpXmlBean = new BeanAdpXmlBean(szBeanExecName, "framework.service.SrvDatabase", "framework.beandata.BeanFindData", "request", beanAdpXmlQuery, paramName, paramType, null, paramFormatIn);
                                        beanAdpXmlServlet = new BeanAdpXmlServlet(szEventUpd, "", (new StringBuilder(String.valueOf(szPathTableFile))).append(szTxtTableFile).toString(), "", "false", beanAdpXmlBean);
                                        resultDom = AdpXmlServlet.addServletDom(context, resultDom, (BeanAdpXmlServlet)beanAdpXmlServlet.clone(szEventUpd));
                                        resultDom = AdpXmlServlet.addServletBeanGlobalDom(context, resultDom, beanAdpXmlServlet, beanAdpXmlBeanGlobal);
                                        beanAdpXmlBean.setBeanAdpXmlQuery(null);
                                        beanAdpXmlServlet.setBeanAdpXmlBean(null);
                                    }
                                }
                            }
                            catch(CloneNotSupportedException e)
                            {
                                Trace.ERROR(this, e);
                            }
                    }
                }
            }
        }

        for(int i = 1; i <= iCbxCount; i++)
        {
            String szCbxTable = request.getParameter((new StringBuilder("cbxTable")).append(i).toString());
            if(UtilString.isEqualsIgnoreCase(szCbxTable, "on"))
            {
                String szTxtTableName = request.getParameter((new StringBuilder("txtTableName")).append(i).toString());
                if(UtilString.isNotEmpty(szTxtTableName))
                {
                    String szBeanListName = (new StringBuilder("beanList")).append(szTxtTableName).toString();
                    String szBeanItemName = (new StringBuilder("beanItem")).append(szTxtTableName).toString();
                    String szBeanExecName = (new StringBuilder("beanExec")).append(szTxtTableName).toString();
                    listLoopColumnText = new Vector();
                    for(int j = 0; j < listLoopColumn.size(); j++)
                        listLoopColumnText.add("");

                    listLoopPkText = new Vector();
                    for(int j = 0; j < listLoopPk.size(); j++)
                        listLoopPkText.add("");

                    listLoopFkText = new Vector();
                    for(int j = 0; j < listLoopFk.size(); j++)
                        listLoopFkText.add("");

                    String szTxtClassName = classNameByTable(dom, context, szTxtTableName);
                    if(UtilString.isEmpty(szTxtClassName))
                        szTxtClassName = szTxtTableName;
                    String szEventLst = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventLst = UtilString.replaceAll(szEventLst, "{TABLE_NAME}", szTxtTableName);
                    szEventLst = UtilString.replaceAll(szEventLst, "{EVENT}", "Lst");
                    String szEventSel = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventSel = UtilString.replaceAll(szEventSel, "{TABLE_NAME}", szTxtTableName);
                    szEventSel = UtilString.replaceAll(szEventSel, "{EVENT}", "Sel");
                    String szEventAdd = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventAdd = UtilString.replaceAll(szEventAdd, "{TABLE_NAME}", szTxtTableName);
                    szEventAdd = UtilString.replaceAll(szEventAdd, "{EVENT}", "Add");
                    String szEventUpd = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventUpd = UtilString.replaceAll(szEventUpd, "{TABLE_NAME}", szTxtTableName);
                    szEventUpd = UtilString.replaceAll(szEventUpd, "{EVENT}", "Upd");
                    String szEventDel = UtilString.replaceAll(servName, "{SCHEMA}", schema);
                    szEventDel = UtilString.replaceAll(szEventDel, "{TABLE_NAME}", szTxtTableName);
                    szEventDel = UtilString.replaceAll(szEventDel, "{EVENT}", "Del");
                    String szItemName = (new StringBuilder(String.valueOf(schema))).append(szTxtTableName).toString();
                    request.setAttribute("table", szTxtTableName);
                    BeanFindList beanColumnList = (BeanFindList)loadBean(request, response, "beanColumnList");
                    if(beanColumnList != null)
                    {
                        String paramHrefPk = "";
                        Long lMaxLength = null;
                        for(int j = 0; j < beanColumnList.getSize().intValue(); j++)
                        {
                            CvrData cvr = (CvrData)UtilSafe.safeListGetElementAt(beanColumnList, j);
                            String szColumnName = (String)((CvrField)cvr.get("COLUMN_NAME")).getData();
                            lMaxLength = (Long)((CvrField)cvr.get("CHARACTER_MAXIMUM_LENGTH")).getData();
                            String szNullable = (String)((CvrField)cvr.get("IS_NULLABLE")).getData();
                            String szDefault = (String)((CvrField)cvr.get("COLUMN_DEFAULT")).getData();
                            String szKey = (String)((CvrField)cvr.get("COLUMN_KEY")).getData();
                            String szExtra = (String)((CvrField)cvr.get("EXTRA")).getData();
                            if(UtilString.isEqualsIgnoreCase(szKey, "PRI"))
                            {
                                String szFieldName = idNameByColumn(dom, szTxtTableName, szColumnName);
                                paramHrefPk = (new StringBuilder(String.valueOf(paramHrefPk))).append(szFieldName).append("=#R$").append(szItemName).append(".").append(szFieldName).append("#&").toString();
                                for(int k = 0; k < listLoopPk.size(); k++)
                                {
                                    String txt = (String)listLoopPk.get(k);
                                    txt = UtilString.replaceAll(txt, "{COLUMN_NAME}", szFieldName);
                                    txt = (new StringBuilder(String.valueOf((String)listLoopPkText.get(k)))).append(txt).toString();
                                    listLoopPkText.remove(k);
                                    listLoopPkText.add(k, txt);
                                }

                            } else
                            if(UtilString.isEqualsIgnoreCase(szKey, "MUL") && listLoopFk.size() > 0)
                            {
                                String szFieldName = manyToOneNameByColumn(dom, szTxtTableName, szColumnName);
                                request.setAttribute("column", szColumnName);
                                BeanFindList beanFkColumnList = (BeanFindList)loadBean(request, response, "beanFkColumnList");
                                cvr = (CvrData)UtilSafe.safeListGetElementAt(beanFkColumnList, 0);
                                String szRefSchemaName = (String)((CvrField)cvr.get("TABLE_SCHEMA")).getData();
                                String szRefTableName = (String)((CvrField)cvr.get("TABLE_NAME")).getData();
                                String szRefColumnName = (String)((CvrField)cvr.get("COLUMN_NAME")).getData();
                                if(UtilString.isNotEmpty(szRefSchemaName) && UtilString.isNotEmpty(szRefTableName) && UtilString.isNotEmpty(szRefColumnName))
                                {
                                    String szBeanItemNameFk = (new StringBuilder("beanItem")).append(szRefTableName).toString();
                                    String szRefTableObjectName = classNameByTable(dom, context, szRefTableName);
                                    String szRefColumnObjectName = idNameByColumn(dom, szRefTableName, szRefColumnName);
                                    for(int k = 0; k < listLoopFk.size(); k++)
                                    {
                                        String txt = (String)listLoopFk.get(k);
                                        if(evalCondition(txt, cvr))
                                        {
                                            txt = UtilString.replaceAll(txt, "{COLUMN_NAME}", szFieldName);
                                            txt = UtilString.replaceAll(txt, "{BEAN_ITEM_FK}", szBeanItemNameFk);
                                            txt = UtilString.replaceAll(txt, "{SCHEMA_FK}", szRefSchemaName);
                                            txt = UtilString.replaceAll(txt, "{TABLE_NAME_FK}", szRefTableName);
                                            txt = UtilString.replaceAll(txt, "{COLUMN_NAME_FK}", szRefColumnObjectName);
                                            txt = (new StringBuilder(String.valueOf((String)listLoopFkText.get(k)))).append(txt).toString();
                                            listLoopFkText.remove(k);
                                            listLoopFkText.add(k, txt);
                                        }
                                    }

                                }
                            } else
                            {
                                String szFieldName = fieldNameByColumn(dom, szTxtTableName, szColumnName);
                                if(UtilString.isNotEmpty(szFieldName))
                                {
                                    for(int k = 0; k < listLoopColumn.size(); k++)
                                    {
                                        String txt = (String)listLoopColumn.get(k);
                                        txt = UtilString.replaceAll(txt, "{COLUMN_NAME}", szFieldName);
                                        txt = (new StringBuilder(String.valueOf((String)listLoopColumnText.get(k)))).append(txt).toString();
                                        listLoopColumnText.remove(k);
                                        listLoopColumnText.add(k, txt);
                                    }

                                }
                            }
                        }

                        if(!paramHrefPk.equals(""))
                            paramHrefPk = paramHrefPk.substring(0, paramHrefPk.length() - 1);
                        String html = model.toString();
                        for(int k = 0; k < listLoopColumn.size(); k++)
                        {
                            String col = (String)listLoopColumn.get(k);
                            String txt = (String)listLoopColumnText.get(k);
                            html = UtilString.replaceAll(html, col, txt);
                        }

                        for(int k = 0; k < listLoopPk.size(); k++)
                        {
                            String col = (String)listLoopPk.get(k);
                            String txt = (String)listLoopPkText.get(k);
                            html = UtilString.replaceAll(html, col, txt);
                        }

                        for(int k = 0; k < listLoopFk.size(); k++)
                        {
                            String col = (String)listLoopFk.get(k);
                            String txt = (String)listLoopFkText.get(k);
                            html = UtilString.replaceAll(html, col, txt);
                        }

                        html = UtilString.replaceAll(html, "{SCHEMA}", schema);
                        html = UtilString.replaceAll(html, "{TABLE_NAME}", szTxtTableName);
                        html = UtilString.replaceAll(html, "{EVENT_LST}", szEventLst);
                        html = UtilString.replaceAll(html, "{EVENT_SEL}", szEventSel);
                        html = UtilString.replaceAll(html, "{EVENT_ADD}", szEventAdd);
                        html = UtilString.replaceAll(html, "{EVENT_UPD}", szEventUpd);
                        html = UtilString.replaceAll(html, "{EVENT_DEL}", szEventDel);
                        html = UtilString.replaceAll(html, "{BEAN_LIST}", szBeanListName);
                        html = UtilString.replaceAll(html, "{BEAN_LIST_ITEM}", szItemName);
                        html = UtilString.replaceAll(html, "{BEAN_ITEM}", szBeanItemName);
                        html = UtilString.replaceAll(html, "{HREF_PK}", paramHrefPk);
                        html = UtilString.replaceAll(html, "{LOOP_COLUMN_BEGIN", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_COLUMN_END", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_PRIMARY_KEY_BEGIN", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_PRIMARY_KEY_END", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_FOREIGN_KEY_BEGIN", "}", "");
                        html = UtilString.replaceAll(html, "{LOOP_FOREIGN_KEY_END", "}", "");
                        String szTxtTableFile = UtilString.replaceAll(destName, "{SCHEMA}", schema);
                        szTxtTableFile = UtilString.replaceAll(destName, "{TABLE_NAME}", szTxtTableName);
                        UtilFile.write(new File(fDestination, szTxtTableFile), html);
                    }
                }
            }
        }

        return resultDom;
    }

    protected BeanGenerique loadBean(HttpServletRequest request, HttpServletResponse response, String beanName)
    {
        BeanGenerique ret = null;
        BeanData beanData = FrmWrkServlet.getBean(beanName);
        if(beanData != null)
            try
            {
                ret = UtilAction.newBean(beanData);
                if(ret != null)
                {
                    ret.setBeanData(beanData);
                    UtilAction.executeService(request, response, beanData, ret);
                }
            }
            catch(ClassNotFoundException e)
            {
                Trace.ERROR(this, e);
            }
            catch(InstantiationException e)
            {
                Trace.ERROR(this, e);
            }
            catch(IllegalAccessException e)
            {
                Trace.ERROR(this, e);
            }
            catch(Exception e)
            {
                Trace.ERROR(this, e);
            }
        return ret;
    }

    private String classNameByTable(Document dom, ServletContext context, String table)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
            ret = bean.getClassName();
        return ret;
    }

    private String fieldNameByColumn(Document dom, String table, String column)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
        {
            BeanHbnProperty beanProperty = bean.getHbnProperty(column);
            if(beanProperty != null)
                ret = beanProperty.getName();
        }
        return ret;
    }

    private String manyToOneNameByColumn(Document dom, String table, String column)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
        {
            BeanHbnManyToOne beanManyToOne = bean.getHbnManyToOne(column);
            if(beanManyToOne != null)
                ret = beanManyToOne.getName();
        }
        return ret;
    }

    private String idNameByColumn(Document dom, String table, String column)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        String ret = null;
        BeanHbnClass bean = (BeanHbnClass)hbnClassByTable.get(table);
        if(bean != null)
        {
            BeanHbnId beanId = bean.getHbnId(column);
            if(beanId != null)
                ret = beanId.getName();
        }
        return ret;
    }

    private void iniHbnClass(Document dom, ServletContext context, String hbnpath)
        throws IOException, SAXException, ParserConfigurationException, TransformerException
    {
        SimpleDateFormat dateFormat;
        SimpleDateFormat timeFormat;
        Calendar calDeb;
        DocumentBuilder docBuilder;
        File listFile[];
        long len;
        String log;
        int i;
        dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        timeFormat = new SimpleDateFormat("HH:mm:ss");
        calDeb = Calendar.getInstance();
        Date dateDiff = null;
        System.out.println((new StringBuilder("iniHbnClass Start At ")).append(dateFormat.format(calDeb.getTime())).toString());
        DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
        docBuilder = docBuilderFactory.newDocumentBuilder();
        FilenameFilter filenameFilter = null;
        int iLastIndexOf = hbnpath.lastIndexOf('\\');
        if(iLastIndexOf < 0)
            iLastIndexOf = hbnpath.lastIndexOf('/');
        if(iLastIndexOf > 0)
        {
            String szHbnpathFilter = hbnpath.substring(iLastIndexOf);
            hbnpath = hbnpath.substring(0, iLastIndexOf);
            if(UtilString.isNotEmpty(szHbnpathFilter))
            {
                iLastIndexOf = szHbnpathFilter.lastIndexOf('.');
                if(iLastIndexOf > 0)
                {
                    final String ext = szHbnpathFilter.substring(iLastIndexOf);
                    if(UtilString.isNotEmpty(ext))
                        filenameFilter = new FilenameFilter() {

                            public boolean accept(File file, String string)
                            {
                                return UtilFile.isExtFile(string, ext);
                            }

                            final SrvJspTableValider this$0;
                            private final String val$ext;

            
            {
                this$0 = SrvJspTableValider.this;
                ext = s;
                super();
            }
                        }
;
                }
            }
        }
        File fHbnpath = new File(UtilPath.formatPath(dom, hbnpath));
        listFile = fHbnpath.listFiles(filenameFilter);
        Document domHbn = null;
        BeanHbnClass beanHbnClass = null;
        len = listFile.length;
        log = "";
        i = 0;
          goto _L1
_L3:
        log = (new StringBuilder("iniHbnClass File:")).append(listFile[i]).toString();
        Calendar calFileDeb = Calendar.getInstance();
        log = (new StringBuilder(String.valueOf(log))).append(" From:").append(dateFormat.format(calFileDeb.getTime())).toString();
        Document domHbn = docBuilder.parse(listFile[i]);
        BeanHbnClass beanHbnClass = AdpXmlHibernate.toBeanHbnByDB(context, domHbn);
        hbnClassByTable.put(beanHbnClass.getTable(), beanHbnClass);
        Calendar calFileEnd = Calendar.getInstance();
        Date dateDiff = new Date(calFileEnd.getTimeInMillis() - calFileDeb.getTimeInMillis());
        log = (new StringBuilder(String.valueOf(log))).append(" To:").append(dateFormat.format(calFileEnd.getTime())).append(" For:").append(timeFormat.format(dateDiff)).append(" Sec").toString();
        break MISSING_BLOCK_LABEL_421;
        Exception exception;
        exception;
        System.out.println(log);
        log = "";
        throw exception;
        System.out.println(log);
        log = "";
        i++;
_L1:
        if((long)i < len) goto _L3; else goto _L2
_L2:
        Calendar calEnd = Calendar.getInstance();
        long millSec = calEnd.getTimeInMillis() - calDeb.getTimeInMillis();
        long sec = millSec / 1000L;
        Date dateDiff = new Date(millSec);
        System.out.println((new StringBuilder("iniHbnClass End At ")).append(dateFormat.format(calEnd.getTime())).append(" For ").append(timeFormat.format(dateDiff)).append(" Time").toString());
        return;
    }

    private String convertDataType(String dataType)
    {
        String ret = "STRING";
        if(dataType != null)
        {
            String szDataType = dataType.toUpperCase();
            if("VARCHAR".equals(szDataType))
                ret = "STRING";
            else
            if("CHAR".equals(szDataType))
                ret = "STRING";
            else
            if("LONGTEXT".equals(szDataType))
                ret = "STRING";
            else
            if("INT".equals(szDataType))
                ret = "INTEGER";
            else
            if("TINYINT".equals(szDataType))
                ret = "INTEGER";
            else
            if("SMALLINT".equals(szDataType))
                ret = "INTEGER";
            else
            if("BIGINT".equals(szDataType))
                ret = "INTEGER";
            else
            if("DATETIME".equals(szDataType))
                ret = "DATE";
            else
            if("TIMESTAMP".equals(szDataType))
                ret = "DATE";
        }
        return ret;
    }

    private boolean evalCondition(String condition, CvrData cvr)
    {
        boolean ret = true;
        String part = null;
        for(Iterator itPart = UtilString.extractPart(condition, "[", "]").iterator(); itPart.hasNext() && ret;)
        {
            part = (String)itPart.next();
            Hashtable list = cvr.getList();
            Enumeration eKey = list.keys();
            String key;
            String val;
            for(Enumeration eVal = list.elements(); eKey.hasMoreElements() && eVal.hasMoreElements(); part.replaceAll((new StringBuilder("{")).append(key).append("}").toString(), (new StringBuilder("\"")).append(val).append("\"").toString()))
            {
                key = (String)eKey.nextElement();
                val = (String)eVal.nextElement();
                if(key.toUpperCase().equals("DATA_TYPE"))
                    val = convertDataType(val);
            }

            try
            {
                ret = UtilEvalJava.safeResolveBooleanExpression(part);
            }
            catch(Exception ex)
            {
                ret = false;
                Trace.ERROR(this, ex);
            }
        }

        return ret;
    }

    private String defaultFormatIn(String dataType)
    {
        String ret = "";
        if(dataType != null)
        {
            String szDataType = dataType.toUpperCase();
            if("DATE".equals(szDataType))
                ret = "yyyy.MM.dd";
            else
            if("TIME".equals(szDataType))
                ret = "HH:mm:ss";
            else
            if("DATETIME".equals(szDataType))
                ret = "yyyy.MM.dd HH:mm:ss";
        }
        return ret;
    }

    private Hashtable hbnTableName;
    private Hashtable hbnFileName;
    private Hashtable hbnClassByTable;
}
