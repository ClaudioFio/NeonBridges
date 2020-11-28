var lastBonusElement = null;
var secondLastBonuslement = null;

function Bonus()
{
	this.array = new Array(); //array di bonus

	this.numberOfBonus = 0;

	// percentuali
	this.BONUS_WIDTH = 2; 
	this.BONUS_HEIGHT = 20; //uguale per tutti i bonus

}

Bonus.prototype.addBonus =
	function() 
	{
		this.array[this.numberOfBonus] = document.createElement('div');
		this.array[this.numberOfBonus].setAttribute('class', "bonus");
		this.array[this.numberOfBonus].setAttribute('id', "bonus_" + this.numberOfBonus);

		this.array[this.numberOfBonus].style.width = this.BONUS_WIDTH + "%";
		this.array[this.numberOfBonus].style.left =  parseFloat(lastBlockElement.style.left) + (parseFloat(lastBlockElement.style.width) /2) - (this.BONUS_WIDTH / 2) + "%";
		this.array[this.numberOfBonus].style.top = 100-this.BONUS_HEIGHT + "%";
		
		var widthBonusPX=parseFloat(fromPercentageToPixels(game.bonus.BONUS_WIDTH, innerWidth) );
		var hightBonusPC=parseFloat(fromPixelsToPercentage(widthBonusPX, innerHeight) );

		this.array[this.numberOfBonus].style.height =  hightBonusPC/2 + "%";

		++this.numberOfBonus;
		this.updateBonusValues();

		document.body.appendChild(lastBonusElement);

	}

Bonus.prototype.update =
	function()
	{
		var widthBonusPX=parseFloat(fromPercentageToPixels(game.bonus.BONUS_WIDTH, innerWidth) );
		var hightBonusPC=parseFloat(fromPixelsToPercentage(widthBonusPX, innerHeight) );
	
		for(var i=0; i < game.bonus.numberOfBonus; ++i)
			game.bonus.array[i].style.height =  hightBonusPC/2 + "%";


	}

Bonus.prototype.updateBonusValues =
	function()
	{
		lastBonusElement = this.array[game.bonus.numberOfBonus - 1];
		secondLastBonusElement = (this.numberOfBonus > 1) ? this.array[this.numberOfBonus - 2] : null;
	}