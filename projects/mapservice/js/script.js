document.querySelector(".wrap").oncontextmenu = cmenu; function cmenu() { return false; }

$(document).ready(function() {
	$("#map2d").contextmenu(function(e){
		let parentOffset = $(this).parent().offset(); 
		let relX = (e.pageX - parentOffset.left) - 278;
		let relY = (e.pageY - parentOffset.top) + 2;

		let editValueInput = new editIput(relX, relY);
		editValueInput.editAndOutInInput();

		$('.modal').fadeIn();
	});

	let titlePoint = $("#namePoint").val();
	let contentPoint = $("#textPoint").val();
	let coordXPoint = $("#coordPointX").val();
	let coordYPoint = $("#coordPointY").val();
	let positionBlockPointX = $("#positionBlockPointX").val();
	let positionBlockPointY = $("#positionBlockPointY").val();
	let colorPoint = $("#colorPoint").val();

	let numbId = 0;

	$("#button_creat").on("click", function(){
		console.log("suka", positionBlockPointX);
		//<div class="point" style="left: ${valueIDInout.positionBlockPointX}px; top: ${valueIDInout.coordBlockYPoint}px; background-color: ${valueIDInout.colorPoint};" title=" id="${valueIDInout.contentPoint}""></div>

		// return numbId++;
		// $.ajax({
        //     url: "scripts/php-scripts/points/creatpoint.php",
        //     type: "POST",
        //     data: ({
        //         title: valueIDInout.titlePoint,
        //         content: valueIDInout.contentPoint,
        //         coordX: valueIDInout.coordXPoint,
        //         coordY: valueIDInout.coordYPoint,
        //         coordBlockPointX: valueIDInout.coordBlockXPoint,
        //         coordBlockPointY: valueIDInout.coordBlockYPoint,
        //         color: valueIDInout.colorPoint
        //     }),
        //     dataType: "html",
        //     success: reloding
        // });
		
		$(this).parents('.modal').fadeOut();
    	clearInput();
		return false;
	});

	$('.modal-close').click(function() {
		$(this).parents('.modal').fadeOut();
    	clearInput();
		return false;
	});	

});

function deletePointBD()
{ 
	$(".pointDelete").on('click', function(){
		let idPoint = $(this).attr('id');
		$.ajax({
            url: "scripts/php-scripts/points/deletepoint.php",
			type: "POST",
			data: ({
				id: idPoint
			}),
			dataType: "text",
			success: reloding
		});
		return false;
	});
	
}

function reloding()
{
	setTimeout(() => {
		clearInput();
	}, 1000);
   console.log("Запустился!");
   //setTimeout(location.reload(),0);
}

function clearInput()
{
	$("#namePoint").val('');
	$("#textPoint").val('');
}

class editIput
{
	constructor(coordX, coordY)
	{
		this.relX = coordX;
		this.relY = coordY;
	}
	editAndOutInInput()
	{
		let coord = new calcRealCoord(this.relX, this.relY);
		let trueCoord = coord.creaetRealCoord();

		let CoordBlockPointX = (this.relX + 278);
		let CoordBlockPointY = (this.relY + 2);

		$("#coordPointX").val(trueCoord[0]);
		$("#coordPointY").val(trueCoord[1]);
		$("#namePoint").val(CoordBlockPointX);
		$("#textPoint").val(CoordBlockPointY);
		
		console.log(trueCoord[0],trueCoord[1],'\n',CoordBlockPointX,CoordBlockPointY);
	}
}

class calcRealCoord
{
	constructor(realcoordX, realcoordY)
	{
		this.realcoordX = 1 * (realcoordX);
		this.realcoordY = 1 * (realcoordY);
	}
	creaetRealCoord()
	{
	//console.log("X: ",this.realcoordX, "\nY: ",this.realcoordY);

	let tmpX = map2d.coordX * 1.00 - ((this.realcoordX * 8) * 2);
	tmpX = (tmpX - map2d.coordX) * -1;
	//console.log("noEdit_X: ", tmpX);
	tmpX = editCoord(tmpX);
	tmpX = tmpX.toFixed(0);

	let tmpY = map2d.coordY * 1.00 - ((this.realcoordY * 8) * 2);
	tmpY = (tmpY - map2d.coordY) * -1;
	//console.log("noEdit_Y: ", tmpY);
	tmpY = editCoord(tmpY);
	tmpY = tmpY.toFixed(0);


    return [tmpX, tmpY];
	}
}

const maxcoord = 4480;

let map2d = {  
	coordX: 8960.0,
	coordY: 8960.0
};

let map3d = {
	coordX: 17920.0,
	coordY: 9215.0
};

function editCoord(a)
{

	if(a > maxcoord) {
		return test = (a - maxcoord);
	}
		else if(a < maxcoord)
	{
		return test = (maxcoord - a) * -1;
	}
		else if(a == maxcoord)
	{
		return test = 0;
	}
}