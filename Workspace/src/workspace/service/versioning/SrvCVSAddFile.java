// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSAddFile.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import java.io.File;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.add.AddCommand;
import org.netbeans.lib.cvsclient.command.commit.CommitCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSAddFile extends SrvCVS
{

    public SrvCVSAddFile()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String messageStr = (String)bean.get("messageStr");
        String fileName = (String)bean.get("fileName");
        String autocommit = (String)bean.get("autocommit");
        boolean isAutocommit = "true".equalsIgnoreCase(autocommit);
        init(req, bean);
        Client client = newClient();
        AddCommand command = new AddCommand();
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
        command.setMessage(messageStr);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        if(isAutocommit)
        {
            CommitCommand commandCommit = new CommitCommand();
            commandCommit.setBuilder(null);
            commandCommit.setFiles(lFile);
            commandCommit.setMessage(messageStr);
            client.executeCommand(commandCommit, globalOptions);
        }
        break MISSING_BLOCK_LABEL_261;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
