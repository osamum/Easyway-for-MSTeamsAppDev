# 演習 2 : タブ アプリケーション
Microsoft Teams のタブは豊富なコンテンツに接続することができます。

タブを使用すると、用途に合わせた適切なツールやサービスをチャネルやプライベートチャットに取り込むことができます。
豊富なダッシュボードとデータビジュアライゼーションの追加、ドキュメントの共同作業、ノートの取得、グループ全体でのタスクの管理、デザインの共有が行えます。

Microsoft Teams のタブには以下の 2 種類のタブがあります。

* **静的タブ**

    パーソナルなスコープのタブです。個々のユーザーをサポートします。

    たとえば、サービスがメモ作成アプリの場合、ユーザーの個人メモを保持するパーソナル タブを追加します。これにより、ユーザーは自分のメモをチーム全体で共有することなく参照できます。

* **構成可能タブ**

    チャネル単位のスコープのタブです。静的タブがユーザーごと利用であるのに対し、構成可能タブはチャネルの一部になり、チャネルを参照可能なチームのメンバーにおなじ情報を提供します。構成可能タブには、コンテンツページに加えて構成ページがあります。

## タブのスコープ
Microsoft Teams は、そのスコープに基づいてタブを使用できる場所を決定します。スコープはアプリ マニフェストで設定され、次の値のいずれかになります。
なお、この値は manifest.json 内に設定され App Studio からは見えません。

* **チーム (team)**

    チャネルの一部として、チームのメンバーから共有されます。

    現在、チャネル内のすべてのタブは構成可能タブです。ユーザーがタブを最初にチャネルに追加するときに、タブエクスペリエンスのコンテンツを構成します。
* **グループ チャット (groupchat)**

    構成可能タブはグループチャットでも使用できます。これらは、2人以上のユーザー間の会話です。

* **パーソナル (personal)**

    パーソナルスコープのタブを使用すると、ユーザーはプライベートな自分のエクスペリエンスと対話できます。現在、このようなタブはすべて静的タブです。

## Web ページをタブ アプリケーションとして追加するための要件と注意
Microsoft Teams には Web ページをタブとして追加できますが、すべての Web ページがタブに適切に表示できるわけではありません。
カスタムタブ内に読み込まれたページは以下の要件を満たす必要があります。

