// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvUpload.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.*;
import java.util.*;
import javax.servlet.ServletInputStream;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.bean.BeanUploadData;
import workspace.util.UtilPath;

public class SrvUpload extends SrvGenerique
{

    public SrvUpload()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        long start;
        PrintWriter out;
        String boundaryString;
        ServletInputStream in;
        byte buffer[];
        HashMap map;
        int result;
        start = System.currentTimeMillis();
        String fileLocation = null;
        int contentLength = request.getContentLength();
        String contentType = request.getContentType();
        response.setContentType("text/html;charset=UTF8");
        out = response.getWriter();
        if(contentType == null)
        {
            System.out.println("content type is null");
            return;
        }
        int ind = contentType.indexOf("boundary=");
        if(ind == -1)
        {
            System.out.println("IND is less than 0");
            return;
        }
        String boundary = contentType.substring(ind + 9);
        if(boundary == null)
        {
            System.out.println("boundary is null");
            return;
        }
        boundaryString = (new StringBuilder("--")).append(boundary).toString();
        in = request.getInputStream();
        buffer = new byte[8192];
        map = new HashMap();
        result = in.readLine(buffer, 0, 8192);
_L7:
        String name;
        String filename;
        File file;
        String fileContentType;
        FileOutputStream fout;
        int size;
        if(result <= 0)
        {
            System.out.println("Error. Stream truncated. 0");
            break; /* Loop/switch isn't completed */
        }
        String line = new String(buffer, 0, result);
        if(!line.startsWith(boundaryString))
        {
            System.out.println("Error. multipart boundary missing.");
            break; /* Loop/switch isn't completed */
        }
        if(line.substring(boundaryString.length()).startsWith("--"))
            break; /* Loop/switch isn't completed */
        result = in.readLine(buffer, 0, 8192);
        if(result <= 0)
        {
            System.out.println("Upload : may be end boundary which has no contents");
            break; /* Loop/switch isn't completed */
        }
        line = new String(buffer, 0, result);
        StringTokenizer tokenizer = new StringTokenizer(line, ";\r\n");
        String token = tokenizer.nextToken();
        String upperToken = token.toUpperCase();
        if(!upperToken.startsWith("CONTENT-DISPOSITION"))
        {
            System.out.println("Format error. Content-Disposition expected.");
            break; /* Loop/switch isn't completed */
        }
        String disposition = upperToken.substring(21);
        if(!disposition.equals("FORM-DATA"))
        {
            System.out.println((new StringBuilder("Sorry, I don't know how to handle [")).append(disposition).append("] disposition.").toString());
            break; /* Loop/switch isn't completed */
        }
        if(tokenizer.hasMoreElements())
        {
            token = tokenizer.nextToken();
        } else
        {
            System.out.println("Format error. NAME expected.");
            break; /* Loop/switch isn't completed */
        }
        int nameStart = token.indexOf("name=\"");
        int nameEnd = token.indexOf("\"", nameStart + 7);
        if(nameStart < 0 || nameEnd < 0)
        {
            System.out.println("Format error. NAME expected.");
            break; /* Loop/switch isn't completed */
        }
        name = token.substring(nameStart + 6, nameEnd);
        if(!tokenizer.hasMoreElements())
            break MISSING_BLOCK_LABEL_1382;
        filename = null;
        file = null;
        fileContentType = null;
        fout = null;
        size = 0;
        int fnStart = line.indexOf("filename=\"");
        if(fnStart < 0)
        {
            System.out.println("NO FILENAME given.");
            result = in.readLine(buffer, 0, 8192);
            continue; /* Loop/switch isn't completed */
        }
        int fnEnd = line.indexOf("\"", fnStart + 11);
        if(fnEnd < 0)
        {
            System.out.println("FILENAME is null.");
        } else
        {
            filename = line.substring(fnStart + 10, fnEnd);
            int lastindex = -1;
            if((lastindex = filename.lastIndexOf('/')) < 0)
                lastindex = filename.lastIndexOf('\\');
            if(lastindex >= 0)
                filename = filename.substring(lastindex + 1);
            filename = processEscape(filename);
        }
        if(filename != null)
        {
            String path = getValue(map, "path");
            String application = getValue(map, "application");
            Document dom = (Document)request.getSession().getAttribute("resultDom");
            path = (new StringBuilder("[")).append(application).append("]").append(path).toString();
            path = UtilPath.formatPath(dom, path);
            file = new File(path);
            if(path != null && file.exists() && file.isDirectory())
                file = new File(path, filename);
        }
        result = in.readLine(buffer, 0, 8192);
        if(result <= 0)
        {
            System.out.println("Error. Stream truncated. 1");
            break; /* Loop/switch isn't completed */
        }
        fileContentType = new String(buffer, 0, result);
        if(fileContentType.toUpperCase().startsWith("CONTENT-TYPE:"))
            fileContentType = fileContentType.substring(13).trim();
        else
            System.out.println((new StringBuilder("what should I read here ??? - result = ")).append(result).append(", and read [").append(new String(buffer, 0, result)).append("]").toString());
        byte tmpbuffer1[];
        byte tmpbuffer2[];
        byte tmpbuffer[];
        int tmpbufferlen;
        boolean isFirst;
        boolean odd;
        tmpbuffer1 = buffer;
        tmpbuffer2 = new byte[8192];
        tmpbuffer = tmpbuffer2;
        tmpbufferlen = 0;
        isFirst = true;
        odd = true;
          goto _L1
_L5:
        if(isFirst)
        {
            if(result == 2 && buffer[0] == 13 && buffer[1] == 10)
                continue; /* Loop/switch isn't completed */
            if(file != null)
                fout = new FileOutputStream(file);
        }
        if(!bytesStartsWith(buffer, 0, result, boundaryString)) goto _L3; else goto _L2
_L2:
        if(!isFirst)
        {
            size += tmpbufferlen - 2;
            if(fout != null)
                fout.write(tmpbuffer, 0, tmpbufferlen - 2);
        }
        System.out.println((new StringBuilder("Upload : size = ")).append(size).toString());
        if(fout != null)
            fout.close();
        if(size > 0)
            appendValue(map, name, filename, fileContentType, size);
        continue; /* Loop/switch isn't completed */
_L3:
        if(!isFirst)
        {
            size += tmpbufferlen;
            if(fout != null)
                fout.write(tmpbuffer, 0, tmpbufferlen);
        }
        if(odd)
        {
            buffer = tmpbuffer2;
            tmpbuffer = tmpbuffer1;
        } else
        {
            buffer = tmpbuffer1;
            tmpbuffer = tmpbuffer2;
        }
        odd = !odd;
        tmpbufferlen = result;
        isFirst = false;
_L1:
        if((result = in.readLine(buffer, 0, 8192)) > 0) goto _L5; else goto _L4
_L4:
        break MISSING_BLOCK_LABEL_1265;
        IOException ie;
        ie;
        System.out.println((new StringBuilder("IO Error while write to file : ")).append(ie.toString()).toString());
        System.out.println((new StringBuilder("Upload : size = ")).append(size).toString());
        if(fout != null)
            fout.close();
        if(size > 0)
            appendValue(map, name, filename, fileContentType, size);
        break MISSING_BLOCK_LABEL_1317;
        Exception exception;
        exception;
        System.out.println((new StringBuilder("Upload : size = ")).append(size).toString());
        if(fout != null)
            fout.close();
        if(size > 0)
            appendValue(map, name, filename, fileContentType, size);
        throw exception;
        System.out.println((new StringBuilder("Upload : size = ")).append(size).toString());
        if(fout != null)
            fout.close();
        if(size > 0)
            appendValue(map, name, filename, fileContentType, size);
        result = in.readLine(buffer, 0, 8192);
        System.out.println((new StringBuilder("what should I read here? - result = ")).append(result).append(", and read [").append(new String(buffer, 0, result)).append("]").toString());
        break MISSING_BLOCK_LABEL_1517;
        result = in.readLine(buffer, 0, 8192);
        if(result <= 0)
        {
            System.out.println("Error. Stream truncated. 2");
            break; /* Loop/switch isn't completed */
        }
        StringBuffer valueBuffer = new StringBuffer();
        do
        {
            result = in.readLine(buffer, 0, 8192);
            if(result <= 0)
            {
                System.out.println("Error. Stream truncated. 3");
                break; /* Loop/switch isn't completed */
            }
            if(bytesStartsWith(buffer, 0, result, boundaryString))
                break;
            valueBuffer.append(new String(buffer, 0, result));
        } while(true);
        valueBuffer.setLength(valueBuffer.length() - 2);
        appendValue(map, name, valueBuffer.toString());
        continue; /* Loop/switch isn't completed */
        result = in.readLine(buffer, 0, 8192);
        if(true) goto _L7; else goto _L6
_L6:
        long end = System.currentTimeMillis();
        System.out.println((new StringBuilder("Good! it took ")).append(end - start).append(" (ms)").toString());
        printResult(out, map);
        out.close();
        return;
    }

    boolean bytesStartsWith(byte bytes[], int offset, int length, String toCompare)
    {
        boolean result = true;
        if(toCompare.length() > length)
            return false;
        for(int i = toCompare.length() - 1; i >= 0; i--)
        {
            if(toCompare.charAt(i) == bytes[offset + i])
                continue;
            result = false;
            break;
        }

        return result;
    }

    void appendValue(HashMap map, String name, String value, String contentType, int size)
    {
        BeanUploadData data = new BeanUploadData(name, value, contentType, size, true);
        map.put(name, data);
    }

    void appendValue(HashMap map, String name, String value)
    {
        BeanUploadData data = new BeanUploadData(name, value, null, 0, false);
        map.put(name, data);
    }

    String getValue(HashMap map, String name)
    {
        BeanUploadData data = (BeanUploadData)map.get(name);
        if(data == null)
            return null;
        else
            return data.getValue();
    }

    Object getObject(HashMap map, String name)
    {
        return map.get(name);
    }

    String processEscape(String string)
    {
        StringBuffer buffer = new StringBuffer(string.length());
        char chars[] = string.toCharArray();
        StringBuffer escaped = new StringBuffer(6);
        int status = 0;
        for(int i = 0; i < string.length(); i++)
            switch(status)
            {
            default:
                break;

            case 0: // '\0'
                if(chars[i] == '&')
                    status = 1;
                else
                    buffer.append(chars[i]);
                break;

            case 1: // '\001'
                if(chars[i] == '#')
                {
                    status = 2;
                } else
                {
                    status = 0;
                    buffer.append('&');
                }
                break;

            case 2: // '\002'
                if(chars[i] == ';')
                {
                    try
                    {
                        buffer.append((char)Integer.parseInt(escaped.toString()));
                    }
                    catch(NumberFormatException nfe)
                    {
                        buffer.append(escaped);
                        buffer.append(';');
                    }
                    escaped.setLength(0);
                    status = 0;
                } else
                {
                    escaped.append(chars[i]);
                }
                break;
            }

        if(escaped.length() > 0)
            buffer.append(escaped);
        return buffer.toString();
    }

    void printResult(PrintWriter out, Map map)
        throws IOException
    {
        Iterator itr = map.values().iterator();
        out.println("<HTML><HEAD>");
        out.println("<TITLE>Upload Result</TITLE>");
        out.println("</HEAD><BODY>");
        out.println("<H1>Upload Result</H1>");
        out.println("<TABLE>");
        out.println("<TR><TH>NAME</TH><TH>VALUE</TH><TH>CONTENT TYPE</TH><TH>SIZE</TH><TH>FILE</TH></TR>");
        for(; itr.hasNext(); out.println("</TR>"))
        {
            BeanUploadData data = (BeanUploadData)itr.next();
            out.println("<TR>");
            out.println((new StringBuilder("<TD>")).append(data.getName() != null ? data.getName() : "").append("</TD>").toString());
            out.println((new StringBuilder("<TD>")).append(data.getValue() != null ? data.getValue() : "").append("</TD>").toString());
            out.println((new StringBuilder("<TD>")).append(data.getContentType() != null ? data.getContentType() : "").append("</TD>").toString());
            out.println((new StringBuilder("<TD>")).append(data.isAFile() ? String.valueOf(data.getSize()) : "").append("</TD>").toString());
            out.println((new StringBuilder("<TD>")).append(data.isAFile() ? "file" : "").append("</TD>").toString());
        }

        out.println("</TABLE>");
        out.println("</BODY></HTML>");
    }

    public String getServletInfo()
    {
        return "A servlet that uploads files";
    }

    private static final int BUFFER_SIZE = 8192;
    private static final String PATH_KEY = "path";
    static final int NORMAL = 0;
    static final int AMPERSAND = 1;
    static final int AMPERSHARP = 2;
}
