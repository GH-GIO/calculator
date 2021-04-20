let currentDroppable = null;

headerMove.onmousedown = function(event) {

  let shiftX = event.clientX - calc.getBoundingClientRect().left;
  let shiftY = event.clientY - calc.getBoundingClientRect().top;

  Mcalc.style.position = 'absolute';
  Mcalc.style.zIndex = 998;
  document.body.append(Mcalc);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    Mcalc.style.left = pageX - shiftX + 'px';
    Mcalc.style.top = pageY -shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    // Mcalc.hidden = true;
    // let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    // Mcalc.hidden = false;

    // if (!elemBelow) return;

    // let droppableBelow = elemBelow.closest('.droppable');
    // if (currentDroppable != droppableBelow) {
    //   if (currentDroppable) { // null when we were not over a droppable before this event
    //     leaveDroppable(currentDroppable);
    //   }
    //   currentDroppable = droppableBelow;
    //   if (currentDroppable) { // null if we're not coming over a droppable now
    //     // (maybe just left the droppable)
    //     enterDroppable(currentDroppable);
    //   }
    // }
  }

  document.addEventListener('mousemove', onMouseMove);

  Mcalc.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    Mcalc.onmouseup = null;
  };

};

// function enterDroppable(elem) {
//   elem.style.background = 'pink';
// }

// function leaveDroppable(elem) {
//   elem.style.background = '';
// }

// Mcalc.ondragstart = function() {
//   return false;
// };


// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
var headerA = document.querySelector(".header-a");
var calculatorBor = document.querySelector(".calculator-bor");
var headerclose = document.querySelector(".header-c");
var calculator = document.querySelector(".calculator");
var carrot = document.querySelector(".carrot");
var bar = document.querySelector(".bar")
var navBar = document.querySelector(".nav-bar");
var hours = document.querySelector(".hours");
var realDate = document.querySelector(".real-date")
// აააააააააააააააააააააააააააააააააააააააააააააააააააააააააააააა
var d = new Date()
 realDate.innerHTML = ` ${d.getMonth()+ 1}`  + "/" + d.getDate() + "/" + d.getFullYear();


 function showRealhours(){
	 var D = new Date();
 var sessino = "AM";
	var m = D.getMinutes();
	var h = D.getHours(); 
if(h == 0 ){
	h = 12
}
if(h > 12){
	h -=12
	sessino = "PM"
}
if( h < 10 ){
	h = "0" + h
}
if( m < 10 ){
	m = "0" + m
}



	hours.innerHTML= h +":" + m +" " + sessino;

	setTimeout(showRealhours, 1000);

 }

 showRealhours();








// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
bar.addEventListener("click",function(){
navBar.classList.toggle("active-navbar")
})

headerA.addEventListener('click', function(){
	var calcX =calculator.getBoundingClientRect().left;
	var calcY =calculator.getBoundingClientRect().top;
calc.style.position="absolute";
// calc.style.transform = "translate(700px , 700px)" ;
calc.style.left = calcX + "px";
calc.style.top = calcY + "px";
calc.style.opacity = "0";
calculatorBor.style.opacity = "1"
})




calculator.addEventListener("click", function(){
  // calc.style.position = "relative";
//   calc.style.transform = "translate( 0, 0)" ;
calc.style.left ="0px";
calc.style.top =  "0px";
  calc.style.opacity = "1";
})


headerclose.addEventListener("click" , function(){
  calc.style.display = "none";
  calculator.style.display = "none"
})

carrot.addEventListener("click", function(){
  calc.classList.toggle("carrotA")
})

// calculattttooooooorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
function getHistory(){
	return document.querySelector(".first-result").innerText;
}
function printHistory(num){
  document.querySelector(".first-result").innerText=num;
}
function getOutput(){
	return document.querySelector(".second-result").innerText;
}
function printOutput(num){
	if(num==""){
    document.querySelector(".second-result").innerText=num;
	}
	else{
		document.querySelector(".second-result").innerText=getFormattedNumber(num);
	}	
}
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}