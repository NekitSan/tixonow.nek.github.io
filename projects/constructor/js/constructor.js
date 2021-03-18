"use strict";
const VERSION = 'Constructor 9.9.5';

const button_param = $(".constructor__menu-category_item");
const button_group_color = $(".constructor__menu-color_item");
const button_color = $(".constructor__menu-color_item .color-item");
const color_window = $(".constructor__main-window");
const dataBox = $(".constructor__main-window_box");
const dataBoxImage = $(".constructor__main-window_box img");
const text_specifications = ".constructor_specifications";
const text_description = ".constructor_specifications";
const text_btns_group = ".constructor__menu-group_category";
const text_btns = ".constructor__menu-category_item";

const urlSets = "images/constructor/sets/";
const register = '.png';


// constructor
$(document).ready(function(){
    const timeout = 10000;

    
    $(".constructor__menu").children().on("click", function(e){
        let size = dataBox.attr("data-sets") + "/";
        let color = dataBox.attr("data-color");
        let volume = dataBox.attr("data-volume");
        let equipm = dataBox.attr("data-equipment");

        let volum = volume.replace(/_/g, '');
        let coat = dataBox.attr("data-coating");

        let act = new EditAquarium(
            {
                url: urlSets,
                size: "680/",
                color: color,
                volume: "_90",
                equipm: equipm,
                register: register
            }); 
            act.edit();
            act.priceTrue(coat, volum);
    })
});

//menu-description
$("#butt_description").on('click', function() {
    $(".constructor__main-group_content").show();
    $(".constructor_description").show();
});
$("#butt_specifications").on('click', function() {
    $(".constructor__main-group_content").show();
    $(".constructor_specifications").show();
});

$(".exit").on("click", function(){
    $(".constructor__main-group_content").hide();
    $(".constructor_description").hide();
    $(".constructor_specifications").hide();
});


