package workspace.service;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;

public class SrvAdminExecuteCmd extends SrvGenerique {

    protected static final String OUT_PREFIX = "[OUT] ";
    protected static final String ERR_PREFIX = "[ERR] ";

	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String commandLine = (String) bean.getParameterDataByName("commandLine");
        String result = "";
        try {
            if (UtilString.isNotEmpty(commandLine)) {
                StringBuffer stb = new StringBuffer();
            	List<String> listCmd = new ArrayList<>();

            	for(String cmd : commandLine.split("\n")) {
            		cmd = cmd.trim();
            		if (UtilString.isNotEmpty(cmd) && !cmd.startsWith(OUT_PREFIX) && !cmd.startsWith(ERR_PREFIX)) {
            			listCmd.add(cmd);
            		}
            	}

            	int cnt = listCmd.size() - 1;
            	for(int i=0 ; i<listCmd.size() ; i++) {
            		String cmd = listCmd.get(i);
            		execCmd(cmd, (i == cnt) ? stb : null);
            	}

            	result = stb.toString();
            }
        }
        catch(Exception ex) {
            ByteArrayOutputStream streamLog = new ByteArrayOutputStream();
            PrintStream psLog = new PrintStream(streamLog);
            ex.printStackTrace(psLog);
            result = ERR_PREFIX + streamLog.toString();
            Trace.ERROR(this, ex);
        } finally {
        	if (UtilString.isEmpty(result)) {
        		result = OUT_PREFIX;
        	}
        	doResponse(request, response, bean, result);
        	Trace.DEBUG(this, (new StringBuilder("execute commandLine:'")).append(commandLine).append("'").toString());
        }
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String content) throws Exception {
        request.setAttribute("resultCommandLine", content);
    }

    private void execCmd(String commandLine, StringBuffer stb) throws IOException, InterruptedException {
        if (UtilString.isNotEmpty(commandLine)) {
            Process p = Runtime.getRuntime().exec(commandLine);
            p.waitFor();
            if (stb != null) {
                BufferedReader out = new BufferedReader(new InputStreamReader(p.getInputStream()));
                for(String str = out.readLine(); str != null; str = out.readLine()) {
                    stb.append(OUT_PREFIX).append(str).append("\r\n");
                }
            }
            p.destroy();
        }
    }
}
