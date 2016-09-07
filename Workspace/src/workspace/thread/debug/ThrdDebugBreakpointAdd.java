// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ThrdDebugBreakpointAdd.java

package workspace.thread.debug;

import com.sun.jdi.*;
import com.sun.jdi.event.*;
import com.sun.jdi.request.BreakpointRequest;
import com.sun.jdi.request.EventRequestManager;
import framework.trace.Trace;
import java.io.PrintStream;
import java.io.Serializable;
import java.util.List;
import workspace.bean.debug.BeanDebug;

public class ThrdDebugBreakpointAdd extends Thread
    implements Serializable
{

    public ThrdDebugBreakpointAdd(BeanDebug beanDebug, String className, Integer rowNum)
    {
        setClassName(className);
        setRowNum(rowNum);
        setBeanDebug(beanDebug);
    }

    public void run()
    {
        VirtualMachine virtualMachine;
        virtualMachine = beanDebug.getVirtualMachine();
        if(virtualMachine == null)
            break MISSING_BLOCK_LABEL_306;
        EventRequestManager em = virtualMachine.eventRequestManager();
        List listClass = virtualMachine.classesByName(className);
        if(listClass != null && listClass.size() > 0)
        {
            ClassType ct = (ClassType)listClass.get(0);
            List listLocation = ct.locationsOfLine(rowNum.intValue());
            if(listLocation != null && listLocation.size() > 0)
            {
                Location loc = (Location)listLocation.get(0);
                BreakpointRequest brkR = em.createBreakpointRequest(loc);
                brkR.enable();
                boolean running = true;
                EventQueue eventQ = virtualMachine.eventQueue();
                while(running) 
                {
                    EventSet eventSet = null;
                    try
                    {
                        eventSet = eventQ.remove();
                    }
                    catch(Exception e)
                    {
                        Trace.ERROR(this, e);
                    }
                    for(EventIterator eventIterator = eventSet.eventIterator(); eventIterator.hasNext();)
                    {
                        com.sun.jdi.event.Event event = eventIterator.nextEvent();
                        if(event instanceof BreakpointEvent)
                        {
                            beanDebug.setCurrentEvent(event);
                            virtualMachine.resume();
                        }
                    }

                }
            }
        }
        break MISSING_BLOCK_LABEL_289;
        AbsentInformationException e;
        e;
        onException(e);
        try
        {
            virtualMachine.dispose();
        }
        catch(Exception ex)
        {
            onException(ex);
        }
        break MISSING_BLOCK_LABEL_306;
        e;
        onException(e);
        try
        {
            virtualMachine.dispose();
        }
        catch(Exception ex)
        {
            onException(ex);
        }
        break MISSING_BLOCK_LABEL_306;
        Exception exception;
        exception;
        try
        {
            virtualMachine.dispose();
        }
        catch(Exception ex)
        {
            onException(ex);
        }
        throw exception;
        try
        {
            virtualMachine.dispose();
        }
        catch(Exception ex)
        {
            onException(ex);
        }
    }

    protected void onException(Exception e)
    {
        if(errTrace != null)
            e.printStackTrace(errTrace);
        if(err != null)
            err.println(e.getMessage());
    }

    public String getClassName()
    {
        return className;
    }

    public void setClassName(String className)
    {
        this.className = className;
    }

    public PrintStream getOut()
    {
        return out;
    }

    public void setOut(PrintStream out)
    {
        this.out = out;
    }

    public Integer getRowNum()
    {
        return rowNum;
    }

    public void setRowNum(Integer rowNum)
    {
        this.rowNum = rowNum;
    }

    public PrintStream getErrTrace()
    {
        return errTrace;
    }

    public void setErrTrace(PrintStream errTrace)
    {
        this.errTrace = errTrace;
    }

    public PrintStream getErr()
    {
        return err;
    }

    public void setErr(PrintStream err)
    {
        this.err = err;
    }

    public BeanDebug getBeanDebug()
    {
        return beanDebug;
    }

    public void setBeanDebug(BeanDebug beanDebug)
    {
        this.beanDebug = beanDebug;
    }

    private BeanDebug beanDebug;
    private String className;
    private Integer rowNum;
    private transient PrintStream out;
    private transient PrintStream outTrace;
    private transient PrintStream err;
    private transient PrintStream errTrace;
}
