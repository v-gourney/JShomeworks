"use strict";

function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
}

function mood(colorsCount) {
    var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];

    console.log( 'цветов: ' + colorsCount );
    let maxColors = 7; // будем сокращать на 1 каждый шаг цикла
    for ( var i=1; i<=colorsCount; i++ ) {
            var n=randomDiap(1,maxColors);
            var colorName=colors[n];
            console.log( colorName );
            colors.splice(n,1); //вырезаем из массива использованный цвет
            maxColors--; // сокращаем длину рандомной выборки из массива, чтобы не появлялся undefined
    }
}

mood(5);