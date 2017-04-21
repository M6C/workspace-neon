package workspace.service;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;

public class SrvAdminExecuteCmd extends SrvGenerique {

    protected static final String OUT_PREFIX = "[OUT]";
    protected static final String ERR_PREFIX = "[ERR]";

	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String commandLine = (String) bean.getParameterDataByName("commandLine");
        String result = "";
    	String line = "";
        try {
            if (UtilString.isNotEmpty(commandLine)) {
                StringBuffer stb = new StringBuffer();

        	    StringBuffer sbCmd = new StringBuffer();
            	for(String cmd : commandLine.split("\n")) {
            		cmd = cmd.trim();
            		if (UtilString.isNotEmpty(cmd) && !cmd.startsWith(OUT_PREFIX) && !cmd.startsWith(ERR_PREFIX)) {
    			        sbCmd.append(cmd + "\r\n");
            		}
            	}

                FileWriter out = null;
            	try {
                	File cmdFile = File.createTempFile("Exec_Cmd_" + Long.toString(new Date().getTime()), ".cmd");
            	    out = new FileWriter(cmdFile);
        			out.write(sbCmd.toString());
        			out.close();
        			out = null;

                	line = cmdFile.getAbsolutePath(); //"cmd /C " + cmdFile.getAbsolutePath();
				    execCmd(line, stb);
            	} finally {
            		if (out != null) {
            			out.close();
            		}
            	}

            	result = stb.toString();
            }
        }
        catch(Exception ex) {
            ByteArrayOutputStream streamLog = new ByteArrayOutputStream();
            PrintStream psLog = new PrintStream(streamLog);
            ex.printStackTrace(psLog);
            result = ERR_PREFIX + " " + streamLog.toString();
            Trace.ERROR(this, ex);
        } finally {
        	if (UtilString.isEmpty(result)) {
        		result = OUT_PREFIX;
        	}
        	doResponse(request, response, bean, result);
        	Trace.DEBUG(this, (new StringBuilder("execute commandLine:'")).append(commandLine).append("'").toString());
        	Trace.DEBUG(this, (new StringBuilder("execute temp script:'")).append(line).append("'").toString());
        	Trace.DEBUG(this, (new StringBuilder("execute result:'")).append(result).append("'").toString());
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
                    stb.append(OUT_PREFIX).append(" ").append(str).append("\r\n");
                }
            }
            p.destroy();
        }
    }
}