* **Web ページで iframe での表示を許可**

    多くの標準的な Web ページはコンテンツの盗用やセキュリティのリスクを考慮し iframe での表示を許可していません。

    その場合は [X-Frame-Options](https://developer.mozilla.org/ja/docs/Web/HTTP/X-Frame-Options) および/または [Content-Security-Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy) ヘッダーを設定して Microsoft Teams のドメインに対してのみ適切な許可を与えます。

* **Web ページで使用されている認証を別の方法で処理**
    
    多くの Web サイトの認証では認証処理をログイン プロバイダーにリダイレクトして行いますが、ログインページはクリックジャッキング攻撃を防止するために iframe でレンダリングされないようになっています。そのため Microsoft Teams のタブ内から Web ページにログインすることはできません。
    これを解決するには[ポップアップを使用するか、トークンを取得する](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-flow-tab)ための呼び出しを行います。
    
* **クロスドメイン処理**

    Microsoft Teams クライアントは、タブの読み込み時または通信時に、アプリ マニフェストの静的 [validDomains](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema#validdomains) リストに対してオリジンを検証する必要があるため、[クロスドメイン ナビゲーション](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/tabs/cross-domain)を異なる方法で処理します。


## タスク 1 : パーソナル (静的) タブの追加
パーソナル タブは個々のユーザーをサポートしています。追加したタブを第三者に公開することなく自分だけで使用することができます。

このチュートリアルでは静的な Web ページで [Microsoft Teams JavaScript client SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest) を使用して現在のユーザーの簡易的な情報を表示するページ作成し、パーソナル タブとして追加します。


### ユーザーの情報を表示する Web ページの作成

Microsoft Teams にパーソナル タブとして表示する Web ページを作成します。
このページは Teams のタブとして開かれたときだけ現在のユーザーの情報を返します。

具体的な手順は以下のとおりです。

(*) Visual Studio Code で紹介しますが、Visual Studio をお使いの方は、そちらの作業手順に読み替えてください。

1. コマンドプロンプトを起動し、cd コマンドで作業ディレクトリを任意の場所に切り替えます

2. mkdir コマンドを使用してディレクトリ teamsTab を作成します 
    ```
    mkdir teamsTab
    ```
3. cd コマンドを使用して、作業ディレクトリを teamsTab に切り替えます 
    ```
    cd teamsTab
    ```

4. 以下のコマンドを使用して Visual Studio Code を起動します。 
    ```
    code .
    ```
5. Visual Studio Code のメニュー [File] - [New File] クリックします。

6. メニュー [File] - [Save As...] クリックし、ファイルを index.html という名前で保存します。(※ファイルを保存する際、保存ダイアログボックスで \[ファイルの種類] を HTML を指定するようにしてください )

7. Visual Studio Code で開かれている index.html に以下の内容をコピーして貼り付けます。
    ```
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Teams Tab App Sample</title>
        <style>
            table {
                font-weight: bold;
                font-size: 20px;
            }
            .context-data {
                color:blue;
            }
        </style>
    </head>
    <body>
    <!-- Microsoft Teams JavaScript API (via CDN) -->
    <script src="https://unpkg.com/@microsoft/teams-js@1.3.4/dist/MicrosoftTeams.min.js" integrity="sha384-3zTjxw3msc6gKx3DseSU0lfRM129YrFjr2xgocfMIN/kBCdzJ88d+FSB1n3scUku" crossorigin="anonymous"></script>
    <script>
        let $id = (id) => { return document.getElementById(id); }
        /*ここに演習 2 のタスク 2 でコードを追加*/

        //microsoftTeams クラスの初期化
        microsoftTeams.initialize();
      
        //DOM がロードされてから
        document.addEventListener('DOMContentLoaded', () => {
            //Microsoft Teams のユーザーコンテキストを取得
            microsoftTeams.getContext((context) => {
                $id('showUpn').innerText = context.upn;
                $id('showObjectId').innerText = context.userObjectId;
                $id('showTheme').innerText = context.theme;
                $id('showLocale').innerText = context.locale;
            });
        })
    </script>

        <h1>Microsoft Teams Tab App サンプル</h1>
        <h2>Teams のユーザーとチャネルコンテキスト</h2>
        <p>以下にはプラグインされた Teams の Tab SDK で取得されたユーザーのコンテキスト情報が表示されます。 </p>
        <table>
            <tr><td>UPN</td><td id="showUpn" class="context-data"></td></tr>
            <tr><td>userObjectId</td><td id="showObjectId" class="context-data"></td></tr>
            <tr><td>Theme</td><td id="showTheme" class="context-data"></td></tr>
            <tr><td>Locale</td><td id="showLocale" class="context-data"></td></tr>
        </table>
        </body>
    </html>
    ```
    [Ctrl] + [S] キーを押下して変更を保存します。

8. Visual Studio Code のメニュー [Terminal] - [New Terminal] をクリックします。

9. 画面下部にターミナルウインドウが表示されるので、同ウィンドウ内で以下のコマンドを実行してシェルを Command Prompt に変更します。
    ```
    cmd
    ```
10. ターミナルウインドウで以下のコマンドを実行します。
    ```
    http-server
    ```
    もし、http-server が起動しない場合は Readme の \[[要件](Readme.md#要件)] の内容を確認してください。

11. Web ブラウザーを起動し、以下の URL にアクセスします。
    ```
    http://127.0.0.1:8080/index.html
    ```
    以下の内容が表示されることを確認してください。

    <img src="images/tabSample-browser.png" width="400px">

    Teams のタブでロードされていないので、ユーザーの情報がロードされていません。

### インターネットへのトンネリング
ローカルで動作している Web サーバーに Microsoft Teams がアクセスできるよう、ngrok を使用してトンネリングをおこないます。

1. コマンドプロンプトを起動し、cd コマンドで作業ディレクトリを ngrok.exe が配置されているディレクトリに切り替えます。

     もし、ngrok をインストールしていない場合は Readme の \[[要件](Readme.md#要件)] の内容を確認してください。

2. 以下のコマンドを実行して cmd にシェルを切り替えます。
    ```
    cmd
    ```

3. 以下のコマンドを実行します。
    ```
    ngrok http 8080 --host-header=localhost
    ```
4. エコーされた内容の Foewarding の横に表示された **https** のドメイン名を使用してアクセスします。

    <img src="images/engrok.png">

    たとえば、ngrok から返されたドメイン名が https://9fcf38b6.engrok.io だった場合は以下の URL でインターネットからローカルの default.html にアクセスすることができます。 

    https://9fcf38b6.engrok.io/index.html

    ローカル アドレスでアクセスしたときと同じコンテンツが表示されることを確認してください。

    **なお、engrok は終了すると、次回起動したときにドメイン名が変わってしまうので注意してください。**

ここまでの手順で、作成した Web ページに Microsoft Teams からアクセスできるようになりました。

### Teams パーソナルタブとして追加
ローカル環境でホストされている Web コンテンツを Microsoft Teams にパーソナル タブとして追加します。

手順は以下のとおりです。

1. Microsoft Teams で App Studio を起動します。

2. アプリの一覧から [演習 1](Tut01.md) で登録したアプリ **My first app** のタイルをクリックして設定画面を開きます。

3. App Studio の左側のツリーメニュー \[2 Capabilities] - \[Tabs] をクリックします。

4. 右側に **Tabs** の画面が表示されるので、ラベル **Add a personal tab** の下の \[**Add**] ボタンをクリックします。

5. **Personal tab** の設定ダイアログボックスが表示されるので、各項目を以下のように設定します。  

    |項目|値|
    |---|---|
    | *Name | MyPersonalTab |
    | *Entity ID | mypersonaltab |
    | *Content URL | ngrok でホストされている URL |
    | Website URL | 入力なし |

6. \[Save] ボタンをクリックして保存します。

7. App Studio の左側のツリーメニュー \[3 Finish] - \[Test ans distribute] をクリックします。

8. **Test and Distribute** の画面が表示されるので同画面の \[Install] ボタンをクリックします。

9. **My first app** のダイアログボックスが表示されるので \[追加] ボタンをクリックします。

Teams 内にタブとして作成した Web ページが表示され、以下のように現在 Teams を使用しているユーザーの情報が表示されていることを確認してください。

<img src="images/PrivateTabApp.png" width="500">

\<参考>

* [**Get context for your Microsoft Teams tab**](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/tabs/tabs-context)

## タスク 2 : チーム (構成可能) タブの追加
ローカル環境でホストされている Web コンテンツを Microsoft Teams にチーム タブとして追加します。

パーソナル タブの追加方法とは異なり、タブとして追加される Web ページ以外に設定 (構成) 用のページを作り、その中から Microsoft Teams JavaScript client SDK の [microsoftTeams.settings.setSettings メソッド](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#setsettings-settings-) を使用して登録を行います。

なお、以降の手順はタスク 1 でパーソナル タブ用として作成した Web ページを使用しますので、作成していない場合はタスク 1 の内容を参考に作成しておいてください。

### チームタブ 設定ページの作成
Microsoft Teams にチーム タブを追加する際に表示される設定ダイアログボックス用の Web ページを作成します。

なお、App Studio でのチーム タブの登録に使用するのは、この設定ページの URL です。

手順は以下のとおりです。

1. タスク 1 で作成したパーソナル タブ用の Web ページのフォルダを Visual Studio Code でオープンします。

2. Visual Studio Code のメニュー [File] - [New File] クリックします。

3. メニュー [File] - [Save As...] クリックし、ファイルを config.html という名前で保存します。(※ファイルを保存する際、保存ダイアログボックスで \[ファイルの種類] を HTML を指定するようにしてください )

4. Visual Studio Code で開かれている config.html に以下の内容をコピーして貼り付けます。

    ```
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Team Tab Config.</title>
        <!-- Microsoft Teams JavaScript API (via CDN) -->
        <script src="https://statics.teams.microsoft.com/sdk/v1.4.2/js/MicrosoftTeams.min.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <h1>Microsoft Teams チーム タブ<br>設定ページ サンプル</h1>

        タブの背景色 : 
        <!--タブとして追加されるページの背景色を指定-->
        <select id="colorSelector" >
            <option value="white" >白</option>
            <option value="gainsboro">灰</option>
            <option value="skyblue">青</option>
            <option value="yellow">黄</option>
        </select>
        <script>
            let colorName = '';
            microsoftTeams.initialize();
            microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
                microsoftTeams.settings.setSettings({
                    entityId: 'myteamtab',
                    contentUrl: 'ngrok の ドメイン名/index.html' + colorName,
                    suggestedDisplayName: 'My first Team Tab',
                    websiteUrl: '',
                    removeUrl: 'ngrok の ドメイン名/config.html',
                });
                saveEvent.notifySuccess();
            });
            microsoftTeams.settings.setValidityState(true);
            document.getElementById('colorSelector').addEventListener('change',(evnt)=>{
                colorName = '?' + evnt.target.value;
            });
        </script>
    </body>
    </html>
    ```
    [Ctrl] + [S] キーを押下して変更を保存します。

6. Visual Studio Code のメニュー [Terminal] - [New Terminal] をクリックします。

7. 画面下部にターミナルウインドウが表示されるので、同ウィンドウ内で以下のコマンドを実行してシェルを Command Prompt に変更します。
    ```
    cmd
    ```
8. ターミナルウインドウで以下のコマンドを実行します。
    ```
    http-server
    ```
    もし、http-server が起動しない場合は Readme の \[[要件](Readme.md#要件)] の内容を確認してください。

9. Web ブラウザーを起動し、以下の URL にアクセスします。
    ```
    http://127.0.0.1:8080/index.html
    ```
    以下の内容が表示されることを確認してください。

    <img src="images/TabConfigPage.png" width="400">

10. コマンドプロンプトを起動し、cd コマンドで作業ディレクトリを ngrok.exe が配置されているディレクトリに切り替えます。

     もし、ngrok をインストールしていない場合は Readme の \[[要件](Readme.md#要件)] の内容を確認してください。

11. 以下のコマンドを実行して cmd にシェルを切り替えます。
    ```
    cmd
    ```

12. 以下のコマンドを実行します。
    ```
    ngrok http 8080 --host-header=localhost
    ```
13. エコーされた内容の Foewarding の横に表示された **https** のドメイン名を使用してアクセスします。

    <img src="images/engrok.png">

    たとえば、ngrok から返されたドメイン名が https://9fcf38b6.engrok.io だった場合は以下の URL でインターネットからローカルの default.html にアクセスすることができます。 

    https://9fcf38b6.engrok.io/config.html

    ローカル アドレスでアクセスしたのと同じコンテンツが表示されることを確認してください。

    なお、ngrok はこの手順が完了するまで絶対に終了しないでください。

14. Visual Studio Code で開かれている config.html の \<script> タグ内のコード中の「**ngrok の ドメイン名**」と書かれている箇所を ngrok の **https** のドメイン名に書き換え、キーボードの \[Ctrl] + \[S] キーを押下して保存します。

15. Visual Studio Code でタスク 1 で作成した index.html を開きます。

16. \<script> タグの中のコードにあるコメント「/* ここに演習 2 のタスク 2 でコードを追加*/」を以下のコードで置き換えます。
    ```
    // URL に付加された色名から背景色を設定
    ((qString)=>{
        document.body.style.backgroundColor = (qString)? (qString.substr(1,qString.length -1)):''; 
    })(window.location.search);
    ```
    [Ctrl] + [S] キーを押下して変更を保存します。

ここまでの作業で、チーム タブの設定画面の作成は完了です。

### App Studio でのチーム タブの追加
前述の手順で作成した config.html を App Studio からチームタブの設定ページとして登録します。

手順は以下のとおりです。

1. Microsoft Teams で App Studio を起動します。

5. アプリの一覧から [演習 1](Tut01.md) で登録したアプリ **My first app** のタイルをクリックして設定画面を開きます。

3. App Studio の左側のツリーメニュー \[2 Capabilities] - \[Tabs] をクリックします。

4. 右側に **Tabs** の画面が表示されるので、ラベル **Team tab** の下の \[**Add**] ボタンをクリックします。

5. **Taem tab** の設定ダイアログボックスが表示されるので、各項目を以下のように設定します。  
    |項目|値|
    |---|---|
    | *Cinfigration URL | ngrok でホストされている config.html の URL |
    | Can update configuration? | チェック |
    | Scope | Team : チェック<br>Group  chat : チェック|
    
    SharePoint ページについての以下の 2 つのチェックボックスはチェックしません。
    * Runs the tab as an "app page" (a full  screen experience) in SharePoint
    * Runs the tab as a ""

    \[Save] ボタンをクリックして保存します。
    
6. App Studio の左側のツリーメニュー \[3 Finish] - \[Test ans distribute] をクリックします。

7. **Test and Distribute** の画面が表示されるので同画面の \[Install] ボタンをクリックします。

8. **My first app** のダイアログボックスが表示されるので \[チームに追加] ボタンをクリックします。

9. **My first app を使い始めるチャネルの選択** ダイアログボックスが表示されるので、同ダイアログボックスの検索ボックスでタブを追加するチャネルかを選択し、\[タブを設定] ボタンをクリックします。

10. 前述の手順で作成した config.html が設定ダイアログボックスとして表示されるので、config.html 内の \[タブの背景色] ドロップダウンリストボックスから任意の色名を選択して \[保存] ボタンをクリックします。

    <img src="images/tabConfigDialog.png" width="300">

以上で、チーム タブの追加は完了です。

選択したチャネルにタブが追加され、表示されたタブの背景色が以下のように設定ダイアログボックスで指定した色になっていることを確認してください。

<img src="images/TeamTabApp.png" width="500">


## タブ アプリケーションのシングルサインオン
シンプルな Web ページに AAD (Azure Active Directory) を使用して認証を実装し、これを Microsoft Teams のカスタムタブ アプリケーションとして登録して SSO (Single Sign-On) を実装します。

**なお、この方法は Microsoft Azure のサブスクリプションを持っていなくても Office 365 のサブスクリプションがあれば行うことできます。**

手順は以下のとおりです。

### アプリケーションの Azure AD への登録
1. Azure のポータル(https://portal.azure.com/)にログインします。

2. 左のメニューより \[**Azure Active Directory**\] を選択します。

3. 新たに表示されたAzure AD のブレードより \[**アプリの登録**\] をクリックし、画面上の \[**+新規登録**] ボタンをクリックします。

4. \[**アプリケーション登録**\] ペインが表示されるので各項目を以下のよう設定して \[登録\] ボタンをクリックします。
    |項目|値|
    | ---- | ---- |
    |名前|任意のもの|
    |サポートされているアカウントの種類|任意の組織のディレクトリ内のアカウントと、個人用の Microsoft アカウント (Skype、Xbox、Outlook.com など)
    |リダイレクト URI (省略可能)|https://ドメイン名/loginend.html

5. 登録したアプリケーションが一覧に表示されるので、選択して、左側のブレードの \[**認証**\] をクリックします。

6. 表示されたペイン内の以下のチェックボックスにチェックし、画面上の \[**保存**\] ボタンをクリックして保存します。

7. 左側のブレードの \[**証明書とシークレット**\] をクリックします。

8. \[**+新しいクライアント シークレット**\] ボタンをクリックすると、\[**クライアント シークレットの追加**\] ダイアログボックスが表示されるので、項目を以下のように設定します。

    |項目|値|
    | ---- | ---- |
    | 説明 | Forever |
    |有効期限|なし|

9. \[**追加**\] ボタンをクリックして保存します。
10. 左側のブレードの \[**証明書とシークレット**\] をクリックします。

以上でアプリケーションの Azure AD への登録は完了です。

次に、アプリケーション側に Azure AD でのクライアント ID を設定します。
手順は以下の通りです。

### アプリケーションのへの Azure AD クライアント ID 設定
1. Azure ポータルで、Azure AD に登録したアプリケーションの \[**概要**\] を表示します。

2. 同ペイン内の \[**アプリケーション(クライアント)ID**] の内容をコピーし、メモ帳などにはりつけます。

3. サンプルアプリケーションの login.js をテキストエディタでオープンします。

4. 以下のコードの **{{appId}}** を手順 2 でコピーした Azure AD のクライアント ID に書き換えます。
    ```
    let queryParams = {
        client_id: "{{appId}}",　//ここに Azure AD の [アプリケーション(クライアント)ID] を記述してください
        response_type: "id_token token",
    ```


## 目次
1. [**Microsoft Teams アプリケーション開発について**](Tut01.md)
2. [**Microsoft Teams アプリケーションの新規作成**](Tut02.md)
    * [App Studio を使用したマニフェストファイルの作成](Tut02.md#app-studio-を使用した-teams-アプリケーションの登録)
3. [**タブ アプリケーション**](Tut03.md)
    * [パーソナル タブ](https://github.com/osamum/Easyway-for-MSTeamsAppDev/blob/master/Tut03.md#タスク-1--パーソナル-静的-タブの追加)
    * [チーム タブ](https://github.com/osamum/Easyway-for-MSTeamsAppDev/blob/master/Tut03.md#チーム-構成可能-タブの追加)
    * タブ アプリケーションのシングルサインオン
4. [**ボット**](Tut04.md)
    * ボットの登録
    * Teams Bot Builder SDK を使用した拡張
5. [**メッセージ拡張とメッセージアクション**](Tut05.md)
6. [**コネクタ**](Tut06.md))

