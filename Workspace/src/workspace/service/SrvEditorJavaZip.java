// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaZip.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import java.io.File;
import java.net.URI;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaZip extends SrvGenerique
{

    public SrvEditorJavaZip()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String pathSrc = (String)bean.getParameterDataByName("pathSrc");
        String pathDst = (String)bean.getParameterDataByName("pathDst");
        String fileName = (String)bean.getParameterDataByName("fileName");
        if(UtilString.isNotEmpty(application) && UtilString.isNotEmpty(fileName))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if(filePathMain != null && !filePathMain.equals("") && !filePathMain.toUpperCase().startsWith("FTP://"))
                {
                    File fileMain = new File(filePathMain);
                    String pathMain = fileMain.toURI().getPath();
                    if(UtilString.isEmpty(pathSrc))
                        pathSrc = ".";
                    if(pathDst != null)
                        fileMain = new File(filePathMain, pathDst);
                    pathDst = fileMain.toURI().getPath();
                    String listPathSrc[] = UtilString.split(pathSrc, ';');
                    String listPathTo[] = new String[listPathSrc.length];
                    for(int i = 0; i < listPathSrc.length;)
                        listPathTo[i++] = "";

                    pathDst = UtilFile.formatPath(pathDst, fileName);
                    UtilBuildJar.build(pathMain, listPathSrc, listPathTo, pathDst);
                }
            }
            catch(Exception exception) { }
    }
}
