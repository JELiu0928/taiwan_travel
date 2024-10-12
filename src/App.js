
import { Routes , Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import ActivityPage from "./pages/ActivityPage";
import AccommodationPage from "./pages/AccommodationPage";
import CommonProvider from './store/CommonProvider'
const App = ()=> {
    
    return (
        <CommonProvider>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/city"} element={<CityPage/>}/>
                <Route path={"/activity"} element={<ActivityPage/>}/>
                <Route path={"/accommodation"} element={<AccommodationPage/>}/>
            </Routes>
        </CommonProvider>
    );
}

export default App;
