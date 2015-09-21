function mooncafe.load()
	myImage = mooncafe.graphics.newImage("brick2.png")
	print(myImage)
end

function mooncafe.update(dt)
	
end

function mooncafe.draw()
	mooncafe.graphics.rectangle("stroke", 0, 0, 800, 600)
	mooncafe.graphics.draw(myImage, 0, 0)
end