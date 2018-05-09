var $name = $("#name"),
	$email = $("#mail"),
	$title = $("#title"),
	$job = $("#title"),
	$design = $("#design"),
	$activities = $(".activities input"),
	$payment = $('#payment');
$('#payment option')[0].remove();
var	$creditcard = $("#credit-card"),
	date = new Date();

// name can't be blank.
function validateName(e){
	if($name.val()===''){
		e.preventDefault();
		$( "<p class='error no-name'>Please enter a name.</p>" ).insertBefore($name);
	}
}

var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// email must be properly formatted, checks while you type; real-time validation.
function validatingEmail(){
	$(".no-email").remove();
	var validEmail = re.test($email.val());
	if(!validEmail){
		$( "<p class='error no-email'>Please enter a valid email address.</p>" ).insertBefore($email);
	}
}	

// email can't be blank and must be properly formatted.
function validateEmail(e){
	var validEmail = re.test($email.val());
	if($email.val()===''){
		e.preventDefault();
		$( "<p class='error no-email'>Please enter an email address.</p>" ).insertBefore($email);
	}else if(!validEmail){
		e.preventDefault();
	}
}	

function jobRoleOther(){
	// text field revealed when the "Other" option is selected from the "Job Role" drop down menu.
	if($title.val()==="other"){
		$('#other-title').show();
	}else{
		$('#other-title').hide();
	}
}

function changeColorOptions(){
	if ($design.val()!="Select Theme"){
		$('#design option')[0].style.display = "none";
		// hide color label and options until a t-shirt design is selected from the design menu.
		$("#color").parent().show();
		$("#color").show();
	}
	var jsPunColors =['cornflowerblue', 'darkslategrey', 'gold'];
	// if user selects "JS Puns" theme, color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
	if($design.val()=="js puns"){
		$("#color").val('cornflowerblue');
		$("#color option").each((i, element) => {
		 if(jsPunColors.indexOf(element.value)<0){
        element.style.display = 'none';
     }else{
     	element.style.display = 'initial';
     }
		});
	// If user selects "I♥JS" theme, color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
	}else if($design.val()=="heart js"){
		$("#color").val('tomato');
		$("#color option").each((i, element) => {
		 if(jsPunColors.indexOf(element.value)>=0){
        element.style.display = 'none';
     }else{
     	element.style.display = 'initial';
     }
		}); 
	}
}

function onlyChooseOne(timeslot){
	// if user selects a workshop, don't allow selection of a workshop at the same day and time.
	timeslot.forEach(selection => {
		if (selection.checked){
			$(".no-activities").remove();
			selection.disabled = false;
			selection.parentElement.style.opacity = 1;
		} else {
			selection.disabled = true;
			selection.parentElement.style.opacity = 0.5;
		}
	});
	// when user unchecks an activity, make sure that competing activities (if any) are no longer disabled.
	var allUnchecked = timeslot.every(selection => !selection.checked);
	if (allUnchecked){
		timeslot.forEach(selection => {
			selection.disabled = false;
			selection.parentElement.style.opacity = 1;
		});
	}
}

function changeActivities(){
	$("#total").remove();
	$(".no-activities").remove();
	var nineToTwelve = [$activities[1], $activities[3], $activities[5]];
	var oneToFour = [$activities[2], $activities[4], $activities[6]];
	onlyChooseOne(nineToTwelve);
	onlyChooseOne(oneToFour);

	// as a user selects activities, a running total should display below the list of checkboxes.
	var total = 0;
	$activities.each((i, selection) => {
		if(selection.checked){
			if(i===0){
				total+=200;
			}else{
				total+=100;
			}
		}
	});
	$(".activities").append( "<p id='total'>Total: $"+total+"</p>" );
}

// user must select at least one checkbox under the "Register for Activitiesections"  of the form.
function validateActivities(e){
	if ($(".activities input:checked").length===0){
		e.preventDefault();
		$( "<p class='error no-activities'>Please select at least 1 activity.</p>" ).insertAfter($(".activities legend"));
	} 
}

