// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointWaiter.java

package workspace.service.debug;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.util.StringTokenizer;
import javax.naming.*;
import javax.servlet.http.*;
import workspace.bean.debug.BeanDebug;
import workspace.thread.debug.ThrdDebugEventQueue;

public class SrvDebugBreakpointWaiter extends SrvGenerique
{

    public SrvDebugBreakpointWaiter()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        Context ctx = new InitialContext();
        ThrdDebugEventQueue thread = (ThrdDebugEventQueue)getJNDIObject(ctx, "/workspace/debug/breakpoint", request.getSession().getId());
        if(thread != null && thread.getBeanDebug() != null)
            request.setAttribute("breakpoint", thread.getBeanDebug().getCurrentEvent());
    }

    protected Object getJNDIObject(Context ctx, String path, String name)
        throws NamingException
    {
        Object o = ctx.lookup(path);
        if(o instanceof Context)
        {
            ctx = (Context)o;
            o = ctx.lookup(name);
        } else
        {
            o = null;
        }
        return o;
    }

    protected Context createContext(Context ctx, String path)
        throws NamingException
    {
        Object o = null;
        String name = null;
        for(StringTokenizer st = new StringTokenizer(path, "/"); st.hasMoreTokens();)
        {
            name = st.nextToken();
            try
            {
                o = ctx.lookup(name);
                if(!(o instanceof Context))
                    break;
                ctx = (Context)o;
            }
            catch(NameNotFoundException ex)
            {
                ctx = ctx.createSubcontext(name);
            }
        }

        return ctx;
    }
}
