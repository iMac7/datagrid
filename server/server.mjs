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


app.get("/data", async (req, res) => {
    let page = Number(req.query.page)
    let limit = Number(req.query.limit)
    let sortfield = req.query.sortfield
    let sortmode = req.query.sortmode
    let filterfield = req.query.filterfield
    let filtervalue = req.query.filtervalue
        
    //NAME FIELD SORT
    if(sortfield==="NAME"){
        let newdata = []
        if(sortmode==="asc") {
            newdata = JSON.parse(data).sort((a,b) => (a.NAME > b.NAME) ? 1
            : ((b.NAME > a.NAME) ? -1 : 0))
        }
        if(sortmode==="desc") {
            newdata = JSON.parse(data).sort((a,b) => (a.NAME > b.NAME) ? -1 
            : ((b.NAME > a.NAME) ? 1 : 0))
        }

        res.send({
            data: newdata.slice(page*limit, page*limit+limit),
            total: newdata.length
        })
    }

    // SORT BY NUMBER OF INTERESTS
    else if(sortfield==="INTERESTS"){
        let newdata = []
        if(sortmode==="asc") {
            newdata = JSON.parse(data).sort((a,b) => (a.INTERESTS.length > b.INTERESTS.length) ? 1
            : ((b.INTERESTS.length > a.INTERESTS.length) ? -1 : 0))
        }
        if(sortmode==="desc") {
            newdata = JSON.parse(data).sort((a,b) => (a.INTERESTS.length > b.INTERESTS.length) ? -1 
            : ((b.INTERESTS.length > a.INTERESTS.length) ? 1 : 0))
        }

        res.send({
            data: newdata.slice(page*limit, page*limit+limit),
            total: newdata.length
        })
    }
        
    

    // NAME FIELD FILTER
    else if(filterfield==="NAME"){
        let newdata = []
        newdata = JSON.parse(data).filter(item => item.NAME.toUpperCase().includes(filtervalue.toUpperCase()))
        if(newdata>5){
            res.send({
            data: newdata,
            total: newdata.length
            })
        }else{
            res.send({
            data: newdata.slice(page*limit, page*limit+limit),
            total: newdata.length
            })    
        } 
    }


    //IF NO PARAMETERS TO SORT/FILTER
    else if(sortfield==="undefined"||filterfield==="undefined") {
        let newdata = []

        newdata = JSON.parse(data).slice(page*limit, page*limit+limit)

        res.send({
        data: newdata,
        total: data.length
        })
    }
})