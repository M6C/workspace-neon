Ext.define('Workspace.editorjava.model.Tab', {
    extend: 'Ext.data.Model'
    ,
    config : {
        fields: [
             {name: 'application',  type: 'string'},
             {name: 'autoDeploy',  	type: 'boolean', defaultValue: false},
             {name: 'build',  		type: 'boolean', defaultValue: false},
             {name: 'className',  	type: 'string'},
             {name: 'contentType',  type: 'string'},
             {name: 'id',  			type: 'string'},
             {name: 'leaf',  		type: 'string'},
             {name: 'path',			type: 'string'},
             {name: 'text',  		type: 'string'}
        ]
    }
    ,
    fields: [
         {name: 'application',  type: 'string'},
         {name: 'autoDeploy',  	type: 'boolean', defaultValue: false},
         {name: 'build',  		type: 'boolean', defaultValue: false},
         {name: 'className',  	type: 'string'},
         {name: 'contentType',  type: 'string'},
         {name: 'id',  			type: 'string'},
         {name: 'leaf',  		type: 'string'},
         {name: 'path',			type: 'string'},
         {name: 'text',  		type: 'string'}
    ]
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.model.Tab');});