const express = require("express");
const cors = require("cors");
require("./db/connect");
const productsRouter = require("./routers/productsRouter");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api",productsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));