let test = document.querySelector(".test").textContent; 

console.log(test);

let temp = test.match(/, \d+\)/g);

console.log(temp);