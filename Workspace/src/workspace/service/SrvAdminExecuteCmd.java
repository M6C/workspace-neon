// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAdminExecuteCmd.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvAdminExecuteCmd extends SrvGenerique
{

    public SrvAdminExecuteCmd()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String commandLine = request.getParameter("commandLine");
        try
        {
            if(commandLine != null && !commandLine.equals(""))
            {
                BufferedReader out = null;
                StringBuffer stb = new StringBuffer();
                Process p = Runtime.getRuntime().exec(commandLine);
                p.waitFor();
                out = new BufferedReader(new InputStreamReader(p.getInputStream()));
                for(String str = out.readLine(); str != null; str = out.readLine())
                    stb.append(str).append("\r\n");

                request.setAttribute("resultCommandLine", stb.toString());
                p.destroy();
            }
            break MISSING_BLOCK_LABEL_238;
        }
        catch(Exception ex)
        {
            ByteArrayOutputStream streamLog = new ByteArrayOutputStream();
            PrintStream psLog = new PrintStream(streamLog);
            ex.printStackTrace(psLog);
            request.setAttribute("resultCommandLine", streamLog.toString());
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("execute commandLine:'")).append(commandLine).append("'").toString());
        break MISSING_BLOCK_LABEL_264;
        Exception exception;
        exception;
        Trace.DEBUG(this, (new StringBuilder("execute commandLine:'")).append(commandLine).append("'").toString());
        throw exception;
        Trace.DEBUG(this, (new StringBuilder("execute commandLine:'")).append(commandLine).append("'").toString());
    }
}
