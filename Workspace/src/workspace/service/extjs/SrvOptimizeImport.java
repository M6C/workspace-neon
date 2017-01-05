package workspace.service.extjs;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import java.util.zip.ZipEntry;

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
import framework.ressource.util.UtilPackageResource;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.business.BusinessClasspath;
import workspace.util.UtilExtjs;
import workspace.util.UtilPath;

public class SrvOptimizeImport extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();

        Document domXml = (Document)session.getAttribute("resultDom");
        String application = (String)bean.getParameterDataByName("application");

        String pathClass = BusinessClasspath.getClassPath(context, application, domXml);

        List<String> classList = new ArrayList<String>();
        String[] listPath = pathClass.split(";");
        int size = listPath.length;
        for(int i=0 ; i<size ; i++) {
            String path = listPath[i];
            File file = new File(path);
            if (file.isFile()) {
                ZipEntry[] entries = UtilPackageResource.getZipEntries(file);
                for(int j=0;j<entries.length;j++) {
                    ZipEntry entry = entries[j];
                    if (!entry.isDirectory()) {
                        String entryName=entry.getName();
                        if (entryName.lastIndexOf('/')<0) //no separator
                            classList.add(entryName.substring(0,entryName.lastIndexOf('.')));
                    }
                }
            }
        }
    }
}