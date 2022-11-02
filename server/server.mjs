import express from "express"
import data from "./data.mjs"


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


// console.log("initial data",data)

app.get("/data", async (req, res) => {
    let page = Number(req.query.page)
    let limit = Number(req.query.limit)
    let sortfield = req.query.sortfield
    let sortmode = req.query.sortmode
    let filterfield = req.query.filterfield
    let filtervalue = req.query.filtervalue
    
    console.log(filterfield, filtervalue)
    
    //NAME FIELD SORT
    if(sortfield==="NAME"){
        let newdata = []
        console.log("sortfield is name")
        console.log("original data, top-",data)
        if(sortmode==="asc") {
            newdata = data.sort((a,b) => (a.NAME > b.NAME) ? 1
            : ((b.NAME > a.NAME) ? -1 : 0))
        }
        if(sortmode==="desc") {
            newdata = data.sort((a,b) => (a.NAME > b.NAME) ? -1 
            : ((b.NAME > a.NAME) ? 1 : 0))
        }

        res.send({
            data: [...newdata].slice(page*limit, page*limit+limit),
            total: newdata.length
        })
    }

    // NAME FIELD FILTER
    else if(filterfield==="NAME"){
        let newdata = []
        if(filtervalue===("undefined"||"")){
            newdata = data.slice(page*limit, page*limit+limit)
        }else{
            newdata = data.filter(item => item.NAME.toUpperCase().includes(filtervalue))
        }
        res.send({
        data: newdata,
        total: data.length
        })
    }

    //IF NO PARAMETERS TO SORT/FILTER
    else if(sortfield==="undefined"||filterfield==="undefined") {
        let newdata = []

        newdata = data.slice(page*limit, page*limit+limit)

        res.send({
        data: newdata,
        total: data.length
        })
    }
})