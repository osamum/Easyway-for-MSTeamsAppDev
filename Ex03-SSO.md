# Teams ボットのシングル　サインオン (SSO)
Azure Active Directory (AAD) のシングル サインオン (SSO) 認証を使用すると、サインインが必要なボットを使用する際の資格情報の入力を省略することができ、ユーザーにシームレスな利用体験を提供できます。

この演習では Teams ボットのシングル サインオン (SSO) に必要な設定を Azure Active Directory、Azure ボット、アプリ マニフェストに行い、 GitHub に用意されている[サンプル プロジェクト](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)を実行し、動作を確認します。
(※)

(※) Echo ボットのようなシンプルなボット アプリに Teams の SSO の機能をゼロから実装するとなると、コーディング量が非常に多くなるためサンプルアプリのコードを適宜利用することをお勧めします。 

なお、この演習には Microsoft Azure のサブスクリプションが必要です。

<br />

## 演習の準備

この演習では、これまでの演習で使用したサブスクリプションやツールの他に以下のものが必要になります。

* GitHub リポジトリ [**OfficeDev/Microsoft-Teams-SamplesPublic**](https://github.com/OfficeDev/Microsoft-Teams-Samples) をローカルに clone するか zip ファイルとしてダウンロードしておいてください(※)

    (※) clone するとしてもリポジトリ全体のイメージを取得することになるので、zip ファイルとして取得して、用途に合わせて必要なプロジェクトを取り出したほうが使い勝手が良いかもしれません。

* Azure のサブスクリプションをご準備ください

    現在の Teams ボットの SSO では、Azure Bot のインスタンスを使用するので Azure のサブスクリプションが必要です。

    開発用 Office 365 サブスクリプションを使用されている場合、Azure Active Directory は使用できますが、Azure の機能は使用できないので、同 Azure Active Directory に紐づいた試用アカウントをご用意ください(※)

    (※) 開発用 Office 365 サブスクリプションで使用しているアカウントで[Azure ポータル](https://portal.azure.com)に ログインし、なんからの Azure のリソースを作成しようとすると、試用アカウント作成のリンクか案内されるのでその案内に従ってください。

<br />

## サンプル プロジェクトの入手

SSO の機能が実装された Teams ボットアプリのサンプル プロジェクトを取得します。

以下のリポジトリを Clone するか、zip ファイルとしてダウンロードします。 

* [**OfficeDev/Microsoft-Teams-Samples**](https://github.com/OfficeDev/Microsoft-Teams-Samples)

<img src="images/21Nov_CloneRepo.png" width="500px">

クローンしたフォルダ、あるいは zip ファイルから以下のフォルダの内容を作業用フォルダにコピーしてください。

```
Microsoft-Teams-Samples-main\samples\bot-conversation-sso-quickstart\js
```

コピー先の作業用のフォルダを Visual Studio Code で開き、ターミナルウィンドウで以下のコマンドを実行して依存関係のあるモジュールをインストールします。

```
npm install
```

ここまでの手順でサンプル　プロジェクトの作業準備は完了です。

<br />




## Azure ボットの作成

Azure 上に Azure Bot のインスタンスを作成し、紐づけられた Azure Active Directory のアプリのエントリーに SSO で必要になる設定を行います。

具体的な手順は以下のとおりです。


1. Web ブラウザーで http://portal.azure.com にアクセスし [**Azure ポータル**](https://portal.azure.com)にサインインします

2. ポータル画面左上端のハンバーカーメニューをクリックし、\[**＋ リソースの作成**\]をクリックします

3. 遷移した画面の検索ボックスに "**bot**" と入力し \[Enter\] キーを押下します

4. 検索された結果から **Azure Bot** のカードをクリックします

    <img src="images/21Augst_listed_AzureBot.png" width="200px">

    遷移した画面で \[**作成**\] ボタンをクリックします

5. ボットの作成画面が表示されるので各項目を以下のように設定します

    |項目|値|
    | ---- | ---- |
    |ボット ハンドル*|(ボットの一意の識別名)|
    |サブスクリプション*|(Azure のリソースを作成することのできるサブスクリプション)|
    |リソースグループ*|(任意のリソースグループ)|
    |価格レベル*|(既定では **Standard** ですが\[**プランの変更**\]リンクをクリックして **Free** を選択することもできます)|
    |Microsoft アプリ ID|**新しい Microsoft アプリ ID の作成**にチェック|

    実際の画面は以下のとおりです。

    <img src="images/21Augst_Add_AZbot.png" width="600px">

    各項目を設定後、\[**確認と作成**\] ボタンをクリックし、\[**作成**\] ボタンが表示されたらクリックしてデプロイを開始します。

6. デプロイが完了すると「**デプロイが完了しました**」と画面に表示されるので、同画面の\[**リソースに移動**\]ボタンをクリックします

7. 作成した Azure Bot の**概要**画面に遷移するので、画面左のメニューより \[**構成**\]をクリックします

8. \[**構成**\] の画面に遷移するので、\[**メッセージング エンドポイント**\] に以下の URL を設定します (※)

    ```
    https://ngrokが生成したドメイン名/api/messages
    ```
    (※) このタイミングではまだプロジェクトがホストされていないので仮の URL でも良いですし、ここで ngrok を起動しておいても可です。

9. 同画面の \[**Microsoft App ID**\] の下の GUID をコピーしてテキストエディタなどに貼り付けてメモします

10. \[**Microsoft App ID**\] の隣にある \[**管理**\] リンクをクリックします

    <img src="images/21Nov_AzureBot_AppID.png" width="600px">

11. Azure Active Directory の \[**証明書とシークレット**\] 画面に遷移するので、\[**+新しいクライアント シークレット**\]をクリックします (※)

    (※)じつは Azure Bot のインスタンスが生成された時点でシークレットが作られており、このシークレットは作成した Azure Bot とおなじリソースグループ内の Key Vault 内に保存されています。しかし、確認するための手順が多いので公式のドキュメントでもこの方法が紹介されています。

12. \[**クライアント シークレットの追加**\] ダイアログボックスが表示されるので、\[**説明**\] のボックスに用途について分かり易い説明を記述し、\[**有効期限**\] ドロップボックスで \[**推奨: 6か月**\] を選択して\[**追加**\] ボタンをクリックします 

13. クライアントシークレットが生成されるので \[**値**\] の内容をメモ帳などにコピーして保持します。

    **なお、このシークレットの値は生成直後でないとコピーすることができませんので必ずこのタイミングで取得しておいてください。**

    <img src="images/21Nov_ClientSecret.png" width="600px">

14. ローカル開発環境のボット プロジェクト内のファイル **.env** を開き、ここまでの手順でメモした App ID とシークレットを使用して内容を以下のように書き換えます

    ```
    MicrosoftAppId=メモしておいた App ID
    MicrosoftAppPassword=メモしておいたクライアント シークレット
    ```

    ローカル開発環境のターミナル画面で以下のコマンドを実行してボット プロジェクトを起動します

    ```
    npm start
    ```

15. Azure の画面に戻り、画面上部のパンくずリストにある作成した Azure Bot の名前をクリックし、Azure Bot インスタンスの概要画面に戻ります

16. 画面左の\[**チャンネル**\] メニューをクリックし、表示された画面の \[**使用可能なチャネル**\] リストで **Micosoft Teams** をクリックします

17. \[**サービス条件**\] の確認ダイアログボックスが表示されるので内容を確認し、チェックボックスにチェックをつけ \[**同意**\] ボタンをクリックします

18. \[**Microsoft Teams を構成**\] 画面が表示されるので \[**保存**\] ボタンをクリックします

    <img src="images/21Nov_AzureBot_AddChannel.png" width="400px">

19. 画面左の \[**Web チャットでテスト**\] メニューをクリックします

    登録したボットと Web チャットで会話できるか確認します


ここまでで Azure Bot の設定は完了です。

この状態で、Teams 側のアプリ マニフェストに登録してインストールすれば、Teams ボットとして動作状態になっています。

<br />

## Teams との SSO に必要な Azure Active Directory の設定

Teams とボット アプリケーションとの SSO に必要なAzure Active Directory の設定を行います。

手順は以下のとおりです。

1. Azure ポータルにて、作成した Azure Bot インスタンスの\[**構成**\] 画面を表示し、 \[**Microsoft App ID**\] の隣にある \[**管理**\] リンクをクリックします

2. Azure Active Directory の \[**証明書とシークレット**\] 画面に遷移するので、左側のメニューから \[**認証**\] をクリックします

3. \[**認証**\] 画面の **プラットフォームの構成** で、\[**+プラットフォームの追加**\] をクリックし、表示されたブレードで \[**Web**\] のカードをクリックします

    <img src="images/21Nov_AAD_PlatformCfg.png" width="300px"> 

4. \[**Web の構成**\] ブレードが表示されるので \[**\* リダイレクト URL**\] に以下の URL を設定し、

    ```
    https://token.botframework.com/.auth/web/redirect
    ```

    \[**アクセス トークン (暗黙的なフローに使用)**\]、\[**ID トークン (暗黙的およびハイブリッド フローに使用)**\] チェックボックスにチェックをつけ \[**構成**\] ボタンをクリックします

    <img src="images/21Nov_AAD_WebCfg.png" width="400px">

5. 画面左のメニューで \[**API の公開**\] を選択し、遷移した画面で \[**設定**\]リンクをクリックすると、
    
    <img src="images/21Nov_PubAPI_cnfg.png" width="400px">
    
    api://{AppID} の形式でアプリケーションID の URI が生成されるので、App ID の前に **botid-** を記述して以下の形式の URI を設定し \[**保存**\] ボタンをクリックします

    ```
    api://botid-AppID 
    ```
    **この URI はアプリ マニフェストの設定で使用するのでメモ帳などに貼り付けて保持します。**

6. \[**+ Scope の追加**]をクリックして\[スコープ名*] に **access_as_user** と入力します

7. \[**同意できるのはだれですか?**\] トグルボタンで \[**管理者とユーザー**]を選択します。

8. 他の項目を以下のように設定します。

    |項目|値|
    |---|---|
    | 管理者の同意の表示名 | Teams は、ユーザーのプロファイルにアクセスできます。 |
    | 管理者の同意の説明 | Teams は、アプリの Web API を現在のユーザーとして呼び出します。|
    | ユーザーの同意の表示名 | Teams はユーザー プロファイルにアクセスし、ユーザーの代わりに要求を行うことができます。|
    | ユーザーの同意の説明 | Teams は、ユーザーと同じ権限でこのアプリの API を呼び出します。|

    実際の画面は以下のとおりです。

    <img src="images/21Nov_AddAAD_Scope.png" width="500px">

9. \[状態] トグルボタンが \[**有効**] になっていることを確認し、\[スコープの追加] ボタンをクリックします。

10. \[承認済 みクライアント アプリケーション] セクションで、\[**クライアント アプリケーションの追加**] をクリックし、以下の GUID をそれぞれ入力し \[アプリケーションの追加] ボタンをクリックして登録します。

    |クライアント ID|アプリケーション|
    |---|---|
    | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 | Teams モバイル またはデスクトップ アプリケーション用 |
    | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 | Teams Web アプリケーション用|

    登録の際、\[承認済みのスコープ] に api://で始まるアプリケーション URI のチェックボックスがリストされるので必ずチェックをつけます。

    実際の画面は以下のとおりです。
    
    <img src="images/21Nov_AddAppInPublicAPI.png.png" width="600px">

11. 画面左のメニューで \[**API のアクセス許可**] をクリックします

12. 遷移した画面で \[**+ アクセス許可の追加**] をクリックし、

    <img src="https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/images/ADD_AccessAllow.png" width="500px">

    画面右に表示されたブレード内の \[Microsoft Graph]-\[委任されたアクセス許可]ボックスをクリックし、
    
    <img src="https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/images/GraphAPI_tail.png" width="400px">
    
    以下の権限にチェックをつけ \[アクセス許可の追加] ボタンをクリックします
    - User.Read (既定で有効)
    - email
    - offline_access
    - openId
    - profile
    - Mail.Read

以上で Teams との SSO に必要な Azure Active Directory の設定は完了です。

次に、前の手順で作成した Azure Bot のインスタンスに上記の内容を OAuth 接続の設定として追加します。

<br />

## Azure Bot への OAuth 接続の追加

Azure Bot インスタンスに OAuth 接続の設定を追加します。

手順は以下のとおりです。

1. [Azure ポータル](https://portal.azure.com)で、目的の Azure Bot インスタンスの \[**構成**\] メニューを開きます

2. \[**構成**\] 画面内の \[**OAuth 接続設定の追加**\] ボタンをクリックします

3. 画面右に \[**新しい接続設定**\] ブレードが表示されるので、同ブレードの各項目を以下のように設定し\[**保存**\]ボタンをクリックします

    |**フィールド**|**値または説明***|
    |---|---|
    | 名前 * | **TeamsBotSSO_Connect**(※任意のもので可) |
    | サービス プロバイダー * | **V2 Azure Active Directory**|
    | Client id *| メモしてある App ID|
    | Client secret *| メモしてあるクライアント シークレット|
    | Token Exchange URL | Teams Web アプリケーション用|
    | Tenant ID | **common**|
    | スコープ | **User.Read** |

    ここまでの手順で OAuth 接続の追加は完了していますが、正しく動作しているか確認するには以降の手順を実行してください。

4. \[**構成**\] 画面内の \[**OAuth 接続設定の追加**\] ボタンの上に、こまでの手順で追加したOAuth 接続の名前 (**TeamsBotSSO_Connect**) がリストされているのでクリックします

5. クリックしたOAuth 接続設定の内容が画面右のブレードに表示されるので、OAuth 接続名の下にある \[\**接続テスト**\] リンクをクリックします

    <img src="images/21_Nov_OAuth_connTest.png" width="300px">

6. Web ブラウザーの新規タブが開き、サインイン ページが表示されるので目的のアカウントを選択してサインインします

7. サインインに成功すると、**"Test Connection to 'TeamsBotSSO_Connect**(※OAuth 接続名)' **Succeeded**" というメッセージが書かれたページが表示されるので、同ページの \[**Copy Token**\] ボタンをクリックしてトークンをコピーします

    <img src="images/21Nov_OAuthToken.png" width="400px">

8. Web ブラウザーで新規にタブを開き、https://jwt.ms/ にアクセスします

    ページ上部の **Enter token below (it never leaves your browser):** テキストボックスにコピーしたトークンを貼り付けます。

    トークンが正しいものであれば \[**Decode Token**\] タブのテキストボックスに JSON が表示され、\[**Claims**\] タブの中で各プロパティ毎の値を確認することができます。

ここまでの手順で Azure Bot と Azure Active Directry の設定は完了です。

ここからは、ボットアプリケーションに SSO に必要となるコードを追加し、Teams のアプリマニフェストに必要な設定を追加します。


## アプリマニフェストへの設定の追加

Teams ボットのアプリ マニフェストに SSO に必要な設定を追加します。

まず最初に、[**Microsoft Teams 用 開発者ポータルを使用した Teams へのボットの追加**](Ex03.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%9C%E3%83%83%E3%83%88%E3%81%AE%E8%BF%BD%E5%8A%A0) の内容を参考に、基本的な Teams ボット アプリの登録を完了してください。

Teams ボット アプリの基本的な登録が完了したら、以下の手順で作業を行います。

1. [開発者ポータル](https://dev.teams.microsoft.com/) にログインし、画面左のメニューより \[**Apps**\] メニューをクリックします

2. 登録されているアプリの一覧が表示されるので、目的のアプリをクリックします

3. 選択したアプリの画面内の左のメニューより \[**Configure**\] - \[**Single sign-on**\] をクリックします

4. **Single sign-on** の設定画面が表示されるので、\[**Application ID URI***\] に Azure Active Directory で設定した Application ID URI を指定し、\[**Save**\] ボタンをクリックします

    書式は以下のとおりです。

    ```
    api://botid-ボットの Application ID
    ```

    <img src="images/21Nov_Manifest_SSO.png" width="400px">

5. 画面左のメニューより \[**Domains**\] をクリックし、表示れた画面の \[**+Add a domain**\] をクリックし、表示されたダイアログボックスで以下の URL を指定し \[**Add**\] ボタンをクリックします

    ```
    token.botframework.com
    ```
    <img src="images/21Nov_manifest_AddDomain.png" width="400px">

以上でマニフェストへのボットアプリ用 SSO の設定は完了です。 







    
