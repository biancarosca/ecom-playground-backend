const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connect");
const productsRouter = require("./routers/productsRouter");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const Product = require("./models/productModel");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", productsRouter);

const PORT = process.env.PORT || 3000;

let connectedSocket;

io.on("connection", (socket) => {
	connectedSocket = socket;
});

const productEventEmitter = Product.watch();
const sendProduct = (data) => connectedSocket.emit("message", data);

productEventEmitter.on("change", (change) => sendProduct(change));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

