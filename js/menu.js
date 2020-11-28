function introMenu()
{
	document.body.style.backgroundImage = "url(../css/images/menuBackground/menuBackground" + Math.floor(Math.random()*4) + ".jpg)";

	fadeIn(document.body.childNodes[1], 0.01, 1, 10); 
	fadeIn(document.body.childNodes[3], 0.01, 1, 10);

}