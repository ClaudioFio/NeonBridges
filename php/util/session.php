<?php
	function setSession($username, $userId)
	{
		$_SESSION['userId'] = $userId;
		$_SESSION['username'] = $username;
	}

	function Logged()
	{
		if(isset($_SESSION['userId'])) return true;
			else return false;
	}
?>