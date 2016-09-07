// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugStart.java

package workspace.service.debug;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvDebugStart extends SrvGenerique
{

    public SrvDebugStart()
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
}
