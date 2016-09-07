// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSUpdate.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import java.io.File;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.update.UpdateCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSUpdate extends SrvCVS
{

    public SrvCVSUpdate()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String recursive = (String)bean.get("recursive");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
        init(req, bean);
        Client client = newClient();
        UpdateCommand command = new UpdateCommand();
        command.setBuilder(null);
        command.setFiles(new File[] {
            new File(getLocalDirectory(), getRepository())
        });
        command.setRecursive(isRecursive);
        command.setBuildDirectories(true);
        command.setPruneDirectories(true);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot(getRootDirectory());
        client.executeCommand(command, globalOptions);
        break MISSING_BLOCK_LABEL_134;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
