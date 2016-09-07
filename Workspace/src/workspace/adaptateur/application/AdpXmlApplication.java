// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   AdpXmlApplication.java

package workspace.adaptateur.application;

import framework.ressource.util.UtilString;
import framework.ressource.util.UtilXML;
import framework.trace.Trace;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Dictionary;
import java.util.Hashtable;
import javax.servlet.ServletContext;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamSource;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

// Referenced classes of package workspace.adaptateur.application:
//            AdpXml

public class AdpXmlApplication extends AdpXml
{

    private AdpXmlApplication()
    {
    }

    public static String getLocalDirectory(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/LOCAL_DIRECTORY";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getModuleName(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/MODULE_NAME";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getServerHostName(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/SERVER_HOSTNAME";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getServerPort(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/SERVER_PORT";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getServerRepository(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/SERVER_REPOSITORY";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getUserName(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/USER";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getPassword(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/PASSWORD";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getPathMain(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/PATHS/PATH[@Name = 'Main']";
        String szXPathMain = UtilXML.getXPathStringValue(dom, xpath);
        if(szXPathMain == null)
        {
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        } else
        {
            ret = szXPathMain;
            return ret;
        }
    }

    public static String getFormatedPathMain(ServletContext context, Document dom, String application)
        throws TransformerException
    {
        return getFormatedPathByName(context, dom, application, "Main");
    }

    public static String getFormatedPathByName(ServletContext context, Document dom, String application, String name)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Paths/Path/FormatByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pPath", name);
        StringWriter strWriter = new StringWriter();
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }

                private final ServletContext val$ctx;

            
            {
                ctx = servletcontext;
                super();
            }
            }
;
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException((new StringBuilder("Package '")).append(name).append("' not found in application '").append(application).append("'").toString());
        }
        if(UtilString.isEmpty(ret))
        {
            throw new IllegalArgumentException((new StringBuilder("Path '")).append(name).append("' not found in application '").append(application).append("'").toString());
        } else
        {
            ret = ret.trim();
            return ret;
        }
    }

    public static String getPathSource(ServletContext context, Document dom, String application)
        throws TransformerException
    {
        return getPathByName(context, dom, application, "Source");
    }

    public static String getPackageFileNameByName(ServletContext context, Document dom, String application, String type, String name)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Packaging/Package/FileNameByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pType", type);
        dictionary.put("pName", name);
        StringWriter strWriter = new StringWriter();
        UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary);
        ret = strWriter.toString();
        if(UtilString.isEmpty(ret))
        {
            throw new IllegalArgumentException((new StringBuilder("Package '")).append(name).append("' not found in application '").append(application).append("'").toString());
        } else
        {
            ret = ret.trim();
            return ret;
        }
    }

    public static Document getPackageXmlByName(ServletContext context, Document dom, String application, String type, String name)
        throws TransformerException
    {
        Document ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Packaging/Package/Content/ContentByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pType", type);
        dictionary.put("pName", name);
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }

                private final ServletContext val$ctx;

            
            {
                ctx = servletcontext;
                super();
            }
            }
;
            ret = UtilXML.tranformeXmlWithXslToDom(dom, context.getResourceAsStream(szXsl), dictionary, uriResolver);
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException((new StringBuilder("Package '")).append(name).append("' not found in application '").append(application).append("'").toString());
        }
        catch(SAXException e)
        {
            Trace.ERROR(e, e);
        }
        catch(IOException e)
        {
            Trace.ERROR(e, e);
        }
        catch(ParserConfigurationException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static String getPathByName(ServletContext context, Document dom, String application, String name)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Paths/Path/FindByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pPath", name);
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }

                private final ServletContext val$ctx;

            
            {
                ctx = servletcontext;
                super();
            }
            }
;
            StringWriter strWriter = new StringWriter();
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException((new StringBuilder("Package '")).append(name).append("' not found in application '").append(application).append("'").toString());
        }
        return ret;
    }

    public static String getClassPathAll(ServletContext context, Document dom, String application)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Build/Classpath/All.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }

                private final ServletContext val$ctx;

            
            {
                ctx = servletcontext;
                super();
            }
            }
;
            StringWriter strWriter = new StringWriter();
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException((new StringBuilder("Classpath not found in application '")).append(application).append("'").toString());
        }
        return ret;
    }

    public static String getJdkPathByName(ServletContext context, Document dom, String application, String name)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Jdk/Path/FindByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pPath", name);
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }

                private final ServletContext val$ctx;

            
            {
                ctx = servletcontext;
                super();
            }
            }
;
            StringWriter strWriter = new StringWriter();
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException((new StringBuilder("Classpath not found in application '")).append(application).append("'").toString());
        }
        return ret;
    }

    public static String getJdkJrePathByName(ServletContext context, Document dom, String application, String name)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Jdk/Jre/Path/FindByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pPath", name);
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }

                private final ServletContext val$ctx;

            
            {
                ctx = servletcontext;
                super();
            }
            }
;
            StringWriter strWriter = new StringWriter();
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException((new StringBuilder("Classpath not found in application '")).append(application).append("'").toString());
        }
        return ret;
    }
}
