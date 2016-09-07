// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAntCompileProject.java

package workspace.service.ant;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import java.io.*;
import java.util.Hashtable;
import java.util.Vector;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.xml.transform.TransformerException;
import org.apache.tools.ant.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvAntCompileProject extends SrvGenerique
{

    public SrvAntCompileProject()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session;
        ServletContext context;
        String target;
        ByteArrayOutputStream streamLog;
        PrintStream psLog;
        PrintStream out;
        PrintStream err;
        session = request.getSession();
        context = session.getServletContext();
        target = (String)bean.getParameterDataByName("target");
        if(!UtilString.isNotEmpty(target))
            break MISSING_BLOCK_LABEL_546;
        streamLog = new ByteArrayOutputStream();
        psLog = new PrintStream(streamLog);
        out = System.out;
        err = System.err;
        try
        {
            String application = (String)bean.getParameterDataByName("application");
            Document domXml = (Document)session.getAttribute("resultDom");
            String szPathMain = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Main");
            String szPathSource = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Source");
            String szPathClass = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Class");
            String szClasspath = AdpXmlApplication.getClassPathAll(context, domXml, application);
            szClasspath = (new StringBuilder(String.valueOf(szClasspath))).append(getClasspathJdk(context, domXml, application)).toString();
            szPathSource = (new File(szPathMain, szPathSource)).getCanonicalPath();
            String szClassName = (String)bean.getParameterDataByName("className");
            if(UtilString.isNotEmpty(szClassName))
                szClassName = (new StringBuilder(String.valueOf(File.separator))).append(szClassName.replace(".", File.separator)).append(".java").toString();
            szPathClass = (new File(szPathMain, szPathClass)).getCanonicalPath();
            Project p = new Project();
            File buildXml = new File(context.getRealPath("/Xml/Ant/Task/CompileProject.xml"));
            p.setUserProperty("ant.file", buildXml.getAbsolutePath());
            p.setProperty("java.src", szPathSource);
            p.setProperty("java.cls", szPathClass);
            p.setProperty("class.path", szClasspath);
            ProjectHelper ph = ProjectHelper.getProjectHelper();
            p.addReference("ant.projectHelper", ph);
            System.setErr(psLog);
            System.setOut(psLog);
            BuildLogger buildLogger = new NoBannerLogger();
            buildLogger.setMessageOutputLevel(2);
            buildLogger.setOutputPrintStream(System.out);
            buildLogger.setErrorPrintStream(System.err);
            p.addBuildListener(buildLogger);
            p.init();
            ph.parse(p, buildXml);
            Hashtable hTarget = p.getTargets();
            if(hTarget != null)
            {
                Object aTarget = hTarget.get(target);
                if(target != null)
                    if(aTarget instanceof Target)
                        ((Target)aTarget).execute();
                    else
                    if(aTarget instanceof String)
                        p.executeTarget((String)aTarget);
            }
            break MISSING_BLOCK_LABEL_527;
        }
        catch(Exception ex)
        {
            ex.printStackTrace(psLog);
        }
        System.setErr(err);
        System.setOut(out);
        doResponse(request, response, bean, streamLog);
        break MISSING_BLOCK_LABEL_546;
        Exception exception;
        exception;
        System.setErr(err);
        System.setOut(out);
        doResponse(request, response, bean, streamLog);
        throw exception;
        System.setErr(err);
        System.setOut(out);
        doResponse(request, response, bean, streamLog);
    }

    private String getClasspathJdk(ServletContext context, Document domXml, String application)
        throws TransformerException, IOException
    {
        StringBuffer ret = new StringBuffer();
        String szJdkpath = AdpXmlApplication.getJdkPathByName(context, domXml, application, "Home");
        String szJreHome = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Home");
        String szJreLib = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Lib");
        if(UtilString.isNotEmpty(szJdkpath))
        {
            File jdkPath = new File(szJdkpath);
            if(jdkPath.exists())
            {
                File jreHome = null;
                File jreLib = null;
                if(UtilString.isNotEmpty(szJreHome))
                    jreHome = new File(jdkPath, szJreHome);
                if(UtilString.isNotEmpty(szJreLib))
                {
                    File home = jreHome == null || !jreHome.exists() ? jdkPath : jreHome;
                    jreLib = new File(home, szJreLib);
                    if(jreLib.exists())
                        addJarToClassPath(jreLib.getCanonicalPath(), ret);
                }
            }
        }
        return ret.toString();
    }

    private String getClasspathWebInf(ServletContext context)
        throws IOException
    {
        StringBuffer ret = new StringBuffer();
        addJarToClassPath(context.getRealPath("WEB-INF"), ret);
        return ret.toString();
    }

    private void addJarToClassPath(String path, StringBuffer classpath)
        throws IOException
    {
        Vector listJar = UtilFile.dir(path, true, ".jar");
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++)
            classpath.append(";").append((String)UtilVector.safeGetElementAt(listJar, i));

    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, ByteArrayOutputStream streamLog)
        throws Exception
    {
        System.out.println(streamLog.toString());
        request.setAttribute("msgText", streamLog.toString());
    }
}
