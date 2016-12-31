package workspace.service.extjs;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
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
import framework.ressource.util.UtilVector;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilExtjs;
import workspace.util.UtilPath;

public class SrvAutoDeployWebContent extends SrvGenerique {


    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
		List<String> list = autoDeploy(request, bean);

		String json = "";
    	for(int i=0 ; i<list.size() ; json += (i>0 ? "," : "") + list.get(i++));

    	String jsonData = "{results:"+list.size()+",autodeploy:["+json+"]}";
        UtilExtjs.sendJson(jsonData, response);
    }

    private List<String> autoDeploy(HttpServletRequest request, BeanGenerique bean) throws IOException {
    	List<String> json = new ArrayList<>();
    	String filename = (String)bean.getParameterDataByName("filename");
    	try {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            Document dom = (Document)session.getAttribute("resultDom");
        	List<String> forbiddenExtension = Arrays.asList("java");

	        int idx = filename.indexOf('.');
	    	if (idx<0) {
	    		String msg = "No autoDeploy '" + filename + "' - No Extension";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
	    	}
	
	    	String extention = filename.substring(idx+1);
	    	if (UtilVector.isContainsString(forbiddenExtension, extention)) {
	    		String msg = "No autoDeploy '" + filename + "' - Forbidden Extension '" + extention + "'";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
	    	}
	
	        String application = UtilPath.getApplication(bean, filename);
	    	if (UtilString.isEmpty(application)) {
	    		String msg = "No autoDeploy '" + filename + "' - application not found";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
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
                String msg = "No autoDeploy '" + filename + "' - path 'WebContent' not found";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}
        	pathWebRoot = UtilPath.formatPath(dom, application, pathWebRoot);

        	if (!UtilFile.isPathAbsolute(autoDeploy) && !UtilFile.isPathAbsolute(serverDeploy)) {
        		String msg = "No autoDeploy Relative path autoDeploy '" + autoDeploy + "' and Relative path serverDeploy '" + serverDeploy + "'";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}
        	if (!UtilFile.isPathAbsolute(autoDeploy)) {
        		autoDeploy = UtilFile.formatPath(serverDeploy, autoDeploy);
        	}

        	if (!filename.startsWith(pathWebRoot+"\\")) {
        		String msg = "No autoDeploy '" + filename + "' - not in WebRoot directory '" + pathWebRoot + "'";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}

        	String filenameDst = UtilFile.formatPath(autoDeploy, filename.substring(pathWebRoot.length()));

        	UtilFile.copyFile(filename, filenameDst);
            String msg = "Success autoDeploy '" + filename + "' copied to '"+filenameDst+"'";
            Trace.DEBUG(this, msg);

            String src = filename;
            String dst = UtilEncoder.encodeHTMLEntities("[DEPLOYED_SERVER]" + filenameDst.substring(serverDeploy.length()));
        	src = UtilString.replaceAll(src, "\\", "\\\\");
        	dst = UtilString.replaceAll(dst, "\\", "\\\\");
        	json.add("{success:true, src:'" + src + "', dst:'" + dst + "', msg:'" + formatJsonMessage(msg) + "'}");
        }
        catch (IllegalArgumentException ex) {
            Trace.DEBUG(this, "No autoDeploy '" + filename + "' - " + ex.getMessage());
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