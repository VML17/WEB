const cookieHolder = document.querySelector(".cookieHolder");

function checkCookieState(){
    let cookie = document.cookie;

    let state = cookie.split("=");
    console.log(state);
    if (cookie.split("=")[0] == "cookieState"){
        return true;
    }else{
        return false;
    }

}
function setCookieState(state){
    document.cookie = `cookieState=${state}`;
    cookieHolder.innerHTML = '';
}

if (checkCookieState() == false){
    const container = document.createElement("div");
    container.classList.add("container");
    container.innerHTML = `
                <div class="header">
                    <img src="cookie.png" alt="">
                    <h2> Cookies Consent</h2>
                </div>
                <div class="content">
                    <p>This is a message related to the cookie use on this site. Please accept or reject cookie usage. <a href="">More info...</a></p> 
                </div>
                <div class="footer">
                    <button id="btnAccept">Accept</button>
                    <button id="btnReject">Reject</button>
                </div>
                `
    cookieHolder.appendChild(container);

    const btnAccept = document.getElementById("btnAccept");
    const btnReject = document.getElementById("btnReject");

    btnAccept.addEventListener("click", () => setCookieState("Accept"));
    btnReject.addEventListener("click", () => setCookieState("Reject"));
}
