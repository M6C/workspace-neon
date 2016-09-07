// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSUpdDirectory.java

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
import org.netbeans.lib.cvsclient.command.update.UpdateCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSUpdDirectory extends SrvCVS
{

    public SrvCVSUpdDirectory()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String fileName = (String)bean.get("fileName");
        String recursive = (String)bean.get("recursive");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
        init(req, bean);
        Client client = newClient();
        UpdateCommand command = new UpdateCommand();
        command.setPruneDirectories(true);
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
        command.setFiles(lFile);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        break MISSING_BLOCK_LABEL_243;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
