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
			
			var color = "rgba(" + r + ", " + g + ", " + ", " + b + ", " + a + ")";
			
			mooncafe.L.fillStyle = color;
			mooncafe.L.fillStyle = color;
			
			//
		}
	}
]