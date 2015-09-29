// graphics.js //
// By: sheepmanbuddy //

// Handle canvas and other screen elements //

mooncafe.graphics = {}

mooncafe.graphics.init = function() {
	// first try and create the canvas element //
	
	var potentialCanvas = document.getElementById("mooncafe-canvas");
	mooncafe.canvas = null;
	
	if (potentialCanvas) {
		mooncafe.canvas = potentialCanvas;
	}
	
	if (!mooncafe.canvas) {
		mooncafe.canvas = document.createElement("canvas");
		mooncafe.canvas.width = 800;
		mooncafe.canvas.height = 600;
		document.body.appendChild(mooncafe.canvas);
	}
	
	mooncafe.canvas.innerHTML = "Mooncafe requires the canvas element to function.";
	mooncafe.context = mooncafe.canvas.getContext("2d");
	
	// setup all of the functions //
	mooncafe.L.pushstring("graphics");
	mooncafe.L.createtable();
	
	mooncafe.registerFunctions(3, mooncafe.graphics.api);
	
	mooncafe.L.settable(1);
}

mooncafe.graphics.api = [
	{
		name: "setColor",
		
		func: function() {
			var r = mooncafe.check(2, "number");
			var g = mooncafe.check(3, "number");
			var b = mooncafe.check(4, "number");
			var a;
			
			if (mooncafe.L.isnoneornil(5)) {
				a = 255;
			} else {
				a = mooncafe.check(5, "number");
			}
			
			var color = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
			
			mooncafe.context.fillStyle = color;
			mooncafe.context.strokeStyle = color;
		}
	},
	
	{
		name: "clear",
		
		func: function() {
			mooncafe.context.clearRect(0, 0, mooncafe.canvas.width, mooncafe.canvas.height);
		}
	},
	
	{
		name: "rectangle",
		
		func: function()  {
			var style = mooncafe.check(2, "string");
			var x = mooncafe.check(3, "number");
			var y = mooncafe.check(4, "number");
			var w = mooncafe.check(5, "number");
			var h = mooncafe.check(6, "number");
			
			if (style == "fill") {
				mooncafe.context.fillRect(x, y, w, h);
			}
			else if (style == "stroke") {
				mooncafe.context.strokeRect(x, y, w, h);
			}
			else {
				throw "Invalid style " + style + ".";
			}
		}
	},
	
	{ 
		name: "getWidth",
		
		func: function() {
			return mooncafe.canvas.width;
		}
	},
	
	{
		name: "getHeight",
		
		func: function() {
			return mooncafe.canvas.height;
		}
	},
	
	{
		name: "circle",
		
		func: function() {
			var style = mooncafe.check(2, "string");
			var x = mooncafe.check(3, "number");
			var y = mooncafe.check(4, "number");
			var radius = mooncafe.check(5, "number");
			
			
			
			if (style != "stroke" && style != "fill") {
				throw "Invalid style " + style + ".";
			}
			
			mooncafe.context.beginPath();
			mooncafe.context.arc(x, y, radius, 0, 2 * Math.PI);
			
			if (style == "fill") {
				mooncafe.context.fill();
			} else {
				mooncafe.context.stroke();
			}
		}
	}
]