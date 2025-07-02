
document.querySelectorAll(".delete-button").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("index")
        console.log("clicked", id);
        fetch(`/movies/delete/${id}`,{
            method: "post"
        })
        .then(res => {
            return res.json;
        })
        .then(data => {
            window.location.reload();
        })
        
    })
});