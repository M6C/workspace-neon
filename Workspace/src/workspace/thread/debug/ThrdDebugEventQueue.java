// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ThrdDebugEventQueue.java

package workspace.thread.debug;

import com.sun.jdi.VMDisconnectedException;
import com.sun.jdi.event.*;
import framework.trace.Trace;
import java.io.PrintStream;
import java.io.Serializable;
import workspace.bean.debug.BeanDebug;

public class ThrdDebugEventQueue extends Thread
    implements Serializable
{

    public ThrdDebugEventQueue(BeanDebug beanDebug, EventQueue eventQ)
    {
        running = true;
        setBeanDebug(beanDebug);
        setEventQ(eventQ);
    }

    public void run()
    {
        if(eventQ != null)
            try
            {
                while(running) 
                {
                    EventSet eventSet = null;
                    try
                    {
                        eventSet = eventQ.remove();
                        for(EventIterator eventIterator = eventSet.eventIterator(); eventIterator.hasNext();)
                        {
                            com.sun.jdi.event.Event event = eventIterator.nextEvent();
                            if(event instanceof LocatableEvent)
                            {
                                beanDebug.setCurrentEvent(event);
                                break;
                            }
                        }

                        continue;
                    }
                    catch(VMDisconnectedException e)
                    {
                        Trace.ERROR(this, e);
                        running = false;
                        break;
                    }
                    catch(Exception e)
                    {
                        Trace.ERROR(this, e);
                    }
                }
            }
            catch(Exception e)
            {
                onException(e);
            }
    }

    public void stopRunning()
    {
        running = false;
    }

    protected void onException(Exception e)
    {
        if(errTrace != null)
            e.printStackTrace(errTrace);
        if(err != null)
            err.println(e.getMessage());
    }

    public EventQueue getEventQ()
    {
        return eventQ;
    }

    public void setEventQ(EventQueue eventQ)
    {
        this.eventQ = eventQ;
    }

    public BeanDebug getBeanDebug()
    {
        return beanDebug;
    }

    public void setBeanDebug(BeanDebug beanDebug)
    {
        this.beanDebug = beanDebug;
    }

    public PrintStream getErr()
    {
        return err;
    }

    public void setErr(PrintStream err)
    {
        this.err = err;
    }

    public PrintStream getErrTrace()
    {
        return errTrace;
    }

    public void setErrTrace(PrintStream errTrace)
    {
        this.errTrace = errTrace;
    }

    public PrintStream getOut()
    {
        return out;
    }

    public void setOut(PrintStream out)
    {
        this.out = out;
    }

    public PrintStream getOutTrace()
    {
        return outTrace;
    }

    public void setOutTrace(PrintStream outTrace)
    {
        this.outTrace = outTrace;
    }

    private BeanDebug beanDebug;
    private EventQueue eventQ;
    private transient PrintStream out;
    private transient PrintStream outTrace;
    private transient PrintStream err;
    private transient PrintStream errTrace;
    private boolean running;
}
