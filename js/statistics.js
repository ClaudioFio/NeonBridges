var highscoreArray = null;

function createHighscoreArray(data)
{
	highscoreArray = JSON.parse(data);
}

var MyHighscore = null;

function getMyHighscore(data)
{
	MyHighscore = data;
}

function Statistics()
{
	this.score = 0;

	this.scoreHtmlElement = document.createElement('div');
	this.scoreHtmlElementText = document.createTextNode(this.score);
}


Statistics.prototype.hasSucceed =	
	function()
	{			// tutte percentuali
		if(  	( game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - game.bridges.WIDTH + parseFloat(lastBridgeElement.style.width)  <= parseFloat(lastBonusElement.style.left) + parseFloat(lastBonusElement.style.width) )
				 && 
				( game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - game.bridges.WIDTH + parseFloat(lastBridgeElement.style.width)  >= parseFloat(lastBonusElement.style.left) )	
		)
			{	
				this.updateScore();
				fadeIn(lastBonusElement, 1, 0, 5);
				lastBonusElement.style.background= 'darkviolet';
				lastBonusElement.style.boxShadow  = "0 0 5px black, 0 0 25px purple";
				fadeIn(lastBonusElement, 0, 1, 2);

				game.visualbonus.perfectPop();
			}

		return (( game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - game.bridges.WIDTH + parseFloat(lastBridgeElement.style.width) <= parseFloat(lastBlockElement.style.left) + parseFloat(lastBlockElement.style.width) ) 
					&&  
				( game.blocks.BLOCK0_LEFT + game.blocks.BLOCK0_WIDTH - game.bridges.WIDTH + parseFloat(lastBridgeElement.style.width) >= parseFloat(lastBlockElement.style.left) ) ) ? true : false;
	}

Statistics.prototype.initializeScore =
	function()
	{
		this.scoreHtmlElement.setAttribute('id', "score");

		updateTextSize(this.scoreHtmlElement, 25);

		//aggiunta del text-node
		this.scoreHtmlElement.appendChild(this.scoreHtmlElementText);

		document.body.appendChild(this.scoreHtmlElement);
	}

Statistics.prototype.updateScore =
	function()
	{	
		++this.score;
		this.scoreHtmlElement.firstChild.nodeValue = this.score;
	}

Statistics.prototype.gameOver =
	function()
	{
		if(game.statistics.score > MyHighscore) AjaxManager.NewHighscore();
			else AjaxManager.HighscoreTable();
	}

Statistics.prototype.restart =
	function()
	{
		for(var i=0; i < game.blocks.numberOfBlocks; ++i)
			document.body.removeChild(game.blocks.array[i]);

		for(var i=0; i < game.bonus.numberOfBonus; ++i)
			document.body.removeChild(game.bonus.array[i]);

		for(var i = 0; i < game.bridges.numberOfBridges; ++i)
			document.body.removeChild(game.bridges.array[i]);

		document.body.removeChild(game.statistics.scoreHtmlElement);
		document.body.removeChild(game.visualbonus.bonusHtmlElement);
		document.body.removeChild(game.player.htmlElement);
	}

function Visualbonus()
{
	this.bonusHtmlElement = document.createElement('div');
	this.bonusHtmlElementText = document.createTextNode(" Perfect !");
}

Visualbonus.prototype.initializeVisualBonus =
	function()
	{
		this.bonusHtmlElement.setAttribute('id', "visualbonus");

		updateTextSize(this.bonusHtmlElement, 10);

		//aggiunta del text-node
		this.bonusHtmlElement.appendChild(this.bonusHtmlElementText);
		document.body.appendChild(this.bonusHtmlElement);
	}

Visualbonus.prototype.perfectPop =	
	function()
	{			fadeIn(this.bonusHtmlElement, 0, 1, 5);
				
				this.bonusHtmlElement.style.opacity=0;
	}
