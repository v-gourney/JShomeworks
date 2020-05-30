"use strict";
let cvs = document.getElementById ('CVSclock');
let context = cvs.getContext('2d');
cvs.style.position ='relative'
cvs.style.top ='20px'
cvs.style.left ='10px'
context.strokeStyle = 'green';

//создание циферблата
let clockPlate = document.createElement('div');
clockPlate.id = 'clockPlate';
clockPlate.style.width ='300px'
clockPlate.style.height ='300px'
clockPlate.style.backgroundColor ='#ffd455'
clockPlate.style.position ='relative'
clockPlate.style.top ='10px'
clockPlate.style.left ='10px'
clockPlate.style.borderRadius = '50%'
document.body.insertBefore (clockPlate, document.body.firstChild);
//создание цифр часов в цикле
let hourDiv;
let i;
let hourDeg = Math.PI/6;
for (i=1; i<=12; i++) {
  hourDiv = document.createElement ('div')
  hourDiv.style.width ='30px'
  hourDiv.style.height ='30px'
  hourDiv.style.position ='absolute'
  hourDiv.style.borderRadius = '50%'
  hourDiv.style.backgroundColor ='#4eaf26'
  hourDiv.innerHTML = i;
  hourDiv.style.textAlign ='center'
  hourDiv.style.lineHeight ='30px'
  hourDiv.style.fontWeight ='bold'
  hourDiv.style.fontSize ='16px'
  //расположение div с цфирами
  hourDiv.style.top = 135 - 120*Math.cos(hourDeg) - hourDiv.offsetHeight/2 + 'px';
  hourDiv.style.left = 135 + 120*Math.sin(hourDeg) + hourDiv.offsetWidth/2 + 'px';
  hourDeg+=Math.PI/6;
  clockPlate.appendChild (hourDiv)
}
//добавление стрелок div
let hourArrow = document.createElement ('div')
hourArrow.id = "hourArrow"
hourArrow.style.width ='10px'
hourArrow.style.height ='80px'
hourArrow.style.backgroundColor ='#1b1a179e'
hourArrow.style.position ='absolute'
hourArrow.style.bottom ='150px'
hourArrow.style.left ='145px'
hourArrow.style.borderRadius = '3px'
hourArrow.style.transformOrigin = '50% 100% 0';
clockPlate.appendChild (hourArrow)

let minuteArrow = document.createElement ('div')
minuteArrow.id = "minuteArrow"
minuteArrow.style.width ='6px'
minuteArrow.style.height ='100px'
minuteArrow.style.backgroundColor ='#44423c9e'
minuteArrow.style.position ='absolute'
minuteArrow.style.bottom ='150px'
minuteArrow.style.left ='147px'
minuteArrow.style.borderRadius = '2px'
minuteArrow.style.transformOrigin = '50% 100% 0';
clockPlate.appendChild (minuteArrow);

let secondsArrow = document.createElement ('div')
secondsArrow.id = "secondsArrow"
secondsArrow.style.width ='2px'
secondsArrow.style.height ='110px'
secondsArrow.style.backgroundColor ='#171511d9'
secondsArrow.style.position ='absolute'
secondsArrow.style.bottom ='150px'
secondsArrow.style.left ='149px'
secondsArrow.style.transformOrigin = '50% 100% 0';
clockPlate.appendChild (secondsArrow);  

//функция движения стрелок ежесекундно
setInterval(arrowsMove, 10);
function arrowsMove () {
    
    //вычисление начальных углов стрелок
    let timeAngles = new Date();
    let hourCurrent = timeAngles.getHours();
    if (hourCurrent > 12) {
        hourCurrent-=12;
    }
    let hourAngle = Math.round(hourCurrent*30 + (timeAngles.getMinutes())*0.5) ;
    let minuteAngle = (timeAngles.getMinutes())*6;
    let secondsAngle = (timeAngles.getSeconds())*6;
    //изменение углов стрелок в реальном времени
    hourArrow.style.transform = 'rotate('+ hourAngle+'deg)';
    minuteArrow.style.transform = 'rotate('+ minuteAngle+'deg)';
    secondsArrow.style.transform = 'rotate('+ secondsAngle+'deg)';
}
//создание div с актуальным временем
let divTime = document.createElement ('div');
divTime.id = 'divTime'
divTime.style.position ='absolute'
divTime.style.top ='70px'
divTime.style.left ='110px'
divTime.style.fontWeight ='bold'
divTime.style.fontFamily = 'sans-serif'
divTime.style.fontSize ='20px'
divTime.style.backgroundColor ='none'
clockPlate.appendChild (divTime)

//вызывает функцию с интервалом и обновляет время
setInterval(updateTime, 10);

//получает дату и вызывает функцию форматирования ее в текущее время
function updateTime() {
    let currTime=new Date();
    let currTimeStr=formatTime(currTime);
    document.getElementById('divTime').innerHTML= currTimeStr;

    //отрисовка циферблата canvas
    context.beginPath();
    context.arc(cvs.height/2, cvs.width/2, 149, 0, 2 * Math.PI, false);
    context.fillStyle = '#ffd480';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'green';
    context.stroke();

    let cvshourDeg = Math.PI*4/3;
    for (let i=1; i<=12; i++) {
        context.beginPath();
        context.arc(150 - 120*Math.cos(cvshourDeg), 150 + 120*Math.sin(cvshourDeg), 15, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.font='bold 18px Arial'
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(i,(150 - 120*Math.cos(cvshourDeg)),(150 + 120*Math.sin(cvshourDeg)));
        context.stroke();
        cvshourDeg-=Math.PI/6;
    }

    //отрисовка стрелок canvas
    let timeAngles = new Date();
    let hourCurrent = timeAngles.getHours();
    if (hourCurrent > 12) {
        hourCurrent-=12;
    }
    let hourAngle = (Math.round(hourCurrent*30 + (timeAngles.getMinutes())*0.5))*Math.PI/180 ;
    let minuteAngle = ((timeAngles.getMinutes())*6)*Math.PI/180;
    let secondsAngle = ((timeAngles.getSeconds())*6)*Math.PI/180;

    // часы
    context.strokeStyle = ' #00802b';
    context.lineWidth=8;
    context.beginPath();
    context.moveTo(150,150);
    context.lineTo(150+(70*Math.sin(hourAngle)), (150-(70*Math.cos(hourAngle))))
    context.lineCap = "round"
    context.stroke();
    // минуты
    context.strokeStyle = '#6699ff';
    context.lineWidth=5;
    context.beginPath();
    context.moveTo(150,150);
    context.lineTo(150+(90*Math.sin(minuteAngle)), (150-(90*Math.cos(minuteAngle))))
    context.lineCap = "round"
    context.stroke();
    // секунды
    context.strokeStyle = '#cc66ff';
    context.lineWidth=3;
    context.beginPath();
    context.moveTo(150,150);
    context.lineTo(150+(110*Math.sin(secondsAngle)), (150-(110*Math.cos(secondsAngle))))
    context.lineCap = "round"
    context.stroke();
    //отрисовка цифер реального времени canvas
    context.fillStyle = 'black';
    context.font='bold 22px Arial'
    context.fillText(currTimeStr,150,100);

}
// форматирует переданную дату-время в формате чч:мм:сс
function formatTime(time) {
    let hours=time.getHours();
    let minutes=time.getMinutes();
    let seconds=time.getSeconds();
    return  str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}
// дополняет строку val слева нулями до длины Len
function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}



















