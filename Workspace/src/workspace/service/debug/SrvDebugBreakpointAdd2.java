// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointAdd2.java

package workspace.service.debug;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.PrintStream;
import java.io.Serializable;
import java.util.StringTokenizer;
import javax.jms.*;
import javax.naming.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvDebugBreakpointAdd2 extends SrvGenerique
{

    public SrvDebugBreakpointAdd2()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        throw new Error("Unresolved compilation problem: \n\tThe method createVirtualMachine(String, Integer) from the type UtilJDI refers to the missing type VirtualMachine\n");
    }

    protected void addToJNDI(Context ctx, String path, String name, Serializable object)
        throws NamingException
    {
        ctx = createContext(ctx, path);
        try
        {
            ctx.bind(name, object);
        }
        catch(NameAlreadyBoundException ex)
        {
            ctx.rebind(name, object);
        }
    }

    protected void addToQueue(Context ctx, String path, String name, Serializable object)
        throws NamingException, JMSException
    {
        QueueConnection queueCon = null;
        QueueConnectionFactory qcf = (QueueConnectionFactory)ctx.lookup("ConnectionFactory");
        queueCon = qcf.createQueueConnection();
        QueueSession queueSession = queueCon.createQueueSession(false, 1);
        Queue queue = null;
        ctx = createContext(ctx, path);
        queue = queueSession.createQueue(name);
        if(queue != null)
        {
            QueueSender sender = queueSession.createSender(queue);
            javax.jms.Message msg = queueSession.createObjectMessage(object);
            sender.send(msg);
            System.out.println("sent the message");
        }
        break MISSING_BLOCK_LABEL_120;
        Exception exception;
        exception;
        if(queueCon != null)
            queueCon.close();
        throw exception;
        if(queueCon != null)
            queueCon.close();
        return;
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
