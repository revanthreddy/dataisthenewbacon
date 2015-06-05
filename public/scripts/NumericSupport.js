engine.on('UpdateNumericPosition', function (id, data) {
	engine.call('GetNumericPosition', data).then(function (bounds) { 
		var element = document.getElementById('n' + id);
		var elementStyle = element.style;
		elementStyle.top = bounds.Y + 'px';
		elementStyle.left = bounds.X + 'px';
		var update = false;
		if (elementStyle.width != width) {
			elementStyle.width = width;
			update = true;
		}
		var height = bounds.Height + 'px';
		if (elementStyle.height != height) {
			elementStyle.height = height;
			update = true;
		}
		if (update == true) {
			$('#n' + id).jqxNumberInput({ width: bounds.Width + 'px', height: bounds.Height + 'px' });                
			}
	});
});

engine.on('UpdateButtonPosition', function (id, data) {
	engine.call('GetNumericPosition', data).then(function (bounds) { 
		var element = document.getElementById('n' + id);
		element.style.top = bounds.Y + 'px';
		element.style.left = bounds.X + 'px';
		element.style.width = bounds.Width + 'px';
		element.style.height = bounds.Height + 'px';
		$('#n' + id).jqxButton({ width: bounds.Width + 'px', height: bounds.Height + 'px' });                
	});
});

engine.on('UpdateSliderPosition', function (id, data) {
	engine.call('GetNumericPosition', data).then(function (bounds) { 
		var element = document.getElementById('n' + id);
		element.style.top = bounds.Y + 'px';
		element.style.left = bounds.X + 'px';
		element.style.width = bounds.Width + 'px';
		element.style.height = bounds.Height + 'px';
		$('#n' + id).jqxSlider({ width: bounds.Width + 'px', height: bounds.Height + 'px' });                
	});
});

engine.on('UpdateGaugePosition', function (id, data) {
	engine.call('GetNumericPosition', data).then(function (bounds) { 
		var element = document.getElementById('n' + id);
		element.style.top = bounds.Y + 'px';
		element.style.left = bounds.X + 'px';
		element.style.width = bounds.Width + 'px';
		element.style.height = bounds.Height + 'px';
		$('#n' + id).jqxGauge({ width: bounds.Width + 'px', height: bounds.Height + 'px' });                
	});
});

engine.on('createCanvasRating', function (settings) {
	var element = document.createElement('div');
	element.id = settings.id;
	element.style.position = 'absolute';
	var parent = document.getElementById('FPCanvas');
	parent.appendChild(element);
	$('#' + settings.id).jqxRating({ theme: 'classic' });
});

engine.on('UpdateRatingPosition', function (id, data) {
	engine.call('GetRatingPosition', data).then(function (bounds) { 
		var element = document.getElementById('n' + id);
		var elementStyle = element.style;
		var label = document.getElementById('ln' + id);                   
		elementStyle.top = bounds.Y + 'px';
		elementStyle.left = bounds.X + 'px';
		var width = bounds.Width + 'px';
		var update = false;
		if (elementStyle.width != width) {
			elementStyle.width = width;
			update = true;
		}
		var height = bounds.Height + 'px';
		if (elementStyle.height != height) {
			elementStyle.height = height;
			update = true;
		}
		if (update == true) {
			$('#n' + id).jqxRating({ width: width, height: height });                
		}
		label.style.top = (bounds.Y - 20) + 'px';
		label.style.left = bounds.X + 'px';
		label.style.width = bounds.Width + 'px';
		label.style.height = bounds.Height + 'px';
	});
});

designerCodeLoaded();
					  