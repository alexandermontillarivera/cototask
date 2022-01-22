
const colors = require("colors")
const app = require("../../server")
const morgan = require("morgan")

app.use(morgan("dev"))

app.listen(app.set('port'), () => {
    console.log((`[APP]: Server listening on http://localhost:${app.get('port')}`).yellow)
})