package workspace.application;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import workspace.action.ActionServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

// https://kielczewski.eu/2013/11/spring-mvc-without-web-xml-using-webapplicationinitializer/
// http://www.baeldung.com/spring-xml-vs-java-config
//@Configuration
public class WorkspaceApplicationWebInitializer implements WebApplicationInitializer {
    
    public WorkspaceApplicationWebInitializer() {
        System.out.println("-----------------------> WorkspaceApplicationWebInitializer");
    }
	

	@Configuration
	@EnableWebMvc
	@ComponentScan
	public static class RestConfiguration extends WebMvcConfigurerAdapter {
    
        public RestConfiguration() {
            System.out.println("-----------------------> RestConfiguration");
        }

    }

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

		AnnotationConfigWebApplicationContext appCtx = new AnnotationConfigWebApplicationContext();
		appCtx.register(WorkspaceConfiguration.class);
		servletContext.addListener(new org.springframework.web.context.ContextLoaderListener(appCtx));

		// Activation de la DispatcherSerlvet
        // declaration du contexte web sur lequel doit s'appuyer la servlet Spring
		AnnotationConfigWebApplicationContext webCtx= new AnnotationConfigWebApplicationContext();
		webCtx.register(RestConfiguration.class);

		// instanciation de la DispatcherServlet de Spring
		DispatcherServlet springMvcServlet = new DispatcherServlet(webCtx);

		// inscription de la servlet Spring aupres du servletContainer, grace au servletContext
		javax.servlet.ServletRegistration.Dynamic servletRegistration = servletContext.addServlet("springMvcServlet", springMvcServlet);
        servletRegistration.addMapping("/api/*");
        servletRegistration.setAsyncSupported(true);
        servletRegistration.setLoadOnStartup(0);

		javax.servlet.ServletRegistration.Dynamic actionServletRegistration = servletContext.addServlet("action", new ActionServlet());
		actionServletRegistration.addMapping("/*.servlet/*");
		actionServletRegistration.setInitParameter("config_file", "/BOOT-INF/classes/Xml/FrmWrk_Config.xml");
		actionServletRegistration.setInitParameter("servlet_file", "/BOOT-INF/classes/Xml/ExtJs/FrmWrk_Servlet.xml");
//		actionServletRegistration.setAsyncSupported(true);
//		actionServletRegistration.setLoadOnStartup(0);
	}
}