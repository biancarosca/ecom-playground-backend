const express = require("express");
const cors = require("cors");
require("./db/connect");
const productsRouter = require("./routers/productsRouter");

const app = express();

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "index.html"));
	});
}

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://ecom-playground-frontend.netlify.app/"
	);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
	next();
});

app.use("/api", productsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
