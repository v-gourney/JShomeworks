"use strict";
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



















