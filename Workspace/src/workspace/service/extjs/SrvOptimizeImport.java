package workspace.service.extjs;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.zip.ZipEntry;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackageResource;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.business.BusinessClasspath;
import workspace.util.UtilExtjs;

public class SrvOptimizeImport extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	List<String> classpathJson = new ArrayList<String>();
    	String jsonImport = "";
        try {
	        HttpSession session = request.getSession();
	        ServletContext context = session.getServletContext();
	
	        Document domXml = (Document)session.getAttribute("resultDom");
	        String application = (String)bean.getParameterDataByName("application");
	        String classname = (String)bean.getParameterDataByName("classname");
	
	        String classpath = BusinessClasspath.getClassPath(context, application, domXml);
	
	        Map<String, List<String>> mapListClass = new HashMap<String, List<String>>();
	        String[] classnameList = classname.split(";");
	        List<String> classpathList = getClassList(classpath);
	        for(String classnameItem : classnameList) {
	            for(String classpathItem : classpathList) {
	                if (classpathItem.endsWith("." + classnameItem)) {
	                    List list = mapListClass.get(classnameItem);
	                    if (list == null) {
	                        list = new ArrayList<String>();
	                        mapListClass.put(classnameItem, list);
	                    }
	                    list.add(classpathItem);
	                }
	            }
	        }
	
	        for(String classnameItem : mapListClass.keySet()) {
	            List<String> list = mapListClass.get(classnameItem);
	            classpathJson.add("{classname: '" + classnameItem + "', list:['" + String.join("','", list) + "']}");
	        }
	        jsonImport = String.join(",", classpathJson);

		} catch (Exception e) {
			Trace.ERROR(this, e);
		} finally {
			String jsonData = "{results:"+classpathJson.size()+",import:["+jsonImport+"]}";
			UtilExtjs.sendJson(jsonData, response);
		}
    }

    private List<String> getClassList(String pathClass) throws IOException {
        String ext = ".class";
        int extLen = ext.length();
        List<String> classList = new ArrayList<String>();
        List<String> listPath = new ArrayList<String>();

        String[] splited = pathClass.split(";");
        for(int i=0 ; i<splited.length ; listPath.add(splited[i++]));

        int size = listPath.size();
        for(int i=0 ; i<size ; i++) {
            String path = listPath.get(i);
            if (UtilString.isEmpty(path)) {
    			Trace.DEBUG("SrvOptimizeImport getClassList empty path");
            	continue;
            }
            File file = new File(path);
            if (!file.exists()) {
    			Trace.DEBUG("SrvOptimizeImport getClassList '"+path+"' do not exist");
            	continue;
            }
            Trace.DEBUG("SrvOptimizeImport file[" + i + "/" + size + "]:" + file.getAbsolutePath());
            if (file.isDirectory()) {
				Vector listClass = UtilFile.dir(path, true, ext + ";.jar", true);
		        int max = UtilVector.safeSize(listClass);
		        for(int k = 0; k < max; k++) {
                	String className = (String)UtilVector.safeGetElementAt(listClass, k);
                    if (className.endsWith(ext) && className.indexOf('$') < 0) {
                    	className = className.replaceAll("[/\\\\]", ".").substring(0, className.length()-extLen);
                        classList.add(className);
                    } else if (className.endsWith(".jar")) {
                    	listPath.add(new File(new File(path), className).getAbsolutePath());
                    	size++;
                    }
		        }
            } else {
                ZipEntry[] entries = UtilPackageResource.getZipEntries(file);
                if (entries == null) {
        			Trace.DEBUG("SrvOptimizeImport getClassList '"+path+"' has no entrie");
                	continue;
                }
                int entriesLen = entries.length;
                for(int j=0;j<entriesLen;j++) {
                    ZipEntry entry = entries[j];
                    if (entry != null && !entry.isDirectory()) {
                        String entryName=entry.getName();
                        String entryNameLow = entryName.toLowerCase();
                        if (entryNameLow.endsWith(ext) && entryNameLow.indexOf('$') < 0) {
                        	String className = entryName.replaceAll("[/\\\\]", ".").substring(0, entryName.length()-extLen);
                        	Trace.DEBUG("SrvOptimizeImport file[" + j + "/" + entriesLen + "] className:" + className);
                            classList.add(className);
                        }
                    }
                }
            }
        }
        return classList;
    }
}