function leftIndent()
{
    const windowDoc = document.documentElement.clientWidth;
    const windowMap = document.querySelector(".wrap").clientWidth;
    const widthMap = document.querySelector(".wrap__container").clientWidth;

    let temp1, temp2, result;

    temp1 = (windowDoc - windowMap) / 2;
    temp2 = (windowMap - widthMap) / 2;

    result = Math.floor(temp1 + temp2);

    return result;
}

/*
W1 = (DOc - WinMap) / 2
w2 = (WinMap - map) / 2
left = w1 + w2

console.log("ContainerParam", ContainerX);
console.log("ContainerWidth", ContainerWidth);

let ContainerX = document.querySelector(".container").getBoundingClientRect().x;
let ContainerWidth = document.querySelector(".container").clientWidth;
*/


