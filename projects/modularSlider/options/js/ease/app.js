let easeSlider = modulesSlider(".slider--ease");
easeSlider();

function modulesSlider(bodySlider) {
    let slider = document.querySelector(bodySlider);

    let preview = slider.querySelector(".slider_preview__image");

    let oneSlide = slider.querySelector(".slider__slide img");

    let buttonLeft = slider.querySelector(".slider__button_left");
    let buttonRight = slider.querySelector(".slider__button_right");
    
    let slideList = slider.querySelector(".slider_list__slides");
    let slideCollection = slideList.children;
    let slideListNumber = slideCollection.length;

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

    function leftMove() {
        for (let i = 0; i < slideListNumber; i++)
        {
            if (slideCollection[i].classList.contains(slideAct) == true) {
                if (i == 0) {
                    slideAttribute(slideListNumber - 1);
                    slideMove(i, slideListNumber - 1);
                } else {
                    slideAttribute(i - 1);
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
                    slideMove(i, 0);
                } else {
                    slideAttribute(i + 1);
                    slideMove(i, i + 1);
                }
                break;
            }
        }
    }
    
    function initSlider()
    {
        // add image in preview
        preview.setAttribute("src", oneSlide.getAttribute("src"));

        // add active class slide
        slideCollection[0].classList.add(slideAct);

        buttonLeft.addEventListener("click", leftMove);
        buttonRight.addEventListener("click", RightMove);
    }

    return initSlider;
}