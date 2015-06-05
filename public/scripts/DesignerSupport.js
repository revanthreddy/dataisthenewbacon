function initDesignerSupport() {
	
	engine.on('addCode', function (js) {
	  var e = document.createElement('script');
	  e.type = 'text/javascript';
	  e.src  = 'data:text/javascript;charset=utf-8,' + escape(js);
	  document.body.appendChild(e);
	});	
	
	engine.on('addServerCode', function (js) {
	  var e = document.createElement('script');
	  e.type = 'text/javascript';
	  e.src  = js;
	  document.body.appendChild(e);
	});	

	engine.on('recomputeBounds', function (id, token) {
		var element = document.getElementById(id);
		if (element != null)
		{
			var bounds = element.getBoundingClientRect();
			engine.call('boundsRecomputed', id, token, bounds.left, bounds.top, bounds.width, bounds.height);
		}
		else
		{
			engine.call('boundsRecomputed', id, token, 0, 0, -1, -1);
		}
	});
	
	engine.on('changeClass', function(id, toAdd, toRemove) {
		$('#' + id).removeClass(toRemove);
		if (!$('#' + id).hasClass(toAdd)) {
			$('#' + id).addClass(toAdd);
		}
	});
	
	engine.on('removeElement', function (id) {
		var element = document.getElementById(id);
		if (element != null)
		{
			element.parentNode.removeChild(element);
		}
	});

	engine.call('DocumentReady');	
}

function designerCodeLoaded() {
	engine.call('DesignerCodeLoaded');
}
