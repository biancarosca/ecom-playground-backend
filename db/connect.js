const mongoose = require("mongoose");
if(process.env.NODE_ENV !== "production")
	require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log("DB connected!");
	} catch (error) {
		console.log(error.message);
	}
};

connectDB();