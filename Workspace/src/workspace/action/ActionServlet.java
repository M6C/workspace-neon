package workspace.action;

import java.io.File;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import framework.ressource.util.UtilString;

public class ActionServlet extends framework.action.ActionServlet {

	private static final long serialVersionUID = 1L;

	private static String PARAMETER_WORKSPACE_SECURITY_XML = "workspace.security.xml";

	//Initialize global variables
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		String szSecurityXml = System.getProperty(PARAMETER_WORKSPACE_SECURITY_XML);
		if (UtilString.isNotEmpty(szSecurityXml)) {
//			try {WORKSPACE_SECURITY_XML = getServletContext().getRealPath(szSecurityXml);}catch (Exception ex){}
			try {WORKSPACE_SECURITY_XML = new File(szSecurityXml).getCanonicalPath();}catch (Exception ex){ex.printStackTrace();}
		}
	}
}
