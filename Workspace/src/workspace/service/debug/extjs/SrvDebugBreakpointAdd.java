package workspace.service.debug.extjs;

import framework.beandata.BeanGenerique;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.jdi.request.BreakpointRequest;

public class SrvDebugBreakpointAdd extends workspace.service.debug.SrvDebugBreakpointAdd {

    protected void initBreakpointProperties(BeanGenerique bean, BreakpointRequest brkR) throws Exception {
        String line = (String)bean.getParameterDataByName("breakpointLine");
        String className = (String)bean.getParameterDataByName("className");
        String application = (String)bean.getParameterDataByName("application");
        String fileName = (String)bean.getParameterDataByName("FileName");

        brkR.putProperty("line", line);
        brkR.putProperty("className", className);
        brkR.putProperty("application", application);
        brkR.putProperty("fileName", fileName);
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String result, boolean success) throws Exception {
        String jsonData = null;
        String szClassName = "";
        String szResponse = "";
        String szText = "";
        try {
            int idx1 = result.indexOf(":");
            if(idx1 > 0) {
                szClassName = result.substring(0, idx1);
                int idx2 = result.indexOf(":", idx1 + 1);
                if(idx2 > 0) {
	                szResponse = result.substring(idx1 + 1, idx2);
	                szText = result.substring(idx2 + 1);
                }
            }
        }
        catch(Exception ex) {
        	success = false;
//            szText = (String)request.getAttribute("msgText");
            szText = ex.getMessage();
        } finally {
	        jsonData = "{"+
                "'success':" + success + ","+
            	"'classname':'" + szClassName + "',"+
            	"'response':'" + szResponse + "',"+
            	"'text':'" + szText + "'"+
            "}";

	        OutputStream os = response.getOutputStream();
	        response.setContentType("text/json");
	        os.write(jsonData.getBytes());
	        os.close();
        }
        return;
    }
}
