<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%String DOMAIN_NAME_ROOT = "/Workspace";%>
<html>
    <head>
        <title>
            Delete
        </title>
        <!--link href="<%=DOMAIN_NAME_ROOT%>/css/page/common/pagedelete.css" rel="stylesheet" type="text/css"/-->
        <jsp:include page="/css/page/common/pagedelete.jsp" flush="true"/>
        <script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/page/common/pagedelete.js" type="text/javascript"></script>
    </head>
    <body bgcolor="buttonface" onUnLoad="javascript:form_unload()">
        <form name="EditorJavaDelete" action="action.servlet" onSubmit="javascript:form_submit(this)">
            <html:TagInput attrType="hidden" attrName="event" attrValue="EditorJavaPageDeleteValider"/>
            <html:TagInput attrType="hidden" attrName="fileName" attrValue="#R$fileName#"/>
            <html:TagInput attrType="hidden" attrName="application" attrValue="#R$application#"/>
            <table width="100%" height="100%">
                <tr>
                    <td width="100%" height="100%" align="center" valign="center">
                        <input name="button" id="button" type="submit"/>
                    </td>
                </tr>
            </table>
        </form>
<script type="javascript">
document.EditorJavaDelete.button.focus();
</script>
    </body>
</html>
