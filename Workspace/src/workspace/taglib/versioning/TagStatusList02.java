package workspace.taglib.versioning;

import framework.ressource.util.UtilRequest;
import framework.ressource.util.UtilSort;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.trace.Trace;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;
import javax.naming.NoInitialContextException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;
import org.netbeans.lib.cvsclient.command.CommandException;
import org.netbeans.lib.cvsclient.command.status.StatusInformation;
import org.netbeans.lib.cvsclient.connection.AuthenticationException;
import org.w3c.dom.Document;
import workspace.bean.versioning.BeanCVS;

/**
 * @author  HP_Administrateur
 */
public class TagStatusList02 extends BodyTagSupport {


  private List statusList = null;
  private Hashtable statusTable = null;
  private int index = 0;
  private int iEnd = 0;

  private String path = null;
  private String pathToExpand = null;

  private String indexStart = null;
  private String indexEnd = null;
  private String indexStep = null;
  private String sortMethod = null;
  private String includeSubDirectory = null;

  // Portee de la liste de fichier soit en 'request' soit en 'session'. En 'request' par defaut si vide.
  private String scope = null;
  // Nom de stockage de la liste de fichier en 'request' ou 'session' en fonction du scope.
  private String name = null;

  private String application = null;

  public TagStatusList02() {
  }

  public int doStartTag() {
    String szIndexStart = getIndexStartReplaceParamByRequestValue();
    String szEnd = getIndexEndReplaceParamByRequestValue();
    String szPath = getPathReplaceParamByRequestValue();
    String szPathToExpand = getPathToExpandReplaceParamByRequestValue();
    String szIncludeSubDirectory = getIncludeSubDirectoryReplaceParamByRequestValue();
    boolean bIncludeSubDirectory = UtilString.isEqualsIgnoreCase(szIncludeSubDirectory, "true");
    index = UtilString.isNotEmpty(szIndexStart) ? Integer.parseInt(szIndexStart) : 0;
    if (UtilString.isNotEmpty(szPath)) {
      try {
        statusList = new LinkedList();
        statusTable = new Hashtable();
        File filePath = new File(szPath);
        File filePathToExpand = null;
        if (UtilString.isNotEmpty(szPathToExpand)) {
          boolean relative = szPathToExpand.indexOf(":" + File.separator) < 0;
          filePathToExpand = relative ? new File(filePath, szPathToExpand) : new File(szPathToExpand);
        }
        filePathToExpand = ( (filePathToExpand != null) && (filePathToExpand.exists())) ? filePathToExpand : null;
        if (filePath.exists() && filePath.isDirectory()) {
          int iBeanIndex = 0;
          copyListIntoVectorAt(filePath, filePath.listFiles(), statusList, statusTable, 0, iBeanIndex++);
          BeanStatus fileItem = null;
          for (int i = 0; i < statusList.size(); i++) {
            fileItem = (BeanStatus) statusList.get(i);
            if (fileItem.getFile().isDirectory() && (UtilString.isNotEqualsIgnoreCase(fileItem.getFile().getName(), "CVS"))) {
              if ( ( (filePathToExpand != null) && filePathToExpand.getAbsolutePath().startsWith(fileItem.getFile().getAbsolutePath())) ||
                  bIncludeSubDirectory)
                copyListIntoVectorAt(filePath, fileItem.getFile().listFiles(), statusList, statusTable, i + 1, iBeanIndex++);
            }
          }
          int size = UtilVector.safeSize(statusList);
          if (size > 0) {
            Document dom = (Document) pageContext.getSession().getAttribute("resultDom");
            if (dom != null) {
              String szApplication = getApplicationReplaceParamByRequestValue();
              if (UtilString.isNotEmpty(szApplication)) {
                BeanCVS beanCvs = new BeanCVS(dom, szApplication);
                List aFile = new LinkedList();
                aFile.add((filePathToExpand == null) ? filePath : filePathToExpand);
                BeanStatus s = null;
                File f = null;
                // Recupere la liste des repertoires
                for (int i = 0; i < size; i++) {
                  s = (BeanStatus)statusList.get(i);
                  f = s.getFile();
                  if (f.isDirectory() && UtilString.isNotEqualsIgnoreCase(f.getName(), "CVS")) {
/*
                    // Recherche si le fichier ou repertoire doit etre ignore
                    File fileIgnore = null;
                    File tmpF = f;
                    File parent = tmpF.getParentFile();
                    String name = tmpF.getName();
                    boolean isIgnored = false;
                    while ( (parent != null) && !isIgnored) {
                      fileIgnore = new File(parent, ".cvsignore");
                      isIgnored = fileIgnore.exists() && (UtilFile.findLine(fileIgnore, name) >= 0);
                      name = parent.getName();
                      tmpF = parent;
                      parent = parent.getParentFile();
                    }
                    if (!isIgnored)
*/
                      aFile.add(f);
                  }
                }
                size = UtilVector.safeSize(aFile);
                if (size > 0) {
                  File[] lFile = new File[size];
                  aFile.toArray(lFile);
                  StatusInformation[] listStatus = beanCvs.executeStatusInformation(lFile);

                  String methodName = "getFile.getCanonicalPath";//getSortMethod();
                  if (UtilString.isNotEmpty(methodName)) {
                    try {
                    Object[] a = UtilSort.sortIncrease(listStatus, methodName);
                    listStatus = new StatusInformation[a.length];
                    for(int i=0 ; i<a.length ; listStatus[i] = (StatusInformation)a[i++]);
                    } catch(Exception ex) {
                      try {
                      } catch(Exception ex1) {}
                    }
                  }

                  initStatusInformation(statusTable, listStatus, beanCvs.getFilePathMain());
                }
              }
            }
            if (statusList != null) {
              if (UtilString.isNotEmpty(szEnd)) {
                iEnd = index + Integer.parseInt(szEnd);
                iEnd = (iEnd > statusList.size()) ? statusList.size() : iEnd;
              }
              else
                iEnd = statusList.size();
              if (UtilString.isNotEmpty(getName())) {
                if (UtilString.isEqualsIgnoreCase(getScope(), "session"))
                  pageContext.getSession().setAttribute(getName(), statusList);
                else
                  pageContext.getRequest().setAttribute(getName(), statusList);
              }
            }
          }
        }
      }
      catch (IOException ex1) {
      }
      catch (CommandException ex1) {
      }
      catch (AuthenticationException ex1) {
      }
      catch (IllegalArgumentException e) {
      }
      catch (NoInitialContextException e) {
      }
    }
    return (((statusList!=null)&&(iEnd>index)) ? EVAL_BODY_BUFFERED : SKIP_BODY);
  }

