const express = require("express");
const cors = require("cors");
require("./db/connect");
const productsRouter = require("./routers/productsRouter");

const app = express();

if (process.env.NODE_ENV === "production") {

	app.use(express.static("client","build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client","build", "index.html"));
	});
}

app.use(cors());
app.use(express.json());




app.use("/api", productsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
