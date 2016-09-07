// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointResume.java

package workspace.service.debug;

import com.sun.jdi.ThreadReference;
import com.sun.jdi.VirtualMachine;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.StepRequest;
import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.*;
import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointResume extends SrvGenerique
{

    public SrvDebugBreakpointResume()
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
                Event currentEvent = beanDebug.getCurrentEvent();
                if(currentEvent != null && (currentEvent instanceof LocatableEvent))
                {
                    VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
                    LocatableEvent brkE = (LocatableEvent)currentEvent;
                    StepRequest currentStep = beanDebug.getCurrentStep();
                    if(currentStep != null)
                        currentStep.thread().resume();
                    brkE.thread().resume();
                    virtualMachine.resume();
                    beanDebug.setCurrentEvent(null);
                    beanDebug.setCurrentStep(null);
                    beanDebug.setThrdDebugEventQueue(null);
                    PrintWriter out = response.getWriter();
                    out.print("resume");
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
