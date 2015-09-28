# Mooncafe 

A small Love2d-like game dev framework for javascript.

# Dependencies

Mooncafe only requires [lua.vm.js](https://github.com/kripken/lua.vm.js). You need to link the lua.vm.js file to your html page.

# How-To

You need to link the appropriate .js files in the mooncafe folder to your webpage. Then in the body's onload function put 'mooncafe.init()'. If boot.lua is NOT in the same folder as the webpage, you must put it's relative address as the argument for init(). A main.lua file must be with your webpage.