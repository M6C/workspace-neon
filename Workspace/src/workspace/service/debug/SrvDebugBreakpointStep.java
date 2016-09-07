// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointStep.java

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

public class SrvDebugBreakpointStep extends SrvGenerique
{

    public SrvDebugBreakpointStep()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session;
        String step;
        VirtualMachine virtualMachine;
        session = request.getSession();
        step = (String)bean.getParameterDataByName("step");
        virtualMachine = null;
        try
        {
            BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
            if(beanDebug != null)
            {
                Event currentEvent = beanDebug.getCurrentEvent();
                if(currentEvent != null && (currentEvent instanceof LocatableEvent))
                {
                    PrintWriter out = response.getWriter();
                    virtualMachine = beanDebug.getVirtualMachine();
                    LocatableEvent brkE = (LocatableEvent)currentEvent;
                    EventRequest brkR = brkE.request();
                    ThreadReference thread = brkE.thread();
                    if(thread == null)
                        throw new Exception("Invalid thread ID or the thread is dead");
                    if(thread.suspendCount() == 0)
                        throw new Exception("The specified thread is not suspended");
                    int lineNumber = brkE.location().lineNumber();
                    lineNumber++;
                    String application = URLEncoder.encode((String)brkR.getProperty("application"), "UTF-8");
                    String path = (String)brkR.getProperty("path");
                    String className = URLEncoder.encode((String)brkR.getProperty("className"), "UTF-8");
                    String sourceName = URLEncoder.encode(brkE.location().sourceName(), "UTF-8");
                    String fileName = URLEncoder.encode((String)brkR.getProperty("fileName"), "UTF-8");
                    if(fileName.equals(sourceName))
                    {
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
                        stepRequest.putProperty("application", application);
                        stepRequest.putProperty("path", path);
                        stepRequest.putProperty("className", className);
                        stepRequest.putProperty("fileName", fileName);
                        stepRequest.addCountFilter(1);
                        stepRequest.enable();
                        stepRequest.putProperty("line", new Integer(lineNumber));
                        beanDebug.setCurrentStep(stepRequest);
                        out.print((new StringBuilder(String.valueOf(application))).append(":").append(path).append(":").append(sourceName).append(":").append(lineNumber).toString());
                    } else
                    {
                        out.print("resume");
                    }
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
        break MISSING_BLOCK_LABEL_579;
        Exception exception;
        exception;
        if(virtualMachine != null)
            virtualMachine.resume();
        throw exception;
        if(virtualMachine != null)
            virtualMachine.resume();
        return;
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
