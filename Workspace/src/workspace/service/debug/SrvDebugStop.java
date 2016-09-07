// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugStop.java

package workspace.service.debug;

import com.sun.jdi.VirtualMachine;
import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.*;
import workspace.bean.debug.BeanDebug;
import workspace.thread.debug.ThrdDebugEventQueue;

public class SrvDebugStop extends SrvGenerique
{

    public SrvDebugStop()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session;
        PrintWriter out;
        VirtualMachine virtualMachine;
        ThrdDebugEventQueue thrdDebugEventQueue;
        session = request.getSession();
        out = response.getWriter();
        virtualMachine = null;
        thrdDebugEventQueue = null;
        try
        {
            BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
            if(beanDebug != null)
            {
                virtualMachine = beanDebug.getVirtualMachine();
                thrdDebugEventQueue = beanDebug.getThrdDebugEventQueue();
                beanDebug.setCurrentEvent(null);
                beanDebug.setCurrentStep(null);
                beanDebug.setThrdDebugEventQueue(null);
                session.removeAttribute("beanDebug");
            }
            out.print("Stopped");
        }
        catch(Exception ex)
        {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            request.setAttribute("msgText", sw.toString());
            throw ex;
        }
        break MISSING_BLOCK_LABEL_160;
        Exception exception;
        exception;
        if(virtualMachine != null)
            virtualMachine.dispose();
        if(thrdDebugEventQueue != null)
            thrdDebugEventQueue.stopRunning();
        throw exception;
        if(virtualMachine != null)
            virtualMachine.dispose();
        if(thrdDebugEventQueue != null)
            thrdDebugEventQueue.stopRunning();
        return;
    }
}