button_param.click( function(e)
{
    // active menu
    var id_param = $(this).parent().attr("id");
    var text_button = ".constructor__menu-category_item";
    
    button_param.removeAttr("id");
    button_color.removeAttr("id");
    $(this).attr("id", "act");

    if($(this).hasClass("constructor__menu-disable") == false)
    {
        if( $("#" + id_param + " " + text_button).hasClass("constructor__menu-active") )
        {
            $("#" + id_param + " " + text_button).removeClass("constructor__menu-active");
        }
        $(this).addClass("constructor__menu-active");
    }
    switch(id_param)
    {
        case "height":
            var meaning = $(this).text().replace(/\s/g, '');
            
            $(text_specifications + " " + "#spec_height").text(meaning);
        
            if(meaning == "680")
            {
                $("._680").removeClass("constructor__menu-disable");
                // null values
                nullValues(meaning);
                // #null values
                if($(text_btns_group + " " + text_btns).hasClass("_1000"))
                {
                    $("._1000").addClass("constructor__menu-disable");
                }
            }
            if(meaning == "1000")
            {
                $("._1000").removeClass("constructor__menu-disable");
                // null values
                nullValues(meaning);
                // #null values
                if($(text_btns_group + " " + text_btns).hasClass("_680"))
                {
                    $("._680").addClass("constructor__menu-disable");
                }
            }
        break;
        case "diameter":
            var meaning = $(this).text().replace(/\s/g, '');

            var menu_disable = $(this).hasClass("constructor__menu-disable");

            var class_click = ($(e.target).attr("class")).replace(/\bconstructor__menu-category_item pointer\b\s/g, '');
            class_click = class_click.replace(/\bconstructor__menu-active\b/g, '');
            class_click = class_click.replace(/\s/g, '');
            class_click = class_click.replace(/_/g, '');
            //console.log(class_click);
            
            // блочит кнопки не подходящие по высоте аквариума
            if(class_click == "680")
            {
                $("#height .constructor__menu-category_item:nth-child(2)").addClass("constructor__menu-active");
                $(text_specifications + " " + "#spec_height").text("680");

                dataBox.attr("data-sets", class_click);
                if(dataBox.attr("data-sets") == class_click)
                {
                    dataBox.attr("data-volume", $(this).attr("data-volume"));
                }
                if($(text_btns_group + " " + text_btns).hasClass("_1000"))
                {
                    $("._1000").addClass("constructor__menu-disable");
                }
            }
            else if(class_click == "1000")
            {
                $("#height .constructor__menu-category_item:nth-child(3)").addClass("constructor__menu-active");
                $(text_specifications + " " + "#spec_height").text("1000");

                $("._1000").removeClass("constructor__menu-disable");
                dataBox.attr("data-sets", class_click);
                if(dataBox.attr("data-sets") == class_click)
                {
                    dataBox.attr("data-volume", $(this).attr("data-volume"));
                }
                if($(text_btns_group + " " + text_btns).hasClass("_680"))
                {
                    $("._680").addClass("constructor__menu-disable");
                }
            }

            if(menu_disable == true)
            {
                alert("Невозможно выбрать. Не соотвествует высоте.");
            }
            else if(menu_disable == false)
            {
                $(text_specifications + " " + "#spec_diameter").text(meaning);
            }
            
        break;
        case "volume":
            var meaning = $(this).text().replace(/\s/g, '');
            var menu_disable = $(this).hasClass("constructor__menu-disable");

            var class_click = ($(e.target).attr("class")).replace(/\bconstructor__menu-category_item pointer\b\s/g, '');
            class_click = class_click.replace(/\bconstructor__menu-active\b/g, '');
            class_click = class_click.replace(/\s/g, '');
            if(class_click == "_680")
            {
                $("._680").removeClass("constructor__menu-disable");
                $(text_specifications + " " + "#spec_height").text("680");
                dataBox.attr("data-sets", "680");
                if($(text_btns_group + " " + text_btns).hasClass("_1000"))
                {
                    $("._1000").addClass("constructor__menu-disable");
                }
            }
            else if(class_click == "_1000")
            {
                $("._1000").removeClass("constructor__menu-disable");
                $(text_specifications + " " + "#spec_height").text("1000");
                dataBox.attr("data-sets", "1000");
                if($(text_btns_group + " " + text_btns).hasClass("_680"))
                {
                    $("._680").addClass("constructor__menu-disable");
                }
            }

            if(menu_disable == true)
            {
                alert("Невозможно выбрать. Не соотвествует высоте.");
            }
            else if(menu_disable == false)
            {
                dataBox.attr("data-volume", "_" + meaning);
                $(text_specifications + " " + "#spec_volume").text(meaning);
            }
        break;
        case "equipment":
            var meaning = $(this).text().replace(/\s/g, '');
            var menu_disable = $(this).hasClass("constructor__menu-disable");

            if(menu_disable == true)
            {
                alert("Невозможно выбрать. Не соотвествует высоте.");
            }
            else if(menu_disable == false)
            {
                dataBox.attr("data-equipment", meaning[0]);
                $(text_specifications + " " + "#spec_equipment").text(meaning);
            }
        break;
        case "coating":
            //colorStand
            var meaning = $(this).text().replace(/\s/g, '');
            var menu_disable = $(this).hasClass("constructor__menu-disable");
            if(meaning == "Все")
            {
                $("#colorStand .color-item").removeClass("constructor__menu-active_color");
                $("#colorStand .gloss:nth-child(1)").addClass("constructor__menu-active_color");
                $("#colorStand .gloss").removeClass("disable");
                $("#colorStand .matt").removeClass("disable");
                dataBox.attr("data-color", "черный");
                $("#spec_color").text("черный"); 
                dataBox.attr("data-coating", 'gloss');
                $(text_specifications + " " + "#spec_coating").text("Глянцевое");
            }
            else if(meaning == "Глянцевое")
            {
                $("#colorStand .color-item").removeClass("constructor__menu-active_color");
                $("#colorStand .gloss:nth-child(1)").addClass("constructor__menu-active_color");
                $("#colorStand .gloss").removeClass("disable");
                $("#colorStand .matt").addClass("disable");
                dataBox.attr("data-color", "черный");
                $("#spec_color").text("черный");
                dataBox.attr("data-coating", 'gloss');
                $(text_specifications + " " + "#spec_coating").text(meaning);
            }
            else if(meaning == "Матовое")
            {
                $("#colorStand .color-item").removeClass("constructor__menu-active_color");
                $("#colorStand .matt:nth-child(5)").addClass("constructor__menu-active_color");
                $("#colorStand .matt").removeClass("disable");
                $("#colorStand .gloss").addClass("disable");
                dataBox.attr("data-color", "венге");
                $("#spec_color").text("венге");
                dataBox.attr("data-coating", 'matt');
                $(text_specifications + " " + "#spec_coating").text(meaning);
            }
        break;
    }
});

button_color.click( function()
{
    var meaning = $(this).attr("data-color");
    var id_param = $(this).parent(button_group_color).parent().attr("id");
    var text_button = ".constructor__menu-color_item .color-item";
    
    button_param.removeAttr("id");
    button_color.removeAttr("id");
    $(this).attr("id", "act");
    
    if($(this).hasClass("constructor__menu-disable") == false)
    {
        if( $("#" + id_param + " " + text_button).hasClass("constructor__menu-active_color") )
        {
            $("#" + id_param + " " + text_button).removeClass("constructor__menu-active_color");
        }
        $(this).addClass("constructor__menu-active_color");
    }
    switch(id_param)
    {
        case "colorStand":
            if($(this).hasClass("matt"))
            {
                $("#coating .constructor__menu-category_item").removeClass("constructor__menu-active");
                $("#coating .constructor__menu-category_item:nth-child(3)").addClass("constructor__menu-active");
            }
            else if($(this).hasClass("gloss"))
            {
                $("#coating .constructor__menu-category_item").removeClass("constructor__menu-active");
                $("#coating .constructor__menu-category_item:nth-child(4)").addClass("constructor__menu-active");
            }
            dataBox.attr("data-color", meaning);
            $(text_specifications + " " + "#spec_color").text(meaning);
        break;
        case "backlight":
            color_window.css("background-image", "url(" + $(this).children('img').attr("src") + ")");
            meaning = $(this).attr("data-backlight");
            console.log(meaning);
            $(text_specifications + " " + "#spec_backlight").text(meaning);
        break;
    }
});

