document.querySelector(".wrap").oncontextmenu = () => {
	return false;
}
const MODAL = document.querySelector(".pop_up__background");
const MODAL_WIDOW = document.querySelector(".modal");
const FIELD = document.querySelector(".wrap__image");
const MODAL_DISABLE = "pop_up--disable";
const PARAMETER_MAP = FIELD.getBoundingClientRect();
const LEFT_INDENT = leftIndent();
const TOP_INDENT = PARAMETER_MAP.y - 0.5;

const closeCreatForm = document.querySelector(".button__close");
const buttonCreatPoint = document.querySelector(".button__creat");
const buttonControlInfo = document.querySelector(".info__control--button");

let namePoint = document.querySelector("#namePoint");
let textPoint = document.querySelector("#textPoint");
let colorPoint = document.querySelector("#colorPoint");
addCoockie("id", 0);

const map = {
	coordX: 8960.0,
	coordY: 8960.0
};
const maxcoord = 4480;

buttonControlInfo.addEventListener("click", () => {
	document.querySelector(".info__control").classList.toggle("disable");
	document.querySelector(".control__icon").classList.toggle("active");
});

function setPoint(name)
{
	let point = {
		"id": name.id,
		"title": name.title,
		"text": name.textContent,
		"coordX": name.dataset.coordX,
		"coordY": name.dataset.coordY,
		"positionX": name.style.left,
		"positionY": name.style.top,
		"color": name.style.backgroundColor
	};

	return point;
}

// point edit && delete point
MODAL_WIDOW.addEventListener("click", (event) => {
	let poinID = MODAL_WIDOW.getAttribute("id");
	if (event.target.classList.contains("button__edit")) {
		if(confirm("Вы уверены?"))
		{
			FIELD.querySelector("#" + poinID).title = MODAL_WIDOW.querySelector("#namePoint").value;
			FIELD.querySelector("#" + poinID).textContent = MODAL_WIDOW.querySelector("#textPoint").value;
			FIELD.querySelector("#" + poinID).style.backgroundColor = MODAL_WIDOW.querySelector("#colorPoint").value;
			MODAL.classList.add(MODAL_DISABLE);
			nullInputs();
		}
	}
	if (event.target.classList.contains("button__del")) {
		if(confirm("Вы уверены?"))
		{
			FIELD.querySelector("#" + poinID).remove();
			MODAL_WIDOW.setAttribute("id", "");
			MODAL.classList.add(MODAL_DISABLE);
			nullInputs();
		}
	}
});


// open pop up - look info point
FIELD.addEventListener("mouseover", (event) => {
	if (event.target.classList.contains("point")) {
		event.target.addEventListener("click", () => {

			const POINT = setPoint(event.target);

			const COLOR = {
				setRedColor()
				{
					let temp = POINT.color.match(/rgb\(\d+/g);
					temp = temp.toString().replace(/rgb\(/g, "");
					return (1 * temp);
				},
				setGreenColor()
				{
					let temp = POINT.color.match(/ \d+,/g);
					temp = temp.toString().replace(/[\s,]/g, "");
					return (1 * temp);
				},
				setBlueColor()
				{
					let temp = POINT.color.match(/, \d+\)/g);
					temp = temp.toString().replace(/[\s,)]/g, "");
					return (1 * temp);
				},
				rgbToHex(r, g, b) {
					return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
				},
				creatHTMLHex()
				{
					return this.rgbToHex(this.setRedColor(), this.setGreenColor(), this.setBlueColor());
				}
			}

			const COLOR_HTML_HEX = COLOR.creatHTMLHex();

			MODAL_WIDOW.setAttribute("id", POINT.id);
			MODAL_WIDOW.querySelector("#namePoint").value = POINT.title;
			MODAL_WIDOW.querySelector("#textPoint").value = POINT.text.trim();
			MODAL_WIDOW.querySelector("#colorPoint").value = COLOR_HTML_HEX;
			MODAL_WIDOW.querySelector(".coord__number--x").textContent = POINT.coordX;
			MODAL_WIDOW.querySelector(".coord__number--y").textContent = POINT.coordY;

			MODAL_WIDOW.querySelector(".buttons").innerHTML =
				`<button class="button__edit add__button">Изменить</button>
			<button class="button__del add__button">Удалить точку</button>`;

			MODAL_WIDOW.classList.add("modal__point");
			buttonCreatPoint.style.display = "none";
			MODAL.classList.remove(MODAL_DISABLE);
		});
	}
});

// zoom map 
// FIELD.addEventListener("dblclick", (e) => {
// 	if (!e.target.classList.contains("point")) {
// 		const zoom = {
// 			"translate": (280 * 11) / 100,
// 			"scale": 1.2
// 		}
// 		let x = e.pageX - LEFT_INDENT;
// 		let y = e.pageY - TOP_INDENT;

