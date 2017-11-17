package workspace.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import workspace.action.ActionServlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

@SpringBootApplication
@ComponentScan(basePackages = "workspace")
public class WorkspaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkspaceApplication.class, args);
    }
}