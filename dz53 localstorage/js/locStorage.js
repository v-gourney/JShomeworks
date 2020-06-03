"use strict";
class LocStorage {
        constructor (key,value) {
                this.key = key;
                this.value = value;
        }
        addValue (key,value){
                localStorage.key = value;
        };
        getValue (key){
                return window.localStorage.key;
        };
        deleteValue (key){
                localStorage.removeItem("key");
        };
        getKeys (key){
                Object.keys(localStorage);
        };       
}
///// consts
const drinkfield = document.getElementById("drinkfield");
const recipefield = document.getElementById("recipefield");
const alcocheck = document.getElementById("alcocheck");
const successAdd = document.getElementById("successed");
const datafield = document.getElementById ("data");
successAdd.style.display = 'none';
datafield.style.display = 'none';
///// events
document.getElementById ('buttongreen').addEventListener ('click', addNewDrink, false);
document.getElementById ('buttonblue').addEventListener ('click', getDrinkInfo, false);
document.getElementById ('buttonyellow').addEventListener ('click', getDrinkList, false);
document.getElementById ('buttonred').addEventListener ('click', deleteDrinkInfo, false);
////////// functions-handlers
function addNewDrink () {
        let newDrink = drinkfield.value.trim();
        if (newDrink) {
                let drinkInfo = [recipefield.value, alcocheck.checked];
                let serialDrinkinfo = JSON.stringify (drinkInfo);
                localStorage.setItem(newDrink.toLowerCase(), serialDrinkinfo);
                drinkfield.value = '';
                recipefield.value = '';
                alcocheck.checked = false;
                successAdd.style.display = 'inline';
                successAdd.style.color = 'green';
                successAdd.innerHTML = `Напиток добавлен!`;
                setTimeout(function(){
                        successAdd.style.display = 'none'
                }, 3000);
        }
        drinkfield.focus();
}
function getDrinkInfo () {
        let newDrink = (drinkfield.value.trim()).toLowerCase();
        let returnDrink = JSON.parse(localStorage.getItem(newDrink));
        if ((newDrink)&&(newDrink in localStorage)) {
                datafield.style.display = 'block'
                datafield.innerHTML = `<h3>Выбранный напиток: ${newDrink}</h3>;
                                        <p>Рецепт приготовления прост: ${returnDrink[0]}</p>`
                setTimeout(function(){
                        datafield.style.display = 'none'
                }, 10000);
                drinkfield.value = '';
        } else {
                successAdd.style.display = 'inline';
                successAdd.style.color = 'red';
                successAdd.innerHTML = `Данного напитка нет в хранилище рецептов`;
                setTimeout(function(){
                        successAdd.style.display = 'none';
                }, 3000);    
                drinkfield.value = ''; 
        drinkfield.focus();
        }
}
function getDrinkList () {
        datafield.innerHTML = '';
        datafield.style.display = 'block';
        Object.keys(localStorage).forEach((key) => {
                let drinklist = document.createElement("h5");
                drinklist.className = "drinklist";
                drinklist.innerHTML = `&#9679 ${key} <br>`;
                datafield.appendChild (drinklist);
        })
        setTimeout(function(){
                datafield.style.display = 'none'
        }, 10000);
}
function deleteDrinkInfo () {
        let newDrink = (drinkfield.value.trim()).toLowerCase();
        if ((newDrink)&&(newDrink in localStorage)) {
                localStorage.removeItem(newDrink);
                successAdd.style.display = 'inline';
                successAdd.style.color = 'red';
                successAdd.innerHTML = `Напиток удален!`;
                setTimeout(function(){
                        successAdd.style.display = 'none';
                }, 3000);
                drinkfield.value = '';
        } else if (Object.keys(localStorage) == 0){
                successAdd.style.display = 'inline';
                successAdd.style.color = 'red';
                successAdd.innerHTML = `Список напитков пуст`;
                setTimeout(function(){
                        successAdd.style.display = 'none';
                }, 3000);
        } else {
                successAdd.style.display = 'inline';
                successAdd.style.color = 'red';
                successAdd.innerHTML = `Введите корректное название напитка из списка`;
                setTimeout(function(){
                        successAdd.style.display = 'none';
                }, 3000);    
        }
        drinkfield.focus();
}
















