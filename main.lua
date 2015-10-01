-- Abstract Art Demo --

function mooncafe.load()
	require("middleclass", function(results)
		class = results
		finishLoading()
	end)
end

function finishLoading()
	local shape = class("shape")
	
	function shape.init(this)
		this.width = math.random(5, 100)
		this.height = this.width
		this.radius = this.width / 2
		
		this.shape = math.random(0, 1)
		
		this.x = math.random(0, mooncafe.graphics.getWidth() - this.width)
		this.y = math.random(0, mooncafe.graphics.getHeight() - this.height)
		
		this.color = {math.random(0, 255), math.random(0, 255), math.random(0, 255)}
	end
	
	function shape.update(this, dt)
		local horizontalMovement = math.random(-1, 1)
		local verticleMovement = math.random(-1, 1)
		
		local moveSpeed = (4 * 60) * dt
		
		this.x = this.x + moveSpeed * horizontalMovement
		this.y = this.y + moveSpeed* verticleMovement
		
		if this.x > mooncafe.graphics.getWidth() + this.width then
			this.x = -this.width
		end
		
		if this.y > mooncafe.graphics.getHeight() + this.height then
			this.y = -this.height
		end
		
		if this.x < -this.width then
			this.x = mooncafe.graphics.getWidth() + this.width
		end
		
		if this.y < -this.height then
			this.y = mooncafe.graphics.getHeight() + this.height
		end
	end
	
	function shape.draw(this)
		mooncafe.graphics.setColor(this.color[1], this.color[2], this.color[3]) -- to-do: make setColor accept tables --
		
		if this.shape == 1 then
			-- rectangle --
			mooncafe.graphics.rectangle("fill", this.x, this.y, this.width, this.height);
		else
			mooncafe.graphics.circle("fill", this.x, this.y, this.radius);
		end
	end
	
	-- add all of the shapes --
	shapes = {}
	
	local interval1 = mooncafe.timer.newTimer(function()
		table.insert(shapes, shape())
	end, 100)
	
	local interval2 = mooncafe.timer.newTimer(function()
		table.remove(shapes, 1)
	end, 150)
	
	mooncafe.timer.newTimer(function()
		interval1:clear()
		interval2:clear()
		print("It's all over")
	end, 10000, false)
end

function mooncafe.draw()
	mooncafe.graphics.setColor(0, 0, 0)
	mooncafe.graphics.rectangle("stroke", 0, 0, mooncafe.graphics.getWidth(), mooncafe.graphics.getHeight())
	
	if shapes then
		for i=1, #shapes do
			shapes[i]:draw()
		end
	end
end

function mooncafe.update(dt)
	if shapes then
		for i=1, #shapes do
			shapes[i]:update(dt)
		end
	end
end