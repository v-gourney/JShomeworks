class Controller {
  constructor () {
    this.model = null;
    this.field = null;
  }
  buttonsActivation () {
    let stopbutton = this.field.getElementsByTagName ('button') [0];
    let startbutton = this.field.getElementsByTagName ('button') [1];
    console.log (stopbutton,startbutton, this.model )


    stopbutton.addEventListener ('click', () => {
      this.model.arrowsStop()
    });
    startbutton.addEventListener ('click', () => {
      this.model.arrowsMove()
    });
    
  }
  init (model, field) {
    this.model = model;
    this.field = field;
  }

}


