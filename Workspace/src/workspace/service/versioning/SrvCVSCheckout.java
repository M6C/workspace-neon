// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSCheckout.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.checkout.CheckoutCommand;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSCheckout extends SrvCVS
{

    public SrvCVSCheckout()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String recursive = (String)bean.get("recursive");
        boolean isRecursive = "true".equalsIgnoreCase(recursive);
        init(req, bean);
        Client client = newClient();
        CheckoutCommand command = new CheckoutCommand();
        command.setBuilder(null);
        command.setRecursive(isRecursive);
        command.setPruneDirectories(true);
        command.setModule(getRepository());
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        break MISSING_BLOCK_LABEL_135;
        Exception exception;
        exception;
        traceBuffer(req);
        throw exception;
        traceBuffer(req);
        return;
    }
}
