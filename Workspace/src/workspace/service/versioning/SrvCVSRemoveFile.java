// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSRemoveFile.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import java.io.File;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.commit.CommitCommand;
import org.netbeans.lib.cvsclient.command.remove.RemoveCommand;
import org.netbeans.lib.cvsclient.command.update.UpdateCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSRemoveFile extends SrvCVS
{

    public SrvCVSRemoveFile()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String fileName = (String)bean.get("fileName");
        String autocommit = (String)bean.get("autocommit");
        String autoupdate = (String)bean.get("autoupdate");
        String deletefirt = (String)bean.get("deletefirst");
        boolean isAutocommit = "true".equalsIgnoreCase(autocommit);
        boolean isAutoupdate = "true".equalsIgnoreCase(autoupdate);
        boolean isDeletefirt = "true".equalsIgnoreCase(deletefirt);
        init(req, bean);
        Client client = newClient();
        RemoveCommand command = new RemoveCommand();
        command.setDeleteBeforeRemove(isDeletefirt);
        command.setIgnoreLocallyExistingFiles(true);
        command.setBuilder(null);
        File file = null;
        if(UtilString.isNotEmpty(fileName))
            file = new File(new File(getLocalDirectory(), getRepository()), fileName);
        else
            file = new File(getLocalDirectory(), getRepository());
        File lFile[] = {
            file
        };
        command.setFiles(lFile);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        if(isAutocommit)
        {
            CommitCommand commandCommit = new CommitCommand();
            commandCommit.setBuilder(null);
            commandCommit.setFiles(lFile);
            client.executeCommand(commandCommit, globalOptions);
        }
        if(isAutoupdate)
        {
            UpdateCommand updateCommand = new UpdateCommand();
            updateCommand.setBuilder(null);
            updateCommand.setFiles(lFile);
            client.executeCommand(updateCommand, globalOptions);
        }
        break MISSING_BLOCK_LABEL_326;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
