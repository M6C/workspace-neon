// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaCopyMove.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import java.io.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaCopyMove extends SrvGenerique
{

    public SrvEditorJavaCopyMove()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String pathSrc = (String)bean.getParameterDataByName("pathSrc");
        String pathDst = (String)bean.getParameterDataByName("pathDst");
        String nameDst = (String)bean.getParameterDataByName("nameDst");
        String operation = (String)bean.getParameterDataByName("operation");
        if(UtilString.isNotEmpty(pathSrc) && UtilString.isNotEmpty(pathDst))
        {
            Document dom = (Document)request.getSession().getAttribute("resultDom");
            String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
            if("move".equalsIgnoreCase(operation))
                move(new File(filePathMain, pathSrc), new File(filePathMain, pathDst), nameDst);
            else
                copy(new File(filePathMain, pathSrc), new File(filePathMain, pathDst), nameDst);
        }
    }

    protected static boolean copy(File fileSrc, File fileDst)
    {
        return copy(fileSrc, fileDst, null);
    }

    protected static boolean copy(File fileSrc, File fileDst, String nameDst)
    {
        boolean resultat;
        FileInputStream sourceFile;
        FileOutputStream destinationFile;
        resultat = false;
        sourceFile = null;
        destinationFile = null;
        if(!fileSrc.exists())
            break MISSING_BLOCK_LABEL_291;
        if(!fileSrc.isFile())
            break MISSING_BLOCK_LABEL_254;
        try
        {
            if(fileDst.isDirectory() && (fileDst.exists() || fileDst.mkdirs()))
            {
                String fileName = nameDst == null ? UtilFile.fileName(fileSrc.getCanonicalPath()) : nameDst;
                fileDst = new File(UtilFile.formatPath(fileDst.getCanonicalPath(), fileName));
            }
            fileDst.createNewFile();
            sourceFile = new FileInputStream(fileSrc);
            destinationFile = new FileOutputStream(fileDst);
            byte buffer[] = new byte[0x80000];
            int nbLecture;
            while((nbLecture = sourceFile.read(buffer)) != -1) 
                destinationFile.write(buffer, 0, nbLecture);
            resultat = true;
        }
        catch(FileNotFoundException filenotfoundexception)
        {
            try
            {
                sourceFile.close();
            }
            catch(Exception e)
            {
                resultat = false;
            }
            try
            {
                destinationFile.close();
            }
            catch(Exception e)
            {
                resultat = false;
            }
            break MISSING_BLOCK_LABEL_291;
        }
        catch(IOException ioexception)
        {
            try
            {
                sourceFile.close();
            }
            catch(Exception e)
            {
                resultat = false;
            }
            try
            {
                destinationFile.close();
            }
            catch(Exception e)
            {
                resultat = false;
            }
            break MISSING_BLOCK_LABEL_291;
        }
        break MISSING_BLOCK_LABEL_227;
        Exception exception;
        exception;
        try
        {
            sourceFile.close();
        }
        catch(Exception e)
        {
            resultat = false;
        }
        try
        {
            destinationFile.close();
        }
        catch(Exception e)
        {
            resultat = false;
        }
        throw exception;
        try
        {
            sourceFile.close();
        }
        catch(Exception e)
        {
            resultat = false;
        }
        try
        {
            destinationFile.close();
        }
        catch(Exception e)
        {
            resultat = false;
        }
        break MISSING_BLOCK_LABEL_291;
        File files[] = fileSrc.listFiles();
        resultat = true;
        for(int i = 0; i < files.length; i++)
            resultat &= copy(files[i], fileDst);

        return resultat;
    }

    protected static boolean move(File source, File destination)
    {
        return move(source, destination, null);
    }

    protected static boolean move(File source, File destination, String nameDst)
    {
        boolean result = copy(source, destination, nameDst);
        if(result)
            result &= source.delete();
        return result;
    }
}
