"use strict";
//назначение картинкам class
let imgIDficator = document.getElementsByTagName ('img');
let i;
for (i=0; i<imgIDficator.length; i++) {
        imgIDficator[i].className = "dragimage";
        imgIDficator[i].setAttribute ("draggable", true);
}
//назначение контейнера 
const dragField = document.getElementById ('field');
const fieldWidth = dragField.offsetLeft + dragField.offsetWidth;
const fieldHeight = dragField.offsetTop + dragField.offsetHeight;

//назначение событий и свойств на картинках 
let dragImageClassifier = document.getElementsByClassName ('dragimage');
let j;
for (j=0; j<dragImageClassifier.length; j++) {
        dragImageClassifier[j].addEventListener('mousedown', imgDragStart);
        document.addEventListener('mousemove', imgDrag);
        dragImageClassifier[j].addEventListener('mouseup', imgDragEnd);
        dragImageClassifier[j].style.position = 'absolute';
        //рандомизация расположения картинок
        dragImageClassifier[j].style.left = (Math.random()*70)+ 'vw';
        dragImageClassifier[j].style.top = (Math.random()*70)+ 'vh';
        dragImageClassifier[j].style.zIndex = '2';
        dragImageClassifier[j].ondragstart = function() {
                return false; //подсмотрено на learn.javascript
        };
}

let draggedImage=null;
//описнаие методов дрэг-картинки
function imgDragStart(event) {
        draggedImage = event.target;
        console.log('starting drag image',draggedImage.alt);
        this.style.cursor = 'pointer';
        this.style.zIndex = '5';
        this.style.position = 'absolute';
        this.style.left = event.pageX - this.offsetWidth / 2 + 'px'; 
        this.style.top = event.pageY - this.offsetHeight / 2 + 'px';
        dragField.style.backgroundColor = "grey";
}
function imgDrag(event) {
        if (draggedImage) {
                draggedImage.style.left = event.pageX - draggedImage.offsetWidth / 2 + 'px';
                draggedImage.style.top = event.pageY - draggedImage.offsetHeight / 2 + 'px';
        }
}
function imgDragEnd(event) {
        document.onmousemove = null;
        this.style.zIndex = '2';
        //возврат картинки в область перетягивания, если пользователь перетянул картинку в аут
        if ( parseInt(this.style.left, 10) > fieldWidth ) {
                this.style.left = fieldWidth - this.offsetWidth*1.1 + 'px';
                } else if ( parseInt(this.style.left, 10) < dragField.offsetLeft ) {
                        this.style.left = dragField.offsetLeft*1.05 + 'px';
                }
        if ( parseInt(this.style.top, 10) > fieldHeight) {
                this.style.top = fieldHeight - this.offsetHeight*1.1 + 'px';
                } else if ( parseInt(this.style.top, 10) < dragField.offsetTop ) {
                        this.style.top = dragField.offsetTop*1.05 + 'px';
                }      
        this.onmouseup = null;
        console.log('dropping image',draggedImage.alt);
        draggedImage = null;
        dragField.style.backgroundColor = "#e98c8c9c";
}




