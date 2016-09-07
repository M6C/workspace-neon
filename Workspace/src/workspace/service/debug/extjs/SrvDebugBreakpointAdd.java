// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvDebugBreakpointAdd.java

package workspace.service.debug.extjs;

import framework.beandata.BeanGenerique;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvDebugBreakpointAdd extends workspace.service.debug.SrvDebugBreakpointAdd
{

    public SrvDebugBreakpointAdd()
    {
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String result, boolean success)
        throws Exception
    {
        String jsonData = null;
        try
        {
            int idx1 = result.indexOf(":");
            if(idx1 > 0)
            {
                int idx2 = result.indexOf(":", idx1 + 1);
                String szClassName = result.substring(0, idx1);
                String szResponse = result.substring(idx1 + 1, idx2);
                String szText = result.substring(idx2 + 1);
                jsonData = (new StringBuilder("{status:'")).append(success ? "success" : "failure").append("',data:[{").append("classname:'").append(szClassName).append("',").append("response:'").append(szResponse).append("',").append("text:'").append(szText).append("'").append("}]}").toString();
            }
        }
        catch(Exception ex)
        {
            String szText = (String)request.getAttribute("msgText");
            jsonData = (new StringBuilder("{status:'failure',data:[{classname:'',response:'")).append(szText).append("',").append("text:'").append(szText).append("'").append("}]}").toString();
            throw ex;
        }
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
        return;
    }
}
