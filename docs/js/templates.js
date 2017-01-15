(function($) {
	var loadTemplates = function(path){
		Stevenson.ui.Loader.display('Loading templates...', 100);
		Stevenson.repo.getFiles({
			path: '_layouts',
			success: function(layouts){
				$('#templates').html('');
				Stevenson.repo.getFiles({
					path: '_editors',
					success: function(editors){
						$.each(layouts, function(index, layout){
							if(layout.path.indexOf('_layouts') != -1 && layout.path != '_layouts'){
								Stevenson.log.info('Adding layout: '+layout.path);
								var id = layout.path.replace('.html','').replace('_layouts/','');
								layout.id = id;
								layout.editorurl = '/cms/edit.html?new=true#_editors/' + id + '.json';
								for(var i=0;i<editors.length;i++){
									if(editors[i].path == '_editors/'+id+'.json'){
										layout.editorurl = '/cms/edit.html#_editors/' + id + '.json';
										break;
									}
								}
								$('#templates').mustache('template', layout);
							}
						});
						Stevenson.ui.Loader.hide();
					},
					error: function(message){
						Stevenson.ui.Loader.hide();
						Stevenson.ui.Messages.displayError('Unable to load editors: ' + message);
					}
				});
			},
			error: function(message){
				Stevenson.ui.Loader.hide();
				Stevenson.ui.Messages.displayError('Unable to load templates: ' + message);
			}
		});
		Stevenson.repo.getFiles({
			path: '_schemas',
			success: function(schemas){
				$('#templates').html('');
				Stevenson.repo.getFiles({
					path: '_schemas',
					success: function(schemas){
						$.each(schemas, function(index, schema){
							if(schema.path.indexOf('_schemas') != -1 && schema.path != '_schemas'){
								Stevenson.log.info('Adding schema: '+schema.path);
								var id = schema.path.replace('.html','').replace('_schemas/','');
								schema.id = id;
								schema.schemaurl = '/cms/edit.html?new=true#_schemas/' + id + '.json';
								for(var i=0;i<schemas.length;i++){
									if(schemas[i].path == '_schemas/'+id+'.json'){
										schema.schemaurl = '/cms/edit.html#_schemas/' + id + '.json';
										break;
									}
								}
								$('#templates').mustache('template', schema);
							}
						});
						Stevenson.ui.Loader.hide();
					},
					error: function(message){
						Stevenson.ui.Loader.hide();
						Stevenson.ui.Messages.displayError('Unable to load schemas: ' + message);
					}
				});
			},
			error: function(message){
				Stevenson.ui.Loader.hide();
				Stevenson.ui.Messages.displayError('Unable to load templates: ' + message);
			}
		});
	};
	Stevenson.ext.afterInit(function() {
		
		Stevenson.log.info('Initializing files');
		$('#new-template').submit(function(){
			var templateName = $('input[name=template-name]').val();
			if(templateName.indexOf('.html') == -1){
				templateName += '.html';
			}
			window.location = '/cms/edit.html?new=true#_layouts/'+templateName;
			return false;
		});
		$('.breadcrumb .repo').html(Stevenson.Account.repo);
		loadTemplates();
	});
})(jQuery);
