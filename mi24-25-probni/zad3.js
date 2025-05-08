
async function fileMinMax(fileName) {
    let promise = await fetch(fileName);
    if (!promise.ok){
        throw new Error("Neuspjesno ucitavnje iz JSON-a");
    }
    let response = await promise.json();

    if(!Array.isArray(response)){
        throw new Error("JSON nije polje");
    }

    if(!response.every(el => typeof el === "number")){
        throw new Error("Elementi nisu brojevi");
    }

    min=Math.min(...response);
    max=Math.max(...response);
    return Promise.resolve({
        min:min,
        max:max
    })
}

async function getMinMax(firstFile, secondFile) {
    let [first, second] = await Promise.all([fileMinMax(firstFile), fileMinMax(secondFile)]);
    
    let min = Math.min(first.min, second.min);
    let max = Math.max(first.max, second.max);

    return Promise.resolve({min:min, max:max})
}

getMinMax("first.json", "second.json")
.then(function(result){
    console.log("min: " + result.min)
    console.log("max: " + result.max)
})
.catch(function(err){
    console.log(err)
});
