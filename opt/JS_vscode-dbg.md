# Teams タブ アプリとしてロードされた Web ページのデバッグ

Web ページを Microsoft Teams のタブ アプリとして追加する際、ほとんどの場合 [**Microsoft Teams Client JavaScript SDK**](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest) を使用することになります。

この SDK から提供される機能は、Teams のタブ アプリとして動作した場合にしか動作しないので、単に目的のページの URL を Web ブラウザーで表示しただけではデバッガをアタッチして任意のコード位置にブレークポイントを設定してステップ実行しながら変数の内容を確認する、といったようなデバッグを行うことはできません。

また、Teams のデスクトップ クライアントにロードされた状態で行う方法についても情報が公開されていません。

Microsoft Teams のタブ アプリとして追加された Web ページ内のコードをデバッグするには、Teams クライアントの Web UI を使用します。

具体的な手順は以下のとおりです。なお、同手順で使用する Web ブラウザーは Microsoft Edge を前提としています。

1. Web ブラウザーから以下の URL にアクセスします。

    ```
    https://teams.office.com/
    ```

    Microsoft Edge を使用している場合、メニュー \[**・・・**\]\(設定など　\[Alt\] + \[F\])をクリックし、\[**アプリ**\]-\[**このサイトをアプリとしてインストール**\] を選択して登録しておくと便利です。

2. Microsoft Teams にログインし、デバッグ対象の Teams タブ アプリを表示します

3. キーボードの \[**F12**\] キーを押下して Web ブラウザーの開発者ツールを起動し、画面上部のメニューバーから \[**ソース**\] をクリックします

4. 画面左側にアクティブになっているページのツリー構造が表示されるので、**embedded-page-container(*ページ名*)** のノードを探します

5. 同ノードを展開すると ngrok の返した(Web ページをホストしている)ドメイン名のノードがあるので、展開し、目的のファイルを選択します

    <img src="../images/21Sep_DevToolDbg_TabApp.png" width="300px">

6. 画面右側に表示される任意のコードの位置にブレークポイントを設定し、Teams タブ アプリで操作を行うと実行を中断させステップ実行 (\[F11]キー)などを行うことができます

    <img src="../images/21Sep_DevTool_Break.png" width="500px">

    もし、ソースコードを変更してもページに変更内容が反映されない場合は、開発者ツールのメニュー \[**ネットワーク**\] をクリックし、\[**キャッシュを無効にする**\] にチェックがついているかを確認してください。

    <img src="../images/21Sep_DisableCach.png" width="500px">


ここまでの手順で Web ブラウザーの開発者ツールを使用してタブ アプリとしてロードされた Web ページのデバッグができるようになりました。

Microsoft Edge の開発者ツールについての詳細については以下のドキュメントをご参照ください。

- [**Microsoft Edge開発者ツールの概要**](https://docs.microsoft.com/ja-jp/microsoft-edge/devtools-guide-chromium/)


<br>


# Visual Studio Code での Node.js アプリケーションのデバッグ

Visual Studio Code から、プロセスに Node.js のデバッガをアタッチしてサーバーサイド側をデバッグ実行することができます。

手順は以下のとおりです。

1. Visual Studio Code の左側の \[エクスプローラー\] ビューで、index.js 等のサーバーサイドで動作するコードのファイル中のデバッグ箇所にブレークポイントを設定します

2. 画面左のメニューで \[**実行とデバッグ(Ctrl + Shift + D)**\] メニューボタン (※虫と再生ボタンが重なったデザインのアイコン)をクリックし、表示されたブレード上の\[**実行とデバッグ**\] ボタンをクリックします

    <img src="../images/21Sep_Run&Debug.png" width="250px">

3. アタッチするデバッガーのリストがドロップダウンリストに表示されるので、**Node.js** を選択します

    <img src="../images/21Sep_ChooseDebuger.png" width="500px">

上記の手順でデバッガがアタッチされたホストプロセスが起動し、Node.js アプリケーションのデバッグ実行が可能になります。

<img src="../images/21Sep_BreakingVSCode.png"  width="600px">

Visual Studio Code を使用した Node.js アプリケーションの開発とデバッグ方法についての詳細は、以下のドキュメントをご参照ください。

- [**Visual Studio Code を使用して Node.js の開発とデバッグを行う方法**](https://docs.microsoft.com/ja-jp/azure/developer/javascript/how-to/with-visual-studio-code/install-run-debug-nodejs)