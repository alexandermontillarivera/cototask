const { Users, User } = require("../models/users")
const { render } = require("ejs")
const { Tasks, Task } = require("../models/tasks")
const mongoose = require("mongoose")
const keygenerator = require("keygenerator")
const bcrypt = require("bcrypt")
const session = require("express-session")

const home = (req, res) => {
	if(req.session.loggedin) {
	res.render("all/error.html", {
		error: true,
		alertTitle: "success",
		alertMessage: "Redireccionando a la página principal",
		alertIcon: "success",
		showConfirmButton: true,
		timer: 4000,
		ruta: '/admin'
		})
	} else {
		res.render("all/index.html", {
		})
	}
}

const newUser = async (req, res) => {
	const { name, lastname, email, gender, password } = req.body

	let avatar = ""

	if (gender == "men") {
		avatar = "/dashboard/avatar/men.svg"
	} else {
		avatar = "/dashboard/avatar/woman.svg"
	}

	const addUser = new Users({
		name: name,
		lastname: lastname,
		email: email,
		gender: gender,
		password: bcrypt.hashSync(password, 12),
		key: keygenerator.generate(30),
		passwordApi: bcrypt.hashSync(password, 12),
		avatar: avatar,
	})
	await addUser.save()

	res.redirect("/")
}

const login = async (req, res) => {
	const { body } = req
	const { email, password } = body

	const result = await Users.findOne({ email })

	const passwordCorrect =
		result === null ? false : await bcrypt.compare(password, result.password)

	if (!passwordCorrect) {
		res.render("all/error.html", {
			error: true,
			alertTitle: "Error",
			alertMessage: "Email o contraseña incorrectos",
			alertIcon: "error",
			showConfirmButton: true,
			timer: 4000,
			ruta: '/'
		})
	} else {
		req.session.loggedin = true
		req.session.id = result._id
		req.session.name = result.name
		req.session.lastname = result.lastname
		req.session.email = result.email
		req.session.password = result.password
		req.session.gender = result.gender
		req.session.avatar = result.avatar
		req.session.key = result.key
		res.redirect("/admin")
	}
}

const logout = (req, res) => {
	req.session.destroy()
	res.redirect("/")
}

module.exports = { home, newUser, login, logout }
