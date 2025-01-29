import { useEffect,useState } from 'react'
// 參考：如何寫一隻判斷 RWD 斷點的 hook  | 監控瀏覽器長寬 - 以React hook實現

export const LAYOUT = {
    SMALL_PHONE:"small-phone", //600
    PHONE:"phone", //600
    SMALL_TAB:"small-tab", //750
    TAB_PORT:"tab-port", //1000
    TAB_LAND:"tab-land", //1200
    MID_DESKTOP:"mid-desktop", //1300
    BIG_DESKTOP:"big-desktop", //1300
}

const useMedia = ()=>{
    const [currentLayout,setCurrentLayout] = useState(LAYOUT.BIG_DESKTOP)
    useEffect(()=>{
        const handleWindowWidth = ()=>{
            // 使用 matchMedia 來監測斷點
            if (window.matchMedia("(max-width: 30em)").matches) {
                setCurrentLayout(LAYOUT.SMALL_PHONE);  // 對應 small-phone
            }else if (window.matchMedia("(max-width: 37.5em)").matches) {
                setCurrentLayout(LAYOUT.PHONE);  // 對應 phone
            } else if (window.matchMedia("(max-width: 46.875em)").matches) {
                setCurrentLayout(LAYOUT.SMALL_TAB);  // 對應 small-tab
            } else if (window.matchMedia("(max-width: 62.5em)").matches) {
                setCurrentLayout(LAYOUT.TAB_PORT);  // 對應 tab-port
            } else if (window.matchMedia("(max-width: 75em)").matches) {
                setCurrentLayout(LAYOUT.TAB_LAND);  // 對應 tab-land
            } else if (window.matchMedia("(max-width: 81.25em)").matches) {
                setCurrentLayout(LAYOUT.MID_DESKTOP);  // 對應 mid-desktop
            } else {
                setCurrentLayout(LAYOUT.BIG_DESKTOP);  // 對應 big-desktop
            }
            // if(window.innerWidth >= 1800){
            //     setCurrentLayout(LAYOUT.BIG_DESKTOP)
            // }else if(window.innerWidth >= 1200 &&  window.innerWidth < 1300){
            //     setCurrentLayout(LAYOUT.MID_DESKTOP)
            // }else if(window.innerWidth >= 900 && window.innerWidth < 1200){
            //     setCurrentLayout(LAYOUT.TAB_LAND)
            // }else if(window.innerWidth >= 750 && window.innerWidth < 900){
            //     setCurrentLayout(LAYOUT.TAB_PORT)
            // }else if(window.innerWidth >= 600 && window.innerWidth < 750){
            //     setCurrentLayout(LAYOUT.SMALL_TAB)
            // }else if(window.innerWidth < 600){
            //     setCurrentLayout(LAYOUT.PHONE)
            // }  
            // console.log("新的 layout:", currentLayout); // 打印新的 layout
        }
        handleWindowWidth();
        window.addEventListener("resize",handleWindowWidth)
        return ()=>{
            window.removeEventListener("resize",handleWindowWidth)
        }
    },[])
    return currentLayout;
}

export default useMedia;

 // if(window.innerWidth < 600){
            //     setCurrentLayout(LAYOUT.PHONE)
            // }else if(window.innerWidth > 600 && window.innerWidth < 750){
            //     setCurrentLayout(LAYOUT.SMALL_TAB)
            // }else if(window.innerWidth > 750 && window.innerWidth < 900){
            //     setCurrentLayout(LAYOUT.TAB_PORT)
            // }else if(window.innerWidth > 900 && window.innerWidth < 1200){
            //     setCurrentLayout(LAYOUT.TAB_LAND)
            // }else if(window.innerWidth > 1200 && window.innerWidth < 1300){
            //     setCurrentLayout(LAYOUT.MID_DESKTOP)
            // }