  public int doAfterBody() {
    BodyContent bc = getBodyContent();
    String szIndexStep = getIndexStepReplaceParamByRequestValue();
    index+=UtilString.isEmpty(szIndexStep) ? 1 : Integer.parseInt(szIndexStep);
    if (bc != null) {
      try {
        JspWriter out = bc.getEnclosingWriter();
        out.println(bc.getString());
        bc.clearBody();
      }
      catch (IOException ioe) {
        Trace.ERROR("Error in BodingTag: ", ioe);
      }
    }
    return (((statusList!=null)&&(iEnd>index)&&(statusList.size()>index)) ? EVAL_BODY_BUFFERED : SKIP_BODY);
  }

  public int doEndTag() {
    return EVAL_PAGE;
  }

  public StatusInformation getCurrentStatus() {
    BeanStatus bean = getCurrentBean();
    return (bean==null) ? null : bean.getStatus();
  }

  public BeanStatus getCurrentBean() {
    return (BeanStatus)UtilVector.safeGetElementAt(statusList, index);
  }

  private void copyListIntoVectorAt(File rootFile, Object[] list, List vecStatus, Hashtable tabStatus, int at, int beanIndex) throws IOException {
/*
    String methodName = getSortMethod();
    if (UtilString.isNotEmpty(methodName)) {
      try {
      list = UtilSort.sortIncrease(list, methodName);
      } catch(Exception ex) {
        try {
        } catch(Exception ex1) {}
      }
    }
*/
    File file = null;
    BeanStatus status = null;
    for( int i=0 ; i<list.length ; i++ ) {
      file = (File)list[i];
      status = new BeanStatus(beanIndex, file, rootFile);
      vecStatus.add(at++, status);
      tabStatus.put(file.getCanonicalPath(), status);
    }
  }
  private void initStatusInformation(Hashtable beanList, StatusInformation[] statusList, File root) throws IOException {
    if(statusList!=null) {
      StatusInformation status = null;
      BeanStatus beanStatus = null;
      int iSizeStatus = statusList.length;
      for(int i=0 ; i<iSizeStatus ; i++) {
        status = statusList[i];
        if ((status!=null) && (status.getFile()!=null)) {
          String name = new File(root.getParent(), status.getFile().getPath()).getCanonicalPath();
          beanStatus = (BeanStatus) beanList.get(name);
          if (beanStatus!=null)
            beanStatus.setStatus(status);
        }
      }
    }
  }

