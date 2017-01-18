package workspace.bean;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BeanWorkspace {
    public final static String KEY_SESSION_HTTP = "KEY_SESSION_HTTP_BEANWORKSPACE";

    public final static String KEY_CLASSPATH_STRING = "KEY_CLASSPATH_STRING";
    public final static String KEY_CLASSPATH_LIST = "KEY_CLASSPATH_LIST";

    private Map<String, List<String>> listString = new HashMap<String, List<String>>();
    private Map<String, String> dataString = new HashMap<String, String>();

    public List<String> getListString(String key) {
        return listString.get(key);
    }

    public void setListString(String key, List<String> list) {
        listString.put(key, list);
    }

    public String getDataString(String key) {
        return dataString.get(key);
    }

    public void setDataString(String key, String data) {
        dataString.put(key, data);
    }
}