function Timer()
{
	this.INCREASING_BRIDGE_HEIGHT_DELAY = 7;

	this.BRIDGE_ROTATION_DELAY = 1;

	this.MOVING_PLAYER_DELAY = 6;

	this.MOVING_SCENE_DELAY = 6;


	this.clock = null;
}

Timer.prototype.start =
	function(clockFunction, frequency)
	{
		if(this.clock == null && frequency > 0) 
			this.clock = setInterval(clockFunction, frequency);
	}

Timer.prototype.pause =
	function()
	{
		clearInterval(this.clock);
		this.clock = null;
	}