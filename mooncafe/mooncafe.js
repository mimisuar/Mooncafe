mooncafe = {
	doFile: function(L, fname, callback) {
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", fname);
		xhr.onload = function() {
			if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
				L.execute(xhr.response);
				if (callback) {
					callback();
				}
			} else {
				throw "Unable to open " + fname + ".";
			}
		}
		
		xhr.onerror = function() {
			throw "Unable to open " + fname + "."
		}
		
		xhr.send();
	},
	
	newState: function() {
		var L = new Lua.State();
		return L;
	},
	
	init: function(bootlocation) {
		if (!bootlocation) { 
			bootlocation = "boot.lua";
		}
		mooncafe.L = mooncafe.newState();
		mooncafe.canvas = document.createElement("canvas");
		mooncafe.canvas.width = 800
		mooncafe.canvas.height = 600
		mooncafe.canvas.id = "mooncafe-canvas"
		mooncafe.canvas.innerHTML = "Unable to create canvas."
		document.body.appendChild(mooncafe.canvas)
		mooncafe.context = mooncafe.canvas.getContext("2d");
		
		// call up the main function //
		try {
			mooncafe.doFile(mooncafe.L, bootlocation);
		} catch (err) {
			throw "Unable to open boot.lua. Unable to start game.";
		}
		
		mooncafe.doFile(mooncafe.L, "main.lua", function() {
			mooncafe.L.getglobal("mooncafe"); // 1
			
			mooncafe.graphics.init(mooncafe.L);
			
			var mc = mooncafe.L.lua_to_js(1);
			if (mc) {
				var boot = mc.get("boot");
				
				if (boot) {
					boot();
				}
			}
		});
	}
}

mooncafe.graphics = {
	init: function(L) {
		L.pushstring("graphics"); // 2
		L.createtable(); // 
		
		L.pushstring("clear"); // 4
		L.pushjs(mooncafe.graphics.clear); // 5
		L.settable(3)
		
		L.pushstring("setColor");
		L.pushjs(mooncafe.graphics.setColor);
		L.settable(3);
		
		L.pushstring("rectangle");
		L.pushjs(mooncafe.graphics.rectangle);
		L.settable(3);
		
		L.pushstring("getWidth");
		L.pushjs(mooncafe.graphics.getWidth);
		L.settable(3);
		
		L.pushstring("getHeight");
		L.pushjs(mooncafe.graphics.getHeight);
		L.settable(3);
		
		L.pushstring("setWidth");
		L.pushjs(mooncafe.graphics.setWidth);
		L.settable(3);
		
		L.pushstring("setHeight");
		L.pushjs(mooncafe.graphics.setHeight);
		L.settable(3);
		
		L.pushstring("newImage");
		L.pushjs(mooncafe.graphics.newImage);
		L.settable(3);
		
		L.pushstring("draw");
		L.pushjs(mooncafe.graphics.draw);
		L.settable(3);
		
		
		
		L.settable(1)
	},
	
	clear: function() {
		mooncafe.context.clearRect(0, 0, mooncafe.canvas.width, mooncafe.canvas.height);
		return 0;
	},
	
	setColor: function() {
		var str = L.tostring(2);
		mooncafe.console.log(str);
		mooncafe.context.strokeStyle = str;
		mooncafe.context.fillStyle = str;
		return 0;
	},
	
	rectangle: function() {
		var style = mooncafe.L.tostring(2);
		var x = mooncafe.L.tonumber(3);
		var y = mooncafe.L.tonumber(4);
		var w = mooncafe.L.tonumber(5);
		var h = mooncafe.L.tonumber(6);
		
		if (style == "stroke") {
			mooncafe.context.strokeRect(x, y, w, h);
		} else if (style == "fill") {
			mooncafe.context.fillRect(x, y, w, h);
		} else {
			throw "Invalid rectangle mode " + style + ".";
		}
		
		return 0;
	},
	
	getWidth: function() {
		return mooncafe.canvas.width;
	},
	
	getHeight: function() {
		return mooncafe.canvas.height;
	},
	
	setWidth: function() {
		mooncafe.canvas.width = mooncafe.L.tonumber(2);
	},
	
	setHeight: function() {
		mooncafe.canvas.height = mooncafe.L.tonumber(2);
	},
	
	newImage: function() {
		var img = new Image();
		
		img.src = mooncafe.L.tostring(2);
		
		return img;
	},
	
	draw: function() {
		var img = mooncafe.L.lua_to_js(2);
		
		if (img.width == 0 || img.height == 0) {
			// assume the image hasn't loaded yet //
			return;
		}
		
		var x, y;
		if (mooncafe.L.isnoneornil(3)) {
			x = 0;
		} else {
			x = mooncafe.L.tonumber(3);
		}
		
		if (mooncafe.L.isnoneornil(4)) {
			y = 0;
		} else {
			y = mooncafe.L.tonumber(4);
		}
		
		
		
		mooncafe.context.drawImage(img, x, y);
	}
}

