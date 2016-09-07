// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointStep2.java

package workspace.service.debug;

import com.sun.jdi.*;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.*;
import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.*;
import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointStep2 extends SrvGenerique
{

    public SrvDebugBreakpointStep2()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        String step = (String)bean.getParameterDataByName("step");
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
                    EventRequest brkR = brkE.request();
                    StepRequest currentStep = null;
                    int lineNumber = brkE.location().lineNumber();
                    ThreadReference thread = null;
                    if(currentStep == null)
                    {
                        thread = brkE.thread();
                        lineNumber = brkE.location().lineNumber();
                    } else
                    {
                        thread = currentStep.thread();
                        currentStep.disable();
                        lineNumber = ((Integer)currentStep.getProperty("line")).intValue() + 1;
                    }
                    if(thread == null)
                        throw new Exception("Invalid thread ID or the thread is dead");
                    if(thread.suspendCount() == 0)
                        throw new Exception("The specified thread is not suspended");
                    EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
                    clearPreviousStep(eventRequestManager, thread);
                    int depth = 1;
                    boolean into_all = false;
                    if(UtilString.isEqualsIgnoreCase(step, "OVER"))
                        depth = 2;
                    else
                    if(UtilString.isEqualsIgnoreCase(step, "OUT"))
                        depth = 3;
                    else
                    if(UtilString.isEqualsIgnoreCase(step, "INTO-ALL"))
                        into_all = true;
                    StepRequest stepRequest = eventRequestManager.createStepRequest(thread, -2, depth);
                    if(depth == 1 && !into_all)
                    {
                        stepRequest.addClassExclusionFilter("java.*");
                        stepRequest.addClassExclusionFilter("javax.*");
                        stepRequest.addClassExclusionFilter("sun.*");
                    }
                    stepRequest.addCountFilter(1);
                    stepRequest.enable();
                    stepRequest.putProperty("line", new Integer(lineNumber));
                    beanDebug.setCurrentStep(stepRequest);
                    virtualMachine.resume();
                    String application = URLEncoder.encode((String)brkR.getProperty("application"), "UTF-8");
                    String path = URLEncoder.encode((String)brkR.getProperty("path"), "UTF-8");
                    String sourceName = URLEncoder.encode(brkE.location().sourceName(), "UTF-8");
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

    private void clearPreviousStep(EventRequestManager eventRequestManager, ThreadReference thread)
    {
        List requests = eventRequestManager.stepRequests();
        for(Iterator iter = requests.iterator(); iter.hasNext();)
        {
            StepRequest request = (StepRequest)iter.next();
            ThreadReference requestThread = request.thread();
            if(requestThread.equals(thread))
            {
                eventRequestManager.deleteEventRequest(request);
                break;
            }
        }

    }
}
