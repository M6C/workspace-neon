package workspace.business;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.ServletContext;
import javax.xml.transform.TransformerException;

import org.w3c.dom.Document;

import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackage;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class BusinessClasspath {

	public static String getClassPath(ServletContext context, String application, Document domXml) throws TransformerException, IOException {
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
		return pathClass.toString();
	}


    private static void addJarToClassPath(String path, StringBuffer classpath) throws IOException
    {
        Vector listJar = UtilFile.dir(path, true, ".jar");
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++)
            classpath.append(";").append((String)UtilVector.safeGetElementAt(listJar, i));

    }
}