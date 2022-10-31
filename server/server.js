const express = require("express")
const data  = require("./data")

const port = 3001
const app = express()

app.listen(port, () => console.log(`Listening on port ${port}`))

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization', )
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})

app.get("/data", (req, res) => {
    let page = req.query.page
    let limit = req.query.limit
    res.send({
        data: data.slice(page*limit, page*limit+limit),
        total: data.length
    })
})