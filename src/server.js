// ======  requirement server ====== //
const express = require("express")
const server = express()
const path = require("path")
require("dotenv").config()
const session = require("express-session")
require("colors")
const morgan = require("morgan")

// ======  requirement config ====== //
require("./backend/config/database")
const auth = require("./backend/routes/auth")
const indexer = require("./backend/routes/dashboard")
const api = require("./backend/routes/api")

// Setting up the view engine
server.set("port", process.env.APP_PORT || process.env.PORT)
server.set("views", path.join(__dirname, "/frontend/views"))
server.set("view engine", "ejs")
server.engine("html", require("ejs").renderFile)
server.use(express.static(path.join(__dirname, "/frontend/public")))

// ======  middlewares ====== //
server.use(
	express.urlencoded({
		extended: false,
	}),
)

server.use(
	session({
		secret: process.env.APP_SECRET_COOKIE_NAME,
		resave: true,
		saveUninitialized: true,
		name: "SESSION.COOKIE.COTOTASK",
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
		},
	}),
)

server.use((req, res, next) => {
	if (!req.user)
		res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
	next()
})

// ======  routes server ====== //
server.use(auth.router)
server.use(indexer.router)
server.use(api.router)

server.use(morgan("dev"))

server.listen(server.set('port'), () => {
    console.log((`[APP]: Server listening on http://localhost:${server.get('port')}`).yellow)
})

module.exports =  server