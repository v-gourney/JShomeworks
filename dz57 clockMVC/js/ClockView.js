class View {
  constructor () {
    this.model = null;
    this.field = null;
  }
  renderClock () {
    //создание кнопок и подписи к часам
    let stopbutton=document.createElement ('button');
    stopbutton.value = 'stop';
    stopbutton.innerHTML = 'стоп';
    let startbutton=document.createElement ('button');
    startbutton.value = 'start';
    startbutton.innerHTML = 'старт';
    let cityspan = document.createElement ('span');
    cityspan.innerHTML = `${city} (GMT ${gmt + 3})`;
    this.field.appendChild (stopbutton);
    this.field.appendChild (startbutton);
    this.field.appendChild (cityspan);
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
    this.field.appendChild (clockPlate);
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
      //расположение div с цифрами
      hourDiv.style.top = 135 - 120*Math.cos(hourDeg) - hourDiv.offsetHeight/2 + 'px';
      hourDiv.style.left = 135 + 120*Math.sin(hourDeg) + hourDiv.offsetWidth/2 + 'px';
      hourDeg+=Math.PI/6;
      clockPlate.appendChild (hourDiv)
    }
    //добавление стрелок div
    let hourArrow = document.createElement ('div')
    hourArrow.className = "hourArrow"
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
    minuteArrow.className = "minuteArrow"
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
    secondsArrow.className = "secondsArrow"
    secondsArrow.style.width ='2px'
    secondsArrow.style.height ='110px'
    secondsArrow.style.backgroundColor ='#171511d9'
    secondsArrow.style.position ='absolute'
    secondsArrow.style.bottom ='150px'
    secondsArrow.style.left ='149px'
    secondsArrow.style.transformOrigin = '50% 100% 0';
    clockPlate.appendChild (secondsArrow);  

  } 
  updateTime (hourAngle,minuteAngle,secondsAngle) {
    let hourArrow = this.field.getElementsByClassName ('hourArrow') [0];
    let minuteArrow = this.field.getElementsByClassName ('minuteArrow')[0];
    let secondsArrow = this.field.getElementsByClassName ('secondsArrow')[0];
    //изменение углов стрелок в реальном времени
    hourArrow.style.transform = 'rotate('+ hourAngle+'deg)';
    minuteArrow.style.transform = 'rotate('+ minuteAngle+'deg)';
    secondsArrow.style.transform = 'rotate('+ secondsAngle+'deg)';
  }
  init (model, field) {
    this.model = model;
    this.field = field;
  }
}