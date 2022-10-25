const calculateChange = (input) => {
  let coins = [0, 0, 0, 0, 0, input];
  let value = [1, 0.25, 0.1, 0.05, 0.01];
  if (input >= 10) {
    return "Error:Number is too large";
  }
  if (isNaN(input)) {
    return "Only numbers allowed";
  }
  for (i = 0; i < 5; i++) {
    coins[i] = Math.floor(coins[5] / value[i]);
    coins[5] -= coins[i] * value[i];
  }
  //to calculate penny
  let remainingChange = coins[5];
  while (remainingChange > 0) {
    remainingChange -= 1;
    coins[4]++;
  }
  let outputString = "$" + input + " ==> ";
  //appending coins according to their numbers
  if (coins[0] > 0) {
    outputString += coins[0] + (coins[0] > 1 ? " dollars," : " dollar, ");
  }
  if (coins[1] > 0) {
    outputString += coins[1] + (coins[1] > 1 ? " quarters," : " quarter, ");
  }
  if (coins[2] > 0) {
    outputString += coins[2] + (coins[2] > 1 ? " dimes," : " dime, ");
  }
  if (coins[3] > 0) {
    outputString += coins[3] + (coins[3] > 1 ? " nickels," : " nickel, ");
  }
  if (coins[4] > 0) {
    outputString += coins[4] + (coins[4] > 1 ? " pennies" : " penny");
  }

  return outputString;
};
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
