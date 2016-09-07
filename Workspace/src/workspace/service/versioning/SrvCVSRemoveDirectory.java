// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSRemoveDirectory.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import java.io.File;
import java.util.ArrayList;
import java.util.Vector;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.remove.RemoveCommand;
import org.netbeans.lib.cvsclient.command.update.UpdateCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSRemoveDirectory extends SrvCVS
{

    public SrvCVSRemoveDirectory()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String fileName = (String)bean.get("fileName");
        String recursive = (String)bean.get("recursive");
        String autoupdate = (String)bean.get("autoupdate");
        String deletefirt = (String)bean.get("deletefirst");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
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
        Vector vFile = UtilFile.dirFile(file.getCanonicalPath(), isRecursive, null, false, true);
        ArrayList aFile = excludeCVSDirectory(vFile.iterator());
        File lFile[] = new File[aFile.size()];
        aFile.toArray(lFile);
        UtilFile.sortByPathDepth(lFile);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        command.setFiles(lFile);
        client.executeCommand(command, globalOptions);
        if(isAutoupdate)
        {
            UpdateCommand updateCommand = new UpdateCommand();
            updateCommand.setPruneDirectories(true);
            updateCommand.setBuilder(null);
            updateCommand.setFiles(lFile);
            client.executeCommand(updateCommand, globalOptions);
        }
        break MISSING_BLOCK_LABEL_333;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
