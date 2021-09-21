const { urlencoded, json } = require('express');
var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

// クライアント側で Teams Client SDK で取得したトークンをPOSTで受け取る
router.post('/', function (req, res, next) {
    console.log(req.body)
    getAccessToken(req.body.token).then((response) => {
        res.json(response.data);
    });
})

//AAD on-behalf-Graph of flow を使用してトークンを Graph API を使用できるものに交換する 
function getAccessToken(token) {
    const entPointUrl = "https://login.microsoftonline.com/" + process.env.tenant_id + "/oauth2/v2.0/token";
    let scopes = ["https://graph.microsoft.com/User.Read"];

    const formData = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer'
        + '&client_id=' + process.env.client_id
        + '&client_secret=' + process.env.client_secret
        + '&assertion=' + token
        + '&scope=https://graph.microsoft.com/user.read+offline_access'
        + '&requested_token_use=on_behalf_of';

    return axios.post(entPointUrl, encodeURI(formData), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
module.exports = router;