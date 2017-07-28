let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let results = document.getElementById('results');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' && attempt.innerText === ''){
    setHiddenFields();
  	}

  	if(!validateInput(input.value)){
  		return false;
		setMessage("Guesses must be exactly 4 characters long.");
  	}else{
  		attempt.innerHTML = parseInt(attempt.innerText) + 1;
  	}
  	if(getResults(input.value)){
  		setMessage("You Win! :)");
  		showAnswer(true);
  		showReplay();
  	}else if(parseInt(attempt.innerText) >= 10){
  		setMessage("You Lose! :(");
  			showAnswer(false);
  			showReplay();
  	}else{
  		setMessage("Incorrect, try again.");
  	}
}

//implement new functions here
function setHiddenFields(){
	var secretNumber = Math.floor(Math.random()*9999).toString();
	while(secretNumber.length < 4){
		secretNumber = "0" + secretNumber;
	}
	attempt.innerHTML = 0;
	answer.value = secretNumber;
}

function setMessage(newMessage){
	document.getElementById("message").innerHTML = newMessage;
};

function validateInput(input){
	if(input.length === 4){
		return true;
	}
	return false;
};

function getResults(userGuess){
	var resultHtml = '<div class="row"><span class="col-md-6">' + userGuess + '</span>';
	var icons = '<div class="col-md-6">';
	var guessedCorrect = 0;
	for(var i = 0; i < 4; i++){
		if(userGuess[i] === answer.value[i]){
			guessedCorrect++;
			icons += '<span class="glyphicon glyphicon-ok"></span>';
		}else if(answer.value.includes(userGuess[i])){
			icons += '<span class="glyphicon glyphicon-transfer"></span>';
		}else{
			icons += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	icons += '</div></div>';
	resultHtml += icons;
	results.insertAdjacentHTML('beforeend', resultHtml);
	if(guessedCorrect === 4){
		return true;
	}
	return false;
};

function showAnswer(win){
	code.innerHTML = answer.value;
	if(win){
		code.className += " success";
	}else{
		code.className += " failure";
	}

};

function showReplay(){
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
};
