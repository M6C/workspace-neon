// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvProxy.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.*;
import java.net.*;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.http.*;

public class SrvProxy extends SrvGenerique
{

    public SrvProxy()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        ServletContext sc;
        sc = request.getSession().getServletContext();
        response.setContentType("text/plain");
        String realUrl;
        String requestHost;
        byte requestHostBytes[];
        realUrl = getUrl(request);
        if(realUrl.startsWith("/"))
            realUrl = realUrl.substring(1);
        requestHost = null;
        requestHostBytes = (byte[])null;
        if(realUrl.length() > 10)
        {
            int k = realUrl.indexOf("/", 8);
            if(k > 0)
            {
                requestHost = realUrl.substring(0, k);
            } else
            {
                requestHost = realUrl;
                realUrl = (new StringBuilder(String.valueOf(realUrl))).append("/").toString();
            }
        }
        if(requestHost == null)
        {
            sc.log((new StringBuilder("don't have request URL ")).append(realUrl).toString());
            returnHome(request, response);
            return;
        }
        char requestHostChars[] = requestHost.toCharArray();
        requestHostBytes = new byte[requestHostChars.length];
        for(int i = 0; i < requestHostChars.length; i++)
            requestHostBytes[i] = (byte)requestHostChars[i];

        if(realUrl.length() == 0 || realUrl.equalsIgnoreCase("index.html"))
        {
            returnHome(request, response);
            return;
        }
        try
        {
            URL url = new URL(realUrl);
            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            String contentType = connection.getContentType();
            if(connection.getResponseCode() == 200 && contentType.toLowerCase().contains("text"))
                replaceLinkAndReturnContentByBytes(connection, response, contentType, requestHostBytes);
            else
                retrieveAndReturnUrlContent(url.openStream(), response.getOutputStream());
        }
        catch(Exception e)
        {
            e.printStackTrace();
            e.printStackTrace(response.getWriter());
        }
        return;
    }

    private String getUrl(HttpServletRequest req)
        throws UnsupportedEncodingException
    {
        String reqUri = req.getRequestURI().toString();
        String queryString = req.getQueryString();
        if(queryString != null)
            reqUri = (new StringBuilder(String.valueOf(reqUri))).append("?").append(queryString).toString();
        return URLDecoder.decode(reqUri, "UTF-8");
    }

    private void returnHome(HttpServletRequest request, HttpServletResponse response)
        throws Exception
    {
        ServletContext sc = request.getSession().getServletContext();
        String filename = sc.getRealPath("index.html");
        String mimeType = sc.getMimeType(filename);
        if(mimeType == null)
        {
            sc.log((new StringBuilder("Could not get MIME type of ")).append(filename).toString());
            response.setStatus(500);
            return;
        }
        response.setContentType(mimeType);
        File file = new File(filename);
        response.setContentLength((int)file.length());
        FileInputStream in = new FileInputStream(file);
        OutputStream out = response.getOutputStream();
        byte buf[] = new byte[1024];
        for(int count = 0; (count = in.read(buf)) >= 0;)
            out.write(buf, 0, count);

        in.close();
        out.close();
    }

    private void retrieveAndReturnUrlContent(InputStream in, OutputStream out)
        throws Exception
    {
        byte buf[] = new byte[1024];
        for(int count = 0; (count = in.read(buf)) >= 0;)
            out.write(buf, 0, count);

        in.close();
        out.close();
    }

    private void replaceLinkAndReturnContentByBytes(HttpURLConnection connection, HttpServletResponse resp, String contentType, byte requestHostBytes[])
        throws Exception
    {
        InputStream in = connection.getInputStream();
        OutputStream out = resp.getOutputStream();
        byte buf[] = new byte[1024];
        for(int count = 0; (count = in.read(buf)) >= 0;)
        {
            int leftCount = count - 7;
            int toWrite = 0;
            for(int i = 0; i < count; i++)
                if(i < leftCount && buf[i] == 104 && buf[i + 1] == 116 && buf[i + 2] == 116 && buf[i + 3] == 112 && buf[i + 4] == 58 && buf[i + 5] == 47 && buf[i + 6] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForHttp);
                    toWrite = i += 7;
                } else
                if(i < leftCount && buf[i] == 104 && buf[i + 1] == 116 && buf[i + 2] == 116 && buf[i + 3] == 112 && buf[i + 4] == 115 && buf[i + 5] == 58 && buf[i + 6] == 47 && buf[i + 7] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForHttps);
                    toWrite = i += 8;
                } else
                if(i < leftCount && buf[i] == 104 && buf[i + 1] == 114 && buf[i + 2] == 101 && buf[i + 3] == 102 && buf[i + 4] == 61 && buf[i + 5] == 34 && buf[i + 6] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForHrefDQ);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 7;
                } else
                if(i < leftCount && buf[i] == 104 && buf[i + 1] == 114 && buf[i + 2] == 101 && buf[i + 3] == 102 && buf[i + 4] == 61 && buf[i + 5] == 39 && buf[i + 6] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForHrefSQ);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 7;
                } else
                if(i < leftCount && buf[i] == 115 && buf[i + 1] == 114 && buf[i + 2] == 99 && buf[i + 3] == 61 && buf[i + 4] == 34 && buf[i + 5] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForSrcDQ);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 6;
                } else
                if(i < leftCount && buf[i] == 115 && buf[i + 1] == 114 && buf[i + 2] == 99 && buf[i + 3] == 61 && buf[i + 4] == 39 && buf[i + 5] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForSrcSQ);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 6;
                } else
                if(i < leftCount && buf[i] == 97 && buf[i + 1] == 99 && buf[i + 2] == 116 && buf[i + 3] == 105 && buf[i + 4] == 111 && buf[i + 5] == 110 && buf[i + 6] == 61 && buf[i + 7] == 34 && buf[i + 8] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForActionDQ);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 9;
                } else
                if(i < leftCount && buf[i] == 97 && buf[i + 1] == 99 && buf[i + 2] == 116 && buf[i + 3] == 105 && buf[i + 4] == 111 && buf[i + 5] == 110 && buf[i + 6] == 61 && buf[i + 7] == 39 && buf[i + 8] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForActionSQ);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 9;
                } else
                if(i < leftCount && buf[i] == 97 && buf[i + 1] == 99 && buf[i + 2] == 116 && buf[i + 3] == 105 && buf[i + 4] == 111 && buf[i + 5] == 110 && buf[i + 6] == 61 && buf[i + 7] == 47)
                {
                    out.write(buf, toWrite, i - toWrite);
                    out.write(prefixForActionNoQuote);
                    out.write(requestHostBytes);
                    out.write(prefixForslash);
                    toWrite = i += 8;
                }

            if(toWrite < count)
                out.write(buf, toWrite, count - toWrite);
        }

        in.close();
        resp.setContentType(contentType);
        out.flush();
        out.close();
    }

    private void replaceLinkAndReturnContent(HttpURLConnection connection, HttpServletResponse resp)
        throws Exception
    {
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuffer sBuffer = new StringBuffer();
        String line;
        while((line = reader.readLine()) != null) 
            sBuffer.append(line);
        reader.close();
        String content = sBuffer.toString();
        content = content.replaceAll("src=\"https://", "src=\"https://g-proxy.appspot.com/https://");
        content = content.replaceAll("src=\"http://", "src=\"https://g-proxy.appspot.com/http://");
        content = content.replaceAll("href=\"https://", "href=\"https://g-proxy.appspot.com/https://");
        content = content.replaceAll("href=\"http://", "href=\"https://g-proxy.appspot.com/http://");
        content = content.replaceAll("src='https://", "src='https://g-proxy.appspot.com/https://");
        content = content.replaceAll("src='http://", "src='https://g-proxy.appspot.com/http://");
        content = content.replaceAll("href='https://", "href='https://g-proxy.appspot.com/https://");
        content = content.replaceAll("href='http://", "href='https://g-proxy.appspot.com/http://");
        resp.setContentType(connection.getContentType());
        OutputStream out = resp.getOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(out));
        writer.write(content, 0, content.length());
        writer.flush();
        writer.close();
    }

    private static final Logger log = Logger.getLogger(workspace/service/SrvProxy.getName());
    private static final String proxyHost = "https://g-proxy.appspot.com/";
    private static final byte prefixForHttp[] = {
        104, 116, 116, 112, 115, 58, 47, 47, 103, 45, 
        112, 114, 111, 120, 121, 46, 97, 112, 112, 115, 
        112, 111, 116, 46, 99, 111, 109, 47, 104, 116, 
        116, 112, 58, 47, 47
    };
    private static final byte prefixForHttps[] = {
        104, 116, 116, 112, 115, 58, 47, 47, 103, 45, 
        112, 114, 111, 120, 121, 46, 97, 112, 112, 115, 
        112, 111, 116, 46, 99, 111, 109, 47, 104, 116, 
        116, 112, 115, 58, 47, 47
    };
    private static final byte prefixForHrefDQ[] = {
        104, 114, 101, 102, 61, 34, 47
    };
    private static final byte prefixForHrefSQ[] = {
        104, 114, 101, 102, 61, 39, 47
    };
    private static final byte prefixForSrcDQ[] = {
        115, 114, 99, 61, 34, 47
    };
    private static final byte prefixForSrcSQ[] = {
        115, 114, 99, 61, 39, 47
    };
    private static final byte prefixForActionDQ[] = {
        97, 99, 116, 105, 111, 110, 61, 34, 47
    };
    private static final byte prefixForActionSQ[] = {
        97, 99, 116, 105, 111, 110, 61, 39, 47
    };
    private static final byte prefixForActionNoQuote[] = {
        97, 99, 116, 105, 111, 110, 61, 47
    };
    private static final byte prefixForslash[] = {
        47
    };

}
