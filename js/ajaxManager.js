function AjaxManager() {}

AjaxManager.getAjaxObject = 
	function()
	{
		var xmlHttp = null;
		try 
		{ 
			xmlHttp = new XMLHttpRequest(); 
		} 
			catch(e) 
			{
				try 
				{ 
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE (recent versions)
				} 
					catch(e)
					{
						try 
						{ 
							xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE (older versions)
						} 
							catch(e) 
							{
								xmlHttp = null; 
							}
					}
			}	

		return xmlHttp;
	}

AjaxManager.performAjaxRequest = 
	function(method, url, isAsync, dataToSend, responseFunction)
	{
		var xmlHttp = AjaxManager.getAjaxObject();
		if (xmlHttp === null)
		{
			window.alert("Your browser does not support AJAX!");
			return;
		}

		xmlHttp.open(method, url, isAsync); 
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.onreadystatechange = function ()
		{
			if (xmlHttp.readyState == 4)
			{
				var data = xmlHttp.responseText;	
				responseFunction(data);
			}
		}
		xmlHttp.send(dataToSend);
}

AjaxManager.Logged =
	function()
	{
		var url = "./php/util/logged.php";

		AjaxManager.performAjaxRequest("POST", url, true, null, PressEnter); //PressEnter in utility.js
	}

AjaxManager.Login =
	function()
	{
		var url = "./php/login.php";
		var un = document.getElementById("username").value;
		var pw = document.getElementById("password").value;
		var vars = "username="+un+"&password="+pw;
		
		AjaxManager.performAjaxRequest("POST", url, true, vars, updatePopup);
	}

AjaxManager.Logout =
	function()
	{
		var url = "./php/logout.php";

		AjaxManager.performAjaxRequest("POST", url, true, "noRedirect="+true, loginPopup);
	}

AjaxManager.Registration =
	function()
	{
		var url = "./php/register.php";
		var un = document.getElementById("username").value;
		var pw = document.getElementById("password").value;
		var cpw = document.getElementById("confirm_password").value;
		var vars = "username="+un+"&password="+pw+"&confirm_password="+cpw;

		AjaxManager.performAjaxRequest("POST", url, true, vars, updatePopup);
	}

AjaxManager.MyHighscore =
	function()
	{
		var url = "./php/myHighscore.php";

		AjaxManager.performAjaxRequest("POST", url, true, null, getMyHighscore)
	}

AjaxManager.NewHighscore =
	function()
	{
		var url = "./php/newHighscore.php";
		var vars = "score="+game.statistics.score;

		AjaxManager.performAjaxRequest("POST", url, true, vars, AjaxManager.HighscoreTable);
	}

AjaxManager.HighscoreTable =
	function()
	{
		var url = "./php/highscoreTable.php";

		AjaxManager.performAjaxRequest("POST", url, true, null, gameOverPopup);
	}

AjaxManager.AccountDeletion =
	function()
	{
		var url = "./php/deleteAccount.php";

		AjaxManager.performAjaxRequest("POST", url, true, "noRedirect="+true, loginPopup);
	}