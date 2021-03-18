let fullSlider = modulesSlider(".slider--full");
fullSlider();

function modulesSlider(bodySlider) {
    let slider = document.querySelector(bodySlider);

    let preview = slider.querySelector(".slider_preview__image");

    let oneSlide = slider.querySelector(".slider__slide img");

    let buttonLeft = slider.querySelector(".slider__button_left");
    let buttonRight = slider.querySelector(".slider__button_right");

    let checkbox = "slider__checkbox";
    let checkboxList = slider.querySelector(".slider__list_checkbox");
    let checkboxCollection = slider.querySelector(".slider__list_checkbox").children;

    let slide = "slider__slide";
    let slideList = slider.querySelector(".slider_list__slides");
    let slideCollection = slideList.children;
    let slideListNumber = slideCollection.length;

    let checkboxAct = "slider__checkbox--active";
    let slideAct = "slider__slide--active";

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
        slideCollection[stepDel].classList.remove(slideAct);
        slideCollection[stepAdd].classList.add(slideAct);
    }

    function checkboxMove(stepDel, stepAdd)
    {
        checkboxCollection[stepDel].classList.remove(checkboxAct);
        checkboxCollection[stepAdd].classList.add(checkboxAct);
    }

    function leftMove() {
        for (let i = 0; i < slideListNumber; i++)
        {
            if (slideCollection[i].classList.contains(slideAct) == true) {
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
            if (slideCollection[i].classList.contains(slideAct) == true) {
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
        if(event.classList.contains(checkboxAct) == false)
        {
            let ArrCkecks = Array.prototype.slice.call( checkboxCollection );
            let ArrImages = Array.prototype.slice.call( slideCollection );

            let indexArrcheckbox  = ArrCkecks.indexOf( event );
            let indexArrSlide = ArrImages.indexOf( slider.querySelector( "." + slideAct) );
            

            slideAttribute(indexArrcheckbox);
            checkboxMove(indexArrSlide, indexArrcheckbox);
            slideMove(indexArrSlide, indexArrcheckbox);
        }
    }

    function slideAction(event)
    {
        if(event.classList.contains(slideAct) == false)
        {
            let ArrCkecks = Array.prototype.slice.call( checkboxCollection );
            let ArrImages = Array.prototype.slice.call( slideCollection );

            let indexArrcheckbox  = ArrCkecks.indexOf( slider.querySelector("." + checkboxAct) );
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
        slideCollection[0].classList.add(slideAct);

        // show slide list
        slider.querySelector(".slider_list").classList.toggle("hidden");

        // add checkbox
        for(let i = 0; i < slideListNumber; i++)
        {
            checkboxList.innerHTML += '<div class="slider__checkbox"></div>';
        }

        // add active class checkbox
        if(slider.querySelector("."+checkbox))
        {
            checkboxCollection[0].classList.add(checkboxAct);
        }

        buttonLeft.addEventListener("click", leftMove);
        buttonRight.addEventListener("click", RightMove);

        checkboxList.addEventListener("click", (elem)=>{
            if(elem.target.classList.contains(checkbox))
                checkboxAction(elem.target);
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