$(document).ready(function () {

	const OPTION_PACE = "pace";
	const OPTION_DISTANCE = "distance";
	const OPTION_TIME = "time";

	var distanceInput = document.getElementById("distance"),
		hoursInput = document.getElementById("hours"),
		minutesInput = document.getElementById("minutes"),
		secondsInput = document.getElementById("seconds"),
		paceMinInput = document.getElementById("minutePaceInput"),
		paceSecInput = document.getElementById("secondsPaceInput"),
		calculateBtn = document.getElementById("calculate_btn"),
		resultText = document.getElementById("resultText");

	$("#calculate_btn").click(() => doCalculate());


	// disable button in the beginning
	$("#calculate_btn").attr("disabled", !isFormValid());

	// onChangeCombo
	$('#selection').on('change', function () {
		checkButtonAvailabitly()
	});


	validateFields();

	function validateFields() {

		if (getSelectedOption() === OPTION_PACE) {
			$('#distance').on('change', () => checkButtonAvailabitly());
			$('#hours').on('change', () => checkButtonAvailabitly());
			$('#minutes').on('change', () => checkButtonAvailabitly());
			$('#seconds').on('change', () => checkButtonAvailabitly());
		}

	}

	function isFormValid() {

		var selectedOption = getSelectedOption();

		if (selectedOption === OPTION_PACE) {

			var hours = $('#hours').val();
			var minutes = $('#minutes').val();
			var seconds = $('#seconds').val();
			var isTimeEmpty = (hours == null || hours == "") ||
				(minutes == null || minutes == "") ||
				(seconds == null || seconds == "") ? true : false;

			if (($('#distance').val() == null || $('#distance').val() == "") || isTimeEmpty) {
				return false;
			}

		} else if (selectedOption == OPTION_TIME) {
			

			var minutepace = $('#minutePaceInput').val();
			var secondpace = $('#secondsPaceInput').val();
			var isPaceEmpty = (minutepace == null || minutepace == "") ||
			 (secondpace == null || secondpace == "") ? true : false;

			if (($('#distance').val() == null || $('#distance').val() == "")  || isPaceEmpty) {
				return false;
			}
			
		} else if (selectedOption == OPTION_DISTANCE) {

			var hours = $('#hours').val();
			var minutes = $('#minutes').val();
			var seconds = $('#seconds').val();
			var minutepace = $('#minutePaceInput').val();
			var secondpace = $('#secondsPaceInput').val();

			var isTimeEmpty = (hours == null || hours == "") ||
				(minutes == null || minutes == "") ||
				(seconds == null || seconds == "") ? true : false;

			var isPaceEmpty = (minutepace == null || minutepace == "") ||
				(secondpace == null || secondpace == "") ? true : false;

			if (isPaceEmpty || isTimeEmpty){

				return false;
			}
		}

		return true;
	}

	function checkButtonAvailabitly() {
		$("#calculate_btn").attr("disabled", !isFormValid());
	}

	function doCalculate() {

		switch (getSelectedOption()) {
			case OPTION_PACE:
				calculatePace();
				break;

			case OPTION_DISTANCE:
				calculateDistance();
				break;

			case OPTION_TIME:
				calculateTime();
				break;

			default:
				break;
		}

	}

	function calculatePace() {

		var kilometres = parseFloat(distanceInput.value),
			hours = parseFloat(hoursInput.value),
			minutes = parseFloat(minutesInput.value),
			seconds = parseFloat(secondsInput.value);

		if (isNaN(kilometres)) {
			distanceInput.style.borderColor = "red";
			return;
		}
		else {
			distanceInput.style.borderColor = "initial";
		}
		if (isNaN(hours)) {
			hoursInput.style.borderColor = "red";
			return;
		}
		else {
			hoursInput.style.borderColor = "initial";
		}
		if (isNaN(minutes)) {
			minutesInput.style.borderColor = "red";
			return;
		}
		else {
			minutesInput.style.borderColor = "initial";
		}
		if (isNaN(seconds)) {
			secondsInput.style.borderColor = "red";
			return;
		}
		else {
			secondsInput.style.borderColor = "initial";
		}

		var totalMinutes = hours * 60 + minutes + seconds / 60,
			pace = totalMinutes / kilometres,
			paceMinutes = Math.floor(pace),
			paceSeconds = Math.round((pace - paceMinutes) * 60);

		if (paceSeconds < 10) {
			paceSeconds = "0" + paceSeconds;
		}

		resultText.textContent = "You need to run " + paceMinutes + ":" + paceSeconds + " minutes per km.";
	}

	function calculateDistance(distance) {

		var minutePace = parseFloat(paceMinInput.value),
			secondsPace = parseFloat(paceSecInput.value),
			hours = parseFloat(hoursInput.value),
			minutes = parseFloat(minutesInput.value),
			seconds = parseFloat(secondsInput.value);

		var paceToSeconds = minutePace * 60 + secondsPace,
			timeToSeconds = hours * 3600 + minutes * 60 + seconds;

		var finalDistance = parseFloat((timeToSeconds / paceToSeconds).toFixed(2));

		resultText.textContent = "Your running distance is " + finalDistance + "kilometres";
	}

	function calculateTime(time) {
		
		var distance = parseFloat(distanceInput.value),
			minutePace = parseFloat(paceMinInput.value),
			secondsPace = parseFloat(paceSecInput.value);

		var paceToSeconds = minutePace * 60 + secondsPace;

		var timeInSeconds = paceToSeconds * distance,	
		 	hours = Math.floor(timeInSeconds / 60 / 60),
		 	minutes = Math.floor(timeInSeconds / 60) - (hours * 60),
		 	seconds = timeInSeconds % 60;

		var timeFormatted = hours + ':' + minutes + ':' + seconds;

		
		resultText.textContent = "Your time running is " + timeFormatted;
	}

	function getSelectedOption() {
		var selectOption = document.getElementById("selection");

		for (const option of selectOption.options) {
			if (option.selected) {
				return option.value;
			}
		}
	}
});