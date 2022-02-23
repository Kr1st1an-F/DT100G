document.getElementById("Result").style.display = "none";
document.getElementById("Sbutton").addEventListener("click", function(){ //Submit button is clicked
	document.getElementById("Menu").style.display = "none"; 
	document.getElementById("Result").style.display = "block";
	document.getElementById("_Company").innerHTML = document.getElementById("company").value;
	document.getElementById("_Name").innerHTML = document.getElementById("FName").value + ' ' + document.getElementById("LName").value;
	document.getElementById("_Title").innerHTML = document.getElementById("Title").value;
	document.getElementById("_Telefon").innerHTML = 'Tfn: ' + document.getElementById("Telefon").value;
	document.getElementById("_Mail").innerHTML = 'E-post: ' + document.getElementById("Mail").value;
	document.getElementById("Result").style.backgroundColor = document.getElementById("backgroundC").value;
	changeTextColor(document.getElementById("TextC").value); //Call Function below with chosen text color as argument
	changeTextFont(document.getElementById("Fonts").value); //Call Function below with chosen font as argument
});

document.getElementById("Rbutton").addEventListener("click", function(){ //Nollställ Button is clicked
	reset(); //Call reset function
});

document.getElementById("backButton").addEventListener("click", function(){ //Återvänd button is clicked
	document.getElementById("Menu").style.display = "block"; //Make Menu visable
	document.getElementById("Result").style.display = "none"; //Make second Menu Hide
	reset()
});

function reset() { //Used to reset each row 
	document.getElementById("company").value = '';
	document.getElementById("FName").value = '';
	document.getElementById("LName").value = '';
	document.getElementById("Title").value = '';
	document.getElementById("Telefon").value = '';
	document.getElementById("Mail").value = '';
}

function changeTextColor(color) { //Changes each row text color based upon parameter (chosen text color)
	document.getElementById("_Company").style.color = color;
	document.getElementById("_Name").style.color = color;
	document.getElementById("_Title").style.color = color;
	document.getElementById("_Telefon").style.color = color;
	document.getElementById("_Mail").style.color = color;
}

function changeTextFont(font) { //Changes each row text font upon parameter (chosen font)
	document.getElementById("_Company").style.fontFamily = font;
	document.getElementById("_Name").style.fontFamily = font;
	document.getElementById("_Title").style.fontFamily = font;
	document.getElementById("_Telefon").style.fontFamily = font;
	document.getElementById("_Mail").style.fontFamily = font;
}