package workspace.service.extjs;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;

import com.glaforge.i18n.io.CharsetToolkit;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.util.UtilPath;

public class SrvEditLoadFile extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String filename = (String)bean.getParameterDataByName("filename");
        String filenameFormated = null;
        String jsonData = null;
        try {
            if (UtilString.isNotEmpty(filename)) {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                filenameFormated = UtilPath.formatPath(dom, filename);
                if(UtilString.isNotEmpty(filenameFormated)) {
                    File file = new File(filenameFormated);
                    if(file != null && file.exists() && file.isFile()) {
                    	String encoding = guessEncoding(file);

                        String[] content = read(file, encoding);
                        if (content != null && content.length > 0) {
                            String lines[] = content;
                            String line = null;
                            int nb = lines.length;
                            for (int i = 0; i < nb; i++) {
                                line = simpleFormat(lines[i]);
                                Trace.DEBUG("SrvEditLoadFile execute lines[" + i + "]:" + line);
                                if (jsonData == null) {
                                    jsonData = "{results:" + nb + ", encoding:'" + encoding + "', data:[";
                                } else {
                                    jsonData += ",";
                                }
                                jsonData += "{'text':'" + line + "'," + "'id':'" + i + "'" + "}";
                            }

                        }
                    }
                }
            }
        }
        catch(Exception ex) {
            Trace.ERROR(this, ex);
        }

        if (jsonData != null) {
            jsonData += "]}";
        } else {
            jsonData = "{results:0,data:[]}";
        }
        Trace.DEBUG(this, "SrvEditLoadFile execute filename:" + filename + " filenameFormated:" + filenameFormated);
        Trace.DEBUG(this, "SrvEditLoadFile execute jsonData:" + jsonData);
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
    }

    private String[] read(File file, String charset) throws FileNotFoundException, IOException {
        Trace.DEBUG("charset:" + charset);
    	InputStream input = new FileInputStream(file);
    	InputStreamReader reader = new InputStreamReader(input, charset);
        BufferedReader br = new BufferedReader(reader);
        try {
            List<String> list = new ArrayList<String>();
            String line = br.readLine();

            int i=0;
            while (line != null) {
                line = URLEncoder.encode(line, charset);
                list.add(line);
                line = br.readLine();
            }
            String[] ret = new String[list.size()];
            list.toArray(ret);
            return ret;
        } finally {
        	try {
            	try {
                    br.close();
    	    	} finally {
                    reader.close();
    			}
	    	} finally {
	    		input.close();
			}
        }
    }

	// http://stackoverflow.com/questions/499010/java-how-to-determine-the-correct-charset-encoding-of-a-stream/4013565#4013565
	// http://mvnrepository.com/artifact/org.codehaus.guessencoding/guessencoding/1.4
    public static String guessEncoding(File file) throws IOException {
    	InputStream input = new FileInputStream(file);
        // Load input data
        long count = 0;
        int n = 0, EOF = -1;
        byte[] buffer = new byte[4096];
        ByteArrayOutputStream output = new ByteArrayOutputStream();
    	try {
	        while ((EOF != (n = input.read(buffer))) && (count <= Integer.MAX_VALUE)) {
	            output.write(buffer, 0, n);
	            count += n;
	            if (count > Integer.MAX_VALUE) {
	                break;
	            }
	        }
	
	        byte[] data = output.toByteArray();
	
	        return new CharsetToolkit(data).guessEncoding().displayName();
    	} finally {
        	try {
	    		output.close();
	    	} finally {
	    		input.close();
			}
		}
    }

    private String simpleFormat(String text) {
        text = text.replaceAll("\\\\", "\\\\\\\\");
        text = text.replaceAll("'", "\\\\'");
        return text;
    }
}