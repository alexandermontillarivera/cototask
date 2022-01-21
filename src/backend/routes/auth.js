// ======  requirement router ====== //
const { Router } = require("express")
const router = Router()

// ======  requirement config ====== //
const controller = require("../controllers/auth.controller")

// ======  routes get ====== //
router.get("/", controller.home)
router.get("/logout", controller.logout)
router.get('/example:example', (req, res) => {
    res.send('example')
})

// ======  routes post ====== //
router.post("/auth/register", controller.newUser)
router.post("/auth/login", controller.login)


module.exports = { router }
