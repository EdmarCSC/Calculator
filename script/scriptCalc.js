var viewer = document.querySelector(".data")

var actionVision = document.querySelector('.contanerGroup')
var nums = document.querySelectorAll("#num")
var opAction = document.querySelectorAll("#opr")
var equals = document.querySelector("#equals")
var clear = document.querySelector(".btnClear")
var theNum = ""
var oldNum = ""
var resultNum
var operator

var values = []

var setNum = function() {
  if (viewer.textContent.length < 6) {
    if (resultNum) { 
      theNum = this.getAttribute("data-num")
      resultNum = ""
    } else { 
      theNum += this.getAttribute("data-num")
      values.push(theNum) 
    }
    viewer.textContent = theNum;
    actionVision.innerHTML += this.getAttribute("data-num")
  } else {
    
  }
};

var moveNum = function() {
  oldNum = theNum
  theNum = ""
  operator = this.getAttribute("data-ops")

  equals.setAttribute("data-result", "") 
  actionVision.innerHTML += operator
};

var displayNum = function() {

  // Convert string input to numbers
  oldNum = parseFloat(oldNum)
  theNum = parseFloat(theNum)
  
  // Case operation
  switch (operator) {
    case "+":
      resultNum = oldNum + theNum;
      break;

    case "-":
      resultNum = oldNum - theNum;
      break;

    case "*":
      resultNum = oldNum * theNum;
      break;

    case "/":
      resultNum = oldNum / theNum;
      break;

    default:
      resultNum = theNum;
  }
  
  actionVision.innerHTML += `= ${resultNum}`;
  viewer.textContent = '0';
  if (!isFinite(resultNum)) {
    if (isNaN(resultNum)) { 
      resultNum = "You broke it!";
    } else { // If result is infinity, set off by dividing by zero
      resultNum = "Look at what you've done";

      el('#calculator').classList.add("broken"); // Break calculator
      el('#reset').classList.add("show"); // And show reset button
    }
  }

  // Display result, finally!
  viewer.textContent = resultNum;
  equals.setAttribute("data-result", resultNum);

  // Now reset oldNum & keep result
  oldNum = 0;
  theNum = resultNum;
  
};

// click reset
var reset = function() {
  oldNum = theNum
  theNum = ""
  values = []
  viewer.textContent = '0'
  actionVision.textContent = ''
}

// Event click numbers
for (var i = 0, l = nums.length; i < l; i++) {
  nums[i].onclick = setNum;
};

// Event click operetors
for (var i = 0, l = opAction.length; i < l; i++) {
  opAction[i].onclick = moveNum;
};

equals.onclick = displayNum;

clear.onclick = reset;