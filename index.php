<?php
    session_start();
	include "./php/util/session.php";
?>

<!DOCTYPE html>
<html lang="en">
    <head>
		<meta charset="utf-8">
		<meta name="author" content="Claudio Fiorenza">
		<title>Neon Bridges</title> 

		<link rel="shortcut icon" type="image/png" href="./css/images/favicon.png" />

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="./css/game.css">
		<link href="https://fonts.googleapis.com/css?family=Comfortaa&display=swap" rel="stylesheet">

		<!-- JavaScript -->
		<script type="text/javascript" src="./js/ajaxManager.js"></script>
		<script type="text/javascript" src="./js/game.js"></script>
		<script type="text/javascript" src="./js/timer.js"></script>
		<script type="text/javascript" src="./js/statistics.js"></script>
		<script type="text/javascript" src="./js/playground.js"></script>
		<script type="text/javascript" src="./js/popups.js"></script>
		<script type="text/javascript" src="./js/htmlElements.js"></script>
		<script type="text/javascript" src="./js/toolsDivs.js"></script>
		<script type="text/javascript" src="./js/player.js"></script>
		<script type="text/javascript" src="./js/blocks.js"></script>
		<script type="text/javascript" src="./js/bonus.js"></script>
		<script type="text/javascript" src="./js/bridges.js"></script>
		<script type="text/javascript" src="./js/utility.js"></script>
    </head>

    <body onLoad="intro()" class="playground">
        <div class="popup" id="welcome_popup">
			<h1 id="logo">Neon Bridges</h1>

			<?php
				if(!Logged()) echo	'<div class="form" id="login_form">
											<form method="post">
												<label>Username: <input type="text" id="username" name="username"></label>
												<label>Password: <input type="password" id="password" name="password"></label>
												<button type="button" name="login" onclick="AjaxManager.Login();">Login</button>
											</form>
										</div>
										<div class="tools" id="prelogin_tools">
											<p>New user? <a id="register_link" href="#" onclick="registerPopup();">Create an account!</a></p>
										</div>
										';
					else echo	'<p class="response" id="We">Welcome ' . $_SESSION['username'] . ', choose your player or press ENTER to play!</p>						

								<div class="skin" id="player_skin">
									<script type="text/javascript">
   										createChoosePlayerDiv();
									</script>
								</div>

								<div class="tools">
									<a id="logout_link" href="#" onclick="AjaxManager.Logout();">Logout</a>
									- 
									<a id="delete_link" href="#" onclick="AjaxManager.AccountDeletion();">Delete account</a>
								</div>	
								';
			?>
        </div>

		<footer>
			<p>
				<a href="./html/howtoplay.html">How to play</a>
			</p>
		</footer>
    </body>
</html>