  public String getPathReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(path, pageContext.getRequest(), pageContext.getSession(), "");
  }

  public String getIndexStartReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(indexStart, pageContext.getRequest(), pageContext.getSession(), "");
  }

  public String getIndexEndReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(indexEnd, pageContext.getRequest(), pageContext.getSession(), "");
  }

  public String getIndexStepReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(indexStep, pageContext.getRequest(), pageContext.getSession(), "");
  }

  public String getApplicationReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(application, pageContext.getRequest(), pageContext.getSession(), "");
  }

  /**
 * @param pathToExpand  the pathToExpand to set
 * @uml.property  name="pathToExpand"
 */
public void setPathToExpand(String pathToExpand) {
    this.pathToExpand = pathToExpand;
  }
  public String getPathToExpandReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(pathToExpand, pageContext.getRequest(), pageContext.getSession(), "");
  }

  public String getIncludeSubDirectoryReplaceParamByRequestValue() {
    return UtilRequest.replaceParamByRequestValue(includeSubDirectory, pageContext.getRequest(), pageContext.getSession(), "");
  }

  /**
 * @author  HP_Administrateur
 */
public class BeanStatus {
    private int index;
    private File file;
    private File rootFile;
    private StatusInformation status;
    public BeanStatus(int index, File file, File rootFile) {
      setIndex(index);
      setFile(file);
      setRootFile(rootFile);
    }
    /**
	 * @return  the index
	 * @uml.property  name="index"
	 */
    public int getIndex() {
      return index;
    }
    /**
	 * @return  the file
	 * @uml.property  name="file"
	 */
    public File getFile() {
      return file;
    }
    /**
	 * @return  the rootFile
	 * @uml.property  name="rootFile"
	 */
    public File getRootFile() {
      return rootFile;
    }
    /**
	 * @return  the status
	 * @uml.property  name="status"
	 */
    public StatusInformation getStatus() {
      return status;
    }
    /**
	 * @param index  the index to set
	 * @uml.property  name="index"
	 */
    public void setIndex(int index) {
      this.index = index;
    }
    /**
	 * @param file  the file to set
	 * @uml.property  name="file"
	 */
    public void setFile(File file) {
      this.file = file;
    }
    /**
	 * @param rootFile  the rootFile to set
	 * @uml.property  name="rootFile"
	 */
    public void setRootFile(File rootFile) {
      this.rootFile = rootFile;
    }
    /**
	 * @param status  the status to set
	 * @uml.property  name="status"
	 */
    public void setStatus(StatusInformation status) {
      this.status = status;
    }
    public String getPathRelative() {
      String ret = null;
      if (rootFile!=null) {
        String filePath = null;
        String rootFilePath = null;
        try {filePath = file.getCanonicalPath();} catch(Exception ex) {filePath = file.getAbsolutePath();}
        try {rootFilePath = rootFile.getCanonicalPath();} catch(Exception ex) {rootFilePath = rootFile.getAbsolutePath();}
        if (filePath.startsWith(rootFilePath))
            ret = filePath.substring(rootFilePath.length());
      }
      return ret;
    }
    public String getPathUriRelative() {
      String ret = getPathRelative();
      if (ret!=null)
        ret = ret.replace('\\', '/');
      return ret;
    }
    public String getContent(){
      StringBuffer ret = new StringBuffer();
      if((getFile()!=null)&&(getFile().exists())&&(getFile().isFile())){
        try {
          FileReader fr = new FileReader(getFile());
          int ch = -1;
          while ((ch=fr.read())!=-1){
            ret.append(ch);
          }
        }
        catch (FileNotFoundException ex) {
        }
        catch (IOException ex) {
        }
      }
      return ret.toString();
    }
  }

  /**
 * @param path  the path to set
 * @uml.property  name="path"
 */
