package workspace.service.extjs;

import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilPath;

public class SrvAutoDeployWebContent extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	String filename = (String)bean.getParameterDataByName("filename");
    	try {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            Document dom = (Document)session.getAttribute("resultDom");
        	List<String> forbiddenExtension = Arrays.asList("java");

	        int idx = filename.indexOf('.');
	    	if (idx<0) {
	            Trace.DEBUG(this, "No autoDeploy '" + filename + "' - No Extension");
	    		return;
	    	}
	
	    	String extention = filename.substring(idx+1);
	    	if (UtilVector.isContainsString(forbiddenExtension, extention)) {
	            Trace.DEBUG(this, "No autoDeploy '" + filename + "' - Forbidden Extension '" + extention + "'");
	    		return;
	    	}
	
	        String application = getApplication(bean, filename);
	    	if (UtilString.isEmpty(application)) {
	            Trace.DEBUG(this, "No autoDeploy '" + filename + "' - application not found");
	    		return;
	    	}
	    	filename = UtilPath.formatPath(dom, application, filename);

	    	// if no AutoDeploy defined this call throw an IllegalArgumentException
	        String autoDeploy = AdpXmlServer.getCommandByName(context, dom, application, "WebApplication", "AutoDeploy");
        	autoDeploy = UtilPath.formatPath(dom, autoDeploy);
	    	// if no RootDeploy defined this call throw an IllegalArgumentException
	        String serverDeploy = AdpXmlServer.getPathByName(context, dom, application, "WebApplication", "RootDeploy");
        	serverDeploy = UtilPath.formatPath(dom, serverDeploy);

	        String pathWebRoot = AdpXmlApplication.getPathByName(context, dom, application, "WebContent");
        	if (UtilString.isEmpty(pathWebRoot)) {
                Trace.DEBUG(this, "No autoDeploy '" + filename + "' - path 'WebRoot' not found");
        		return;
        	}
        	pathWebRoot = UtilPath.formatPath(dom, application, pathWebRoot);

        	if (!UtilFile.isPathAbsolute(autoDeploy) && !UtilFile.isPathAbsolute(serverDeploy)) {
                Trace.DEBUG(this, "No autoDeploy Relative path autoDeploy '" + autoDeploy + "' and Relative path serverDeploy '" + serverDeploy + "'");
        		return;
        	}
        	if (!UtilFile.isPathAbsolute(autoDeploy)) {
        		autoDeploy = UtilFile.formatPath(serverDeploy, autoDeploy);
        	}

        	if (!filename.startsWith(pathWebRoot+"\\")) {
                Trace.DEBUG(this, "No autoDeploy '" + filename + "' - not in WebRoot directory '" + pathWebRoot + "'");
        		return;
        	}
        	String filenameDst = UtilFile.formatPath(autoDeploy, filename.substring(pathWebRoot.length()));

        	UtilFile.copyFile(filename, filenameDst);
            Trace.DEBUG(this, "Success autoDeploy '" + filename + "' copied to '"+filenameDst+"'");
        }
        catch (IllegalArgumentException ex) {
            Trace.DEBUG(this, "No autoDeploy '" + filename + "' - " + ex.getMessage());
        }
        catch (Exception ex) {
            Trace.ERROR(this, ex);
        }
    }

    private String getApplication(BeanGenerique bean, String path) {
    	String ret = null;
        int iDeb = path.indexOf('[', 0);
        int iFin = path.indexOf(']', iDeb);
        if(iDeb >= 0 && iFin >= 0) {
        	ret = path.substring(iDeb + 1, iFin);
        } else {
        	ret = (String)bean.getParameterDataByName("application");
        }
    	return ret;
    }
}