package workspace.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import com.glaforge.i18n.io.CharsetToolkit;

import framework.trace.Trace;

public class UtilFile {

    public static String[] read(File file, String charset) throws FileNotFoundException, IOException {
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
}