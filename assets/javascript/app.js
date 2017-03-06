// Click on the Start button and make it disappear
$('#start').on('click',function(){
	$('#start').remove();
	game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
	game.clicked(e);
})

$(document).on('click','#reset',function(){
	game.reset();
})

// Variable of Questions and answers (var=questions)
var questions = [{
	question: "Rolex revolutionized water resistance to 100 meters with the 1953 introduction of this model.",
	answers: ["Oyster Perpetual", "Submariner", "Pearlmaster", "Cosmograph"],
	correctAnswer: "Submariner",
	image: "assets/images/submariner.jpg"
}, {
	question: "How much was the retail price of the most expensive Rolex ever produced?",
	answers: ["$358,000", "$19,995", "$4895", "$485,350"],
	correctAnswer: "$485,350",
	image: "assets/images/mostExpensive.jpg"
}, {
	question: "Rolex made a special watch for Deep Sea Challenge, which survived the plunge into the Challenger Deep for this famous hollywood movie director.",
	answers: ["James Cameron", "Jodie Foster", "Steven Spielberg", "Spike Lee"],
	correctAnswer: "James Cameron",
	image: "assets/images/challengerDeep.jpg"
}, {
	question: "This least expensive Rolex model can usually be found for around $3,000.",
	answers: ["Timex Lux", "Air King", "Explorer", "No Doubt"],
	correctAnswer: "Air King",
	image: "assets/images/airKing.jpg"
}, {
	question: "In which movie does Danny DeVito offer his Rolex in an effort to save his own life?",
	answers: ["Get Shorty", "Mars Attacks", "Death to Smoochy", "Heist"],
	correctAnswer: "Mars Attacks",
	image: "assets/images/devito.jpg"
}, {
	question: "Which famous criminal owned a Rolex that was auctioned by Sotheby's after his death? ",
	answers: ["Al Capone", "John Dillinger", "Busys Siegal", "Pretty Boy Floyd"],
	correctAnswer: "Al Capone",
	image: "assets/images/capone.jpg"
}, {
	question: "In Ian Fleming's 1963 novel On Her Majesty's Secret Service, how did James Bond break his Rolex?",
	answers: ["Punching a bad guy", "Breaking down a door", "Stopping a bullet", "Crashing an automobile"],
	correctAnswer: "Punching a bad guy",
	image: "assets/images/jamesBond.jpg"
}, {
	question: "In the movie The Color of Money, which Rolex did Paul Newman's character Fast Eddie Felson wear?",
	answers: ["Submariner", "Day-Date", "Daytona", "Datejust"],
	correctAnswer: "Datejust",
	image: "assets/images/newman.jpg"
}];

// Properties
var game = {
	questions:questions,
	currentQuestion:0,
	counter:15,
	correct:0,
	incorrect:0,
	unanswered:0,
	
	// Methods
	countdown: function(){
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter<=0){
			console.log("TIME UP!");
			game.timeUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countdown,1000);
		$('#subwrapper').html("<h2> TIME REMAINING <span id='counter'>30</span> Seconds</h2>");
		$('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
		for (var i=0; i<questions[game.currentQuestion].answers.length; i++){
			$('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
				currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
		}

	},
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>Oooops! Time is up!!!<h2>');
		$('#subwrapper').append('<h3>The correct answer Is: '+questions[game.currentQuestion].correctAnswer+'</h3')
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		} else {
			setTimeout(game.nextQuestion,3*1000);
		}
	},

	results: function(){
		clearInterval(timer);
		$('#subwrapper').html("<h2>ALL DONE!</h2");
		$('#subwrapper').append("<h3>Correct: "+game.correct+"</h3");
		$('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3");
		$('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3");
		$('#subwrapper').append("<button id='reset'>RESET</button>");
	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}

	},
	answeredCorrectly: function(){
		console.log("That is Correct!");
		clearInterval(timer);
		game.correct++;
		$('#subwrapper').html('<h2>You are correct!</h2>');
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		} else {
			setTimeout(game.nextQuestion,3*1000);
		}
	},
	answeredIncorrectly: function(){
		console.log("WRONG!");
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>Sorry, that IS NOT the correct answer!</h2>');
		$('#subwrapper').append('<h3>The correct answer is: '+questions[game.currentQuestion].correctAnswer+'</h3>');
		if (game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		} else {
			setTimeout(game.nextQuestion,3*1000);
		}
	},
	reset: function(){
		game.currentQuestion = 0;
		game.counter = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	}






}