# Change log

## January 24 2022

- [Microsoft Teams 管理センター](https://admin.teams.microsoft.com/) の \[組織全体のアプリ設定\] 画面のメニューの表記の変更に伴い、メニュー名と画面ショットを変更 

- [Teams 会議にタブ アプリを追加する](Ex02.md#%E4%BC%9A%E8%AD%B0-%E3%82%BF%E3%83%96%E3%81%A8%E3%81%97%E3%81%A6%E8%BF%BD%E5%8A%A0)演習を追加

    - 現在、[開発者ポータル](https://dev.teams.microsoft.com/)のタブアプリの設定画面には会議にタブ アプリをインストールするのに必要となるアプリ マニフェストの設定を行う UI が用意されていないので [App Studio を使用した方法](opt/use_appStudio.md#app-studio-%E3%81%A7%E3%81%AE%E4%BC%9A%E8%AD%B0%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)も追加

- Visual Studio Code の Teams Toolkit 拡張のバージョンアップに伴い、ツールキットが生成するプロジェクトの構成とファイル名が変更になったため[メッセージング拡張 - 操作(アクション)コマンドによる外部サービスの連携](Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E6%8B%A1%E5%BC%B5---%E6%93%8D%E4%BD%9C%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AB%E3%82%88%E3%82%8B%E5%A4%96%E9%83%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E9%80%A3%E6%90%BA) の表記を変更

- Azure Logic Apps のワークフロー作成時の UI 変更に伴い、メッセージング拡張操作(アクション)コマンドの作成演習内の [Logic Apps 部分の画面ショットと手順](Ex04.md#azure-logic-apps%E7%B7%A8)を変更 

## November 15 2021

- GotHub の [OfficeDv/Microsoft-Teams-Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples) で公開されている Teams との[シングルサインオン (SSO)の機能をもったボットのサンプル アプリ(JS)](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)を動作させるまでの[ハンズオン資料](Ex03-SSO.md)を追加

- [開発者ポータルを使用したボットの登録手順](https://github.com/osamum/Easyway-for-MSTeamsAppDev/blob/update2021November/Ex03.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%9C%E3%83%83%E3%83%88%E3%81%AE%E8%BF%BD%E5%8A%A0) の内容を Azure を使用しなくとも良い内容に変更

- App Studio が 2020 年 11 月より非推奨になったため、各演習の手順より App Studio の箇所を削除し、開発者ポータルを使用した手順を追加

    削除された App Studio の手順は必要になった場合に備えて[別ファイル](opt/use_appStudio.md)にまとめて移動

 - Azure Bot インスタンスのデプロイ時に生成され、同じリソースグループ内の KeyVault に格納されているシークレットの確認手順を[別ファイル](opt/bot_secret_KeyValut.md)に移動

 - Visual Studio Code Teams Toolkit 拡張のバージョンアップに合わせた、[演習 4 : メッセージング拡張](Ex04.md) の手順と画面ショットの若干の変更

## September 23 2021

- **タブのシングルサインオン (SSO)** をシンプルな方法で実装する[ハンズオン資料](Ex02-SSO.md)を追加
- Teams アプリ開発関連の以下のデバッグ方法について記述

    * [**Teams タブ アプリとしてロードされた Web ページのデバッグ**](opt/JS_vscode-dbg.md#teams-%E3%82%BF%E3%83%96-%E3%82%A2%E3%83%97%E3%83%AA%E3%81%A8%E3%81%97%E3%81%A6%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%9F-web-%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E3%83%87%E3%83%90%E3%83%83%E3%82%B0)

    * [**Visual Studio Code での Node.js アプリケーションのデバッグ**](opt/JS_vscode-dbg.md#visual-studio-code-%E3%81%A7%E3%81%AE-nodejs-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E3%83%87%E3%83%90%E3%83%83%E3%82%B0)

## September 06 2021

* ローカルの開発環境で動作しているボットのサービスを [**Azure Bot**](https://docs.microsoft.com/ja-jp/azure/bot-service/abs-quickstart?view=azure-bot-service-4.0) に登録する手順も含めた Microsoft Teams 用 開発者ポータルを使用したボットの追加方法を追記


    * [**Microsoft Teams 用 開発者ポータルを使用したボットの追加**](Ex03.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%9C%E3%83%83%E3%83%88%E3%81%AE%E8%BF%BD%E5%8A%A0)



## Augst 24 2021

- [**Microsoft Teams アプリケーションの新規作成**](Ex01.md) と [**タブ アプリケーション**](Ex02.md) のページに以下の [**Microsoft Teams 用 開発者ポータル**](https://dev.teams.microsoft.com/) 関連の記述を追加

    * [**Microsoft Teams 用 開発者ポータルを使用した Teams アプリケーションの登録**](Ex02.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%81%AE%E4%BD%BF%E7%94%A8)

    * [**Microsoft Teams 用 開発者ポータルを使用してパーソナルタブを追加する方法**](Ex02.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AB-%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)

    * [**Microsoft Teams 用 開発者ポータルを使用してチームタブを追加する方法**](Ex02.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AB-%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)


## Augst 05 2021

- [**メッセージング拡張**](Ex04.md) のハンズオンの手順に操作(アクション)コマンドから Asure Logic Apps/Power Automate で作成したメール送信サービスを呼び出す[手順](Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E6%8B%A1%E5%BC%B5---%E6%93%8D%E4%BD%9C%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AB%E3%82%88%E3%82%8B%E5%A4%96%E9%83%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E9%80%A3%E6%90%BA)を追加


## June 24 2021

製品のバージョンアップにより、ハンズオンの内容に影響が出る部分を更新

追加 :

- [**コネクタ**](Ex06.md) のハンズオンに[**送信Webhook を利用した外部サービスの呼び出し**](https://github.com/osamum/Easyway-for-MSTeamsAppDev/blob/master/Ex06.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E9%80%81%E4%BF%A1outgoing-webhook-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E5%A4%96%E9%83%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E5%91%BC%E3%81%B3%E5%87%BA%E3%81%97)の演習を追加



変更 :

- Build 2021 のタイミングで発表された Microsoft Teams Toolkit バージョン 2 に合わせ [**メッセージング拡張**](Ex04.md) のハンズオンの手順を更新

- README.md の[要件](https://github.com/osamum/Easyway-for-MSTeamsAppDev#%E8%A6%81%E4%BB%B6) にある **Microsoft Teams 管理センターでサイドローディングの許可** の内容を現在のバージョンの UI に合わせた手順と画像の更新

- 各ページの **目次** の変更