// 		if(x < 280 && y < 280)
// 		{
// 			e.target.style.transform = `translate(${280 - x + zoom.translate}px, ${280 - y + zoom.translate}px) scale(${zoom.scale})`;
// 		}
// 		else if(x > 280 && y < 280)
// 		{
// 			e.target.style.transform = `translate(-${x - 280 + zoom.translate}px, ${280 - y + zoom.translate}px) scale(${zoom.scale})`;
// 		}
// 		else if(x < 280 && y > 280)
// 		{
// 			e.target.style.transform = `translate(${280 - x + zoom.translate}px, -${y - 280 + zoom.translate}px) scale(${zoom.scale})`;
// 		}
// 		FIELD.insertAdjacentHTML(
// 			"afterbegin",
// 			`<div class="zoom">
// 				<span class="dot"><span>
// 			</div>`
// 			);
// 		//  scale(${zoom.max})
// 	}
// });

// open pop up creat point
FIELD.addEventListener("contextmenu", (e) => {
	if (!e.target.classList.contains("point")) {
		buttonCreatPoint.style.display = "inline-block";

		let x = e.pageX - LEFT_INDENT;
		let y = e.pageY - TOP_INDENT;
		console.log(x, y);

		let coords = creatCord(x, y);
		

		addCoockie("coordX", coords[0]);
		addCoockie("coordY", coords[1]);

		addCoockie("positX", x);
		addCoockie("positY", y);

		document.querySelector(".coord__number--x").textContent = coords[0];
		document.querySelector(".coord__number--y").textContent = coords[1];

		MODAL.classList.toggle(MODAL_DISABLE);
		if (MODAL_WIDOW.classList.contains("modal__point"))
			MODAL_WIDOW.classList.remove("modal__point");
	}
});

// close pop up && creat point
buttonCreatPoint.addEventListener("click", () => {
	addCoockie("id", (1 * getCookie("id")) + 1);

	creatPoint();
	MODAL.classList.toggle(MODAL_DISABLE);
	nullInputs();

	function creatPoint() {
		FIELD.insertAdjacentHTML(
			"afterbegin",
			`<div class="point" 
			id="id-${getCookie("id")}" 
			style="
			left: ${getCookie("positX")}px; 
			top: ${getCookie("positY")}px; 
			background-color: ${colorPoint.value};" 
			title="${namePoint.value}" 
			
			data-coord-x="${getCookie("coordX")}" 
			data-coord-y="${getCookie("coordY")}">
			${textPoint.value}</div>`
		);
	}

	if (MODAL_WIDOW.classList.contains("modal__point"))
		MODAL_WIDOW.classList.remove("modal__point");
});

// close pop up
closeCreatForm.addEventListener("click", () => {
	MODAL.classList.toggle(MODAL_DISABLE);
	nullInputs();

	if (MODAL_WIDOW.classList.contains("modal__point")) {
		MODAL_WIDOW.classList.remove("modal__point");
		buttonCreatPoint.style.display = "inline-block";
	}
});

// close pop up
document.querySelector(".pop_up__background").addEventListener("click", (e) => {
	if (e.target.classList.contains("pop_up__background")) {
		MODAL.classList.add(MODAL_DISABLE);
		nullInputs();
		if (MODAL_WIDOW.classList.contains("modal__point")) {
			MODAL_WIDOW.classList.remove("modal__point");
			buttonCreatPoint.style.display = "inline-block";
		}
	}
});

// close pop up
document.body.addEventListener("keyup", function (e) {
	var key = e.keyCode;

	if (key == 27) {
		if(MODAL.classList.contains(MODAL_DISABLE) == false)
		{
			MODAL.classList.add(MODAL_DISABLE);
			nullInputs();
			if (MODAL_WIDOW.classList.contains("modal__point")) {
				MODAL_WIDOW.classList.remove("modal__point");
				buttonCreatPoint.style.display = "inline-block";
			}
		}
	};
}, false);

function editCoord(position) {
	if (position > maxcoord) {
		return (position - maxcoord);
	} else if (position < maxcoord) {
		return (maxcoord - position) * -1;
	} else if (position == maxcoord) {
		return 0;
	}
}

function creatCord(positionX, positionY) {
	let finalX,
		finalY;

	let tempX = map.coordX * 1.00 - ((positionX * 8) * 2);
	tempX = (tempX - map.coordX) * -1;
	tempX = editCoord(tempX);
	finalX = Number(tempX.toFixed(0));
	
	
	let tempY = map.coordY * 1.00 - ((positionY * 8) * 2);
	tempY = (tempY - map.coordY) * -1;
	tempY = editCoord(tempY);
	tempY = Number(tempY.toFixed(0));
	finalY = (tempY > 0 ) ? (tempY + 8) : (tempY - 8);

	return [finalX, finalY];
}

function addCoockie(name, value) {
	document.cookie = name + '=' + value;
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function nullInputs() {
	namePoint.value = "";
	textPoint.value = "";
	colorPoint.value = "#FFFB00";
	namePoint.style = "";
	textPoint.style = "";
}

FIELD.onmousemove = mouseMove;

function mouseMove(event){ 
	event = fixEvent(event);
	let coord = creatCord( (event.pageX - LEFT_INDENT), (event.pageY - TOP_INDENT) );
	document.getElementById('mouseX').value = coord[0];
	document.getElementById('mouseY').value = coord[1];
	
}
function fixEvent(e) {
	// получить объект событие для IE
	e = e || window.event;

	// добавить pageX/pageY для IE
	if ( e.pageX == null && e.clientX != null ) {
		let html = document.documentElement;
		let body = document.body;
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}

	// добавить which для IE
	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
	}

	return e;
}

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