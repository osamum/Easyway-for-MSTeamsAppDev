//Teams Client SDK を初期化します
microsoftTeams.initialize();

function logon() {
    //Teams Client SDK でトークンを取得
    microsoftTeams.authentication.getAuthToken({
        successCallback: (result) => {
            //result に Teams Client SDK で取得したトークンが返る
            showItem(`Teams Client SDK から取得したトークン : ${result}`);

            //Teams Client SDK で取得したトークンを 
            //Graph API が使用できるアクセストークンに変換する
            getValidTokenforGraph(result).then(data => {
                const accessToken = data.access_token;

                //アクセストークンを使用して Graph API を呼び出す
                callGraphAPI(graphConfig.graphMailEndpoint, accessToken).then(data => {
                    //取得されたメールの一覧を描画
                    renderMailList(data);
                });
            });

        },
        failureCallback: function (error) {
            showItem(error);
        }
    });
}

//Teams Client SDK で取得したトークンを 
//Graph API が使用できるアクセストークンに変換するための
//サーバーサイドのサービスを呼び出す
async function getValidTokenforGraph(clientToken) {
    const endPointUrl = '/getToken';
    const data = {
        token: clientToken
    }

    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(endPointUrl, opt);
    return res.json();
}