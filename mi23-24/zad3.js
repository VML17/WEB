

// async function getMinMax(firstFile, secondFile) {
    
//     const resoponses = await Promise.all([fetch(firstFile), fetch(secondFile)])

//     // console.log(resoponses)

//     resoponses.forEach((response) => {
//         if(!response.ok){
//             throw new Error(`greška pri fetchu: ${resoponse.url}`);
//         }
//     })

//     const values = await Promise.all(resoponses.map(response => response.json()))

//     values.forEach(resp => {
//         if(!Array.isArray(resp))
//             throw new Error("nije array");
//         resp.forEach(el => {
//             if(typeof el == Number)
//                 throw new Error("nije broj");
//             // console.log(typeof el)
//         })
//     });

//     // console.log(values)

//     let min1 = Math.min(...values[0]);
//     let max1 = Math.max(...values[0]);
//     let min2 = Math.min(...values[1]);
//     let max2 = Math.max(...values[1]);

//     let min = Math.min(min1, min2);
//     let max = Math.max(max1, max2);

//     return {"min":min, "max":max}
    
// }

getMinMax("first.json", "second.json")
.then(
    function(result){
        console.log("min: " + result.min);
        console.log("max: " + result.max);
    }
).catch(
    function(err) {
        console.error("negdje je zapelo: " + err);
    }
);


async function fileMinMax(filename) {
    let file1 = await fetch(filename);
    var result1 = await file1.json();
    let max = -Infinity;
    let min = Infinity;
    result1.forEach(function (oneElement) {
        if (oneElement > max) max = oneElement;
        if (oneElement < min) min = oneElement;
    });
    return { min, max};
}

async function getMinMax(firstFile, secondFile) {
    const [m1, m2] = await Promise.all([
        fileMinMax(firstFile),
        fileMinMax(secondFile),
    ]);
    let max = m1.max > m2.max ? m1.max : m2.max;
    let min = m1.min < m2.min ? m1.min : m2.min;
    return { min, max}
}
getMinMax("first.json", "second.json")
    .then(function (rez) {
        console.log(rez.min, rez.max);
    })
    .catch(function (err) {
        console.error("Došlo je do pogreške.")
        console.error(err);
    });