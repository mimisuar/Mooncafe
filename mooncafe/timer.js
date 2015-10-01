// timer.js //
// By: sheepmanbuddy /

// Used to interact with timer functions. In a better way! //

mooncafe.timer = {}

mooncafe.timer.init = function() {
	mooncafe.L.pushstring("timer");
	mooncafe.L.createtable();
	
	mooncafe.registerFunctions(3, mooncafe.timer.api);
	
	mooncafe.L.settable(1);
}

mooncafe.timer.api = [
	{
		name: "newTimer",
		
		func: function() {
			var callback = mooncafe.check(2, "function");
			var step = mooncafe.check(3, "number");
			var repeating
			
			if (mooncafe.L.isnoneornil(4)) {
				repeating = true;
			} else {
				repeating = mooncafe.check(4, "boolean");
			}
			
			var timer = new mooncafe.timer.Timer(callback, step, repeating);
			
			return timer;
		}
	}
];

mooncafe.timer.Timer = function(callback, step, repeating) {
	this.step = step;
	this.repeating = repeating;
	
	if (repeating) {
		this.id = setInterval(callback, step);
	} else {
		this.id = setTimeout(callback, step);
	}
	
	this.clear = function() {
		if (this.repeating) {
			clearInterval(this.id);
		} else {
			clearTimeout(this.id);
		}
	}
}