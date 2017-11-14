$(document).ready(function() {
	
	// The animation that plays at the beginning on the first page
	function loadTitle() {
		var title = document.getElementById("title"); 
		var currentFrame = 0;
		var maxFrame = 40;
		var delayFrames = 5;
		var totalString = "Users";
		var frameDelay = 75;
		var id = setInterval(frame, frameDelay);
		var audio = new Audio('sounds/typing.mp3');
		audio.play();
		function frame() {
			
			if (currentFrame < delayFrames) {
				//Scroll to top on refresh
				var currentString = totalString.substring(0, currentFrame).trim();
				title.innerHTML = currentString + "|";
			} else if (currentFrame >= delayFrames && (((currentFrame - delayFrames) % maxFrame) < maxFrame/2)) {
				title.innerHTML = "Users" + '&nbsp';			
			} else {
				title.innerHTML = totalString + "|";
			}
			if (currentFrame >= delayFrames + maxFrame) {
				currentFrame = delayFrames;
			}
			currentFrame++;
		}
	}
	window.onload = loadTitle();

	var click = new Audio('sounds/click.mp3');
	var scroll = new Audio('sounds/scroll.mp3');
	scroll.volume = 0.3;
	
	// Makes the window scroll down to the given target
	function scrollDown(target) {
		click.play();
		scroll.play();
		$('html, body').stop().animate({
			scrollTop: target
		}, 800);
	};
	
	// When mouse is over the down button
	function mouseIn() {
		$('#downButton').css('color', 'yellow');
	}
	
	// When mouse not on the down button
	function mouseOut() {
		$('#downButton').css('color', 'white');
	}
	
	var target1 = $('#page1').offset().top;
	var target2 = $('#page2').offset().top;
	var target3 = $('#page3').offset().top;
	var target4 = $('#page4').offset().top;
	
	// Adding listeners to the buttons
	$('#downButton').click(function() {
		$('#downButton').css('color', 'white');
		scrollDown(target2);
	});
	$('#title').click(function() {
		window.open(
  'EE.txt',
  '_blank' // <- This is what makes it open in a new window.
);
	});
	
	$('#tracker1').click(function() {
		scrollDown(target1);
	});
	
	$('#tracker2').click(function() {
		scrollDown(target2);
	});
	
	$('#tracker3').click(function() {
		scrollDown(target3);
	});
	
	$('#tracker4').click(function() {
		scrollDown(target4);
	});
	
	$('#minutesLink').click(function() {
		scrollDown(target3);
	});
	
	$('#downButton').hover(mouseIn, mouseOut);
	
	// Key Controls
	$(document).keypress(function(e) {
		var key = e.which;
		if (e.which == 49) {
			scrollDown(target1);
		} else if (e.which == 13 || e.which == 50) {
			scrollDown(target2);
		} else if (e.which == 51) {
			scrollDown(target3);
		} else if (e.which == 52) {
			scrollDown(target4);
		}
	});
	
	// Debounce function provided by David Walsh from https://davidwalsh.name/javascript-debounce-function
	// Used to reduce the amount of function calls from scrolling and put less stress on the browser
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	// Changes the images of the trackers on the right side depending on how much we have scrolled
	var changeTracker = debounce(function() {
		var midPoint = $(window).scrollTop() + ($(window).height() / 2);
		if (midPoint > $('#page2').offset().top && midPoint < $('#page3').offset().top) {
			$('#tracker1').attr("src", "images/trackerOff.png");
			$('#tracker2').attr("src", "images/trackerOn.png");
			$('#tracker3').attr("src", "images/trackerOff.png");
			$('#tracker4').attr("src", "images/trackerOff.png");
		} else if (midPoint > $('#page3').offset().top && midPoint < $('#page4').offset().top) {
			$('#tracker1').attr("src", "images/trackerOff.png");
			$('#tracker2').attr("src", "images/trackerOff.png");
			$('#tracker3').attr("src", "images/trackerOn.png");
			$('#tracker4').attr("src", "images/trackerOff.png");
		} else if (midPoint > $('#page4').offset().top) {
			$('#tracker1').attr("src", "images/trackerOff.png");
			$('#tracker2').attr("src", "images/trackerOff.png");
			$('#tracker3').attr("src", "images/trackerOff.png");
			$('#tracker4').attr("src", "images/trackerOn.png");
		} else {
			$('#tracker1').attr("src", "images/trackerOn.png");
			$('#tracker2').attr("src", "images/trackerOff.png");
			$('#tracker3').attr("src", "images/trackerOff.png");
			$('#tracker4').attr("src", "images/trackerOff.png");
		}
	}, 10);
	
	// Whenever the window is scrolled
	$(window).scroll(function(event) {
		changeTracker();
	});
});