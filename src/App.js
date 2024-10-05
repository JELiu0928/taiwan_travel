
import { Routes , Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import ActivityPage from "./pages/ActivityPage";
import AccommodationPage from "./pages/AccommodationPage";

const App = ()=> {
    
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"/city"} element={<CityPage/>}/>
            <Route path={"/activity"} element={<ActivityPage/>}/>
            <Route path={"/accommodation"} element={<AccommodationPage/>}/>
        </Routes>
    );
}

export default App;
