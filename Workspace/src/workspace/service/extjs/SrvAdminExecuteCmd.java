// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAdminExecuteCmd.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import workspace.util.UtilExtjs;

public class SrvAdminExecuteCmd extends workspace.service.SrvAdminExecuteCmd
{

    public SrvAdminExecuteCmd()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        super.execute(request, response, bean);
        String content = request.getParameter("resultCommandLine");
        UtilExtjs.splitAndSendJson(content, response);
    }
}
