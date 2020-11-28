function Playground()
{
	this.movementIncrease = 0.8;
	this.numberOfMovingBlocks = 8;// Se sono motlo sfortunato questo è il numero massimo
	this.numberOfMovingBonus = 8; 
	this.numberOfMovingBridges = 6;
}

Playground.prototype.moveScene =
	function()
	{
		if(parseFloat(secondLastBlockElement.style.left) + parseFloat(secondLastBlockElement.style.width) > game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH)
		{
			for(var j = (game.blocks.numberOfBlocks<game.playground.numberOfMovingBlocks)?0:(game.blocks.numberOfBlocks-game.playground.numberOfMovingBlocks); j <= game.blocks.numberOfBlocks - 1; ++j)
				game.blocks.array[j].style.left = parseFloat(game.blocks.array[j].style.left) - game.playground.movementIncrease + "%";

			for(var j = (game.bonus.numberOfBonus<game.playground.numberOfMovingBonus)?0:(game.bonus.numberOfBonus-game.playground.numberOfMovingBonus); j <= game.bonus.numberOfBonus - 1; ++j)
				game.bonus.array[j].style.left = parseFloat(game.bonus.array[j].style.left) - game.playground.movementIncrease + "%";


			for(var j = (game.bridges.numberOfBridges<game.playground.numberOfMovingBridges)?0:(game.bridges.numberOfBridges-game.playground.numberOfMovingBridges); j <= game.bridges.numberOfBridges - 1; ++j)
				game.bridges.array[j].style.left = parseFloat(game.bridges.array[j].style.left) - game.playground.movementIncrease + "%";

			//player
			game.player.htmlElement.style.left = parseFloat(game.player.htmlElement.style.left) - game.playground.movementIncrease + "%";
				
		}

		if(parseFloat(secondLastBlockElement.style.left) + parseFloat(secondLastBlockElement.style.width) <= game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH)
		{	
			game.timer.pause();
			game.bridges.addNewBridge();
			game.bridges.resetFlags();
		}
	}