let fullSlider = modulesSlider(".slider--full");

fullSlider();

function modulesSlider(bodySlider) {

    let slider   = document.querySelector(bodySlider);

    let preview  = slider.querySelector(".slider__preview--img");
    let oneSlide = slider.querySelector(".slider__slide img");

    let buttonLeft  = slider.querySelector(".slider--button__left");
    let buttonRight = slider.querySelector(".slider--button__right");

    let checkbox           = "slider__check";
    let checkboxList       = slider.querySelector(".slider--list__checkbox");
    let checkboxCollection = slider.querySelector(".slider--list__checkbox").children;

    let slide           = "slider__slide";
    let slideList       = slider.querySelector(".slider__list--scroll");
    let slideCollection = slideList.children;
    let slideListNumber = slideCollection.length;

    const CHECK_ACTIVE = "slider__check--active";
    const SLIDE_ACTIVE = "slider__slide--active";

    function slideAttribute(step)
    {
        preview.setAttribute(
            "src", slideCollection[step].children[0].getAttribute("src")
        );
        preview.setAttribute(
            "alt", slideCollection[step].children[0].getAttribute("alt")
        );
    }

    function slideMove(stepDel, stepAdd)
    {
        slideCollection[stepDel].classList.remove(SLIDE_ACTIVE);
        slideCollection[stepAdd].classList.add(SLIDE_ACTIVE);
    }

    function checkboxMove(stepDel, stepAdd)
    {
        checkboxCollection[stepDel].classList.remove(CHECK_ACTIVE);
        checkboxCollection[stepAdd].classList.add(CHECK_ACTIVE);
    }

    function leftMove() {
        for (let i = 0; i < slideListNumber; i++)
        {
            if (slideCollection[i].classList.contains(SLIDE_ACTIVE) == true) {
                if (i == 0) {
                    slideAttribute(slideListNumber - 1);
                    checkboxMove(i, slideListNumber - 1);
                    slideMove(i, slideListNumber - 1);
                } else {
                    slideAttribute(i - 1);
                    checkboxMove(i, i - 1);
                    slideMove(i, i - 1);
                }
                break;
            }
        }
    }

    function RightMove() {
        for (let i = 0; i < slideListNumber; i++)
        {
            if (slideCollection[i].classList.contains(SLIDE_ACTIVE) == true) {
                if ( i == (slideListNumber - 1) ) {
                    slideAttribute(0);
                    checkboxMove(i, 0);
                    slideMove(i, 0);
                } else {
                    slideAttribute(i + 1);
                    checkboxMove(i, i + 1);
                    slideMove(i, i + 1);
                }
                break;
            }
        }
    }

    function checkboxAction(event)
    {
        console.log(event);
        if(event.classList.contains(CHECK_ACTIVE) == false)
        {
            let ArrCkecks = Array.prototype.slice.call( checkboxCollection );
            let ArrImages = Array.prototype.slice.call( slideCollection );

            let indexArrcheckbox  = ArrCkecks.indexOf( event );
            let indexArrSlide = ArrImages.indexOf( slider.querySelector( "." + SLIDE_ACTIVE) );
            

            slideAttribute(indexArrcheckbox);
            checkboxMove(indexArrSlide, indexArrcheckbox);
            slideMove(indexArrSlide, indexArrcheckbox);
        }
    }

    function slideAction(event)
    {
        if(event.classList.contains(SLIDE_ACTIVE) == false)
        {
            let ArrCkecks = Array.prototype.slice.call( checkboxCollection );
            let ArrImages = Array.prototype.slice.call( slideCollection );

            let indexArrcheckbox  = ArrCkecks.indexOf( slider.querySelector("." + CHECK_ACTIVE) );
            let indexArrSlide = ArrImages.indexOf( event );

            slideAttribute(indexArrSlide);
            checkboxMove(indexArrcheckbox, indexArrSlide);
            slideMove(indexArrcheckbox, indexArrSlide);
        }
    }
    
    function initSlider()
    {
        // add image in preview
        preview.setAttribute("src", oneSlide.getAttribute("src"));

        // add active class slide
        slideCollection[0].classList.add(SLIDE_ACTIVE);

        // add checkbox
        for(let i = 0; i < slideListNumber; i++)
        {
            checkboxList.innerHTML += 
            `<label class="slider__check">
                <input type="checkbox" class="slider__check--input">
                <span class="slider__check--custom"></span>
            </label>`;
        }

        // add active class checkbox
        if(slider.querySelector("."+checkbox))
        {
            checkboxCollection[0].classList.add(CHECK_ACTIVE);
        }

        buttonLeft.addEventListener("click", leftMove);
        buttonRight.addEventListener("click", RightMove);

        checkboxList.addEventListener("click", (elem)=>{
            if(elem.target.classList.contains(checkbox))
                checkboxAction(elem.target);
            else if(elem.target.parentNode.classList.contains(checkbox))
                checkboxAction(elem.target.parentNode);
                
        });

        slideList.addEventListener("click", (elem)=>{
            if(elem.target.classList.contains(slide))
                slideAction(elem.target);
            else if(elem.target.parentNode.classList.contains(slide))
                slideAction(elem.target.parentNode);
        });
    }

    return initSlider;
}