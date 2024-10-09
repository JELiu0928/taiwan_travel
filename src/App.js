
import { Routes , Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import ActivityPage from "./pages/ActivityPage";
import AccommodationPage from "./pages/AccommodationPage";
import RegionProvider from './store/RegionProvider'
const App = ()=> {
    
    return (
        <RegionProvider>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/city"} element={<CityPage/>}/>
                <Route path={"/activity"} element={<ActivityPage/>}/>
                <Route path={"/accommodation"} element={<AccommodationPage/>}/>
            </Routes>
        </RegionProvider>
    );
}

export default App;
