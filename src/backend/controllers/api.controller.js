const bcrypt = require("bcrypt")
const { Users, User } = require("../models/users")
const { Tasks, Task } = require("../models/tasks")

const allTasks = async (req, res) => {
	const { keyApi, password } = req.params

	const result = await Users.findOne({ key: keyApi })

	const passwordCorrect =
		result === null ? false : await bcrypt.compare(password, result.passwordApi)

	if (!passwordCorrect) {
		res.status(401).json({
			error: "Your credentials are incorrect",
		})
	} else {
		Tasks.find({ user: keyApi }, (err, tasks) => {
			err && res.status(500).send(err.message)

			res.status(200).json({"Status": "Found all", "Task": tasks})
		})
	}
}

const searchTasks = async (req, res) => {
	const { keyApi, password} = req.params

	const result = await Users.findOne({ key: keyApi })

	const passwordCorrect =
		result === null ? false : await bcrypt.compare(password, result.passwordApi)

	if (!passwordCorrect) {
		res.status(401).json({
			error: "Your credentials are incorrect",
		})
	} else {
        const { idSend } = req.params

		Tasks.find({_id:idSend}, (err, usr) => {
			err && res.status(500).send(err.message)

			res.status(200).json({"Status": "Found", "Task": usr})
		})
	}
}

const addTasks = async (req, res) => {
	const { keyApi, password } = req.params

	const result = await Users.findOne({ key: keyApi })

	const passwordCorrect =
		result === null ? false : await bcrypt.compare(password, result.passwordApi)

	if (!passwordCorrect) {
		res.status(401).json({
			error: "Your credentials are incorrect",
		})
	} else {
		const { idSend } = req.params

		Tasks.find(idSend, (err, usr) => {
			err && res.status(500).send(err.message)

			res.status(200).json({"Status": "Found", "Task": usr})
		})
	}
}

const deleteTasks = async (req, res) => {
	const { keyApi, password } = req.params

	const result = await Users.findOne({ key: keyApi })

	const passwordCorrect =
		result === null ? false : await bcrypt.compare(password, result.passwordApi)

	if (!passwordCorrect) {
		res.status(401).json({
			error: "Your credentials are incorrect",
		})
	} else {
		const { idSend } = req.body

		Tasks.findOneAndDelete(idSend, (err, usr) => {
			err && res.status(500).send(err.message)

			res.status(200).json({"Status": "Deleted", "Task": usr})
		})
	}
}

const updateTasks = async (req, res) => {
	const { keyApi, password } = req.params

	const result = await Users.findOne({ key: keyApi })

	const passwordCorrect =
		result === null ? false : await bcrypt.compare(password, result.passwordApi)

	if (!passwordCorrect) {
		res.status(401).json({
			error: "Your credentials are incorrect",
		})
	} else {
		const { idSend, titleSend, descriptionSend, statusSend } = req.params

		Tasks.findOneAndUpdate(
			idSend,
			{
				title: titleSend,
				description: descriptionSend,
				status: statusSend,
			},
			(err, usr) => {
				err && res.status(500).send(err.message)

				res.status(200).json({"Status": "Updated", "Task": usr})
			},
		)
	}
}
module.exports = { allTasks, searchTasks, addTasks, deleteTasks, updateTasks }
