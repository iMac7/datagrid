import './App.css';
import {useEffect, useState} from "react"
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import {Box, Typography} from "@mui/material"

function App() {
const [data, setdata] = useState([])
const [total, settotal] = useState(0)

const [page, setpage] = useState(0)

  const fetchdata = () => {
    axios.get(`http://localhost:3001/data?page=${page}&limit=5`,{
      params:{
        name:"someparams"
      }
    })
      .then(res => {
        console.log(res.data)
        setdata(res.data.data)
        settotal(res.data.total)
      })
  }

  useEffect(() => {
  fetchdata()
  }, [page])

  
  return (
    <div className="App">
      <Box
      sx={{
        height: 400,
        width: 600
      }}
      >
        <Typography 
        variant='h4'
        component="h4"
        sx={{textAlign:"center", mt:3, mb:3}}
        >
          PEOPLE
        </Typography>

        <DataGrid
        autoHeight
        initialState={{
          pagination: {
            pageSize: 5,
            page: page,
          }
        }}
        columns={[
          {field: "NAME"},
          {field: "INTERESTS", width:300}
        ]}
        rows={data}
        rowsPerPageOptions={[5]}
        pageSize={5}
        pagination
        paginationMode='server'
        rowCount={total}
        // page={0}
        onPageChange={(newPage) => setpage(newPage)}
        >
        </DataGrid> 

      </Box>
    </div>
  );
}

export default App;
