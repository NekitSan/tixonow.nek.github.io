"use strict";
basketFull();
modalWindow(".review__main-item", ".review__image");

$('.button_search').on("click", function() {
    if($("#input_search").hasClass("disable_search"))
    {
        $("#input_search").removeClass("disable_search");
    }else{
        $("#input_search").addClass("disable_search");
    }
});

$(".more_images").on("click", function() {
    //console.log($(this).parents("#reviewMainblock").siblings("#reviewSubblock").attr("title"));
    $(this).parents(".reviewMainblock").siblings(".reviewSubblock").css("display", "flex");
});
$(".review__main-buttton__exit").on("click", function() {
    $(this).parents(".reviewSubblock").hide()
});