var lastBlockElement = null;
var secondLastBlockElement = null;

function Blocks()
{
	this.array = new Array(); //array di blocchi

	this.numberOfBlocks = 0;

	this.BLOCKS_HEIGHT = 20; //altezza percentuale uguale per tutti i blocchi

	//primo blocco, valori percentuali
	this.BLOCK0_LEFT = 0;
	this.BLOCK0_WIDTH = 30;

	// percentuali
	this.MIN_DISTANCE = 1;
	this.MIN_WIDTH = 4;
	this.MAX_WIDTH = 20;
	this.MIN_DISTANCE_FROM_RIGHT_SIDE = 2; 

	this.lastRandomLeftSide = null; //lato sinistro del blocco successivo
}

Blocks.prototype.addBlock =
	function(left, width) 
	{
		this.array[this.numberOfBlocks] = document.createElement('div');
		this.array[this.numberOfBlocks].setAttribute('class', "block");
		this.array[this.numberOfBlocks].setAttribute('id', "block_" + this.numberOfBlocks);

		this.array[this.numberOfBlocks].style.height = this.BLOCKS_HEIGHT + "%";
		this.array[this.numberOfBlocks].style.width = width;

		this.array[this.numberOfBlocks].style.top = 100 - this.BLOCKS_HEIGHT	 + "%";
		this.array[this.numberOfBlocks].style.left = left;

		var boxShadowColor =new Array("lime","cyan","fuchsia","darkorange","yellow");
		this.array[this.numberOfBlocks].style.boxShadow  = "0 0 5px black, 0 0 25px "+ boxShadowColor[Math.floor(Math.random()*5)];

		++this.numberOfBlocks;

		this.updateBlocksValues();

		document.body.appendChild(lastBlockElement);
	}

Blocks.prototype.updateBlocksValues =
	function()
	{
		lastBlockElement = this.array[game.blocks.numberOfBlocks - 1];
		secondLastBlockElement = (this.numberOfBlocks > 1) ? this.array[this.numberOfBlocks - 2] : null;
	}

Blocks.prototype.randomLeftSide =
	function()
	{
		this.lastRandomLeftSide =	(this.numberOfBlocks === 1) ? 
									(Math.floor(Math.random() * (100 - this.MIN_WIDTH - this.MIN_DISTANCE_FROM_RIGHT_SIDE - this.BLOCK0_WIDTH - this.MIN_DISTANCE + 1)) + this.BLOCK0_WIDTH + this.MIN_DISTANCE) 
											:
									(Math.floor(Math.random() * (100 - this.MIN_WIDTH - this.MIN_DISTANCE_FROM_RIGHT_SIDE - this.BLOCK0_LEFT - this.BLOCK0_WIDTH + parseFloat(lastBlockElement.style.left) + parseFloat(lastBlockElement.style.width) - 100 +1)) + 100);		

						return this.lastRandomLeftSide + "%";
	}

Blocks.prototype.randomWidth =
	function()
	{
		return (this.numberOfBlocks === 1) ?
			((this.lastRandomLeftSide > 100 - this.MAX_WIDTH - this.MIN_DISTANCE_FROM_RIGHT_SIDE) ? 
					(Math.floor(Math.random() * (100 - this.lastRandomLeftSide - this.MIN_DISTANCE_FROM_RIGHT_SIDE - this.MIN_WIDTH + 1)) + this.MIN_WIDTH + "%") 
						: 
					(Math.floor(Math.random() * (this.MAX_WIDTH - this.MIN_WIDTH + 1)) + this.MIN_WIDTH + "%")) 
				: 
			((this.lastRandomLeftSide > 100 + parseFloat(lastBlockElement.style.left) + parseFloat(lastBlockElement.style.width) - this.BLOCK0_LEFT - this.BLOCK0_WIDTH - this.MIN_DISTANCE_FROM_RIGHT_SIDE - this.MAX_WIDTH) ? 
					(Math.floor(Math.random() * (100 + parseFloat(lastBlockElement.style.left) + parseFloat(lastBlockElement.style.width) - this.BLOCK0_LEFT - this.BLOCK0_WIDTH - this.MIN_DISTANCE_FROM_RIGHT_SIDE - this.lastRandomLeftSide - this.MIN_WIDTH + 1)) + this.MIN_WIDTH + "%") 
						: 
					(Math.floor(Math.random() * (this.MAX_WIDTH - this.MIN_WIDTH + 1)) + this.MIN_WIDTH + "%"));
	}