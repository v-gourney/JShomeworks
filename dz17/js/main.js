/*Написать «чистую» функцию для эффективного подсчёта количества русских гласных букв в строке.
Регулярные выражения (кто умеет) не использовать.
Спросить у пользователя строку. Вывести в консоль количество русских гласных букв в ней.*/
"use strict";
/*let userString = prompt ('Введите строку на проверку количества гласных');
let userLettersArray = (userString).split(""); //не знал такой метод, пришлось гуглить
console.log(userLettersArray); // для проверки, все буквы легли отдельными строками в элементы массива
let counter = 0;
const allVowels = ['А','а','Е','е','Ё','ё','И','и','О','о','У','у','Ы','ы','Э','э','Ю','ю','Я','я'];
for (let z=0; z < userLettersArray.length; z++) {
    let userLetter = userLettersArray[z];
        for (let i=0; i < allVowels.length; i++) {
            var vowel = allVowels[i];
            if (userLetter === vowel) counter++; 
        }
}
console.log ("Количество русских гласных в строке:", counter);*/









// ////////using forEach, filter, reduce + IIFE//////
const allVowels = ['а','е','ё','и','о','у','ы','э','ю','я'];
// forEach
(function vowelCounter () {
let userString = prompt ('Введите строку на проверку количества гласных').toLowerCase();
let userLettersArr = userString.split('');
let counter = 0;
let vowelChecker = userLettersArr.forEach ((item) => {
    allVowels.forEach ((vowel) => {
        if (item === vowel) {
            counter++;
        }
    })
})
console.group (`Результаты метода forEach:`);
console.log (`Количество гласных в вашей строке = ${counter}`);
console.groupEnd ();
}) ();
// filter
(function vowelFilter () {
    let userString = prompt ('Еще раз введите строку на проверку количества гласных').toLowerCase();
    let userLettersArr = userString.split('');
    let counter = 0;
    let vowelChecker = [];
    userLettersArr.filter((item) => {
        allVowels.forEach ((vowel) => {
            if (item === vowel) {
                counter++;
                vowelChecker.push(item);
            } 
        })
    })
    console.group (`Результаты метода filter:`);
    console.log (`Вот ваши гласные ${vowelChecker}`);
    console.log (`Количество гласных в новой строке равняется ${counter}`);
    console.groupEnd ();
}) ();
// reduce
(function vowelReducer () {
    let userString = prompt ('И финальный ввод строки на проверку гласных').toLowerCase();
    let userLettersArr = userString.split('');
    let vowelCounter = userLettersArr.reduce((reducer,item) => {
        allVowels.forEach ((vowel) => {
            if (item === vowel) {
                reducer++;
            } 
        }) 
    return reducer}, 0);
    console.group (`Результаты метода reduce:`);
    console.log (`Количество гласных в новой строке равняется ${vowelCounter}`);
    console.groupEnd ();
}) ();





