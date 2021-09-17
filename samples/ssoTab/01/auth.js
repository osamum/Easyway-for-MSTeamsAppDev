//Teams Client SDK を初期化します
microsoftTeams.initialize();

function logon() {
    //Teams Client SDK でトークンを取得
    microsoftTeams.authentication.getAuthToken({
        successCallback: (result) => {
            //result に Teams Client SDK で取得したトークンが返る
            showItem(`Teams Client SDK から取得したトークン : ${result}`);

            /*トークンを交換しメール一覧を描画するコードと置き換え*/
            
        },
        failureCallback: function (error) {
            showItem(error);
        }
    });
}

/*トークン交換用の REST APIを呼び出すコードと置き換え */