package workspace.service.ant;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import org.apache.tools.ant.BuildLogger;
import org.apache.tools.ant.NoBannerLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.Target;
import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackage;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.service.SrvGenerique;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class SrvAntTargetExecute extends SrvGenerique
{

    public SrvAntTargetExecute()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String target = (String)bean.getParameterDataByName("target");
        String application = (String)bean.getParameterDataByName("application");
        if(UtilString.isNotEmpty(target)) {

      	  ByteArrayOutputStream streamLog = new ByteArrayOutputStream();
          PrintStream psLog = new PrintStream(streamLog);
          PrintStream out = System.out;
          PrintStream err = System.err;

          try {
	            Document domXml = (Document)session.getAttribute("resultDom");

	            String szPathMain = AdpXmlApplication.getPathByName(context, domXml, application, "Main");
	            szPathMain = (szPathMain == null) ? szPathMain : UtilPath.formatPath(domXml, szPathMain);
	            //Recuperation du chemin des sources
	            String szPathSource = AdpXmlApplication.getPathByName(context, domXml, application, "Source");
	            szPathSource = (szPathSource == null) ? szPathSource : UtilPath.formatPath(domXml, szPathSource);
	            szPathSource = (new File(szPathMain, szPathSource)).getCanonicalPath();
	            //Recuperation du chemin de destination des classes
	            String szPathClass = AdpXmlApplication.getPathByName(context, domXml, application, "Class");
	            szPathClass = (szPathClass == null) ? szPathClass : UtilPath.formatPath(domXml, szPathClass);
	            szPathClass = (new File(szPathMain, szPathClass)).getCanonicalPath();
	            //Recuperation des classpath de l'application
	            StringBuffer pathClass = getClassPath(context, application, domXml);

	            File buildXml = new File(context.getRealPath("/Xml/Ant/Task/CompileProject.xml"));
	            Project p = new Project();
	            p.setUserProperty("ant.file", buildXml.getAbsolutePath());
	            p.setProperty("java.src", szPathSource);
	            p.setProperty("java.cls", szPathClass);
	            p.setProperty("class.path", pathClass.toString());

	            ProjectHelper ph = ProjectHelper.getProjectHelper();
	            p.addReference("ant.projectHelper", ph);

	            BuildLogger buildLogger = new NoBannerLogger();
	            buildLogger.setMessageOutputLevel(Project.MSG_INFO);
	            buildLogger.setOutputPrintStream(System.out);
	            buildLogger.setErrorPrintStream(System.err);
	            p.addBuildListener(buildLogger);

	            p.init();

	            System.out.println(p.getBaseDir());
	            System.out.println(p.getDefaultTarget());

	            System.setErr(psLog);
	            System.setOut(psLog);
//	            System.out.println(pathClass.toString());

	            ph.parse(p, buildXml);

	            Hashtable<String, Object> hTarget = p.getTargets();
	            if (hTarget!=null) {
	              Object aTarget = hTarget.get(target);
	              if (target!=null) {
	                  if (aTarget instanceof Target) {
	                      ((Target)aTarget).execute();
	                  }
	                  else if (aTarget instanceof String) {
	                      p.executeTarget((String)aTarget);
	                  }
	              }
	            }
	            
	        } catch (Exception ex) {
	            //StringWriter sw = new StringWriter();
	            //ex.printStackTrace(sw);
	            //request.setAttribute("msgText", sw);
	            ex.printStackTrace(psLog);
	        }
	        finally {
	      	  System.setErr(err);
	      	  System.setOut(out);
	
	      	  doResponse(request, response, bean, streamLog);
	        }
        }
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, ByteArrayOutputStream streamLog) throws Exception {
  	  //streamLog.write(new byte[]{'t', 'e', 's', 't'});
		request.setAttribute("msgText", streamLog.toString());
    }

	private StringBuffer getClassPath(ServletContext context, String application, Document domXml) throws TransformerException, IOException {
		//Recuperation du ClassPath
        String szClasspath = AdpXmlApplication.getClassPathAll(context, domXml, application);
        szClasspath = (szClasspath == null) ? szClasspath : UtilPath.formatPath(domXml, szClasspath);
		//Recuperation de la home du jdk
		String szJdkpath = AdpXmlApplication.getJdkPathByName(context, domXml, application, "Home");
		// Recuperation du repertoire lib du jdk
		String szJdkLib = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Lib");
		// Recuperation du repertoire home de la jre
		String szJreHome = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Home");

		StringBuffer pathClass = new StringBuffer(UtilPackage.getPackageClassPath());
		pathClass.append(";").append(szClasspath);
		addJarToClassPath(context.getRealPath("WEB-INF"), pathClass);
		if(UtilString.isNotEmpty(szJdkpath))
		{
		    File jdkPath = new File(szJdkpath);
		    if(jdkPath.exists()) {
		        if(UtilString.isNotEmpty(szJreHome)) {
		        	File jreHome = szJreHome.indexOf(':') <= 0 ? new File(jdkPath, szJreHome) : new File(szJreHome);
		        	if (jreHome.exists()) {
		            	File jreLib = new File(jreHome, "lib");
		                if (jreLib.exists()) {
		                    addJarToClassPath(jreLib.getCanonicalPath(), pathClass);
		                }
		        	}
		        }
		        if(UtilString.isNotEmpty(szJdkLib)) {
		        	File jreLib = szJdkLib.indexOf(':') <= 0 ? new File(jdkPath, szJdkLib) : new File(szJdkLib);
		            if(jreLib.exists()) {
		                addJarToClassPath(jreLib.getCanonicalPath(), pathClass);
		            }
		        }
		    }
		}
		return pathClass;
	}


    private void addJarToClassPath(String path, StringBuffer classpath) throws IOException
    {
        Vector listJar = UtilFile.dir(path, true, ".jar");
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++)
            classpath.append(";").append((String)UtilVector.safeGetElementAt(listJar, i));

    }
}
