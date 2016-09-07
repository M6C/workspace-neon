<html>
<head>
  <title>EditorJava</title>
    <link rel="stylesheet" type="text/css" href="/WorkSpace/jsFramework/ext-4.0.7/resources/css/ext-all-gray.css" />
    <link rel="stylesheet" type="text/css" href="/WorkSpace/css/componentextjs/menu/MenuHeader.css" />
    <link rel="stylesheet" type="text/css" href="/WorkSpace/css/pageextjs/editorjava/styles.css"/>

    <script type="text/javascript" src="/WorkSpace/jsFramework/ext-4.0.7/ext-all-debug-w-comments.js"></script>
    <script type="text/javascript" src="/WorkSpace/js/commonextjs/init/InitLoader.js"></script>
    <script type="text/javascript" src="/WorkSpace/js/pageextjs/editorjava/page.js"></script>
    <script type="text/javascript" src="/WorkSpace/js/pageextjs/editorjava/window/WindowMenu.js"></script>
    <%--
	<script type="text/javascript" src="/WorkSpace/js/pageextjs3/editorjava/menu/MenuAction.js"></script>
	<script type="text/javascript" src="/WorkSpace/js/pageextjs3/editorjava/window/Package.js"></script>
	--%>

	<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '/WorkSpace/jsFramework/ext-4.0.7/resources/themes/images/default/tree/s.gif';
	
		Ext.onReady(function() {
			init_loader();
    		init_page();
    	});
	</script>
</head>
<body>
	<div id="popup_log" class="x-hidden"><div id="popup_log_window"></div></div>
    <table cellspacing="0" cellpadding="0" width="100%" height="100%" id="menuTable" style='background-color:none'>
    <tr height="10%" valign="top" align="center">
        <td colspan="2" valign="top">
            <div id="reloadmenu">
				<jsp:include page="/Web/ComponentExtJs/Menu/EditorJava/MenuHeader.jsp" flush="true"/>
            </div>
        </td>
    </tr>
    </table>
</body>
</html>