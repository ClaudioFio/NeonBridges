var lastBridgeElement = null;
var bridgeHeight = null;
var bridgeTop = null;

function Bridges()
{
	this.array = new Array();

	this.WIDTH = 0.5; // percentuale

	this.heightCanIncrease = 1; //bool
	this.heightIncrease = 0.5; //percentuale

	//angoli in gradi
	this.rotationAngle = 0;
	this.rotationAngleIncrease = 1;

	this.numberOfBridges = 0;

	//permette di chiamare la setInterval una sola volta dopo la pressione della barra spaziatrice
	this.isFirstKeyPressEvent = 1;
}

Bridges.prototype.addNewBridge =
	function()
	{
		this.array[this.numberOfBridges] = document.createElement('div');
		this.array[this.numberOfBridges].setAttribute('class', "bridge");
		this.array[this.numberOfBridges].setAttribute('id', "bridge_" + this.numberOfBridges);

		this.array[this.numberOfBridges].style.height = "0%";
		this.array[this.numberOfBridges].style.width = this.WIDTH + "%";

		this.array[this.numberOfBridges].style.top = 100 - game.blocks.BLOCKS_HEIGHT + "%";
		this.array[this.numberOfBridges].style.left = parseFloat(secondLastBlockElement.style.left) + parseFloat(secondLastBlockElement.style.width) - this.WIDTH + "%";

		++this.numberOfBridges;

		lastBridgeElement = this.array[game.bridges.numberOfBridges - 1]; //cache

		document.body.appendChild(lastBridgeElement);	
	}

Bridges.prototype.startIncreasingBridgeHeight = 
	function(event)
	{
		if(game.bridges.heightCanIncrease)
		{
			event = (!event) ? window.event : event; //evento undefined su I.E.
			var pressedKey = (event.which != null) ? event.which : event.keyCode; //event.which su Firefox



			if(pressedKey == SPACE_KEY && game.bridges.isFirstKeyPressEvent)
			{
				game.bridges.isFirstKeyPressEvent = 0;
				game.bridges.updateBridgeValues();
				game.timer.start(game.bridges.increaseBridgeHeight, game.timer.INCREASING_BRIDGE_HEIGHT_DELAY);
			}
		}
	}


Bridges.prototype.increaseBridgeHeight =
	function()
	{
		var x = document.getElementById('visualbonus');
		if(x.style.opacity == 1)
			x.style.opacity = 0;

		bridgeHeight = bridgeHeight + game.bridges.heightIncrease;
		lastBridgeElement.style.height = bridgeHeight + "%";

		bridgeTop = bridgeTop - game.bridges.heightIncrease;
		lastBridgeElement.style.top = bridgeTop + "%";
	}

Bridges.prototype.stopIncreasingBridgeHeight = 
	function(event)
	{
		event = (!event) ? window.event : event; //evento undefined su I.E.
		var upKey = (event.which != null) ? event.which : event.keyCode; //event.which su Firefox

		if(upKey == SPACE_KEY && game.bridges.heightCanIncrease)
		{
			game.timer.pause();
			game.bridges.heightCanIncrease = 0;
			game.timer.start(game.bridges.rotateBridge, game.timer.BRIDGE_ROTATION_DELAY);
		}
	}

Bridges.prototype.rotateBridge =
	function()
	{
		if(game.bridges.rotationAngle < 90)
		{
			game.bridges.rotationAngle = game.bridges.rotationAngle + game.bridges.rotationAngleIncrease;
				//https://www.w3.org/TR/css-transforms-1/
			lastBridgeElement.style.transform = "rotate(" + game.bridges.rotationAngle + "deg)";
		}

		if(game.bridges.rotationAngle >= 90)
		{
			game.bridges.swapBridgeProperties();
		}
	}

Bridges.prototype.swapBridgeProperties =
	function()
	{
		game.timer.pause();
		this.isFirstKeyPressEvent = 1;

		lastBridgeElement.style.transform = "rotate(0deg)";

		lastBridgeElement.style.top = 100 - game.blocks.BLOCKS_HEIGHT + "%";

		var newHeight = fromPercentageToPixels(lastBridgeElement.style.height, innerHeight);
		var newWidth = fromPercentageToPixels(lastBridgeElement.style.width, innerWidth);

		//scambio tra proprieta' width e height (Chrome tronca valori razionali di pixel)
		lastBridgeElement.style.width = fromPixelsToPercentage(newHeight, innerWidth);
		lastBridgeElement.style.height = fromPixelsToPercentage(newWidth, innerHeight);
		lastBridgeElement.style.left = game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - this.WIDTH + "%"; // per evitare dei bug grafici

		game.player.startMoving(game.statistics.hasSucceed());
	}

Bridges.prototype.resetFlags =
	function()
	{
		this.heightCanIncrease = 1;
		this.rotationAngle = 0;
	}

Bridges.prototype.updateBridgeValues =
	function()
	{
		bridgeHeight = 0; // percentuale
		bridgeTop = 100 - game.blocks.BLOCKS_HEIGHT; // percentuale
	}