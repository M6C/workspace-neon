// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaSplitFile.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import java.text.DecimalFormat;
import java.util.Vector;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvEditorJavaSplitFile extends SrvGenerique
{

    public SrvEditorJavaSplitFile()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session;
        String application;
        String pathFile;
        String pathDestination;
        String lineNumber;
        session = request.getSession();
        ServletContext context = session.getServletContext();
        application = (String)bean.getParameterDataByName("application");
        pathFile = (String)bean.getParameterDataByName("pathFile");
        pathDestination = (String)bean.getParameterDataByName("pathDestination");
        lineNumber = (String)bean.getParameterDataByName("lineNumber");
        if(!UtilString.isNotEmpty(application) || !UtilString.isNotEmpty(pathFile) || !UtilString.isNotEmpty(lineNumber))
            break MISSING_BLOCK_LABEL_1052;
        Vector fileList;
        File fLst;
        Document dom = (Document)session.getAttribute("resultDom");
        pathFile = (new StringBuilder("[")).append(application).append("]").append(pathFile).toString();
        pathFile = UtilPath.formatPath(dom, pathFile, ';');
        pathDestination = (new StringBuilder("[")).append(application).append("]").append(pathDestination).toString();
        pathDestination = UtilPath.formatPath(dom, pathDestination, ';');
        fileList = new Vector();
        fLst = new File(pathFile);
        File fOut;
        FileInputStream fInLst;
        DataInputStream dInLst;
        FileOutputStream fOutStream;
        DataOutputStream dOutStream;
        if(!fLst.exists() || !fLst.isFile())
            break MISSING_BLOCK_LABEL_1052;
        File fIn = null;
        fOut = null;
        fInLst = new FileInputStream(fLst);
        dInLst = new DataInputStream(fInLst);
        fOutStream = null;
        dOutStream = null;
        fOutStream = null;
        dOutStream = null;
        String text = null;
        int iLineNumber = Integer.parseInt(lineNumber);
        int line = 0;
        int fileCount = 0;
        while((text = dInLst.readLine()) != null) 
        {
            line++;
            if(fOut == null || line >= iLineNumber)
            {
                if(dOutStream != null)
                    try
                    {
                        dOutStream.close();
                    }
                    catch(IOException ex)
                    {
                        Trace.ERROR(this, ex);
                    }
                if(fOutStream != null)
                    try
                    {
                        fOutStream.close();
                    }
                    catch(IOException ex)
                    {
                        Trace.ERROR(this, ex);
                    }
                int idx1 = pathFile.lastIndexOf("\\");
                int idx2 = pathFile.lastIndexOf("/");
                int idx = idx1 <= idx2 ? idx2 : idx1;
                String sep = String.valueOf(idx1 <= idx2 ? '/' : '\\');
                String fileNameOut;
                if(UtilString.isNotEmpty(pathDestination))
                {
                    fileNameOut = pathDestination;
                    if(!pathDestination.endsWith(sep))
                        fileNameOut = (new StringBuilder(String.valueOf(fileNameOut))).append(sep).toString();
                } else
                if(idx > 0)
                    fileNameOut = pathFile.substring(0, idx + 1);
                else
                    fileNameOut = sep;
                fileNameOut = (new StringBuilder(String.valueOf(fileNameOut))).append((new DecimalFormat("000000")).format(fileCount)).toString();
                fileNameOut = (new StringBuilder(String.valueOf(fileNameOut))).append(pathFile.substring(pathFile.lastIndexOf(sep) + 1, pathFile.length())).toString();
                fOut = new File(fileNameOut);
                fOutStream = new FileOutputStream(fOut);
                dOutStream = new DataOutputStream(fOutStream);
                fileList.add(fOut);
                fileCount++;
                line = 0;
            }
            text = (new StringBuilder(String.valueOf(text))).append("\r\n").toString();
            dOutStream.write(text.getBytes());
            dOutStream.flush();
        }
        break MISSING_BLOCK_LABEL_936;
        FileNotFoundException ex;
        ex;
        Trace.ERROR(this, ex);
        if(dOutStream != null)
            try
            {
                dOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fOutStream != null)
            try
            {
                fOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(dInLst != null)
            try
            {
                dInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fInLst != null)
            try
            {
                fInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        request.setAttribute("fileList", fileList);
        break MISSING_BLOCK_LABEL_1052;
        ex;
        Trace.ERROR(this, ex);
        if(dOutStream != null)
            try
            {
                dOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fOutStream != null)
            try
            {
                fOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(dInLst != null)
            try
            {
                dInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fInLst != null)
            try
            {
                fInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        request.setAttribute("fileList", fileList);
        break MISSING_BLOCK_LABEL_1052;
        Exception exception;
        exception;
        if(dOutStream != null)
            try
            {
                dOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fOutStream != null)
            try
            {
                fOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(dInLst != null)
            try
            {
                dInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fInLst != null)
            try
            {
                fInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        request.setAttribute("fileList", fileList);
        throw exception;
        if(dOutStream != null)
            try
            {
                dOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fOutStream != null)
            try
            {
                fOutStream.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(dInLst != null)
            try
            {
                dInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        if(fInLst != null)
            try
            {
                fInLst.close();
            }
            catch(IOException ex)
            {
                Trace.ERROR(this, ex);
            }
        request.setAttribute("fileList", fileList);
        break MISSING_BLOCK_LABEL_1052;
        Exception ex;
        ex;
        Trace.ERROR(this, ex);
        break MISSING_BLOCK_LABEL_1052;
        Exception ex;
        ex;
        Trace.ERROR(this, ex);
    }

    private static final int ARRAY_SIZE = 10240;
}
