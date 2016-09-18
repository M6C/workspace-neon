// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCompileProject.java

package workspace.service.extjs;

import java.io.ByteArrayOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import workspace.service.ant.SrvAntTargetExecute;
import workspace.util.UtilExtjs;

public class SrvCompileProject extends SrvAntTargetExecute// SrvAntCompileProject
{

    public SrvCompileProject()
    {
    }

    public void init()
    {
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, ByteArrayOutputStream streamLog) throws Exception {
        System.out.println(streamLog.toString());
        String content = streamLog.toString();
        UtilExtjs.splitAndSendJason(content, response);
    }
}
