// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaDelete.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.taglib.file.bean.BeanFTP;
import framework.taglib.file.bean.BeanFTPAddress;
import java.io.File;
import java.io.PrintStream;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaDelete extends SrvGenerique
{

    public SrvEditorJavaDelete()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String fileName = (String)bean.getParameterDataByName("fileName");
        String pathToExpand = (String)bean.getParameterDataByName("pathToExpand");
        if(UtilString.isNotEmpty(fileName))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if(filePathMain != null && !filePathMain.equals(""))
                    if(filePathMain.toUpperCase().startsWith("FTP://"))
                    {
                        BeanFTPAddress address = new BeanFTPAddress(filePathMain);
                        fileName = (new StringBuilder(String.valueOf(pathToExpand != null ? ((Object) (pathToExpand)) : ""))).append(fileName).toString();
                        BeanFTP ftp = new BeanFTP(address, fileName);
                        ftp.delete();
                    } else
                    {
                        File fileMain = new File(filePathMain);
                        File file = new File(filePathMain, fileName);
                        if(!file.getCanonicalPath().equals(fileMain.getCanonicalPath()))
                            UtilFile.delete(file);
                    }
            }
            catch(Exception ex)
            {
                System.out.println(ex.getMessage());
            }
    }
}
