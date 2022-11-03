import {useCallback, useEffect, useState} from "react"
import {Route} from "react-router-dom"

import axios from "axios"
import {Datacontext} from "./context/Appcontext"
import MainGrid from './pages/MainGrid';
import Person from './pages/Person';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";



function App() {
const [data, setdata] = useState([])
const [total, settotal] = useState(0)
const [params, setparams] = useState({})
const [sortmode, setsortmode] = useState({field: "undefined", desc: "undefined"})
const [filter, setfilter] = useState({field: "undefined", value: "undefined"})

const [page, setpage] = useState(0)

  const fetchdata = useCallback(() => {
    axios.get(`http://localhost:3001/data?page=${page}&limit=5&sortfield=${sortmode.field}&sortmode=${sortmode.desc}&filterfield=${filter.field}&filtervalue=${filter.value}`)
      .then(res => {
        console.log(res.data.data)
        setdata(res.data.data)
        settotal(res.data.total)
      })
  },[page, sortmode, filter])

  useEffect(() => {
  fetchdata()
  }, [fetchdata])

  
  return (
    <Datacontext.Provider
      value={{data ,total ,page, sortmode, setsortmode, setfilter }}
    >
      <div className="App">
        <Route exact path={"/"}>
          <MainGrid 
          onSetPage = {setpage}
          onSetParams = {setparams}
          onSetSortmode = {setsortmode}
          />
        </Route>

        <Route exact path={`/person/${params.id}`}>
          <Person params={params}/>
        </Route>

        <Route exact path={`/signup`}>
          <Signup />
        </Route>

        <Route exact path={`/signin`}>
          <Signin />
        </Route>

      </div>
    </Datacontext.Provider>
  );
}

export default App;
