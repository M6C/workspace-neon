package workspace.service.extjs;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
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

public class SrvEditSaveFile extends SrvGenerique
{

    private List<String> forbiddenExtension;

	public SrvEditSaveFile()
    {
    	forbiddenExtension = Arrays.asList("java");
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String content;
        String filename;
        String navIndex;
        String navNbRow;
        String filenameFormated;
        content = (String)bean.getParameterDataByName("content");
        filename = (String)bean.getParameterDataByName("filename");
        navIndex = (String)bean.getParameterDataByName("navIndex");
        navNbRow = (String)bean.getParameterDataByName("navNbRow");
        filenameFormated = null;
        try
        {
            if(UtilString.isNotEmpty(content) && UtilString.isNotEmpty(filename))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                filenameFormated = UtilPath.formatPath(dom, filename);
                if(UtilString.isNotEmpty(filenameFormated))
                {
                    File outputFile = new File(filenameFormated);
                    try {
	                    if(outputFile.exists() && !outputFile.isFile()) {
	   					 	Trace.WARNING(this, (new StringBuilder("'")).append(outputFile.getPath()).append("' is not a file.").toString());
	                    } else {
							if(UtilString.isNotEmpty(navIndex) && UtilString.isNotEmpty(navNbRow)) {
								content = replaceText(read(outputFile), content, Integer.parseInt(navIndex), Integer.parseInt(navNbRow));
							}
							if (content.indexOf('\r')<0) { 
								content = content.replaceAll("\n", "\r\n");
							}
							content = content.trim();
							if (write(outputFile, content)) {
								autoDeploy(request, bean, filename);
							}
	                    }
                    } finally {
						outputFile = null;
						System.gc();
						System.gc();
					}
                } else
                {
                    Trace.DEBUG(this, "path is Empty");
                }
            } else
            {
                Trace.DEBUG(this, "content is Empty and filename is Empty");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("filename:")).append(filename).append(" filenameFormated:").append(filenameFormated).append(" navIndex:").append(navIndex).append(" navNbRow:").append(navNbRow).toString());
    }

    private void autoDeploy(HttpServletRequest request, BeanGenerique bean, String filename) throws IOException {
    	try
        {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            Document dom = (Document)session.getAttribute("resultDom");

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

    private String read(File file) throws IOException {
        Trace.DEBUG(this, (new StringBuilder("read file '")).append(file.getPath()).append("'").toString());
        StringBuffer ret = new StringBuffer();
        if (file.exists()) {
        	ret.append(UtilFile.read(file));
			Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' read.").toString());
        } else {
            Trace.ERROR(this, (new StringBuilder("file '")).append(file.getPath()).append("' do not exist.").toString());
        }
        return ret.toString();
    }

    private boolean write(File file, String content) throws IOException {
        Trace.DEBUG(this, (new StringBuilder("write file '")).append(file.getPath()).append("'").toString());
        if(!file.exists() || file.canWrite()) {
        	UtilFile.write(file, content);
    		Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' writed.").toString());
    		return true;
        } else {
            Trace.ERROR(this, (new StringBuilder("file '")).append(file.getPath()).append("' can not be writable.").toString());
        }
		return false;
    }

    private String replaceText(String content, String text, int startIndex, int nbRow)
        throws IOException
    {
        Trace.DEBUG(this, (new StringBuilder("replaceText content:")).append(content).append(" text:").append(text).append(" startIndex:").append(startIndex).append(" nbRow:").append(nbRow).toString());
        StringBuffer ret = new StringBuffer();
        StringReader sr = new StringReader(content);
        BufferedReader in = new BufferedReader(sr);
        if(!in.ready()) {
            throw new IOException();
        }
        try
        {
            String line;
            for(int i = 1; i < startIndex && (line = in.readLine()) != null; i++) {
                ret.append(line).append("\r\n");
            }

            ret.append(text).append("\r\n");
            for(int i = 1; i <= nbRow && (line = in.readLine()) != null; i++);
            while((line = in.readLine()) != null) { 
                ret.append(line).append("\r\n");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        finally {
        	in.close();
		}
        return ret.toString();
    }
}