class EditAquarium
{
    constructor(option)
    {
        this.url = option.url;
        this.size = option.size;
        this.color = option.color;
        this.volume = option.volume;
        this.equipm = option.equipm;
        this.register = option.register;
    }
    edit()
    {
        let mainUrl = this.url + this.size + this.color + this.volume + this.equipm + this.register;
        dataBoxImage.attr("src", mainUrl);
        console.log(this.url + this.size + this.color + this.volume + this.equipm + this.register);
    }
    priceTrue(coat, volum)
    {
        let priceAll = {
            90: {
                'Б': {
                    'matt': 20500,
                    'gloss': 22200
                },
                'С': {
                    'matt': 35300,
                    'gloss': 36900
                },
                'П': {
                    'matt': 46300,
                    'gloss': 48000
                }
            },
            130: {
                'Б': {
                    'matt': 25800,
                    'gloss': 28300
                },
                'С': {
                    'matt': 41200,
                    'gloss': 43700
                },
                'П': {
                    'matt': 54200,
                    'gloss': 56700
                }
            },
            150: {
                'Б': {
                    'matt': 31800,
                    'gloss': 34000
                },
                'С': {
                    'matt': 47100,
                    'gloss': 49300
                },
                'П': {
                    'matt': 62000,
                    'gloss': 64200
                }
            },
            200: {
                'Б': {
                    'matt': 40600,
                    'gloss': 43900
                },
                'С': {
                    'matt': 56100,
                    'gloss': 59400
                },
                'П': {
                    'matt': 72500,
                    'gloss': 75800
                }
            },
            212: {
                'Б': {
                    'matt': 46100,
                    'gloss': 54900
                },
                'С': {
                    'matt': 68800,
                    'gloss': 75400
                },
                'П': {
                    'matt': 81600,
                    'gloss': 90400
                }
            },
            282: {
                'Б': {
                    'matt': 69200,
                    'gloss': 74700
                },
                'С': {
                    'matt': 89900,
                    'gloss': 95500
                },
                'П': {
                    'matt': 107400,
                    'gloss': 112900
                }
            },
            395: {
                'Б': {
                    'matt': 115500,
                    'gloss': 115500
                },
                'С': {
                    'matt': 146300,
                    'gloss': 146300
                },
                'П': {
                    'matt': 200600,
                    'gloss': 200600
                }
            },
            502: {
                'Б': {
                    'matt': 150600,
                    'gloss': 150600
                },
                'С': {
                    'matt': 190700,
                    'gloss': 190700
                },
                'П': {
                    'matt': 268500,
                    'gloss': 268500
                }
            },
            785: {
                'Б': {
                    'matt': 235500,
                    'gloss': 235500
                },
                'С': {
                    'matt': 298300,
                    'gloss': 298300
                },
                'П': {
                    'matt': 420000,
                    'gloss': 420000
                }
            }
        };

        const price = valuePrice(priceAll, volum, this.equipm, coat);
        $("#spec_price").text(price);
        console.log(price);
    }
}

function valuePrice(priceAll, volum, quipmt, coat)
{
    // количество значений объема
    const lengthVolum = Object.keys(priceAll[volum]).length;
    // количество значений комплектаций
    const lengthQuipmt = Object.keys(priceAll[volum][quipmt]).length;

    for(var i = 0; i < lengthVolum; i++)
    {
        // Нужная комплектация
        let value = Object.keys(priceAll[volum])[i];

        if(value == quipmt)
        {
            // Нужное покрытие
            const trueQuipmt = value;
            
            for(var i = 0; i < lengthQuipmt; i++)
            {
                let trueCoat = Object.keys(priceAll[volum][trueQuipmt])[i];

                if(trueCoat == coat)
                {
                    let trueCoat = Object.keys(priceAll[volum][trueQuipmt])[i];
                    // Нужное цена
                    let truePrice = priceAll[volum][trueQuipmt][trueCoat];
                    return truePrice;
                }
            }
        }
    }
}

function nullValues(option)
{
    switch(option)
    {
        case "680":
            dataBox.attr("data-sets", "680");
            dataBox.attr("data-volume", "_90");
        break;
        case "1000":
            dataBox.attr("data-sets", "1000");
            dataBox.attr("data-volume", "_212");
        break;
    }
}