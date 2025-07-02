const express = require("express");
const app = express();
const session = require("express-session");

const port = 3000;
const prefix = "/toggle";

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "web1"
}));

app.get(prefix + "/:pathArg(*)", (req,res) => {
    
    req.session.mode === "day" ? req.session.mode = "night" : req.session.mode = "day";
    res.redirect("/" + req.params.pathArg);
});

app.get("*", (req, res) => {

    if(!req.session.mode)
        req.session.mode = "day";

    res.setHeader("Content-type", "text/html");
    if( req.session.mode == "day")
        res.write("<style> body {background-color: white; color: black;} </style>");
    else
        res.write("<style> body {background-color: black; color: white;} </style>");

    res.write("Pristupljeno putu " + req.url + "<hr>");
    res.write("<a href=\"" + prefix + req.url + "\">Promijeni pozadinu</a><br>");
    res.end("<a href=\"/\">Povratak na osnovni dokument</a>");
});

app.listen(port, () => {
    console.log("Osluškujem na vratima " + port);
});
