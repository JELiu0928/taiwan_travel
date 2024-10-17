const express = require("express");
const cors = require('cors');
const axios = require("axios")
const app = express();


app.use(cors()); //允許來自不同來源的請求
// console.log(app)
app.get('/',(req,res)=>{
    res.send('訪問成功')
})
// const baseUrl = "https://tdx.transportdata.tw/api/basic/";
const clientId = 'pig3703030-7afab6ee-543c-4581';
const clientSecret = '5d3887c9-9cea-429a-b470-2a0f16555c6a';
let tokenUrl = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"
async function getAccessToken() {
    try {
        const response = await axios.post(tokenUrl, new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': clientSecret
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('獲取Token:', response.data.access_token); //
        return response.data.access_token; // 回傳 Access Token
    } catch (error) {
        console.error('error', error.response.data);
        throw error;
    }
}
// getAccessToken()
    
app.get('/attraction', async (req, res) => {
    let randomSkip = Math.floor(Math.random() * 100) //隨機跳過
    console.log(randomSkip)
    try {
        const accessToken = await getAccessToken(); // 獲取Token
        const apiUrl = "https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Attraction?%24top=20&%24skip=20"
        // const apiUrl = 'https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Activity/Taipei?%24top=30'; // API URL
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json;odata.metadata=none'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('呼叫 API 錯誤:', error.response ? error.response.data : error.message);
        res.status(500).json({"error": "獲取資料失敗"});
    }
});
app.get('/activity', async (req, res) => {
    // let randomSkip = Math.floor(Math.random() * 100) //隨機跳過
    // console.log(randomSkip)
    try {
        const accessToken = await getAccessToken();
        const apiUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=50&%24skip=120&%24format=JSON"
        // const apiUrl = 'https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Activity/Taipei?%24top=30'; // API URL
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json;odata.metadata=none'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('呼叫 API 錯誤:', error.response ? error.response.data : error.message);
        res.status(500).json({"error": "獲取資料失敗"});
    }
});
app.get('/food', async (req, res) => {
    // let randomSkip = Math.floor(Math.random() * 100) //隨機跳過
    // console.log(randomSkip)
    try {
        const accessToken = await getAccessToken(); 
        const apiUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=50&%24skip=2000&%24format=JSON"
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json;odata.metadata=none'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('呼叫 API 錯誤:', error.response ? error.response.data : error.message);
        res.status(500).json({"error": "獲取資料失敗"});
    }
});
app.get('/accommodation', async (req, res) => {
    // let randomSkip = Math.floor(Math.random() * 100) //隨機跳過
    // console.log(randomSkip)
    try {
        const accessToken = await getAccessToken(); 
        const apiUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=50&%24skip=1100&%24format=JSON"
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json;odata.metadata=none'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('呼叫 API 錯誤:', error.response ? error.response.data : error.message);
        res.status(500).json({"error": "獲取資料失敗"});
    }
});



app.listen(3010,()=>{
    console.log('已連線服務器3010')
})