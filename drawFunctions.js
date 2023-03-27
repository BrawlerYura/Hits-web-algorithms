import { nowButton, pointCoordinates, countClusters } from "./main.js";
import { Point } from "./pointClass.js";
import { dbscan } from "./DBSCAN.js";
import { kMeans } from "./kMeans.js";
export { drawer, startDrawing, stopDrawing, startDBSCAN, startKMeans, findNearestPointIndex, getAllPointsBlack };

const colors = [
    'rgb(0, 0 ,100)',
    'rgb(0, 0 ,200)',
    'rgb(0, 100 ,0)',
    'rgb(0, 100 ,100)',
    'rgb(0, 100 ,200)',
    'rgb(0, 200 ,0)',
    'rgb(0, 200 ,100)',
    'rgb(0, 200 ,200)',
    'rgb(100, 0 ,0)',
    'rgb(100, 0 ,100)',
    'rgb(100, 0 ,200)',
    'rgb(100, 100 ,0)',
    'rgb(100, 100 ,100)',
    'rgb(100, 100 ,200)',
    'rgb(100, 200 ,0)',
    'rgb(100, 200 ,100)',
    'rgb(100, 200 ,200)',
    'rgb(200, 0 ,0)',
    'rgb(200, 0 ,100)',
    'rgb(200, 0 ,200)',
    'rgb(200, 100 ,0)',
    'rgb(200, 100 ,100)',
    'rgb(200, 100 ,200)',
    'rgb(200, 200 ,0)',
    'rgb(200, 200 ,100)',
    'rgb(200, 200 ,200)',
];

const blackColor = 'rgb(0, 0, 0)'
const canvasColor = 'rgb(34, 131, 102)';
const MAXVALUE = 100000000;
const RADIUS = 10;
const minDistanceBetweenPoint = 30;


function startDBSCAN (){
    console.log(dbscan(pointCoordinates, 50, 4));
}

function startKMeans () {
    drawClusters(kMeans(countClusters));
}

function drawClusters(clusters){
    for (let i = 0; i < countClusters; i++) {
        let colorIndex = Math.floor((Math.random() * colors.length / countClusters) + (colors.length / countClusters * i));

        for (let j = 0; j < clusters[i].length; j++) { 
            let index = pointCoordinates.indexOf(clusters[i][j]);
            pointCoordinates[index].draw(colors[colorIndex]);
        }

    }
}

function drawer(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (nowButton === 1 && isDrawPossibility(x, y)) {
        addPoint(x, y);
    } 
    
    if (nowButton === 2){
        deletePoint(x, y);
    }
}

function addPoint(x, y) {
    pointCoordinates.push(new Point(x, y, RADIUS));
    pointCoordinates[pointCoordinates.length - 1].draw();
}

function deletePoint(x, y) {
    let index = pointPresenceCheck(x, y);

    if (index !== null) {
        pointCoordinates[index].draw(canvasColor, 1);
        pointCoordinates.splice(index, 1);
    }
}

function isDrawPossibility(x, y) {
    let index = findNearestPointIndex(x, y);

    if (index === null || findDistance(pointCoordinates[index].x, pointCoordinates[index].y, x, y) > minDistanceBetweenPoint) {
        return true;
    }

    return false;
}

function pointPresenceCheck(x, y){
    let index = findNearestPointIndex(x, y);

    if (index !== null){
        if (findDistance(x, y, pointCoordinates[index].x, pointCoordinates[index].y) < RADIUS){
            return index;
        }
    }

    return null;
}

function getAllPointsBlack(){
    for (let i = 0; i < pointCoordinates.length; i++) {
        pointCoordinates[i].draw(blackColor);
    }
}

function findNearestPointIndex(x, y) {
    let minDistance = MAXVALUE;
    let index = null;

    for (let i = 0; i < pointCoordinates.length; i++) {
        let distance = findDistance(pointCoordinates[i].x, pointCoordinates[i].y, x, y);

        if (distance < minDistance) {
            index = i;
            minDistance = distance;
        }
    }

    return index;
}

function findDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function startDrawing() {
    document.getElementById('canvas').addEventListener('mousemove', drawer);
}

function stopDrawing() {
    document.getElementById('canvas').removeEventListener('mousemove', drawer);
}