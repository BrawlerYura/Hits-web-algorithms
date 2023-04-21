const MUTPROB = 70;
const POPULATION = 100;
const CHILDS = 200;
const MIN_LEN = 1;
const MAX_LEN = 70;

const INF = 999999999;

// Генерация случайного числа в диапозоне min-max
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

// Строки кода, из которых генерируются решения
const operations = [
    "a++;\n", "a--;\n", "b++;\n", "b--;\n", "c++;\n", "c--;\n", "[a, b] = [b, a + b];\n",
    "[b, c] = [c, a+b];\n", "[b, c] = [a, a+b];\n", "[a, b] = [c, a+b];\n", "[a, b] = [b-a, a];\n",
    "[a, c] = [c, a];\n", 
    "for (let i = 0; i < n; i++)\n  [a, b] = [b, a + b];\n",
    "for (let i = 0; i < n; i++)\n  [a, c] = [c, a + b];\n",
    "for (let i = 0; i < n; i++)\n  [a, b] = [b, c + b];\n"
]

// Решение в популяции
let solves = [];

// Нахождение приспособленности решения
function calculateFitness() {

}

// Генерация случайного решения
function generateSolve() {
    for (let i = 0; i < POPULATION; i++) {
        let currentSolve = {
            operationIndexes: new Array(randInt(MIN_LEN, MAX_LEN)),
            fitness: INF,
            code: ""
        };

        for (let j = 0; j < currentSolve.operationIndexes.length; j++) {
            currentSolve.operationIndexes[j] = randInt(0, operations.length);
            currentSolve.code += operations[currentSolve.operationIndexes[j]];
        }

        solves.push(currentSolve);
    }
}

// Экран вывода алгоритма
let display = document.getElementById("container");

// Запуск генетического алгоритма
const startButton = document.getElementById("startButton");

startButton.addEventListener('click', (e) => {
    solves = [];

    generateSolve();
    console.log(solves);
    display.innerHTML = solves[0].code.replace(/\n/gi, '<br>');
});
