// regions.js
const regionsAndCities = {
    north: [
        { city: "Taipei", name: "台北市" },
        { city: "NewTaipei", name: "新北市" },
        { city: "Keelung", name: "基隆市" },
        { city: "Taoyuan", name: "桃園市" },
        { city: "YilanCounty", name: "宜蘭縣" },
        { city: "Hsinchu", name: "新竹市" },
        { city: "HsinchuCounty", name: "新竹縣" },
    ],
    east: [
        { city: "HualienCounty", name: "花蓮縣" },
        { city: "TaitungCounty", name: "台東縣" },
    ],
    central: [
        { city: "Taichung", name: "台中市" },
        { city: "NantouCounty", name: "南投縣" },
        { city: "ChanghuaCounty", name: "彰化縣" },
        { city: "YunlinCounty", name: "雲林縣" },
        { city: "MiaoliCounty", name: "苗栗縣" },
    ],
    south: [
        { city: "Tainan", name: "台南市" },
        { city: "Kaohsiung", name: "高雄市" },
        { city: "PingtungCounty", name: "屏東縣" },
        { city: "Chiayi", name: "嘉義市" },
        { city: "ChiayiCounty", name: "嘉義縣" },
    ],
    islands: [
        { city: "PenghuCounty", name: "澎湖縣" },
        { city: "KinmenCounty", name: "金門縣" },
        { city: "LienchiangCounty", name: "連江縣" },
    ],
};
const regions = [{
    img:"/img/north.png",
    area:"north",
    name:"北部"
},{
    img:"/img/central.png",
    area:"central",
    name:"中部"
},{
    img:"/img/south.png",
    area:"south",
    name:"南部"
},{
    img:"/img/east.png",
    area:"east",
    name:"東部"
},{
    img:"/img/islands.png",
    area:"islands",
    name:"離島"
}]
export {
    regionsAndCities,
    regions
} ;
