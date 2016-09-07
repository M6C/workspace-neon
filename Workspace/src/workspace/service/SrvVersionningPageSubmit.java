// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvVersionningPageSubmit.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.trace.Trace;
import java.io.File;
import java.io.PrintStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.add.AddCommand;
import org.netbeans.lib.cvsclient.command.commit.CommitCommand;
import org.netbeans.lib.cvsclient.command.remove.RemoveCommand;
import org.netbeans.lib.cvsclient.command.update.UpdateCommand;
import workspace.service.versioning.SrvCVS;

public class SrvVersionningPageSubmit extends SrvCVS
{

    public SrvVersionningPageSubmit()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String application;
        String pathToExpand;
        String messageStr;
        ArrayList listFileName;
        ArrayList listVerAction;
        application = (String)bean.getParameterDataByName("application");
        pathToExpand = (String)bean.getParameterDataByName("pathToExpand");
        messageStr = (String)bean.getParameterDataByName("messageStr");
        listFileName = (ArrayList)bean.getParameterDataByName("fileName");
        listVerAction = (ArrayList)bean.getParameterDataByName("verAction");
        init(req, bean);
        req.setAttribute("path", getFilePathMain().toURI().getPath());
        try
        {
            if(UtilString.isNotEmpty(application) && UtilVector.safeNotEmpty(listFileName) && UtilVector.safeNotEmpty(listVerAction))
            {
                ArrayList listAdd = new ArrayList();
                ArrayList listRemove = new ArrayList();
                ArrayList listUpdate = new ArrayList();
                ArrayList listCommit = new ArrayList();
                String action = null;
                for(int i = 0; i < listVerAction.size(); i++)
                {
                    action = (String)listVerAction.get(i);
                    if(UtilString.isEqualsIgnoreCase(action, "Add"))
                        listAdd.add(listFileName.get(i));
                    else
                    if(UtilString.isEqualsIgnoreCase(action, "Remove"))
                        listRemove.add(listFileName.get(i));
                    else
                    if(UtilString.isEqualsIgnoreCase(action, "Update"))
                        listUpdate.add(listFileName.get(i));
                    else
                    if(UtilString.isEqualsIgnoreCase(action, "Commit"))
                        listCommit.add(listFileName.get(i));
                }

                listAdd.trimToSize();
                listRemove.trimToSize();
                listUpdate.trimToSize();
                Client client = newClient();
                GlobalOptions globalOptions = new GlobalOptions();
                globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
                File root = UtilString.isEmpty(pathToExpand) ? getFilePathMain() : new File(getFilePathMain(), pathToExpand);
                if(UtilVector.safeSize(listAdd) > 0)
                {
                    boolean executeCommand = false;
                    if(UtilString.isNotEmpty(pathToExpand))
                    {
                        File dirCvsEntries = new File(root, "/CVS/Entries");
                        if(dirCvsEntries.exists() && dirCvsEntries.isFile())
                        {
                            executeCommand = true;
                        } else
                        {
                            File parentCvsEntries = new File(root.getParentFile(), "/CVS/Entries");
                            if(parentCvsEntries.exists() && parentCvsEntries.isFile())
                            {
                                listAdd.add(0, root.getName());
                                executeCommand = true;
                            } else
                            {
                                getTraceBuffer().append("Can't add '").append(pathToExpand).append("' files because :");
                                getTraceBuffer().append("No '/CVS/Entries' file found\r\n");
                            }
                        }
                    }
                    if(executeCommand)
                    {
                        File lFile[] = toFileArray(listAdd, root);
                        AddCommand command = new AddCommand();
                        command.setBuilder(null);
                        command.setFiles(lFile);
                        command.setMessage(messageStr);
                        client.executeCommand(command, globalOptions);
                        listCommit.addAll(listAdd);
                    }
                }
                if(UtilVector.safeSize(listRemove) > 0)
                {
                    File lFile[] = toFileArray(listRemove, root);
                    RemoveCommand command = new RemoveCommand();
                    command.setBuilder(null);
                    command.setFiles(lFile);
                    client.executeCommand(command, globalOptions);
                    listCommit.addAll(listRemove);
                }
                if(UtilVector.safeSize(listUpdate) > 0)
                {
                    File lFile[] = toFileArray(listUpdate, root);
                    UpdateCommand command = new UpdateCommand();
                    command.setBuilder(null);
                    command.setFiles(lFile);
                    client.executeCommand(command, globalOptions);
                    listCommit.addAll(listUpdate);
                }
                if(UtilVector.safeSize(listCommit) > 0)
                {
                    File lFile[] = toFileArray(listCommit, root);
                    CommitCommand command = new CommitCommand();
                    command.setBuilder(null);
                    command.setFiles(lFile);
                    client.executeCommand(command, globalOptions);
                }
            }
            break MISSING_BLOCK_LABEL_798;
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        System.out.println((new StringBuilder("traceBuffer:")).append(getTraceBuffer()).toString());
        break MISSING_BLOCK_LABEL_823;
        Exception exception;
        exception;
        System.out.println((new StringBuilder("traceBuffer:")).append(getTraceBuffer()).toString());
        throw exception;
        System.out.println((new StringBuilder("traceBuffer:")).append(getTraceBuffer()).toString());
    }

    protected File[] toFileArray(List list, File root)
    {
        File ret[] = (File[])null;
        if(list != null)
        {
            int size = list.size();
            ret = new File[size];
            for(int i = 0; i < size;)
                ret[i] = new File(root, (String)list.get(i++));

        }
        return ret;
    }
}
