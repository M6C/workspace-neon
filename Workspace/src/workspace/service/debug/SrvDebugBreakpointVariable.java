// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointVariable.java

package workspace.service.debug;

import com.sun.jdi.*;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.*;
import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointVariable extends SrvGenerique
{

    public SrvDebugBreakpointVariable()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        StringBuffer sb = new StringBuffer("<table border=1 cellspacing=0 cellpadding=0><tr><td>");
        try
        {
            BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
            if(beanDebug != null)
            {
                Event currentEvent = beanDebug.getCurrentEvent();
                if(currentEvent != null && (currentEvent instanceof LocatableEvent))
                {
                    LocatableEvent event = (LocatableEvent)currentEvent;
                    ThreadReference thread = event.thread();
                    List frames = thread.frames();
                    if(frames != null && !frames.isEmpty())
                    {
                        StackFrame frame = null;
                        for(Iterator it = frames.iterator(); it.hasNext(); sb.append("</td></tr><tr><td>"))
                        {
                            frame = (StackFrame)it.next();
                            try
                            {
                                sb.append("&nbsp;</td><td><table><tr><td colspan='3' nowrap><b>");
                                sb.append(frame.location().sourcePath());
                                sb.append("\\");
                                sb.append(frame.location().sourceName());
                                sb.append("</b><br><u>");
                                sb.append(frame.location().method().name());
                                sb.append("</u>&nbsp;");
                                sb.append(frame.location().method().signature());
                                sb.append("</td></tr><tr><td>");
                            }
                            catch(Exception exception) { }
                            try
                            {
                                List visibleVariables = frame.visibleVariables();
                                if(visibleVariables != null && !visibleVariables.isEmpty())
                                {
                                    LocalVariable variable = null;
                                    Value value = null;
                                    for(Iterator itV = visibleVariables.iterator(); itV.hasNext(); sb.append("</td></tr><tr><td>"))
                                    {
                                        variable = (LocalVariable)itV.next();
                                        sb.append(variable.typeName());
                                        sb.append("</td><td>");
                                        sb.append(variable.name());
                                        sb.append("</td><td>");
                                        value = frame.getValue(variable);
                                        sb.append(value == null ? null : value.toString());
                                    }

                                }
                            }
                            catch(Exception exception1) { }
                            sb.append("</td></tr></table>");
                        }

                    }
                }
            }
            sb.append("</td></tr></table>");
            PrintWriter out = response.getWriter();
            out.print(sb.toString());
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
