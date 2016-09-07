// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSImport.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import java.io.File;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.importcmd.ImportCommand;
import org.netbeans.lib.cvsclient.command.update.UpdateCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSImport extends SrvCVS
{

    public SrvCVSImport()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String vendorTag = (String)bean.get("vendorTag");
        String releaseTag = (String)bean.get("releaseTag");
        String messageStr = (String)bean.get("messageStr");
        String autoupdate = (String)bean.get("autoupdate");
        boolean isAutoupdate = "true".equalsIgnoreCase(autoupdate);
        init(req, bean);
        Client client = newClient();
        client.setLocalPath((new File(getLocalDirectory(), getRepository())).getCanonicalPath());
        ImportCommand command = new ImportCommand();
        command.setBuilder(null);
        command.setLogMessage(messageStr);
        command.setModule(getRepository());
        command.setReleaseTag(releaseTag);
        command.setVendorTag(vendorTag);
        GlobalOptions globalOptions = new GlobalOptions();
        client.executeCommand(command, globalOptions);
        if(isAutoupdate)
        {
            UpdateCommand updateCommand = new UpdateCommand();
            updateCommand.setBuilder(null);
            updateCommand.setFiles(new File[] {
                new File(getLocalDirectory(), getRepository())
            });
            updateCommand.setRecursive(true);
            updateCommand.setBuildDirectories(true);
            updateCommand.setPruneDirectories(true);
            globalOptions.setCVSRoot(getRootDirectory());
            client.setLocalPath(getLocalDirectory());
            client.executeCommand(updateCommand, globalOptions);
        }
        break MISSING_BLOCK_LABEL_258;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
