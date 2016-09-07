// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVS.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilEncoder;
import framework.service.SrvGenerique;
import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import javax.naming.NoInitialContextException;
import javax.servlet.http.HttpServletRequest;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.CommandAbortedException;
import org.netbeans.lib.cvsclient.connection.AuthenticationException;
import org.netbeans.lib.cvsclient.connection.PServerConnection;
import workspace.bean.versioning.BeanCVS;

public class SrvCVS extends SrvGenerique
{

    public SrvCVS()
    {
        beanCVS = null;
        traceBuffer = new StringBuffer();
    }

    protected void init(HttpServletRequest request, BeanGenerique bean)
        throws IOException, IllegalArgumentException, NoInitialContextException
    {
        beanCVS = new BeanCVS(request, bean);
    }

    protected ArrayList excludeCVSDirectory(Iterator vFile)
    {
        return beanCVS.excludeCVSDirectory(vFile);
    }

    protected ArrayList excludeFile(Iterator vFile)
    {
        return beanCVS.excludeFile(vFile);
    }

    protected void traceBuffer(HttpServletRequest request)
    {
        try
        {
            request.setAttribute("jcvsErrorMessage", UtilEncoder.encodeHTML(traceBuffer.toString()));
        }
        catch(Exception ex)
        {
            traceException(request, ex);
        }
    }

    protected void traceBuffer(HttpServletRequest request, String trace)
    {
        try
        {
            request.setAttribute("jcvsErrorMessage", UtilEncoder.encodeHTML(trace));
        }
        catch(Exception ex)
        {
            traceException(request, ex);
        }
    }

    protected void traceException(HttpServletRequest request, Exception ex)
    {
        try
        {
            traceExceptionInBuffer(request, ex);
            request.setAttribute("jcvsErrorMessage", (new StringBuilder("ERROR:")).append(UtilEncoder.encodeHTML(traceBuffer.toString())).toString());
        }
        catch(Exception exception) { }
    }

    protected void traceExceptionInBuffer(HttpServletRequest request, Exception ex)
    {
        try
        {
            StringWriter strW = new StringWriter();
            ex.printStackTrace(new PrintWriter(strW));
            traceBuffer.append("\r\n").append("ERROR:").append(strW.toString()).append("\r\n");
        }
        catch(Exception exception) { }
    }

    protected void traceException(File file, Exception ex)
    {
        try
        {
            StringWriter strW = new StringWriter();
            FileWriter fileW = new FileWriter(file);
            ex.printStackTrace(new PrintWriter(strW));
            fileW.write(strW.toString());
            fileW.flush();
            fileW.close();
        }
        catch(Exception exception) { }
    }

    protected PServerConnection newPServerConnection()
        throws CommandAbortedException, AuthenticationException
    {
        return beanCVS.newPServerConnection();
    }

    protected Client newClient()
        throws AuthenticationException, CommandAbortedException
    {
        return beanCVS.newClient();
    }

    protected Client newClient(PServerConnection c)
    {
        return beanCVS.newClient(c);
    }

    public String getApplication()
    {
        return beanCVS.getApplication();
    }

    public String getEncodedPassword()
    {
        return beanCVS.getEncodedPassword();
    }

    public String getPort()
    {
        return beanCVS.getPort();
    }

    public String getRepository()
    {
        return beanCVS.getRepository();
    }

    public StringBuffer getTraceBuffer()
    {
        return beanCVS.getTraceBuffer();
    }

    public String getHostname()
    {
        return beanCVS.getHostname();
    }

    public String getLocalDirectory()
    {
        return beanCVS.getLocalDirectory();
    }

    public String getRootDirectory()
    {
        return beanCVS.getRootDirectory();
    }

    public File getFilePathMain()
    {
        return beanCVS.getFilePathMain();
    }

    public String getUserName()
    {
        return beanCVS.getUserName();
    }

    public String getPassword()
    {
        return beanCVS.getPassword();
    }

    protected BeanCVS beanCVS;
    protected StringBuffer traceBuffer;
}
