if( document.querySelector(".slider__list--scroll").scrollWidth >= 900 )
{
    document.querySelector(".slider__list").style.height = 85 + "px";
    console.log(true);
}
addSrollingSlideList();

function addSrollingSlideList()
{
    let scrollElemnt = document.querySelectorAll(".slider__list--scroll");
    console.log(scrollElemnt);
    console.log(scrollElemnt.clientWidth);
    
    scrollElemnt.forEach(item => {
        if(item.clientWidth > 900)
        {
            item.classList.add("scroll");
        }
    });
}