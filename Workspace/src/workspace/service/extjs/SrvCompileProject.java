// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCompileProject.java

package workspace.service.extjs;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.service.ant.SrvAntTargetExecute;
import workspace.util.UtilExtjs;
import workspace.util.UtilPath;

public class SrvCompileProject extends SrvAntTargetExecute// SrvAntCompileProject
{

    public SrvCompileProject()
    {
    }

    public void init()
    {
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, ByteArrayOutputStream streamLog) throws Exception {
        System.out.println(streamLog.toString());
        String content = streamLog.toString();
		String jsonAutodeploy = autoDeploy(request, bean);
        UtilExtjs.splitAndSendJson(content, jsonAutodeploy, response);
    }

    private String autoDeploy(HttpServletRequest request, BeanGenerique bean) throws IOException {
    	List<String> json = new ArrayList<>();
    	try
        {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            Document dom = (Document)session.getAttribute("resultDom");

            String application = (String)bean.getParameterDataByName("application");
	    	if (UtilString.isEmpty(application)) {
	            Trace.DEBUG(this, "No autoDeploy - application not found");
	    	} else {

		    	// if no AutoDeploy defined this call throw an IllegalArgumentException
		        String autoDeploy = AdpXmlServer.getCommandByName(context, dom, application, "WebApplication", "AutoDeploy");
	        	autoDeploy = UtilPath.formatPath(dom, autoDeploy);
		    	// if no RootDeploy defined this call throw an IllegalArgumentException
		        String serverDeploy = AdpXmlServer.getPathByName(context, dom, application, "WebApplication", "RootDeploy");
	        	serverDeploy = UtilPath.formatPath(dom, serverDeploy);
	
		    	// if no Main path defined this call throw an IllegalArgumentException
	            String szPathMain = AdpXmlApplication.getPathByName(context, dom, application, "Main");
	            szPathMain = UtilPath.formatPath(dom, szPathMain);
	
		    	// if no Class path defined this call throw an IllegalArgumentException
	            String szPathClass = AdpXmlApplication.getPathByName(context, dom, application, "Class");
	        	if (!UtilFile.isPathAbsolute(szPathClass)) {
	                szPathClass = UtilFile.formatPath(szPathMain, szPathClass);
	        	}

	        	if (!UtilFile.isPathAbsolute(autoDeploy)) {
	        		autoDeploy = UtilFile.formatPath(serverDeploy, autoDeploy);
	        	}
	
	        	int pathClassLen = szPathClass.length();
	        	List list = UtilFile.dir(szPathClass, true, (FilenameFilter)null, false, true);
	        	for(int i=0 ; i<list.size() ; i++) {
	        		String classname = (String) list.get(i);
	            	String filenameDst = UtilFile.formatPath(autoDeploy, "WEB-INF" + File.separator + "classes");
	            	filenameDst = UtilFile.formatPath(filenameDst, classname.substring(pathClassLen));
	            	
	            	File fileDst = new File(filenameDst);
	            	if (fileDst.isDirectory())
	            		continue;

	            	File fileSrc = new File(classname);

	            	File dirDst = fileDst.getParentFile();//new File(filenameDst.substring(filenameDst.lastIndexOf(File.separator)));
	            	if (!dirDst.exists()) {
	            		dirDst.mkdirs();
	            	}

	            	if (!fileDst.exists() || fileSrc.lastModified() > fileDst.lastModified()) {
		            	UtilFile.copyFile(fileSrc, fileDst);
		            	json.add("{src:'" + classname + "', dst:'" + filenameDst + "'}");
		            	Trace.DEBUG(this, "Success autoDeploy '" + classname + "' copied to '"+filenameDst+"'");
	            	} else {
		            	Trace.DEBUG(this, "No autoDeploy '" + classname + "' fileSrc.lastModified:"+fileSrc.lastModified()+" fileDst.lastModified:" + fileDst.lastModified());
	            	}
	        	}
	    	}
        }
        catch (IllegalArgumentException ex) {
            Trace.DEBUG(this, "No autoDeploy - " + ex.getMessage());
        }
        catch (Exception ex) {
            Trace.ERROR(this, ex);
        }
    	String ret = "autodeploy: [";
    	for(int i=0 ; i<json.size() ; i++) {
    		if (i>0) {
    			ret += ",";
    		}
    		ret += json.get(i);
    	}
    	ret += "]";
		return ret;
    }
}
