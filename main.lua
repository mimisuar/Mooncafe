-- Abstract Squares Demo --

function mooncafe.load()
	x = 0
	y = 0
	width = 100
	height = 100
	color = {0, 0, 0}
	
	rects = {}
	
	for i=1, 1000 do
		local s = {}
		s.width = math.random(10, 100)
		s.height = math.random(10, 100)
		s.x = math.random(mooncafe.graphics.getWidth() - s.width)
		s.y = math.random(mooncafe.graphics.getHeight() - s. height)
		s.color = {math.random(0, 255), math.random(0, 255), math.random(0, 255)}
		
		table.insert(rects, s)
	end
end

function mooncafe.update(dt)
	local moveSpeed = 100 * dt
		
	for _, rect in pairs(rects) do
		rect.x = rect.x + (moveSpeed * math.random(0, 1))
		rect.y = rect.y + (moveSpeed * math.random(0, 1))
		
		if rect.x >= mooncafe.graphics.getWidth() - rect.width then
			rect.x = 0
		end
		
		if rect.y >= mooncafe.graphics.getHeight() - rect.height then
			rect.y = 0
		end
	end
end

function mooncafe.draw()
	for _, rect in pairs(rects) do
		mooncafe.graphics.setColor(rect.color[1], rect.color[2], rect.color[3])
		mooncafe.graphics.rectangle("fill", rect.x, rect.y, rect.width, rect.height)
	end
	
	mooncafe.graphics.setColor(0, 0, 0)
	mooncafe.graphics.rectangle("stroke", 0, 0, mooncafe.graphics.getWidth(), mooncafe.graphics.getHeight())
end