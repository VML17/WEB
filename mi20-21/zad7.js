const btn = document.getElementById("btn");
const text = document.getElementById("text");
const rez = document.getElementById("rezultat");

let lastUpdateTime = null;
let conversion;

btn.addEventListener("click", async () => {
    let msg = "";
    let currTime = new Date();
    if (lastUpdateTime == null || currTime-lastUpdateTime > 5000){
        lastUpdateTime = currTime;
        conversion = await (await fetch("tecaj.json")).json();
        msg = "Vaš iznos u kn je: "
    }else{
        msg =`Vaš iznos u kn je (prije ${currTime-lastUpdateTime}ms): `
    }

    let val;
    try {
        if(text.value.trim() == ""){
            val = NaN
        }else{
            val = Number(text.value);
        }
        console.log(val)
        if (isNaN(val))
            throw new Error;
    } catch (error) {
        msg = "Unesite ispravan pozitivan iznos u eurima";
    }

    rez.textContent = msg + Number((val * Number(conversion.srednji_tecaj.replace(",","."))).toFixed(5));

    console.log(conversion);
});