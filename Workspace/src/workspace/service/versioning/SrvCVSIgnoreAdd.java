// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSIgnoreAdd.java

package workspace.service.versioning;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import java.io.*;
import java.util.Iterator;
import java.util.LinkedList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Referenced classes of package workspace.service.versioning:
//            SrvCVS

public class SrvCVSIgnoreAdd extends SrvCVS
{

    public SrvCVSIgnoreAdd()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        File file;
        File fileIgnore;
        LinkedList list;
        FileReader fr;
        BufferedReader br;
        String fileName = (String)bean.get("fileName");
        init(req, bean);
        if(!UtilString.isNotEmpty(fileName))
            break MISSING_BLOCK_LABEL_360;
        file = new File(new File(getLocalDirectory(), getRepository()), fileName);
        File fileParent = file.getParentFile();
        fileIgnore = new File(fileParent, ".cvsignore");
        list = new LinkedList();
        if(!fileIgnore.exists())
        {
            fileIgnore.createNewFile();
            break MISSING_BLOCK_LABEL_203;
        }
        fr = null;
        br = null;
        fr = new FileReader(fileIgnore);
        br = new BufferedReader(fr);
        for(String line = br.readLine(); line != null; line = br.readLine())
            list.add(line);

        break MISSING_BLOCK_LABEL_183;
        Exception exception;
        exception;
        if(br != null)
            br.close();
        if(fr != null)
            fr.close();
        throw exception;
        if(br != null)
            br.close();
        if(fr != null)
            fr.close();
        FileWriter fw;
        BufferedWriter bw;
        if(list.contains(file.getName()))
            break MISSING_BLOCK_LABEL_360;
        fw = null;
        bw = null;
        fw = new FileWriter(fileIgnore);
        bw = new BufferedWriter(fw);
        for(Iterator it = list.iterator(); it.hasNext(); bw.newLine())
            bw.write(it.next().toString());

        bw.write(file.getName());
        bw.newLine();
        break MISSING_BLOCK_LABEL_327;
        exception;
        if(bw != null)
            bw.close();
        if(fw != null)
            fw.close();
        throw exception;
        if(bw != null)
            bw.close();
        if(fw != null)
            fw.close();
        break MISSING_BLOCK_LABEL_360;
        Exception exception1;
        exception1;
        traceBuffer(req);
        throw exception1;
        traceBuffer(req);
        return;
    }
}
