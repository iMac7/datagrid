import React from 'react'
import {useHistory} from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import {Box, Typography} from "@mui/material"
import { useContext } from 'react';
import {Datacontext} from "../context/Appcontext"


function MainGrid({onSetPage, onSetParams, onSetSortmode}) {
    const {data, total, page, setsortmode, setfilter} = useContext(Datacontext)

    const history = useHistory()

  return (
    <Box
    sx={{
      height: 300,
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
      onPageChange={(newPage) => onSetPage(newPage)}
      onRowClick={(params, event, details) => {
        onSetParams(params)
        history.push(`/person/${params.id}`)
      }}

      sortingMode={"server"}
      onSortModelChange={(sortmodel) => {
        console.log(sortmodel.length)
        if(sortmodel.length>0) setsortmode({field:sortmodel[0]?.field, desc:sortmodel[0]?.sort})
        else setsortmode({field:"undefined", desc:"undefined"})
      }}

      filterMode={"server"}
      onFilterModelChange={(filtermodel)=> {
        console.log(filtermodel)
        filtermodel.items.length > 0 && setfilter({
        field: filtermodel.items[0]?.columnField,
        value: filtermodel.items[0]?.value
      })}}
      >
      </DataGrid> 

    </Box>

  )
}

export default MainGrid