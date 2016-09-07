// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvIndexLoginValider.java

package workspace.service;

import framework.action.ActionServlet;
import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilXML;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.URL;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

public class SrvIndexLoginValider extends SrvGenerique
{

    public SrvIndexLoginValider()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String login;
        String password;
        boolean bOk;
        login = (String)bean.getParameterDataByName("login");
        password = (String)bean.getParameterDataByName("password");
        bOk = false;
        Trace.DEBUG(this, (new StringBuilder("login:")).append(login).toString());
        Trace.DEBUG(this, (new StringBuilder("password:")).append(password).toString());
        if(!UtilString.isNotEmpty(login) || !UtilString.isNotEmpty(password))
            break MISSING_BLOCK_LABEL_938;
        try
        {
            TransformerFactory tFactory = TransformerFactory.newInstance("org.apache.xalan.processor.TransformerFactoryImpl", Thread.currentThread().getContextClassLoader());
            Trace.DEBUG(this, (new StringBuilder("ActionServlet.WORKSPACE_SECURITY_XSL:")).append(ActionServlet.WORKSPACE_SECURITY_XSL).toString());
            Trace.DEBUG(this, (new StringBuilder("ActionServlet.WORKSPACE_SECURITY_XML:")).append(ActionServlet.WORKSPACE_SECURITY_XML).toString());
            Source xslSource = new StreamSource((new URL("file", "", ActionServlet.WORKSPACE_SECURITY_XSL)).openStream());
            Source xmlSource = new StreamSource((new URL("file", "", ActionServlet.WORKSPACE_SECURITY_XML)).openStream());
            Trace.DEBUG(this, (new StringBuilder("xslSource 1:")).append(xslSource).toString());
            Trace.DEBUG(this, (new StringBuilder("xmlSource 1:")).append(xmlSource).toString());
            if(xslSource == null)
            {
                xslSource = new StreamSource(request.getSession().getServletContext().getResourceAsStream(ActionServlet.WORKSPACE_SECURITY_XSL));
                Trace.DEBUG(this, (new StringBuilder("xslSource 2:")).append(xslSource).toString());
            }
            if(xmlSource == null)
            {
                xmlSource = new StreamSource(request.getSession().getServletContext().getResourceAsStream(ActionServlet.WORKSPACE_SECURITY_XML));
                Trace.DEBUG(this, (new StringBuilder("xmlSource 2:")).append(xmlSource).toString());
            }
            Trace.DEBUG(this, "BEFOR transformer");
            Transformer transformer = tFactory.newTransformer(xslSource);
            Trace.DEBUG(this, (new StringBuilder("AFTER transformer:")).append(transformer).toString());
            StringWriter strWriter = new StringWriter();
            transformer.setParameter("myID", login);
            transformer.setParameter("myPWD", password);
            Trace.DEBUG(this, "transformer.setParameter");
            transformer.transform(xmlSource, new StreamResult(strWriter));
            Trace.DEBUG(this, "transformer.transform");
            String strResult = strWriter.toString();
            Trace.DEBUG(this, "strResult:");
            if(UtilString.isNotEmpty(strResult))
            {
                StringReader strReader = new StringReader(strResult);
                if(strReader.ready())
                {
                    Trace.DEBUG(this, "strReader.ready");
                    DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
                    Trace.DEBUG(this, "newDocumentBuilder");
                    Document resultDom = docBuilder.parse(new InputSource(strReader));
                    Trace.DEBUG(this, (new StringBuilder("docBuilder.parse resultDom:")).append(resultDom).toString());
                    if(resultDom != null)
                    {
                        resultDom.normalize();
                        Trace.DEBUG(this, "docBuilder.parse resultDom.normalize()");
                        String name = UtilXML.getXPathStringValue(resultDom, "/ROOT/USER/@Name");
                        Trace.DEBUG(this, (new StringBuilder("docBuilder.parse /ROOT/USER/@Name:")).append(name).toString());
                        bOk = UtilString.isNotEmpty(name);
                        Trace.DEBUG(this, (new StringBuilder("bOk:")).append(bOk).toString());
                    }
                }
            }
            break MISSING_BLOCK_LABEL_835;
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        try
        {
            if(bOk)
            {
                request.getSession().setAttribute("BeanAuthentification", bean);
                request.getSession().setAttribute(ActionServlet.SECURITY_XSL, ActionServlet.WORKSPACE_SECURITY_XSL);
                request.getSession().setAttribute(ActionServlet.SECURITY_XML, ActionServlet.WORKSPACE_SECURITY_XML);
            } else
            {
                if(request.getSession().getAttribute("BeanAuthentification") != null)
                    request.getSession().removeAttribute("BeanAuthentification");
                throw new Exception("No Authentification");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        break MISSING_BLOCK_LABEL_938;
        Exception exception;
        exception;
        try
        {
            if(bOk)
            {
                request.getSession().setAttribute("BeanAuthentification", bean);
                request.getSession().setAttribute(ActionServlet.SECURITY_XSL, ActionServlet.WORKSPACE_SECURITY_XSL);
                request.getSession().setAttribute(ActionServlet.SECURITY_XML, ActionServlet.WORKSPACE_SECURITY_XML);
            } else
            {
                if(request.getSession().getAttribute("BeanAuthentification") != null)
                    request.getSession().removeAttribute("BeanAuthentification");
                throw new Exception("No Authentification");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        throw exception;
        try
        {
            if(bOk)
            {
                request.getSession().setAttribute("BeanAuthentification", bean);
                request.getSession().setAttribute(ActionServlet.SECURITY_XSL, ActionServlet.WORKSPACE_SECURITY_XSL);
                request.getSession().setAttribute(ActionServlet.SECURITY_XML, ActionServlet.WORKSPACE_SECURITY_XML);
            } else
            {
                if(request.getSession().getAttribute("BeanAuthentification") != null)
                    request.getSession().removeAttribute("BeanAuthentification");
                throw new Exception("No Authentification");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
    }
}
