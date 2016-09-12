<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%String DOMAIN_NAME_ROOT = "/Workspace";%>
<html>
	<head>
		<title>
			New
		</title>
	    <!--link href="<%=DOMAIN_NAME_ROOT%>/css/page/common/pagenew.css" rel="stylesheet" type="text/css"/-->
        <jsp:include page="/css/page/common/pagenew.jsp" flush="true"/>
		<script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/page/common/pagenew.js" type="text/javascript"></script>
	</head>
	<body bgcolor="buttonface" onUnLoad="javascript:form_unload()">
		<form name="EditorJavaNew" action="action.servlet" onSubmit="javaScript:form_submit(this);">
			<html:TagInput attrType="hidden" attrName="event" attrValue="EditorJavaPageNewValider"/>
			<html:TagInput attrType="hidden" attrName="Type" attrValue="#R$Type#"/>
			<html:TagInput attrType="hidden" attrName="Path" attrValue="#R$Path#"/>
			<html:TagInput attrType="hidden" attrName="application" attrValue="#R$application#"/>
			<table>
				<tr>
					<td align="center">
						<font class="input_title_inverse">Name</font>
					</td>
				</tr>
				<tr>
					<td>
						<%--input type="file" name="FileName"/--%>
						<input type="text" name="Name" size="40"/>
					</td>
				</tr>
				<tr>
					<td>
						<input type="submit"/>&nbsp;<input type="reset"/>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
