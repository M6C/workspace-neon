<%@ taglib uri="Framework_Taglib_Xml.tld" prefix="xml" %>
<xml:TagXmlPrinter name="resultDom" scope="session"/>
<%--
<%@ taglib uri="Framework_Taglib_Xml.tld" prefix="xml" %>
<%String DOMAIN_NAME_ROOT = "/Workspace";%>
<html>
	<head>
		<title>
			User
		</title>
	  <!--link href="<%=DOMAIN_NAME_ROOT%>/css/page/common/pageuser.css" rel="stylesheet" type="text/css"/-->
        <jsp:include page="/css/page/common/pageuser.jsp" flush="true"/>
		<script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/page/common/pageuser.js" type="text/javascript"></script>
	</head>
	<body bgcolor="buttonface">
	  <font class="normal">
    	<xml:TagXmlPrinter name="resultDom" scope="session"/>
	  </font>
	</body>
</html>
--%>