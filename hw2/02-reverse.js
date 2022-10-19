/** Exercise 02 - Reverse **/

const calculateReverse = () => {
  var input = document.getElementById("input").value;
  var result = document.getElementById("result");
  let finalans = "";
  var reverse = 0;
  if (input.length > 8 || input.length == 0) {
    finalans = "Error:Please enter valid number which has length equal to 8 ";
    result.style.color = "red";
  } else {
    finalans = input.toString().split("").reverse().join("");
    result.style.color = "green";
  }

  result.innerHTML = finalans;
};

