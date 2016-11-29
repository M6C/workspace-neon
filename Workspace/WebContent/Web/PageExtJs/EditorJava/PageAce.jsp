<%String DOMAIN_NAME_ROOT = "/Workspace";%>
<html>
<head>
  <title>EditorJava</title>
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/resources/css/ext-all-gray.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/Notification.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/menu/MenuHeader.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/pageextjs/editorjava/styles.css"/>

	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/bootstrap.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/ext-all-debug-w-comments.js"></script>

    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/constant/Constant.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/init/InitLoader.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/editorjava/page.js"></script>

	<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/resources/themes/images/default/tree/s.gif';
	
		function addScript(path) {
			var script = document.createElement('script');
			script.src = DOMAIN_NAME_ROOT + path;
			script.charset = 'utf-8';
			document.getElementsByTagName('head')[0].appendChild(script);
		}

		Ext.onReady(function() {
			if (typeof bravojs == 'undefined') { bravojs = {}; }
			bravojs.url = window.location.protocol + '//' + window.location.host + '<%=DOMAIN_NAME_ROOT%>/jsFramework/ace-extjs-0.1.0/extjs4-ace/Component.js';
			bravojs.mainModuleDir = /^(https?|resource):\/(.*?)\.js$/.exec(bravojs.url)[2];
			bravojs.mainContext = bravojs.mainModuleDir + '/c371cd05c8df40c0af3b1515b808c9d737b98b02';

			addScript('/jsFramework/ace-1.2.5/src-min-noconflict/ace.js');

	        init_loader();

	        addScript('/js/pageextjs/editorjava/window/WindowMenu.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuAction.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuServerWeb.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuToolUpload.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuToolUpload.js');

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