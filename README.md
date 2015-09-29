# Mooncafe 

A small Love2d-like game dev framework for javascript.

# Dependencies

Mooncafe uses [lua.vm.js](https://github.com/kripken/lua.vm.js). But it is included in this repository.

# How-To

Added "core.js" to your webpage. Then in an "onload" event call "mooncafe.init()". Everything else should be loaded for you :)

The most basic mooncafe webpage should look like:


```
#!html

<html>  
	<head>  
		<script src="mooncafe/core.js"></script>  
	</head>  
	  
	<body onload="mooncafe.init()"></body>  
</html>
```

Also, don't use the wiki it is out of date.