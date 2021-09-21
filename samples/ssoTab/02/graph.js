// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages"
};

function seeProfile() {
    const accessToken = sessionStorage.getItem('accessToken');
    callGraphAPI(graphConfig.graphMeEndpoint, accessToken, showPropertyName_and_Value);
}

//HTTP リクエストを送信
async function callGraphAPI(endpoint, token) {
    const headers = new Headers();
    //Authorization ヘッダーに Bearer + アクセス Token で API にアクセス
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);
    const options = {
        method: 'GET',
        headers: headers
    };
    const res = await fetch(endpoint, options);
    return res.json();
}
