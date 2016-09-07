// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSCommitDirectory.java

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
import org.netbeans.lib.cvsclient.command.commit.CommitCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSCommitDirectory extends SrvCVS
{

    public SrvCVSCommitDirectory()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String messageStr = (String)bean.get("messageStr");
        String fileName = (String)bean.get("fileName");
        String recursive = (String)bean.get("recursive");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
        init(req, bean);
        Client client = newClient();
        CommitCommand command = new CommitCommand();
        command.setBuilder(null);
        File file = null;
        if(UtilString.isNotEmpty(fileName))
            file = new File(new File(getLocalDirectory(), getRepository()), fileName);
        else
            file = new File(getLocalDirectory(), getRepository());
        Vector vFile = UtilFile.dirFile(file.getCanonicalPath(), isRecursive, null, false, false);
        ArrayList aFile = excludeCVSDirectory(vFile.iterator());
        aFile = excludeFile(aFile.iterator());
        File lFile[] = new File[aFile.size()];
        aFile.toArray(lFile);
        UtilFile.sortByPathDepth(lFile);
        command.setFiles(lFile);
        command.setMessage(messageStr);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        break MISSING_BLOCK_LABEL_266;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
