// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSCommit.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.commit.CommitCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSCommit extends SrvCVS
{

    public SrvCVSCommit()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String messageStr = (String)bean.get("messageStr");
        String recursive = (String)bean.get("recursive");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
        init(req, bean);
        Client client = newClient();
        CommitCommand command = new CommitCommand();
        command.setBuilder(null);
        command.setRecursive(isRecursive);
        command.setMessage(messageStr);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        break MISSING_BLOCK_LABEL_138;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
