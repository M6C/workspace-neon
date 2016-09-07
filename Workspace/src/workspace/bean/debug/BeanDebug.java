// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanDebug.java

package workspace.bean.debug;

import com.sun.jdi.*;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.EventRequestManager;
import com.sun.jdi.request.StepRequest;
import java.util.Hashtable;
import java.util.List;
import workspace.thread.debug.ThrdDebugEventQueue;

public class BeanDebug
{

    public BeanDebug()
    {
        tableBreakpoint = new Hashtable();
    }

    public BeanDebug(VirtualMachine pVirtualMachine)
    {
        tableBreakpoint = new Hashtable();
        virtualMachine = pVirtualMachine;
    }

    public EventRequestManager getEventRequestManager()
    {
        EventRequestManager ret = null;
        if(virtualMachine != null)
            ret = virtualMachine.eventRequestManager();
        return ret;
    }

    public List getBreakpointRequests()
    {
        List ret = null;
        EventRequestManager eventRequestManager = getEventRequestManager();
        if(eventRequestManager != null)
            ret = eventRequestManager.breakpointRequests();
        return ret;
    }

    public LocatableEvent getEvent()
    {
        LocatableEvent ret = null;
        Event currentEvent = getCurrentEvent();
        if(currentEvent != null && (currentEvent instanceof LocatableEvent))
            ret = (LocatableEvent)currentEvent;
        return ret;
    }

    public ThreadReference getThread()
    {
        ThreadReference ret = null;
        LocatableEvent event = getEvent();
        if(event != null)
            ret = event.thread();
        return ret;
    }

    public List getFrames()
        throws IncompatibleThreadStateException
    {
        List ret = null;
        ThreadReference thread = getThread();
        if(thread != null)
            ret = thread.frames();
        return ret;
    }

    public Integer getFrameCount()
        throws IncompatibleThreadStateException
    {
        Integer ret = null;
        ThreadReference thread = getThread();
        if(thread != null)
            ret = new Integer(thread.frameCount());
        return ret;
    }

    public StackFrame getFrame(String index)
        throws IncompatibleThreadStateException
    {
        return index != null ? getFrame(new Integer(index)) : null;
    }

    public StackFrame getFrame(Integer index)
        throws IncompatibleThreadStateException
    {
        StackFrame ret = null;
        ThreadReference thread = getThread();
        if(thread != null)
            ret = thread.frame(index.intValue());
        return ret;
    }

    public Hashtable getTableBreakpoint()
    {
        return tableBreakpoint;
    }

    public void setTableBreakpoint(Hashtable tableBreakpoint)
    {
        this.tableBreakpoint = tableBreakpoint;
    }

    public VirtualMachine getVirtualMachine()
    {
        return virtualMachine;
    }

    public void setVirtualMachine(VirtualMachine virtualMachine)
    {
        this.virtualMachine = virtualMachine;
    }

    public ThrdDebugEventQueue getThrdDebugEventQueue()
    {
        return thrdDebugEventQueue;
    }

    public void setThrdDebugEventQueue(ThrdDebugEventQueue thrdDebugEventQueue)
    {
        this.thrdDebugEventQueue = thrdDebugEventQueue;
    }

    public Event getCurrentEvent()
    {
        return currentEvent;
    }

    public void setCurrentEvent(Event currentEvent)
    {
        this.currentEvent = currentEvent;
    }

    public StepRequest getCurrentStep()
    {
        return currentStep;
    }

    public void setCurrentStep(StepRequest currentStep)
    {
        this.currentStep = currentStep;
    }

    private VirtualMachine virtualMachine;
    private Event currentEvent;
    private StepRequest currentStep;
    private Hashtable tableBreakpoint;
    private ThrdDebugEventQueue thrdDebugEventQueue;
}
