// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditLoadFile.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.File;
import java.io.OutputStream;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvEditLoadFile extends SrvGenerique
{

    public SrvEditLoadFile()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String filename;
        String filenameFormated;
        String jsonData;
        filename = (String)bean.getParameterDataByName("filename");
        filenameFormated = null;
        jsonData = null;
        try
        {
            if(UtilString.isNotEmpty(filename))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                filenameFormated = UtilPath.formatPath(dom, filename);
                if(UtilString.isNotEmpty(filenameFormated))
                {
                    File file = new File(filenameFormated);
                    if(file != null && file.exists() && file.isFile())
                    {
                        String content = UtilFile.read(file);
                        if(UtilString.isNotEmpty(content))
                        {
                            String lines[] = content.split(content.indexOf('\r')>=0 ? "\r\n" : "\n");
                            String line = null;
                            int nb = lines.length;
                            for(int i = 0; i < nb; i++)
                            {
                                line = simpleFormat(lines[i]);
                                Trace.DEBUG((new StringBuilder("SrvEditLoadFile execute lines[")).append(i).append("]:").append(line).toString());
                                if(jsonData == null)
                                    jsonData = (new StringBuilder("{results:")).append(nb).append(",data:[").toString();
                                else
                                    jsonData = (new StringBuilder(String.valueOf(jsonData))).append(",").toString();
                                jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{'text':'").append(line).append("',").append("'id':'").append(i).append("'").append("}").toString();
                            }

                        }
                    }
                }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        if(jsonData != null)
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]}").toString();
        else
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{results:0,data:[]}").toString();
        Trace.DEBUG(this, (new StringBuilder("SrvEditLoadFile execute filename:")).append(filename).append(" filenameFormated:").append(filenameFormated).toString());
        Trace.DEBUG(this, (new StringBuilder("SrvEditLoadFile execute jsonData:")).append(jsonData).toString());
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
    }

    private String simpleFormat(String text)
    {
        text = text.replaceAll("\\\\", "\\\\\\\\");
        text = text.replaceAll("'", "\\\\'");
        return text;
    }
}
