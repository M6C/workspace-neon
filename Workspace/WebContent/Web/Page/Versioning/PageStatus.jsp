<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Workspace_Taglib_Versionning.tld" prefix="versionning" %>
<%String DOMAIN_NAME_ROOT = "/Workspace";%>
<html>
    <head>
        <title>
            Status Information
        </title>
	        <!--link href="<%=DOMAIN_NAME_ROOT%>/css/page/versioning/pagestatus.css" rel="stylesheet" type="text/css"-->
        <jsp:include page="/css/page/versioning/pagestatus.jsp" flush="true"/>
		<script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/page/versioning/pagestatus.js" type="text/javascript"></script>
	</head>
	<body>
                        <versionning:TagStatus application="#R$application#" path="#R$path#" name="statusInformation" scope="request"/>
			<table class="memo">
		    		<tr valign="top">
				    	<td>
						<request:TagPrintAttribut name="statusInformation" scope="request"/>
	    				</td>
		    		</tr>
        		</table>
	</body>
</html>
