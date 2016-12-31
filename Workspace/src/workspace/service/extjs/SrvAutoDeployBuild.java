package workspace.service.extjs;

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
import framework.ressource.util.UtilEncoder;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilExtjs;
import workspace.util.UtilPath;

public class SrvAutoDeployBuild extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
		List<String> list = autoDeploy(request, bean);

		String json = "";
    	for(int i=0 ; i<list.size() ; json += (i>0 ? "," : "") + list.get(i++));

    	String jsonData = "{results:"+list.size()+",autodeploy:["+json+"]}";
        UtilExtjs.sendJson(jsonData, response);
    }

    private List<String> autoDeploy(HttpServletRequest request, BeanGenerique bean) throws IOException {
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
	        	int serverDeployLen = serverDeploy.length();
	
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
	
            	String filenameDst = UtilFile.formatPath(autoDeploy, "WEB-INF" + File.separator + "classes");
	        	int pathClassLen = szPathClass.length();
	        	List<?> list = UtilFile.dir(szPathClass, true, (FilenameFilter)null, false, true);
	        	for(int i=0 ; i<list.size() ; i++) {
	        		String classname = (String) list.get(i);
	            	String classnameDst = UtilFile.formatPath(filenameDst, classname.substring(pathClassLen));
	            	
	            	File fileDst = new File(classnameDst);
	            	if (fileDst.isDirectory())
	            		continue;

	            	File fileSrc = new File(classname);

	            	File dirDst = fileDst.getParentFile();//new File(filenameDst.substring(filenameDst.lastIndexOf(File.separator)));
	            	if (!dirDst.exists()) {
	            		dirDst.mkdirs();
	            	}

	            	String src = UtilEncoder.encodeHTMLEntities("[" + application + "]" + classname.substring(pathClassLen));
	            	String dst = UtilEncoder.encodeHTMLEntities("[DEPLOYED_SERVER]" + classnameDst.substring(serverDeployLen));
	            	src = UtilString.replaceAll(src, "\\", "\\\\");
	            	dst = UtilString.replaceAll(dst, "\\", "\\\\");

	            	if (!fileDst.exists() || fileSrc.lastModified() > fileDst.lastModified()) {
		            	UtilFile.copyFile(fileSrc, fileDst);
		            	String msg = "Success autoDeploy '" + classname + "' copied to '"+classnameDst+"'";
		            	Trace.DEBUG(this, msg);
		            	json.add("{success:true, src:'" + src + "', dst:'" + dst + "', msg:'" + formatJsonMessage(msg) + "'}");
	           // 	} else {
	           // 		String msg = "No autoDeploy '" + classname + "' fileSrc.lastModified:"+fileSrc.lastModified()+" fileDst.lastModified:" + fileDst.lastModified();
	           // 		Trace.DEBUG(this, msg);
		          //  	json.add("{success:false, src:'" + src + "', dst:'" + dst + "', msg:'" + formatJsonMessage(msg) + "'}");
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
		return json;
    }

    private String formatJsonMessage(String msg) {
    	return UtilString.replaceAll(msg, "\\", "\\\\").replaceAll("'", "\\\\'");
    }
}