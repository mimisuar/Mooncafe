// core.js //
// By: sheepmanbuddy //

// The main part of mooncafe. Handles initilzation and is used to organize the files. //

var mooncafe = {};	// mooncafe namespace //
mooncafe.errors = [];

// some info about mooncafe //
mooncafe.version = "0.0.0"
mooncafe.versionName = "pre-alpha"
mooncafe._initialized = false;

// simple utility functions //

mooncafe.require = function(fname, callback) {
	// Load a javascript file. //
	var tag = document.createElement("script");
	tag.src = fname;
	document.head.appendChild(tag);
}

mooncafe.init = function() {
	if (mooncafe._initialized) {
		console.log("Mooncafe has already been initialized.");
		return;
	}
	
	
	mooncafe.require("mooncafe/lua.vm.js");
	mooncafe.require("mooncafe/graphics.js");
	
	var intval = {}
	
	var finish = function() {
		// finish initilizing mooncafe //
		mooncafe.L.createtable();
		
		mooncafe.setIndex(1, "_version", mooncafe.version);
		mooncafe.setIndex(1, "_name", mooncafe.versionName);
		
		mooncafe.graphics.init();
		
		mooncafe.L.setglobal("mooncafe");
		
		// now we load the lua stuff //
		mooncafe.loadFile("mooncafe/boot_min.lua", function(code) { mooncafe.L.execute(code); });
		try {
			mooncafe.loadFile("main.lua", function(code) { 
				mooncafe.L.execute(code); 
				
				// now that we have loaded the file, we can actually start up the game //
				mooncafe.L.getglobal("mooncafe");
				mooncafe.getIndex(1, "boot");
				var boot = mooncafe.check(2, "function");
				boot.call();
			
			});
			
			
		} catch(e) {
			mooncafe.errors.push(e);
			throw "No main.lua found. Please include it.";
		}
	}
	
	// We need to wait until lua.vm.js has been loaded completely before create a new lua state. //
	intval.main = setInterval(function() {
		try {
			mooncafe.L = new Lua.State();
		} catch(e) {
			mooncafe.errors.push(e); // push it because we want to wait //
		}
		
		if (mooncafe.L && mooncafe.graphics) {
			clearInterval(intval.main);
			finish();
			mooncafe._initialized = true;
		}
	}, 1000);
	
}

mooncafe.typeOf = function(index) {
	return mooncafe.L.typename(mooncafe.L.type(index));
}

mooncafe.setIndex = function(tableIndex, indexName, value) {
	// tableIndex[indexName] = value //
	
	mooncafe.L.push(indexName);
	mooncafe.L.push(value);
	
	if (mooncafe.typeOf(tableIndex) == "table") {
		mooncafe.L.settable(tableIndex);
	} else {
		console.log("Type of " + tableIndex + " is not a table.");
		mooncafe.L.pop(2);
	}
}

mooncafe.getIndex = function(tableIndex, indexName) {
	// return tableIndex[indexName] //
	
	mooncafe.L.push(indexName);
	
	if (mooncafe.typeOf(tableIndex) == "table") {
		mooncafe.L.gettable(tableIndex);
	} else {
		mooncafe.L.pop();
		console.log("Type of " + tableIndex + " is not a table.");
	}
}

mooncafe.check = function(pos, type) {
	// return the expected value //
	
	if (mooncafe.typeOf(pos) != type) {
		throw "Expected " + type + ". Got " + mooncafe.typeOf(pos) + ".";
	}
	
	return mooncafe.L.lua_to_js(pos);
}

mooncafe.registerFunctions = function(pos, funcs) {
	for (i = 0; i < funcs.length; i++) {
		
		if (!funcs[i].name) {
			throw "Nil table value.";
		}
		
		if (!funcs[i].func) {
			console.log("Nil will be registered.");
		}
		
		mooncafe.setIndex(pos, funcs[i].name, funcs[i].func);
	}
}

mooncafe.clearStack = function() {
	if (mooncafe.L.gettop() > 0) {
		mooncafe.L.pop(mooncafe.L.gettop());
	}
}

mooncafe.loadFile = function(fname, callback) {
	if (!fname) {
		throw "No file name provided.";
	}
	
	if (!callback) {
		throw "Callback is required.";
	}
	
	var xhr = new XMLHttpRequest();
	
	var response, failed;
	
	xhr.open("GET", fname)
	
	xhr.onload = function() {
		if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
			callback(xhr.response);
		} else {
			throw "Unable to load file " + fname + ".";
		}
	}
	
	xhr.onerror = function() {
		throw "Unable to open file " + fname + ".";
	}
	
	xhr.send();
}