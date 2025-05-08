async function LoadData(fileName){
    let promise = await fetch(fileName);
    if (!promise.ok) { 
        throw new Error("Cannot load json file"); 
    }else{ 
        return await promise.json();
    }     
} 

async function main() {
    try{
        const products = await LoadData("products.json")
        const categories = await LoadData("categories.json")
    
    
        categories.forEach(el => {
            el["num"] = 0;
        });
    
        products.forEach(itm => {
            let id = itm.CategoryId;
            let temp = categories.find(el => el.CategoryId == id).num += itm.NumProd;
    
        });
    
        categories.sort((a,b) => b.num - a.num);
        console.log(categories[0].CategoryName);

    }catch(err){
        console.log("An error has occured and program stopped working");
    }
}

main();