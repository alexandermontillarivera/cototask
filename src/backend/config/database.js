const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const colors = require("colors")

mongoose
	.connect(
		`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
	)
	.then(() => {
		console.log("[DATABASE]: Connected to database".blue)
	})
	.catch((err) => {
		console.log(("[DATABASE]: Error to connect database => " + err).red)
	})
