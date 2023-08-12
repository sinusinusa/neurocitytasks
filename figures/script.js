let to_center = true;
const centerX = container.clientWidth / 2 - 50;
const centerY = container.clientHeight / 2 - 50;
const animations = ["rotate 10s infinite linear", "rotate-invice 10s infinite linear"];
function createShape(className) {
    const shape = document.createElement('div');
    shape.className = `shape ${className}`;
    container.appendChild(shape);
    return shape;
}
function toggleToCenter() {
    if(to_center == true){
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.classList.remove(shape.classList[1]);
            shape.classList.add(getRandomShape());
            shape.style.animation = animations[Math.floor(Math.random() * animations.length)];
        });
    }
    to_center = !to_center;
}
function moveShapeInCircle(shape, time) {
    let radius = 150;
    if (to_center) {
        radius -=  50;
    } else {
        radius +=  50;
    }
    const angle = (time % 360) * (Math.PI / 180);

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    shape.style.left = `${x}px`;
    shape.style.top = `${y}px`;
}

function animateShapes(timestamp) {
    const shapes = document.querySelectorAll('.shape');
    console.log(to_center);
    if (shapes.length === 0) {
        startAnimation();
    }
    shapes.forEach((shape, index) => {
        moveShapeInCircle(shape, timestamp / 10 + index * 100);
    });

    const shapeLeft = parseFloat(shapes[0].style.left);
    const shapeTop = parseFloat(shapes[0].style.top);


    requestAnimationFrame(animateShapes);
}


function getRandomShape() {
    const shapes = ['circle', 'triangle', 'square', 'rectangle'];
    return shapes[Math.floor(Math.random() * shapes.length)];
}

function startAnimation() {
    for (let i = 0; i < 4; i++) {
        createShape(getRandomShape());
    }

    animateShapes(performance.now());
}

startAnimation();
setInterval(toggleToCenter, 10000);






