package workspace.business;

import framework.trace.Trace;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import workspace.bean.BeanWorkspace;
import workspace.business.BusinessWorkspace;

public class BusinessWorkspace {

    private BusinessWorkspace() {
    }

	public static String getClassPath(HttpServletRequest request, String application) throws TransformerException, IOException {
	    BeanWorkspace beanWorkspace = getBeanWorkspace(request);

        return (beanWorkspace == null) ? null : beanWorkspace.getDataString(BeanWorkspace.KEY_CLASSPATH_STRING);
	}

	public static void setClassPath(HttpServletRequest request, String application, String classpath) throws TransformerException, IOException {
		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace setClassPath application:" + application + " classpath:" + (classpath != null && classpath.length() > 100 ? classpath.substring(0, 100) : classpath));
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOnInitialize(request);

	    beanWorkspace.setDataString(BeanWorkspace.KEY_CLASSPATH_STRING, classpath);
	}

	public static List<String> getClassPathList(HttpServletRequest request, String application) throws TransformerException, IOException {
	    BeanWorkspace beanWorkspace = getBeanWorkspace(request);

        return (beanWorkspace == null) ? null : beanWorkspace.getListString(BeanWorkspace.KEY_CLASSPATH_LIST);
	}

	public static void setClassPathList(HttpServletRequest request, String application, List<String> classpath) throws TransformerException, IOException {
 		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace setClassPathList application:" + application + " classpath.length:" + (classpath != null ? classpath.size() : classpath));
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOnInitialize(request);

	    beanWorkspace.setListString(BeanWorkspace.KEY_CLASSPATH_STRING, classpath);
	}

    private static BeanWorkspace getBeanWorkspace(HttpServletRequest request) {
        HttpSession session = request.getSession();
	    return (BeanWorkspace)session.getAttribute(BeanWorkspace.KEY_SESSION_HTTP);
    }

    private static BeanWorkspace getBeanWorkspaceOnInitialize(HttpServletRequest request) {
	    BeanWorkspace beanWorkspace = getBeanWorkspace(request);
	    if (beanWorkspace == null) {
 			Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace new BeanWorkspace create. Set in session with key:" + BeanWorkspace.KEY_SESSION_HTTP);
            HttpSession session = request.getSession();
	        beanWorkspace = new BeanWorkspace();
            session.setAttribute(BeanWorkspace.KEY_SESSION_HTTP, beanWorkspace);
	    }
	    return beanWorkspace;
    }
}