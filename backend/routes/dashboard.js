// ======  requirement router ====== //
const { Router } = require("express")
const router = Router()

// ======  requirement config ====== //
const controller = require("../controllers/dashboard.controller")

// ======  routes get ====== //
router.get("/admin", controller.indexGet)
router.get("/admin/profile", controller.profileGet)
router.get("/admin/developer", controller.developerGet)
router.get("/admin/tasks/add", controller.addTasksGet)
router.get("/admin/task/update/:task_id", controller.updateTasksGet)

// ======  routes post ====== //
router.post("/admin/tasks/add", controller.addTasksPost)
router.post("/admin/api/update/pass", controller.updatePasswordApi)

// ======  routes delete ====== //
router.get("/admin/tasks/delete/:tasks_id", controller.deleteTasks)

// ======  routes update ====== //
router.post("/admin/task/update/:task_id", controller.updateTasksPost)
router.get("/admin/task/change/process/:task_id", controller.updateTaskProcess)
router.get("/admin/task/change/ending/:task_id", controller.updateTaskEnding)
router.get("/admin/task/change/pending/:task_id", controller.updateTaskPending)
router.post("/admin/profile/update", controller.updateProfile)

module.exports = { router }
