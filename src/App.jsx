import {Route, Routes} from "react-router-dom"
import UserPage from "./pages/UserPage.jsx";

function App(){
    return(
        <Routes>
            <Route path={"/user/:username"} element={<UserPage/>}></Route>
        </Routes>
    )
}

export default App;