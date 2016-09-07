// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCVSIgnoreDel.java

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

public class SrvCVSIgnoreDel extends SrvCVS
{

    public SrvCVSIgnoreDel()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        String fileName;
        File fileIgnore;
        LinkedList list;
        FileReader fr;
        BufferedReader br;
        fileName = (String)bean.get("fileName");
        init(req, bean);
        if(!UtilString.isNotEmpty(fileName))
            break MISSING_BLOCK_LABEL_363;
        File file = new File(new File(getLocalDirectory(), getRepository()), fileName);
        File fileParent = file.getParentFile();
        fileIgnore = new File(fileParent, ".cvsignore");
        list = new LinkedList();
        fileName = file.getName();
        if(!fileIgnore.exists())
            break MISSING_BLOCK_LABEL_363;
        fr = null;
        br = null;
        fr = new FileReader(fileIgnore);
        br = new BufferedReader(fr);
        for(String line = br.readLine(); line != null; line = br.readLine())
            if(!fileName.equals(line))
                list.add(line);

        break MISSING_BLOCK_LABEL_191;
        Exception exception;
        exception;
        if(br != null)
            br.close();
        if(fr != null)
            fr.close();
        throw exception;
        FileWriter fw;
        BufferedWriter bw;
        if(br != null)
            br.close();
        if(fr != null)
            fr.close();
        if(list.isEmpty())
            break MISSING_BLOCK_LABEL_344;
        fileIgnore.createNewFile();
        fw = null;
        bw = null;
        fw = new FileWriter(fileIgnore);
        bw = new BufferedWriter(fw);
        for(Iterator it = list.iterator(); it.hasNext(); bw.newLine())
            bw.write(it.next().toString());

        break MISSING_BLOCK_LABEL_321;
        Exception exception1;
        exception1;
        if(bw != null)
            bw.close();
        if(fw != null)
            fw.close();
        throw exception1;
        if(bw != null)
            bw.close();
        if(fw != null)
            fw.close();
        break MISSING_BLOCK_LABEL_363;
        fileIgnore.delete();
        break MISSING_BLOCK_LABEL_363;
        Exception exception2;
        exception2;
        traceBuffer(req);
        throw exception2;
        traceBuffer(req);
        return;
    }
}
