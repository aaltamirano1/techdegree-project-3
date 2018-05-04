var $name = $("#name"),
	$email = $("#mail"),
	$title = $("#title");
	$design = $('#design'),
	$payment = $('#payment');
var date = new Date();

function noNameOrEmail (e){
	var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if($name.val()===''){
		e.preventDefault();
		$( "<p class='error no-name'>Please enter a name.</p>" ).insertBefore($name);
	}
	if($email.val()===''){
		e.preventDefault();
		$( "<p class='error no-email'>Please enter an email address.</p>" ).insertBefore($email);
	}else if (!re.test($email.val())){
		e.preventDefault();
		$( "<p class='error no-email'>Please enter a valid email address.</p>" ).insertBefore($email);
	}
}
function nameOrEmailTyped(){
	if($name!=''){
		$(".no-name").remove();
	}
	if($email!=''){
		$(".no-email").remove();
	}
}
function jobRoleOther(){
	if($title.val()=="other"){
		$().insertAfter($title);
	}else{
		$("#role").remove();
		$(".no-role").remove();
	}
}
function noJobRole(){
	if($title.val()=="other" && $("#role").val()==''){
		$( "<p class='error no-role'>Please enter your job role.</p>" ).insertBefore($("#role"));
	}
}
function changeColorOptions(){
	if($design.val()!="Select Theme"){
		$(".no-design").remove();
	}
	var jsPunColors =['cornflowerblue', 'darkslategrey', 'gold'];
	if($design.val()=="js puns"){
		$("#color").val();
		$("#color option").each(function(i, element){
		 if(jsPunColors.indexOf(element.value)<0){
        element.style.display = 'none';
     }else{
     	element.style.display = 'initial';
     }
		});
	}else if($design.val()=="heart js"){
		$("#color").val('tomato');
		$("#color option").each(function(i, element){
		 if(jsPunColors.indexOf(element.value)>=0){
        element.style.display = 'none';
     }else{
     	element.style.display = 'initial';
     }
		}); 
	}
}
function noTshirtDesign(e){
	if($design.val()=='Select Theme'){
		$(".shirt").prepend( "<p class='error no-design'>Please select a design and color.</p>" );
	}
}

$(".credit-card").hide();
$(".credit-card").next().hide();
$(".credit-card").next().next().hide();

function paymtMethodSelected(){
	if($payment.val()!="select_method"){
		$(".no-paymt-method").remove();
	}
	if($payment.val()=="credit card"){
		$(".credit-card").show();
		$(".credit-card").next().hide();
		$(".credit-card").next().next().hide();
	} else if($payment.val()=="paypal"){
		$(".credit-card").hide();
		$(".credit-card").next().show();
		$(".credit-card").next().next().hide();
	} else if($payment.val()=="bitcoin"){
		$(".credit-card").hide();
		$(".credit-card").next().hide();
		$(".credit-card").next().next().show();
	}
}

function noPaymentMethod(e){
		if($payment.val()=="select_method"){
		e.preventDefault();
		$( "<p class='error no-paymt-method'>Please select a payment method.</p>" ).insertAfter($payment);
	}
}

function checkCreditCard(e){
	if($payment.val()=="credit card"){
		if(isNaN($("#cc-num").val())){
			alert("Credit Card Number must include only numbers with no spaces.");
		}
		if ($('#exp-year').val()<date.getFullYear() || ($('#exp-month').val()==date.getFullYear() && $('#exp-month').val()<date.getMonth())){
			e.preventDefault();
			$( "<p class='error expired-year'>Please check expiration date. Credit card may be expired.</p>" ).insertBefore(".credit-card");
		}
	}
}
function creditCardInfoChanged(){
	if(($('#exp-month').val()==date.getFullYear() && $('#exp-month').val()>=date.getMonth()) || $('#exp-year').val()>=date.getFullYear()){
			$(".expired-year").remove();
			$(".expired-month").remove();
	}
}

$(document).ready(function() {
	$name.focus();
	$('form').keypress(function(){
		nameOrEmailTyped();
	});
	$('form').change(function() {
		jobRoleOther();
		changeColorOptions();
		paymtMethodSelected();
		creditCardInfoChanged();
	});
	$('form').submit(function(e) {
		noNameOrEmail(e);
		invalidEmail(e);
		noJobRole(e);
		noTshirtDesign(e);
		noPaymentMethod(e);
		checkCreditCard(e);
	var $errorMsg = $('.error');
	$errorMsg.css("color", "red");
});
});



