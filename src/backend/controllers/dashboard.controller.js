const { render } = require("ejs")
const mongoose = require("mongoose")
const keygen = require("keygenerator")
const { Tasks, Task } = require("../models/tasks")
const { Users, User } = require("../models/users")
const colors = require("colors")
const session = require("express-session")
const bcrypt = require("bcrypt")
const keygenerator = require("keygenerator")

const indexGet = async (req, res) => {
	if (req.session.loggedin) {
		const userNow = req.session.key
		Tasks.find({ status: "pending", user: userNow }, (err, pending) => {
			if (err) console.log(err)
			Tasks.find({ status: "process", user: userNow }, (err, process) => {
				if (err) console.log(err)
				Tasks.find({ status: "ending", user: userNow }, (err, ending) => {
					if (err) console.log(err)
					else
						res.render("dashboard/index.html", {
							user: {
								name: req.session.name,
								lastname: req.session.lastname,
								avatar: req.session.avatar,
							},
							page: {
								title: "Observa, cambia estado y elimina tareas",
								metaTitle: "Bienvenido - Dashboard Actions",
							},
							tasks_pending: pending,
							tasks_process: process,
							tasks_ending: ending,
						})

					console.log("[APP]: all tasks are loaded".yellow)
				})
			})
		})
	} else {
		res.render("all/error.html", {
			error: true,
			alertTitle: "Error",
			alertMessage: "No estás logueado",
			alertIcon: "error",
			showConfirmButton: true,
			timer: 4000,
			ruta: '/'
		})
	}
}

const profileGet = async (req, res) => {
	if (req.session.loggedin) {
		const userNow = req.session.key
		let pending = await Tasks.countDocuments({
			status: "pending",
			user: userNow,
		})
		let process = await Tasks.countDocuments({
			status: "process",
			user: userNow,
		})
		let ending = await Tasks.countDocuments({ status: "ending", user: userNow })
		let gender = ""
		if (req.session.gender == "men") {
			gender = "Hombre"
		} else {
			gender = "Mujer"
		}

		res.render("dashboard/profile.html", {
			user: {
				name: req.session.name,
				lastname: req.session.lastname,
				email: req.session.email,
				avatar: req.session.avatar,
				key: req.session.key,
				gender: gender,
			},
			page: {
				title: "Mira tu información persona y actualízala",
				metaTitle: "Perfil - Dashboard Profile",
			},
			status: {
				pending: pending,
				process: process,
				ending: ending,
			},
		})
	} else {
		res.render('all/error.html', {
			error: true,
			alertTitle: "Error",
			alertMessage: "No estas logueado",
			alertIcon: "error",
			showConfirmButton: true,
			timer: 4000,
			ruta: '/'
		})
	}
}

const developerGet = async (req, res) => {
	if (req.session.loggedin) {
		let userNow = req.session.email
		Users.findOne({ email: userNow }, (err, data) => {
			res.render("dashboard/developer.html", {
				user: {
					name: req.session.name,
					lastname: req.session.lastname,
					avatar: req.session.avatar,
					token: req.session.key,
				},
				page: {
					title: "Documentación de API REST y datos de acceso",
					metaTitle: "API - Dashboard API REST",
				},
			})
		})
	} else {
		res.render('all/error.html', {
			error: true,
			alertTitle: "Error",
			alertMessage: "No estás logueado",
			alertIcon: "error",
			showConfirmButton: true,
			timer: 4000,
			ruta: '/'
		})
	}
}

const addTasksGet = (req, res) => {
	res.render("dashboard/insert-task.html")
}

const addTasksPost = async (req, res) => {
	const { title, description } = req.body
	const addNewTask = new Tasks({
		title: title,
		description: description,
		status: "pending",
		user: req.session.key,
	})

	addNewTask.save()
	res.redirect("/admin")
}

const updateTasksGet = async (req, res) => {
	if(req.session.loggedin) {
	const { task_id } = req.params

	Tasks.find({ _id: task_id }, (err, data) => {
		if (err) {
			console.log(err)
		} else {
			res.render("dashboard/tasks_update.html", {
				task: data,
				page: {
					metaTitle: "Actualizar tarea - Dashboard Update",
				},
				user: {
					name: req.session.name,
					lastname: req.session.lastname,
					avatar: req.session.avatar,
				},
			})
		}
	})} else {
		res.render('all/error.html', {
			error: true,
			alertTitle: "Error",
			alertMessage: "No estás logueado",
			alertIcon: "error",
			showConfirmButton: true,
			timer: 4000,
			ruta: '/'
		})
	}
}

const updateTasksPost = async (req, res) => {
	const { task_id } = req.params
	const { title, description, status } = req.body
	await Tasks.findByIdAndUpdate(task_id, {
		title: title,
		description: description,
		status: status,
	})
	res.redirect("/admin")
}

const updateTaskProcess = async (req, res) => {
	const { task_id } = req.params
	await Tasks.findByIdAndUpdate(task_id, {
		status: "process",
	})
	res.redirect("/admin")
}

const updateTaskEnding = async (req, res) => {
	const { task_id } = req.params
	await Tasks.findByIdAndUpdate(task_id, {
		status: "ending",
	})
	res.redirect("/admin")
}

const updateTaskPending = async (req, res) => {
	const { task_id } = req.params
	await Tasks.findByIdAndUpdate(task_id, {
		status: "pending",
	})
	res.redirect("/admin")
}

const updateProfile = async (req, res) => {
	const { name, lastname, email, password, gender } = req.body
	const userNow = req.session.key
	await Users.findOneAndUpdate(
		{ key: userNow },
		{
			name: name,
			lastname: lastname,
			email: email,
			gender: gender,
			password: bcrypt.hashSync(password, 12),
		},
	)

	res.redirect("/admin/profile")
}

const deleteTasks = async (req, res) => {
	const { tasks_id } = req.params
	await Tasks.findByIdAndDelete(tasks_id)
	res.redirect("/admin")
}

const updatePasswordApi = async (req, res) => {
	const { password } = req.body
	const userNow = req.session.key
	await Users.findOneAndUpdate(
		{ key: userNow },
		{
			passwordApi: bcrypt.hashSync(password, 12),
		},
	)
	res.redirect("/admin/developer")
}

module.exports = {
	indexGet,
	profileGet,
	developerGet,
	addTasksGet,
	addTasksPost,
	deleteTasks,
	updateTasksGet,
	updateTasksPost,
	updateTaskProcess,
	updateTaskEnding,
	updateTaskPending,
	updateProfile,
	updatePasswordApi,
}
