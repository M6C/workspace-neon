// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointCheck.java

package workspace.service.debug;

import com.sun.jdi.Location;
import com.sun.jdi.event.BreakpointEvent;
import com.sun.jdi.request.BreakpointRequest;
import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import javax.servlet.http.*;
import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointCheck extends SrvGenerique
{

    public SrvDebugBreakpointCheck()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        try
        {
            BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
            if(beanDebug != null)
            {
                com.sun.jdi.event.Event currentEvent = beanDebug.getCurrentEvent();
                if(currentEvent != null && (currentEvent instanceof BreakpointEvent))
                {
                    BreakpointEvent brkE = (BreakpointEvent)currentEvent;
                    BreakpointRequest brkR = (BreakpointRequest)brkE.request();
                    String application = URLEncoder.encode((String)brkR.getProperty("application"), "UTF-8");
                    String path = URLEncoder.encode((String)brkR.getProperty("path"), "UTF-8");
                    String sourceName = URLEncoder.encode(brkR.location().sourceName(), "UTF-8");
                    int lineNumber = brkE.location().lineNumber();
                    PrintWriter out = response.getWriter();
                    out.print((new StringBuilder(String.valueOf(application))).append(":").append(path).append(":").append(sourceName).append(":").append(lineNumber).toString());
                }
            }
        }
        catch(Exception ex)
        {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            request.setAttribute("msgText", sw.toString());
            throw ex;
        }
    }
}
