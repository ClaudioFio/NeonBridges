var game = null;

function intro()
{
	document.body.style.backgroundImage = "url(./css/images/background/background" + Math.floor(Math.random()*9) + ".jpg)";

	AjaxManager.Logged();

	welcomePopup();
}

function begin()
{
	document.body.removeChild(document.body.getElementsByTagName("footer")[0]);


	game.blocks.addBlock(game.blocks.BLOCK0_LEFT + "%", game.blocks.BLOCK0_WIDTH + "%");
	game.blocks.addBlock(game.blocks.randomLeftSide(), game.blocks.randomWidth());
	
	game.bonus.addBonus();
	window.addEventListener('resize', game.bonus.update, false);

	game.bridges.addNewBridge();
	window.addEventListener('keypress', game.bridges.startIncreasingBridgeHeight.bind(this), false); //per iniziare la crescita del ponte
	window.addEventListener('keyup', game.bridges.stopIncreasingBridgeHeight.bind(this), false); //per interrompere la crescita del ponte

	game.statistics.initializeScore();
	window.addEventListener('resize', function() { updateTextSize(game.statistics.scoreHtmlElement, 25) }, false);

	game.visualbonus.initializeVisualBonus();
	window.addEventListener('resize', function() { updateTextSize(game.visualbonus.bonusHtmlElement, 10) }, false);

	game.player.initialize();
	window.addEventListener('resize', game.player.update, false);


}

function Game()
{
	this.timer = new Timer();
	this.statistics = new Statistics();
	this.visualbonus= new Visualbonus();

	this.playground = new Playground();
	this.player = new Player();
	this.blocks = new Blocks();
	this.bonus = new Bonus();
	this.bridges = new Bridges();
}