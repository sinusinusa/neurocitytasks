class Slider{

    constructor(refs) {
        this.refs = refs;
    }
    PrepareEvents(){
        const carousel = document.querySelector(".carousel");
        let firstImg = carousel.firstElementChild;
        let arrowIcons = document.querySelectorAll(".wrapper i");
        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
        const showHideIcons = () => {
            // showing and hiding prev/next icon according to carousel scroll left value
            let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
            arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
            arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
        }
        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
                // if clicked icon is left, reduce width value from the carousel scroll left else add to it
                carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
                setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
            });
        });
        const autoSlide = () => {
            // if there is no image left to scroll then return from here
            if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
            positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
            let firstImgWidth = firstImg.clientWidth + 14;
            // getting difference value that needs to add or reduce from carousel left to take middle img center
            let valDifference = firstImgWidth - positionDiff;
            if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
                return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            }
            // if user is scrolling to the left
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        const dragStart = (e) => {
            // updatating global variables value on mouse down event
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carousel.scrollLeft;
        }
        const dragging = (e) => {
            // scrolling images/carousel to left according to mouse pointer
            if(!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel.classList.add("dragging");
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        }
        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging");
            if(!isDragging) return;
            isDragging = false;
            autoSlide();
        }
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart);
        document.addEventListener("mousemove", dragging);
        carousel.addEventListener("touchmove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("touchend", dragStop);
    }
    FillItems(){
        const carousel = document.querySelector(".carousel");
        this.refs.forEach((item, index, array) => {
            let image = document.createElement('img');
            image.src = item;
            image.setAttribute('draggable', 'false');
            carousel.append(image);
        });
        this.PrepareEvents();
    }
}

images = ["https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666361425_1-mykaleidoscope-ru-p-peizazhi-prirodi-krasivo-1.jpg",
"https://w.forfun.com/fetch/a3/a37f5c8dfc38307cffb9ab3aee29a2e3.jpeg",
"https://gas-kvas.com/uploads/posts/2023-02/1675415366_gas-kvas-com-p-priroda-fonovii-risunok-4.jpg",
"https://w-dog.ru/wallpapers/9/19/493202719800447/priroda-pejzazh-gory-les-ozero.jpg",
"https://gas-kvas.com/uploads/posts/2023-02/1675490336_gas-kvas-com-p-fonovie-risunki-prirod-25.jpg",
"https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666361528_24-mykaleidoscope-ru-p-peizazhi-prirodi-krasivo-27.jpg"
];
let slider = new Slider(images);
window.addEventListener("load", function() {
    slider.FillItems();
});
