mooncafe = {}

local lastUpdate

function mooncafe.boot()
	mooncafe._version = "0.0.1"
	
	local calls = {
		"update",
		"draw",
		"load"
	}
	
	for i=1, #calls do
		if not mooncafe[calls[i]] then
			mooncafe[calls[i]] = function() end
		end
	end
	
	lastUpdate = js.global.Date:now()
	
	mooncafe.load()
	
	mooncafe.run()
end

function mooncafe.run()
	local ct = js.global.Date:now()
	mooncafe.update((ct - lastUpdate) / 1000)
	lastUpdate = ct
	
	mooncafe.graphics.clear()
	mooncafe.draw()
	
	js.global:requestAnimationFrame(mooncafe.run)
end