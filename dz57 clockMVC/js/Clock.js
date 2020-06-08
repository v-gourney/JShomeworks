class Model {
  constructor () {
    this.view = null;
    this.timerID = null;
  }
  
  clockAppear (gmt) {
    this.view.renderClock ();
  }

  arrowsMove (gmt) {
    this.timerID = setInterval (() => {
      //вычисление начальных углов стрелок
      let timeAngles = new Date();
      let hourCurrent = timeAngles.getHours() + gmt;
      if (hourCurrent > 12) {
          hourCurrent-=12;
      }
      let hourAngle = Math.round(hourCurrent*30 + (timeAngles.getMinutes())*0.5) ;
      let minuteAngle = (timeAngles.getMinutes())*6;
      let secondsAngle = (timeAngles.getSeconds())*6;
      this.view.updateTime(hourAngle,minuteAngle,secondsAngle);
    }, 10);
  }
  arrowsStop () {
    clearInterval (this.timerID);
  }

  init(view) {
    this.view = view;
  }
}
let gmt = 0;
let city = '';

///1///
const clock1 = new Model ();
const clockView1 = new View ();
const clockController1 = new Controller ();
const field1 = document.getElementById ('field1');
clock1.init (clockView1);
clockView1.init (clock1, field1);
clockController1.init (clock1, field1);
clock1.clockAppear (city = 'Минск');
clock1.arrowsMove (gmt);
clockController1.buttonsActivation ();

///2///
const clock2 = new Model ();
const clockView2 = new View ();
const clockController2 = new Controller ();
const field2 = document.getElementById ('field2');
clock2.init (clockView2);
clockView2.init (clock2, field2);
clockController2.init (clock2, field2);
clock2.clockAppear (gmt=6, city = 'Токио');
clock2.arrowsMove (gmt=6);
clockController2.buttonsActivation ();

///3///
const clock3 = new Model ();
const clockView3 = new View ();
const clockController3 = new Controller ();
const field3 = document.getElementById ('field3');
clock3.init (clockView3);
clockView3.init (clock3, field3);
clockController3.init (clock3, field3);
clock3.clockAppear (gmt=7, city = 'Владивосток');
clock3.arrowsMove (gmt=7);
clockController3.buttonsActivation ();

///4///
const clock4 = new Model ();
const clockView4 = new View ();
const clockController4 = new Controller ();
const field4 = document.getElementById ('field4');
clock4.init (clockView4);
clockView4.init (clock4, field4);
clockController4.init (clock4, field4);
clock4.clockAppear (gmt=-2, city = 'Берлин');
clock4.arrowsMove (gmt=-2);
clockController4.buttonsActivation ();

///5///
const clock5 = new Model ();
const clockView5 = new View ();
const clockController5 = new Controller ();
const field5 = document.getElementById ('field5');
clock5.init (clockView5);
clockView5.init (clock5, field5);
clockController5.init (clock5, field5);
clock5.clockAppear (gmt=-3, city = 'Лондон');
clock5.arrowsMove (gmt=-3);
clockController5.buttonsActivation ();

///6///
const clock6 = new Model ();
const clockView6 = new View ();
const clockController6 = new Controller ();
const field6 = document.getElementById ('field6');
clock6.init (clockView6);
clockView6.init (clock6, field6);
clockController6.init (clock6, field6);
clock6.clockAppear (gmt=-8, city = 'Нью-Йорк');
clock6.arrowsMove (gmt=-8);
clockController6.buttonsActivation ();
