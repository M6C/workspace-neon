package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SrvInitializeProject extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("BeanWorkspace", bean);
    }
}