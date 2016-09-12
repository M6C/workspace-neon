<%--
Paramètres à definir pour utiliser ce composant
    * msgTitle : Titre de la page
    * msgText  : Message à afficher
--%>

<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>

<%String DOMAIN_NAME_ROOT = "/Workspace";%>
<html>
    <head>
        <title>
            <request:TagPrintAttribut name="msgTitle" scope="request"/>
        </title>
        <!--link href="<%=DOMAIN_NAME_ROOT%>/css/page/common/pagemessage.css" rel="stylesheet" type="text/css"/-->
        <jsp:include page="/css/page/common/pagemessage.jsp" flush="true"/>
    </head>
    <body bgcolor="buttonface">
    <table class="global">
	    <tr><td class="global">
		    <table class="message" id="messageTable">
			    <tr><td class="title">
					Trace
				</td></tr>
			    <tr><td class="message" id="messageCell">
				    <div id="messageScroll">
				      <html:TagFont attrClass="normal" content="#R$traceOut<encoding=HTML>#"></html:TagFont>
				<%--
				      <font class="normal">
				          <request:TagPrintAttribut name="msgText" scope="request"/>
				      </font>
				--%>
					</div>
				</td></tr>
		    </table>
		</td></tr>
    </table>
    </body>
</html>