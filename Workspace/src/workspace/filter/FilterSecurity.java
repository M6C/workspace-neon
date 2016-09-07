// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   FilterSecurity.java

package workspace.filter;

import framework.beandata.BeanGenerique;
import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class FilterSecurity
    implements Filter
{

    public FilterSecurity()
    {
        filterConfig = null;
    }

    public void init(FilterConfig arg0)
        throws ServletException
    {
        filterConfig = arg0;
    }

    public void destroy()
    {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException
    {
        BeanGenerique bean;
        HttpServletRequest req;
        bean = null;
        req = (HttpServletRequest)request;
        String szInputName = filterConfig.getInitParameter("InputName");
        String szEventAuthentification = (String)filterConfig.getServletContext().getAttribute(szInputName);
        if(Boolean.FALSE.toString().equals(szEventAuthentification))
        {
            chain.doFilter(request, response);
            break MISSING_BLOCK_LABEL_224;
        }
        String event = request.getParameter("event");
        if(event != null && !event.equals(""))
            bean = (BeanGenerique)req.getSession().getAttribute("BeanAuthentification");
        break MISSING_BLOCK_LABEL_172;
        Exception exception;
        exception;
        if(bean == null)
        {
            String szDefaultUrl = filterConfig.getInitParameter("DefaultUrl");
            filterConfig.getServletContext().getRequestDispatcher(szDefaultUrl).forward(request, response);
        } else
        {
            chain.doFilter(request, response);
        }
        throw exception;
        if(bean == null)
        {
            String szDefaultUrl = filterConfig.getInitParameter("DefaultUrl");
            filterConfig.getServletContext().getRequestDispatcher(szDefaultUrl).forward(request, response);
        } else
        {
            chain.doFilter(request, response);
        }
    }

    private static final String URL_LOGOUT = "?event=Index";
    private FilterConfig filterConfig;
}
