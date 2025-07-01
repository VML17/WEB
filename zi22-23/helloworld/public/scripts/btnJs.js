console.log("proba")
document.querySelectorAll(".delBtn").forEach(btn => {
    btn.addEventListener("click", ()=> {
        fetch("/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: btn.getAttribute("cat"),
                index: btn.getAttribute("i")
            })
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});