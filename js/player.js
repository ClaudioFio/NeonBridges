var playerLeft = null;

var skinPlayer=0;

function Player()
{
	this.htmlElement = document.createElement('div');

	//percentuali, altrimenti diventerebbe un rettangolo
	this.WIDTH = 7; //rispetto alla larghezza della finestra
	this.movementIncrease = 0.5;

	this.finishSpot = null; //punto di arrivo, in percentuale
	this.success = true; //vale true se il ponte e' stato posizionato correttamente, booleano
}

Player.prototype.initialize =
	function(player)
	{
		this.htmlElement.setAttribute('class', "player");
		this.htmlElement.setAttribute('id', "player");
		this.htmlElement.style.backgroundImage= "url(./css/images/Player" +skinPlayer+ ".png)";

		this.htmlElement.style.width = this.WIDTH + "%";
		game.player.update();

		document.body.appendChild(this.htmlElement);
	}

Player.prototype.update =
	function()
	{
		game.player.htmlElement.style.height = fromPercentageToPixels(game.player.WIDTH, innerWidth);


		var widthPlayerPX=parseFloat(fromPercentageToPixels(game.player.WIDTH, innerWidth) );
		var hightPlayerPC=parseFloat(fromPixelsToPercentage(widthPlayerPX, innerHeight) );

		game.player.htmlElement.style.top =(100 - game.blocks.BLOCKS_HEIGHT - hightPlayerPC )+ "%";

		game.player.htmlElement.style.left = (game.player.success) ? 
			 game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - game.player.WIDTH - game.bridges.WIDTH + "%" 
				: 
			playerLeft + "%";
	}

Player.prototype.startMoving =
	function(success)
	{
		this.success = success;
		this.finishSpot = (success) ? 
			parseFloat(lastBlockElement.style.left) + parseFloat(lastBlockElement.style.width) - game.bridges.WIDTH - this.WIDTH
				:
			parseFloat(lastBridgeElement.style.left) + parseFloat(lastBridgeElement.style.width) - this.WIDTH;
				
		this.updatePlayerValues();
		game.timer.start(game.player.move, game.timer.MOVING_PLAYER_DELAY);
	}

Player.prototype.move =
	function()
	{
		if(parseFloat(game.player.htmlElement.style.left) < game.player.finishSpot)
		{
			playerLeft = playerLeft + game.player.movementIncrease;
			game.player.htmlElement.style.left = playerLeft + "%";
		}

		//fine raggiunta	
		if(parseFloat(game.player.htmlElement.style.left) >= game.player.finishSpot)
		{
			game.player.htmlElement.style.left = game.player.finishSpot + "%";

			game.timer.pause();

			if(game.player.success)
			{
				game.statistics.updateScore(); 

				game.blocks.addBlock(game.blocks.randomLeftSide(), game.blocks.randomWidth());
				game.bonus.addBonus();
				game.timer.start(game.playground.moveScene, game.timer.MOVING_SCENE_DELAY);

			}
			else game.statistics.gameOver();
		}
	}

Player.prototype.updatePlayerValues =
	function()
	{
		playerLeft = game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - this.WIDTH - game.bridges.WIDTH;
	}