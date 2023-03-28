export { agglomerativeClustering };

const MAXVALUE = 10000000;

function findDistance(point1, point2) {
    let x = point1.x - point2.x;
    let y = point1.y - point2.y;
    return Math.sqrt(x * x + y * y);
}

function generateArrayOfDistances (clusters) {
    let distances = [];
    for (let i = 0; i < clusters.length - 1; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
            let distance = 0;
            for (let x of clusters[i]) {
                for (let y of clusters[j]) {
                    distance += findDistance(x, y);
                }           
            }
            distance /= (clusters[i].length * clusters[j].length);
            distances.push({distance, i, j});
        }
    }
    return distances;
}

function agglomerativeClustering(pointCoordinates, k) {
    let clusters = [];
  
    for (let i = 0; i < pointCoordinates.length; i++) {
        clusters[i] = [pointCoordinates[i]];
    }
  
    while (clusters.length > k) {
        let distances = generateArrayOfDistances(clusters);
  
        let minDistance = MAXVALUE;
        let index;

        for (let i = 0; i < distances.length; i++) {
            if (distances[i].distance < minDistance) {
                minDistance = distances[i].distance;
                index = i;
            }
        }
  
        let merged = clusters[distances[index].i].concat(clusters[distances[index].j]); //объединение массивов с минимальными расстояниями между кластерами
        clusters.splice(distances[index].j, 1);//удаляем объединенные кластеры
        clusters.splice(distances[index].i, 1);
        clusters.push(merged);
    }

    return clusters;
}