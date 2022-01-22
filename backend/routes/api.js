// ======  requirement router ====== //
const { Router } = require("express")
const router = Router()

// ======  requirement config ====== //
const controller = require("../controllers/api.controller")

// ======  routes get ====== //
router.get("/api/:keyApi" + ":" +":password/task/all", controller.allTasks)
router.get("/api/:keyApi" + ":" +":password/task/search/:idSend", controller.searchTasks)

// ======  routes post ====== //
router.post("/api/:keyApi" + ":" +":password/task/add/:titleSend/:descriptionSend/:statusSend", controller.addTasks)

// ======  routes delete ====== //
router.delete("/api/:keyApi" + ":" +":password/task/delete/:idSend", controller.deleteTasks)

// ======  routes update ====== //
router.put("/api/:keyApi" + ":" +":password/task/update/:idSend/:titleSend/:descriptionSend/:statusSend", controller.updateTasks)

module.exports = { router }
