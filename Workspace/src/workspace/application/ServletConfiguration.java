package workspace.application;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import workspace.action.ActionServlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

//https://stackoverflow.com/questions/20915528/how-can-i-register-a-secondary-servlet-with-spring-boot

@Configuration
public class ServletConfiguration implements ServletContextInitializer, EmbeddedServletContainerCustomizer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        registerServlet(servletContext);
    }

    @Override
    public void customize(ConfigurableEmbeddedServletContainer container) {
    }

    private void registerServlet(ServletContext servletContext) {
        System.out.println("--------------------------> register Servlet");
        javax.servlet.ServletRegistration.Dynamic actionServletRegistration = servletContext.addServlet("action", new ActionServlet());
        actionServletRegistration.addMapping("/action.servlet/*");
        actionServletRegistration.setInitParameter("config_file", "/Xml/FrmWrk_Config.xml");
        actionServletRegistration.setInitParameter("servlet_file", "/Xml/ExtJs/FrmWrk_Servlet.xml");
        actionServletRegistration.setAsyncSupported(true);
        actionServletRegistration.setLoadOnStartup(0);
    }
}