// core.js //
// By: sheepmanbuddy //

// The main part of mooncafe. Handles initilzation and is used to organize the files. //

var mooncafe = {};	// mooncafe namespace //
mooncafe.errors = [];

// some info about mooncafe //
mooncafe.version = "0.0.0"
mooncafe.versionName = "pre-alpha"

// simple utility functions //

mooncafe.require = function(fname, callback) {
	// Load a javascript file. //
	var tag = document.createElement("script");
	tag.src = fname;
	document.head.appendChild(tag);
}

mooncafe.init = function() {
	
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