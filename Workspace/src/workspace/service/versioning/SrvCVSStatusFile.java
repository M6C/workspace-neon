// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSStatusFile.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import workspace.bean.versioning.BeanCVS;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSStatusFile extends SrvCVS
{

    public SrvCVSStatusFile()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        init(req, bean);
        String fileName = (String)bean.get("fileName");
        beanCVS.executeStatusInformation(fileName);
        break MISSING_BLOCK_LABEL_50;
        Exception exception;
        exception;
        traceBuffer(req, beanCVS.getTraceBuffer().toString());
        throw exception;
        traceBuffer(req, beanCVS.getTraceBuffer().toString());
        return;
    }
}
