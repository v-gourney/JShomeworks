"use strict";

const formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
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
formLegend.innerHTML = "Форма создания сайта";
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
//form2 creation
let authorForm = document.createElement ('form');
authorForm.id = "mainForm2"
authorForm.setAttribute('method','POST')
authorForm.setAttribute('action','https://fe.it-academy.by/TestForm.php')
authorForm.setAttribute('autocomplete','off')
authorForm.setAttribute('enctype','multipart/form-data')
authorForm.setAttribute('target','_blank')
// fieldset2
document.body.insertBefore (authorForm, document.body.getElementsByTagName ('script')[0]);
let authorField = document.createElement ('fieldset');
document.getElementById('mainForm2').appendChild (authorField);
let authorLegend = document.createElement ('legend');
document.body.getElementsByTagName ('fieldset')[1].appendChild (authorLegend);
authorLegend.innerHTML = "Авторизация";
//-----------------form-filling loop 2
formDef2.forEach((item) => {
        let formUnit;
        let label;
        label = document.createElement ('label');
        label.innerHTML = item.label;
        switch (item.kind) {
                case 'longtext':
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'text');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('placeholder', 'ваше ФИО');
                        formUnit.setAttribute ('maxlength', '200');
                        label.appendChild(formUnit);
                        authorField.appendChild(label);
                        break;
                case 'number':
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'number');
                        formUnit.setAttribute ('name', item.name);
                        formUnit.setAttribute ('min', '12');
                        formUnit.setAttribute ('max', '120');
                        formUnit.setAttribute ('step', '1');
                        label.appendChild(formUnit);
                        authorField.appendChild(label);
                        break;
                case 'submit':
                        let caption = document.createElement ('caption');
                        formUnit = document.createElement ('input');
                        formUnit.setAttribute ('type', 'submit');
                        formUnit.setAttribute ('name', item.caption);
                        formUnit.setAttribute ('value', item.caption);
                        caption.appendChild (formUnit)
                        authorField.appendChild(caption);
                        break;
        }
}) 