public void setPath(String path) {
    this.path = path;
  }

  /**
 * @param application  the application to set
 * @uml.property  name="application"
 */
public void setApplication(String application) {
    this.application = application;
  }

  /**
 * @param name  the name to set
 * @uml.property  name="name"
 */
public void setName(String name) {
    this.name = name;
  }

  /**
 * @param scope  the scope to set
 * @uml.property  name="scope"
 */
public void setScope(String scope) {
    this.scope = scope;
  }

  /**
 * @param indexStart  the indexStart to set
 * @uml.property  name="indexStart"
 */
public void setIndexStart(String indexStart) {
    this.indexStart = indexStart;
  }

  /**
 * @param indexStep  the indexStep to set
 * @uml.property  name="indexStep"
 */
public void setIndexStep(String indexStep) {
    this.indexStep = indexStep;
  }

  /**
 * @param sortMethod  the sortMethod to set
 * @uml.property  name="sortMethod"
 */
public void setSortMethod(String sortMethod) {
    this.sortMethod = sortMethod;
  }

  /**
 * @param indexEnd  the indexEnd to set
 * @uml.property  name="indexEnd"
 */
public void setIndexEnd(String indexEnd) {
    this.indexEnd = indexEnd;
  }

  /**
 * @param iEnd  the iEnd to set
 * @uml.property  name="iEnd"
 */
public void setIEnd(int iEnd) {
    this.iEnd = iEnd;
  }

  /**
 * @param index  the index to set
 * @uml.property  name="index"
 */
public void setIndex(int index) {
    this.index = index;
  }

  /**
 * @param includeSubDirectory  the includeSubDirectory to set
 * @uml.property  name="includeSubDirectory"
 */
public void setIncludeSubDirectory(String includeSubDirectory) {
    this.includeSubDirectory = includeSubDirectory;
  }

  /**
 * @return  the path
 * @uml.property  name="path"
 */
public String getPath() {
    return path;
  }

  /**
 * @return  the application
 * @uml.property  name="application"
 */
public String getApplication() {
    return application;
  }

  /**
 * @return  the name
 * @uml.property  name="name"
 */
public String getName() {
    return name;
  }

  /**
 * @return  the scope
 * @uml.property  name="scope"
 */
public String getScope() {
    return scope;
  }

  /**
 * @return  the statusList
 * @uml.property  name="statusList"
 */
public List getStatusList() {
    return statusList;
  }

  /**
 * @return  the indexStart
 * @uml.property  name="indexStart"
 */
public String getIndexStart() {
    return indexStart;
  }

  /**
 * @return  the indexStep
 * @uml.property  name="indexStep"
 */
public String getIndexStep() {
    return indexStep;
  }

  /**
 * @return  the sortMethod
 * @uml.property  name="sortMethod"
 */
public String getSortMethod() {
    return sortMethod;
  }

  /**
 * @return  the indexEnd
 * @uml.property  name="indexEnd"
 */
public String getIndexEnd() {
    return indexEnd;
  }

  /**
 * @return  the iEnd
 * @uml.property  name="iEnd"
 */
public int getIEnd() {
    return iEnd;
  }

  /**
 * @return  the pathToExpand
 * @uml.property  name="pathToExpand"
 */
public String getPathToExpand() {
    return pathToExpand;
  }

  /**
 * @return  the index
 * @uml.property  name="index"
 */
public int getIndex() {
    return index;
  }

  /**
 * @return  the includeSubDirectory
 * @uml.property  name="includeSubDirectory"
 */
public String getIncludeSubDirectory() {
    return includeSubDirectory;
  }
}
