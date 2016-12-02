package workspace.service.extjs;

import java.io.File;
import java.io.OutputStream;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilPath;

public class SrvTreeDirectory extends SrvGenerique {

    private static final String CONTENT_TYPE_DEFAULT = "text/plain";
    private static final String CONTENT_TYPE_DIRECTORY = "directory";

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String path = (String)bean.getParameterDataByName("path");
        String withContentType = (String)bean.getParameterDataByName("contentType");
        String noContentType = (String)bean.getParameterDataByName("noContentType");
        String pathMain = null;
        String pathSrc = null;
        String pathFormated = null;
        String jsonData = null;
        try {
            if(UtilString.isNotEmpty(application))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                pathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                pathSrc = AdpXmlApplication.getPathSource(context, dom, application);
	            boolean isAutoDeploy = AdpXmlServer.isAutoDeploy(context, dom, application);
                Trace.DEBUG(this, (new StringBuilder("execute pathMain:")).append(pathMain).toString());
                Trace.DEBUG(this, (new StringBuilder("execute pathSrc:")).append(pathSrc).toString());
                if(UtilString.isNotEmpty(pathMain)) {
                    if(pathMain.toUpperCase().startsWith("FTP://"))
                    {
                        Trace.DEBUG("NYI");
                    } else
                    {
                        File listFiles[] = (File[])null;
                        File fileMain = new File(pathMain);
                        if(UtilString.isNotEmpty(path))
                        {
                            pathFormated = UtilPath.formatPath(context, dom, application, path);
                            File f = new File(pathFormated);
                            if(f.isAbsolute())
                                listFiles = f.listFiles();
                            else
                                listFiles = (new File(fileMain, pathFormated)).listFiles();
                        } else
                        {
                            listFiles = fileMain.listFiles();
                        }
                        if(listFiles != null)
                        {
                            File afile[];
                            int j = (afile = listFiles).length;
                            for(int i = 0; i < j; i++)
                            {
                                File file = afile[i];
                                Trace.DEBUG(this, (new StringBuilder("execute file:")).append(file.getName()).append(" isFile:").append(file.isFile()).append(" isDirectory:").append(file.isDirectory()).toString());
                                String pathRelative = UtilFile.getPathRelative(fileMain, file);
                                if(pathRelative.indexOf('\\') >= 0)
                                    pathRelative = pathRelative.replaceAll("\\\\", "\\\\\\\\");
                                String leaf = file.isFile() ? "true" : "false";
                                String contentType = "text/plain";
                                if(file.isFile())
                                    contentType = (new MimetypesFileTypeMap()).getContentType(file);
                                else
                                    contentType = "directory";
                                boolean bAddJson = true;
                                if(UtilString.isNotEmpty(withContentType))
                                	bAddJson = withContentType.equals(contentType);
                                if(bAddJson && UtilString.isNotEmpty(noContentType))
                                	bAddJson = !withContentType.equals(noContentType);
                                if(bAddJson)
                                {
                                	boolean bBuild = false;
                                    String className = "";
                                    if(file.isFile() && UtilString.isNotEmpty(pathSrc))
                                    {
                                        File fileSrc = new File(fileMain, pathSrc);
                                        if(UtilString.isBeginByIgnoreCase(file.getAbsolutePath(), fileSrc.getAbsolutePath()))
                                        {
                                            className = UtilFile.getPathRelative(fileSrc, file);
                                            if(className.indexOf('\\') >= 0)
                                                className = className.replaceAll("\\\\", ".");
                                            if(className.startsWith("."))
                                                className = className.substring(1);
                                            if(UtilString.isEndByIgnoreCase(className, ".java"))
                                                className = className.substring(0, className.length() - 5);
                                            bBuild = UtilString.isEndByIgnoreCase(file.getName(), ".java");
                                        }
                                    }
                                    if(jsonData == null)
                                        jsonData = "[";
                                    else
                                        jsonData = (new StringBuilder(String.valueOf(jsonData))).append(",").toString();
                                    String pathRoot = (new StringBuilder("[")).append(application).append("]").append(pathRelative).toString();
                                    jsonData += "{'text':'" + file.getName() + "',"
                                        + "'id':'" + pathRoot + "',"
                                        + "'application':'" + application + "',"
                                        + "'path':'" + pathRoot + "',"
                                        + "'className':'" + className + "',"
                                        + "'contentType':'" + contentType + "',"
                                        + "'build':'" + bBuild + "',"
                                        + "'leaf':" + leaf + ","
                                        + "'autoDeploy':" + isAutoDeploy
                                        + "}";
                                }
                            }

                        }
                        if(jsonData != null)
                            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]").toString();
                        else
                            jsonData = "[]";
                        OutputStream os = response.getOutputStream();
                        response.setContentType("text/json");
                        os.write(jsonData.getBytes());
                        os.close();
                    }
                }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("execute application:")).append(application).append(" path:").append(path).append(" pathFormated:").append(pathFormated).toString());
        Trace.DEBUG(this, (new StringBuilder("execute pathMain:")).append(pathMain).append(" pathSrc:").append(pathSrc).toString());
        Trace.DEBUG(this, (new StringBuilder("execute withContentType:")).append(withContentType).append(" noContentType:").append(noContentType).toString());
        Trace.DEBUG(this, (new StringBuilder("execute jsonData:")).append(jsonData).toString());
    }
}