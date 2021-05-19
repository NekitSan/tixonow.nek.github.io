FIELD.addEventListener("dblclick", function() {
    console.log("zoom -> mod_1");
});

/*

    Задумака следующая, если зум mod-1, то дается картинка 1120 px
    она режится на 4 картинки, т.е. по 280px на картинку, но с тем же качеством,
    каждая часть располагается по своим сторонам, 
    (мб. дать каждой название, типо zoom_mod1_cell_0.png, zoom_mod1_cell_1.png и тд)
    когда человек нажимает на зум, та область в которой есть карточка\и, прогружается\ются,
    таким образом карточка\и большего размера подставивается под зум.
    Так делаем и еще 2 зума, mod_2 и mod_3. mod_2 - 2240px, mod_3 - 4480px.
    mod_2 режим на 9 карточек, mod_3 режим на 36карточек.
*/

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