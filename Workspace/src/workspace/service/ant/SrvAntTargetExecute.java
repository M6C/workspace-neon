// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAntTargetExecute.java

package workspace.service.ant;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import java.io.*;
import java.net.URL;
import java.util.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.w3c.dom.Document;

public class SrvAntTargetExecute extends SrvGenerique
{

    public SrvAntTargetExecute()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String target = (String)bean.getParameterDataByName("target");
        if(UtilString.isNotEmpty(target))
        {
            Dictionary param = new Hashtable();
            param.put("pApplication", request.getParameter("application"));
            Document domXml = (Document)session.getAttribute("resultDom");
            InputStream inputXsl = context.getResourceAsStream("Xsl/User/Application/Paths/Path/FindByName.xsl");
            StringWriter wPath = null;
            wPath = new StringWriter();
            inputXsl.reset();
            param.put("pPath", "Main");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szPathMain = wPath.toString();
            wPath.close();
            inputXsl.close();
            wPath = new StringWriter();
            inputXsl.reset();
            param.put("pPath", "Source");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szPathSource = wPath.toString();
            wPath.close();
            inputXsl.close();
            wPath = new StringWriter();
            inputXsl.reset();
            param.put("pPath", "Class");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szPathClass = wPath.toString();
            wPath.close();
            inputXsl.close();
            wPath = new StringWriter();
            inputXsl = context.getResourceAsStream("Xsl/User/Application/Build/Classpath/All.xsl");
            param.remove("pPath");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szClasspath = wPath.toString();
            wPath.close();
            inputXsl.close();
            wPath = new StringWriter();
            inputXsl = context.getResourceAsStream("Xsl/User/Application/Jdk/Path/FindByName.xsl");
            param.put("pPath", "Home");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szJdkpath = wPath.toString();
            wPath.close();
            inputXsl.close();
            wPath = new StringWriter();
            inputXsl = context.getResourceAsStream("Xsl/User/Application/Jdk/Jre/Path/FindByName.xsl");
            param.put("pPath", "Home");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szJreHome = wPath.toString();
            wPath.close();
            inputXsl.close();
            wPath = new StringWriter();
            inputXsl.reset();
            param.put("pPath", "Lib");
            UtilXML.tranformeXmlWithXsl(domXml, inputXsl, wPath, param);
            String szJreLib = wPath.toString();
            wPath.close();
            inputXsl.close();
            szPathSource = (new File(szPathMain, szPathSource)).getCanonicalPath();
            szPathClass = (new File(szPathMain, szPathClass)).getCanonicalPath();
            StringBuffer pathClass = new StringBuffer(UtilPackage.getPackageClassPath());
            addJarToClassPath(context.getRealPath("WEB-INF"), pathClass);
            if(UtilString.isNotEmpty(szJdkpath))
            {
                File jdkPath = new File(szJdkpath);
                if(jdkPath.exists())
                {
                    File jreHome = null;
                    File jreLib = null;
                    if(UtilString.isNotEmpty(szJreHome))
                        jreHome = szJreHome.indexOf(':') <= 0 ? new File(jdkPath, szJreHome) : new File(szJreHome);
                    if(UtilString.isNotEmpty(szJreLib))
                    {
                        File home = jreHome == null || !jreHome.exists() ? jdkPath : jreHome;
                        jreLib = szJreLib.indexOf(':') <= 0 ? new File(szJreLib) : new File(home, szJreLib);
                        if(jreLib.exists())
                            addJarToClassPath(jreLib.getCanonicalPath(), pathClass);
                    }
                }
            }
            ProjectHelper ph = ProjectHelper.getProjectHelper();
            Project p = new Project();
            File buildXml = new File(context.getResource("Xml/Ant/Task/CompileProject.xml").getPath());
            ph.parse(p, buildXml);
            p.setProperty("java.src", szPathSource);
            p.setProperty("java.cls", szPathClass);
            Hashtable hTarget = p.getTargets();
            if(hTarget != null)
            {
                target = (String)hTarget.get(target);
                if(target != null)
                    p.executeTarget(target);
            }
            System.out.println(p.getBaseDir());
            System.out.println(p.getDefaultTarget());
        }
    }

    private void addJarToClassPath(String path, StringBuffer classpath)
        throws IOException
    {
        Vector listJar = UtilFile.dir(path, true, ".jar");
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++)
            classpath.append(";").append((String)UtilVector.safeGetElementAt(listJar, i));

    }
}
