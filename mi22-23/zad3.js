
async function presijek(){

    let firstPromise = await fetch("first.json");
    let secondPromise = await fetch("second.json");
    
    if (firstPromise.ok && secondPromise.ok){
        let first = await firstPromise.json();
        let second = await secondPromise.json();
        
        
        
        if (first.length > second.length){
            [first, second] = [second, first];
        }

        let result = [];

        for (let el of first){
            if (second.includes(el)){
                result.push(el);
            }
        }

        return Promise.resolve(result);
    }
}

presijek().then(result => console.log(result));