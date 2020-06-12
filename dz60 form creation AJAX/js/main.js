"use strict";

let root = document.getElementById ('root');
let infoSpan = document.getElementById ('info');
let formbutton = document.getElementById ('formbutton');
let authorformbutton = document.getElementById ('authorformbutton');


function loadSiteForm() {
        $.ajax("http://localhost:4000/getForm1",
            { type:'GET', dataType:'json', success:dataLoadedForm1, error:errorHandler }
        );
}
function loadAuthorForm() {
        $.ajax("http://localhost:4000/getForm2",
            { type:'GET', dataType:'json', success:dataLoadedForm2, error:errorHandler }
        );
}
function dataLoadedForm1(data) {
        let mainForm = document.createElement ('form');
        mainForm.id = "mainFormer"
        mainForm.setAttribute('method','POST')
        mainForm.setAttribute('action','https://fe.it-academy.by/TestForm.php')
        mainForm.setAttribute('autocomplete','off')
        mainForm.setAttribute('enctype','multipart/form-data')
        mainForm.setAttribute('target','_blank')
        if (root.innerHTML == '') {
                root.appendChild (mainForm);
                formbutton.style.backgroundColor = '#dffba3'
        } else if (root.lastChild.id == 'mainFormer') {
                root.innerHTML = '';
                formbutton.style.backgroundColor = 'rgb(239, 239, 239)'
                authorformbutton.style.backgroundColor = 'rgb(239, 239, 239)'
                return;
        } else {
                root.innerHTML = '';
                root.appendChild (mainForm);
                authorformbutton.style.backgroundColor = 'rgb(239, 239, 239)'

                formbutton.style.backgroundColor = '#dffba3'
        }

        let formField = document.createElement ('fieldset');
        document.getElementById('mainFormer').appendChild (formField);
        let formLegend = document.createElement ('legend');
        document.body.getElementsByTagName ('fieldset')[0].appendChild (formLegend);
        formLegend.innerHTML = "Форма создания сайта";

        data.forEach((item) => {
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
}
function dataLoadedForm2(data) {
        let authorForm = document.createElement ('form');
        authorForm.id = "mainFormer2"
        authorForm.setAttribute('method','POST')
        authorForm.setAttribute('action','https://fe.it-academy.by/TestForm.php')
        authorForm.setAttribute('autocomplete','off')
        authorForm.setAttribute('enctype','multipart/form-data')
        authorForm.setAttribute('target','_blank')
        

        if (root.innerHTML == '') {
                infoSpan.innerHTML = '';
                infoSpan.innerHTML += 'Сначала загрузите форму создания сайта!';
                let timeout = setTimeout (()=> {
                        infoSpan.innerHTML = '';
                }, 1500);
                return;
        } else if (root.lastChild.id == 'mainFormer2') {
                root.lastChild.remove();  
                authorformbutton.style.backgroundColor = 'rgb(239, 239, 239)'             
                return;
        } else {
                root.appendChild (authorForm);
                authorformbutton.style.backgroundColor = '#dffba3'

        }
        let authorField = document.createElement ('fieldset');
        document.getElementById('mainFormer2').appendChild (authorField);
        let authorLegend = document.createElement ('legend');
        document.body.getElementsByTagName ('fieldset')[1].appendChild (authorLegend);
        authorLegend.innerHTML = "Авторизация";

        data.forEach((item) => {
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
}
function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
}