function paymtMethodSelected(){
	if($payment.val()!="select_method"){
		$(".no-paymt-method").remove();
	}
	// display payment sections based on the payment option chosen in the select menu.
	var paymentOptions = [$(".credit-card"), $(".credit-card").next(), $(".credit-card").next().next()];
	paymentOptions.forEach(option => option.hide(0));
	if($payment.val()=="credit card"){
		paymentOptions[0].show();
	} else if($payment.val()=="paypal"){
		paymentOptions[1].show();
	} else if($payment.val()=="bitcoin"){
		paymentOptions[2].show();
	}
}

function validateCCNum(e){
	// credit card field should only accept a number between 13 and 16 digits.
	if($("#cc-num").val()===''){
		$("<p class='error cc-error'>Please enter credit card number.</p>").insertBefore($creditcard);
	} else if(isNaN($("#cc-num").val())){
		e.preventDefault();
		$("<p class='error cc-error'>Credit Card Number must not include letter, spaces, or symbols.</p>").insertBefore($creditcard);
	} else if($("#cc-num").val().length<13 || $("#cc-num").val().length> 16){
		$("<p class='error cc-error'>Credit Card Number must be between 13 and 16 digits long.</p>").insertBefore($creditcard);
	}
}
// zip code field should accept a 5-digit number.
function validateCCZip(e){
	if($("#zip").val()==''){
		$("<p class='error cc-error'>Please enter the zip code.</p>").insertBefore($creditcard); 
	} else if($("#zip").val().length!=5 || isNaN($("#zip").val())){
		$("<p class='error cc-error'>Zip code must be 5 digits long.</p>").insertBefore($creditcard);
	}
}
// CVV should only accept a number that is exactly 3 digits long.
function validateCCcvv(e){
	if($("#cvv").val()==''){
		$("<p class='error cc-error'>Please enter the CVV number from the back of your credit card.</p>").insertBefore($creditcard); 
	} else if($("#cvv").val().length!=3 || isNaN($("#cvv").val())){
		$("<p class='error cc-error'>CCV number must be 3 digits long.</p>").insertBefore($creditcard);
	}
}

$(document).ready(function() {
	// when the page loads, give focus to the first text field.
	$name.focus();
	$('#other-title').hide();
	// hide color label and options until a t-shirt design is selected from the design menu.
	$("#color").parent().hide();
	$("#color").hide();
	// credit card payment option should be selected by default.
	$payment.val("credit card");
	paymtMethodSelected();

	// removes "no name" error message while you type.
	$name.focus(()=>{
		$(this).keypress(()=>{
			$(".no-name").fadeOut();
			setTimeout(()=>$(".no-name").remove(), 4000);
		});
	})
	// displays and removes email error messages while you type.
	$email.focus(()=>{
			$(this).keypress(()=>{
				validatingEmail();
			});
	});
	// removes credit card error messages while you type.
	$("#credit-card input").focus(()=>{
		$(this).keypress(()=>{
			$(".cc-error").fadeOut();
			setTimeout(()=>$(".cc-error").remove(), 4000);
		});
	})

	$('form').change(()=>{
		// displays text input if job role selected is "other".
		jobRoleOther();
		// changes color options based on tshirt design selected.
		changeColorOptions();
		// disables activities if an activity is selected with same timeslot and shows running total of cost for activities.
		changeActivities();
		// changes display based on payment method selected.
		paymtMethodSelected();
	});
	//applies error messages after submit clicked, prevents submission.
	$('form').submit((e)=>{
		validateName(e);
		validateEmail(e);
		validateActivities(e);
		if($payment.val()=="credit card"){
			validateCCNum(e);
			validateCCZip(e);
			validateCCcvv(e);
		}
	$('.error').css("color", "red");
	});
});