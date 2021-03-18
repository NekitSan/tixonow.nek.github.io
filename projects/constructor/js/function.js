"use strict";

function modalWindow(block, subblock)
{
    const left = 646;
    const bottom = 524;

    $(block).on("click", function(){
        let url = $(this).children(subblock).attr("src");
        let alt = $(this).children(subblock).attr("alt");
        $( "#modal__image" ).attr("src", url);
        $( "#modal__image" ).attr("alt", alt);

        $("#modal").show();
    });
    $(".modal__item-modal_exit").on("click", function(){
        $("#modal").hide();
        $( "#modal__image" ).attr("src", "");
        $( "#modal__image" ).attr("alt", "Здесь будет выбранное изображения");
    });
}