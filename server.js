const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.static("project"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "project/html/index.html"));
});

app.get("/pokiList.html", (req, res) => {
	res.sendFile(path.join(__dirname, "project/html/pokiList.html"));
});

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});
