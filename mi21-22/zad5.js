const saveBtn = document.getElementById("save");
const submitBtn = document.getElementById("submit");
const name = document.getElementById("name");
const email = document.getElementById("email");
const feedback = document.getElementById("feedback");

function initialize(){
    name.value = localStorage.getItem("name")
    email.value = localStorage.getItem("email")
    feedback.value = localStorage.getItem("feedback")
}

initialize();

saveBtn.addEventListener("click", () => {
    localStorage.setItem("name", name.value)
    localStorage.setItem("email", email.value)
    localStorage.setItem("feedback", feedback.value)
});

submitBtn.addEventListener("click", () => {
    localStorage.clear();
    initialize();
});
