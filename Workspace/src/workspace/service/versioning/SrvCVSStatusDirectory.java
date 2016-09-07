// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSStatusDirectory.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import workspace.bean.versioning.BeanCVS;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSStatusDirectory extends SrvCVS
{

    public SrvCVSStatusDirectory()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        init(req, bean);
        String messageStr = (String)bean.get("messageStr");
        String fileName = (String)bean.get("fileName");
        String recursive = (String)bean.get("recursive");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
        beanCVS.executeStatusInformation(fileName, isRecursive);
        break MISSING_BLOCK_LABEL_83;
        Exception exception;
        exception;
        traceBuffer(req, beanCVS.getTraceBuffer().toString());
        throw exception;
        traceBuffer(req, beanCVS.getTraceBuffer().toString());
        return;
    }
}
