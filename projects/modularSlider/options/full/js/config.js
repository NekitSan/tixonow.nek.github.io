if( document.querySelector(".slider__list--scroll").scrollWidth >= 900 )
{
    document.querySelector(".slider__list").style.height = 85 + "px";
}
addSrollingSlideList();

function addSrollingSlideList()
{
    let scrollElemnt = document.querySelectorAll(".slider__list--scroll");
    
    scrollElemnt.forEach(item => {
        if(item.clientWidth > 900)
        {
            item.classList.add("scroll");
        }
    });
}