"use strict";

const formDef1=
[
  {label:'Разработчики:',kind:'longtext',name:'developers'},
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи: *',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы: *',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];


// ----------------------------------
//form1 creation
let mainForm = document.createElement ('form');
mainForm.id = "mainForm1"
mainForm.setAttribute('method','POST')
mainForm.setAttribute('action','https://fe.it-academy.by/TestForm.php')
mainForm.setAttribute('autocomplete','off')
mainForm.setAttribute('enctype','multipart/form-data')
mainForm.setAttribute('target','_blank')
// fieldset1
document.body.insertBefore (mainForm, document.body.getElementsByTagName ('script')[0]);
let formField = document.createElement ('fieldset');
document.getElementById('mainForm1').appendChild (formField);
let formLegend = document.createElement ('legend');
document.body.getElementsByTagName ('fieldset')[0].appendChild (formLegend);
formLegend.innerHTML = "Для внесения вашего сайта в каталог, заполните форму:";
//-----------------form-filling loop 1 
formDef1.forEach((item) => {
        let formUnit;
        let label;
        label = document.createElement ('label');
        label.innerHTML = item.label;
        switch (item.kind) {
                case 'longtext':
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'text');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('placeholder', 'введите текст');
                        formUnit.setAttribute ('maxlength', '200');
                        label.appendChild(formUnit);
                        formField.appendChild(label);
                        break;
                case 'number':
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'number');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('min', '0');
                        formUnit.setAttribute ('max', '5000');
                        formUnit.setAttribute ('step', '1');
                        label.appendChild(formUnit);
                        formField.appendChild(label);
                        break;
                case 'shorttext':
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'email');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('placeholder', 'введите e-mail');
                        formUnit.setAttribute ('maxlength', '200');
                        formUnit.setAttribute ('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
                        formUnit.setAttribute ('required', true);
                        label.appendChild(formUnit);
                        formField.appendChild(label);
                        break;
                case 'combo':
                        formUnit = document.createElement ('select');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('size', '1');
                        formUnit.setAttribute ('required', true);
                        item.variants.forEach((variant) => {
                                let option = document.createElement ('option');
                                option.setAttribute ('name', variant.value);
                                option.innerHTML = variant.text;
                                formUnit.appendChild (option);
                        })
                        label.appendChild(formUnit);
                        formField.appendChild(label);
                        break;
                case 'radio':
                        formUnit = document.createElement ('div');
                        formUnit.className = 'radiobuttons'
                        formUnit.innerHTML = item.label;
                        item.variants.forEach((variant) => {
                                let switcher = document.createElement ('input');
                                switcher.setAttribute ('type', 'radio');
                                switcher.setAttribute ('name', 'radiobutton');
                                switcher.setAttribute ('value', variant.value);
                                switcher.id = `switcher${variant.value}`;
                                let switcherLabel = document.createElement ('label');
                                switcherLabel.innerHTML = variant.text;
                                switcherLabel.setAttribute ('for', switcher.id);
                                formUnit.appendChild (switcher);
                                formUnit.appendChild (switcherLabel);
                        })
                        formField.appendChild(formUnit);
                        break;
                case 'check':
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'checkbox');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('checked', true);
                        label.appendChild(formUnit);
                        formField.appendChild(label);
                        break;
                case 'memo':
                        formUnit = document.createElement ('textarea');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('placeholder', 'опишите ваш сайт');
                        formUnit.setAttribute ('maxlength', '6000');
                        label.appendChild(formUnit);
                        formField.appendChild(label);
                        break;
                case 'submit':
                        let caption = document.createElement ('caption');
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'submit');
                        formUnit.setAttribute ('name', item.caption);
                        formUnit.setAttribute ('value', item.caption);
                        caption.appendChild (formUnit)
                        formField.appendChild(caption);
                        break;
        }
})   
//-----------------form validation
let validForm = document.getElementById ('mainForm1');
validForm.addEventListener ('submit', formValidator, false);

function formValidator (event) {
        let mainForm = document.getElementById ('mainForm1');

        let developField = mainForm.elements.developers;
        let developValue = (developField.value.trim());

        let siteField = mainForm.elements.sitename;
        let siteValue = (siteField.value.trim());
        
        let URLField = mainForm.elements.siteurl;
        let URLValue = (URLField.value.trim());

        let visitorsField = mainForm.elements.visitors;
        let visitorsValue = visitorsField.value;

        let emailField = mainForm.elements.email;
        let emailValue = emailField.value;

        let paymentField = mainForm.elements.radiobutton;
        let paymentValue = paymentField.value;

        let votesField = mainForm.elements.votes;
        let votesValue = votesField.checked;

        //валидация имени разработчика на пустую строку
        if (developValue.length == 0) {
                alert('Введите пожалуйста ФИО разработчика! (до 200 символов)');
                developField.focus(); 
                event.preventDefault(); 
                return;
        }
        //валидация имени сайта на пустую строку
        if (siteValue.length == 0) {
                alert('Введите название сайта! (до 200 символов)');
                siteField.focus(); 
                event.preventDefault(); 
                return;
        }
        //валидация URL сайта на пустую строку
        if ((URLValue.length == 0)||(URLValue.length<3)) {
                alert('Введите URL сайта!');
                URLField.focus(); 
                event.preventDefault(); 
                return;
        }
        //валидация количества посетителей на пустую строку (ограничение количества и шаг заданы атрибутами)
        if (visitorsValue.length == 0) {
                alert('Выберите коилечтво посетителей сайта в сутки: от 0 до 5000 чел');
                visitorsField.focus(); 
                event.preventDefault(); 
                return;
        }
        //валидация e-mail происходит засчет атрибутов pattern (рег.выражение) и required

        //опции тэга select не валидируем

        //валидация радиобаттона на пустоту
        if ((!paymentValue == 1)||(!paymentValue == 2)||(!paymentValue == 3)) {
                alert('Выберите метод размещения');
                document.getElementById('switcher1').focus();
                event.preventDefault(); 
                return;
        }
        //валидация checkbox 
        if (!votesValue) {
                alert('Вы должны разрешить отзывы (обязательное требование к сайту)');
                votesField.focus(); 
                event.preventDefault(); 
                return;
        }
        // иначе валидация успешна - форма отправляется
}
