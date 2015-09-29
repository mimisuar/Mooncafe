local LmcA2auZ
function mooncafe.boot()
for Q,ZA in pairs{"load","update","draw"}do if
not mooncafe[ZA]then mooncafe[ZA]=function()end end end
math.randomseed(js.global.Date:now())LmcA2auZ=js.global.Date:now()if mooncafe.load then
mooncafe.load()end
js.global:setInterval(mooncafe.run,1/60)end
function mooncafe.run()local _IQQ=js.global.Date:now()
if mooncafe.update then mooncafe.update((
_IQQ-LmcA2auZ)/1000)end;LmcA2auZ=_IQQ;if mooncafe.draw then mooncafe.graphics.clear()
mooncafe.draw()end end