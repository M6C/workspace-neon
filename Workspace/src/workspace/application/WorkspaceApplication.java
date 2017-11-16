package workspace.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import workspace.action.ActionServlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

@SpringBootApplication
@ComponentScan(basePackages = "workspace")
public class WorkspaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkspaceApplication.class, args);
    }

    @Bean
    public framework.action.ActionServlet actionServlet(ServletConfig config) throws ServletException {
        ActionServlet ret = new ActionServlet();
        ret.init(config);
        return ret;
    }
}