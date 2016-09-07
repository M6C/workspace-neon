// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditSaveFile.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvEditSaveFile extends SrvGenerique
{

    public SrvEditSaveFile()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String content;
        String filename;
        String navIndex;
        String navNbRow;
        String filenameFormated;
        content = (String)bean.getParameterDataByName("content");
        filename = (String)bean.getParameterDataByName("filename");
        navIndex = (String)bean.getParameterDataByName("navIndex");
        navNbRow = (String)bean.getParameterDataByName("navNbRow");
        filenameFormated = null;
        try
        {
            if(UtilString.isNotEmpty(content) && UtilString.isNotEmpty(filename))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                filenameFormated = UtilPath.formatPath(dom, filename);
                if(UtilString.isNotEmpty(filenameFormated))
                {
                    File outputFile = new File(filenameFormated);
                    if(outputFile.exists() && outputFile.isFile())
                    {
                        if(UtilString.isNotEmpty(navIndex) && UtilString.isNotEmpty(navNbRow))
                            content = replaceText(read(outputFile), content, Integer.parseInt(navIndex), Integer.parseInt(navNbRow));
                        content = content.replaceAll("\n", "\r\n");
                        write(outputFile, content);
                    }
                } else
                {
                    Trace.DEBUG(this, "path is Empty");
                }
            } else
            {
                Trace.DEBUG(this, "content is Empty and filename is Empty");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("filename:")).append(filename).append(" filenameFormated:").append(filenameFormated).append(" navIndex:").append(navIndex).append(" navNbRow:").append(navNbRow).toString());
    }

    private String read(File file)
        throws IOException
    {
        Trace.DEBUG(this, (new StringBuilder("read file '")).append(file.getPath()).append("'").toString());
        StringBuffer ret = new StringBuffer();
        FileReader fr = new FileReader(file);
        int ch = -1;
        int iNbLine = 0;
        while((ch = fr.read()) != -1) 
        {
            if(ch == 13)
                iNbLine++;
            ret.append((char)ch);
        }
        return ret.toString();
    }

    private void write(File file, String content)
        throws IOException
    {
        Trace.DEBUG(this, (new StringBuilder("write file '")).append(file.getPath()).append("'").toString());
        if(file.canWrite())
        {
            FileWriter out = new FileWriter(file);
            out.write(content.replace('\240', ' '));
            out.close();
        } else
        {
            Trace.ERROR(this, (new StringBuilder("file '")).append(file.getPath()).append("' can not be writable.").toString());
        }
    }

    private String replaceText(String content, String text, int startIndex, int nbRow)
        throws IOException
    {
        StringBuffer ret;
        BufferedReader in;
        Trace.DEBUG(this, (new StringBuilder("replaceText content:")).append(content).append(" text:").append(text).append(" startIndex:").append(startIndex).append(" nbRow:").append(nbRow).toString());
        ret = new StringBuffer();
        StringReader sr = new StringReader(content);
        in = new BufferedReader(sr);
        if(!in.ready())
            throw new IOException();
        try
        {
            String line;
            for(int i = 1; i < startIndex && (line = in.readLine()) != null; i++)
                ret.append(line).append("\r\n");

            ret.append(text).append("\r\n");
            for(int i = 1; i <= nbRow && (line = in.readLine()) != null; i++);
            while((line = in.readLine()) != null) 
                ret.append(line).append("\r\n");
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        in.close();
        return ret.toString();
    }
}
