# Microsoft Teams 開発者向け簡易チュートリアル

2021 年 11 月 15 日版

## 更新内容
- GotHub の OfficeDv/Microsoft-Teams-Samples で公開されている Teams との[シングルサインオン (SSO)の機能をもったボットのサンプル アプリ(JS)](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)を動作させるまでの[ハンズオン資料](Ex03-SSO.md)を追加

- [開発者ポータルを使用したボットの登録手順](https://github.com/osamum/Easyway-for-MSTeamsAppDev/blob/update2021November/Ex03.md#microsoft-teams-%E7%94%A8-%E9%96%8B%E7%99%BA%E8%80%85%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%9C%E3%83%83%E3%83%88%E3%81%AE%E8%BF%BD%E5%8A%A0) の内容を Azure を使用しなくとも良い内容に変更

- App Studio が 2020 年 11 月より非推奨になったため、各演習の手順より App Studio の箇所を削除し、開発者ポータルを使用した手順を追加

    削除された App Studio の手順は必要になった場合に備えて[別ファイル](opt/JS_vscode-dbg.md)にまとめて移動

 - Azure Bot インスタンスのデプロイ時に生成され、同じリソースグループ内の KeyVault に格納されているシークレットの確認手順を[別ファイル](opt/bot_secret_KeyValut.md)に移動

 - Visual Studio Code Teams Toolkit 拡張のバージョンアップに合わせた、[演習 4 : メッセージング拡張](Ex04.md) の手順と画面ショットの若干の変更


これまでの更新内容は[改訂履歴](changelog.md)を参照してください。

<br >

## 概要
このチュートリアルは、これから Microsoft Teams 向けのアプリケーションの開発を行う初学者のための簡易的なものであり、実際の開発に取り掛かるまでの学習期間の短縮を目的としています。

ここで紹介するのは以下の内容です。
* 開発で使用する Microsoft Teams の特徴的な機能 
* 上記それぞれの概念
* 上記それぞれのアプリケーションの実装方法

チュートリアルとして開発方法を説明するのは Microsoft Teams の以下の機能です。
* タブ
* ボット
* コネクタ
* メッセージング拡張

## 要件
このチュートリアルを実施するには以下の環境が必要です。

* **Microsoft Office 365 Business Premium 以上の[ライセンス](https://products.office.com/ja-JP/compare-all-microsoft-office-products-b?tab=2)**

    ライセンスを持っていない開発者は [Office 365 開発者プログラム](https://developer.microsoft.com/ja-JP/office/dev-program
)に参加して開発者用の無料の Office 365 のサブスクリプションを入手することもできます。このサブスクリプションでは [Office 365 Enterprise E5 Developer](https://docs.microsoft.com/ja-jp/office/developer-program/office-365-developer-program-get-started) が 90 日間無償で使用することができます。このライセンスを開発に積極的に使用している場合は、90 日ごとにサブスクリプションが自動的に更新されます。

    詳しくは以下のドキュメントをご参照ください。

    * [Microsoft 365 開発者プログラムの FAQ - 1 年間のサブスクリプションをなぜ提供しないのですか？](https://docs.microsoft.com/ja-jp/office/developer-program/microsoft-365-developer-program-faq#renew-subscription)

* **Microsoft Teams 管理センターでサイドローディングの許可**

    Microsoft Teams 管理センターにて、開発したアプリケーションがサイドローディングできるように許可を行ってください。
    
    具体的には [Microsoft Teams 管理センター](https://admin.teams.microsoft.com/)のメニュー\[**Teams のアプリ**\] - \[**アプリの管理**\] の画面内にある \[**組織全体のアプリ設定**\] ボタンをクリックし、表示されたブレード内の 「**カスタム アプリとの相互作用を許可する**」をオンにします。

    <img src="images/21june_allowCustomApp.png" width="300">


* **[Visual Studio 2018 以上のエディション](https://visualstudio.microsoft.com/ja/vs/)、もしくは [Visual Studio Code](https://code.visualstudio.com/Download)**

    ボットとメッセージ拡張の開発のチュートリアルで使用します。

    ボットを C# で開発する場合は Visual Studio 201x を、JavaScript で開発する場合は Visual Studio Code と [Node.js](https://nodejs.org/en/) をインストールしてください。

    また、Visual Studio Code を使用する場合は、ローカル環境で Web サーバーを動かすために以下のコマンドを使用して http-server をインストールしてください。

    ```
    npm install http-server -g
    ```

    メッセージング拡張の開発のチュートリアルで使用する Microsoft Teams Toolkit もインストールしておいてください。

    * [Visual Studio Code 用 Microsoft Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)

    * [Visual Studio 用 Microsoft Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.vsteamstemplate)


* **デスクトップ版 Microsoft Teams**

    アプリケーションの登録を行うにはデスクトップ版の Microsoft Teams が必要です。[Office 365 ポータル](https://www.office.com/?)からインストールしておいてください。

* **[ngrok](https://ngrok.com/download)**

    ローカル環境で動作させた開発中のアプリケーションをインターネットを介して一時的にアクセスできるようにするために使用します。

    また Node.js が使用可能な場合は、以下のコマンドを使用してインストールすることも可能です。

    ```
    npm install ngrok -g
    ```

<br />

## 目次
0. [**Microsoft Teams アプリ開発について**](Intro.md)

1. [**Microsoft Teams アプリの新規作成**](Ex01.md)

    
2. [**タブ アプリ**](Ex02.md)
    * [**パーソナル タブ**](Ex02.md#%E3%82%BF%E3%82%B9%E3%82%AF-1--%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AB-%E9%9D%99%E7%9A%84-%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)


    * [**チーム タブ**](Ex02.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E3%83%81%E3%83%BC%E3%83%A0-%E6%A7%8B%E6%88%90%E5%8F%AF%E8%83%BD-%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)


    * [**タブ : タスクモジュールの表示**](Ex02.md#%E3%82%BF%E3%82%B9%E3%82%AF-3-%E3%82%BF%E3%83%96%E3%81%A7%E3%81%AE%E3%82%BF%E3%82%B9%E3%82%AF-%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%AE%E8%A1%A8%E7%A4%BA)

        * [**外部の HTML フォームをタスクモジュールとしてタブに追加**](Ex02.md#%E3%82%BF%E3%82%B9%E3%82%AF-3-1--%E5%A4%96%E9%83%A8%E3%81%AE-html-%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%82%92%E3%82%BF%E3%82%B9%E3%82%AF%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%A8%E3%81%97%E3%81%A6%E3%82%BF%E3%83%96%E3%81%AB%E8%BF%BD%E5%8A%A0)

        * [**アダプティブ カードをタスクモジュールとしてタブに追加**](Ex02.md#%E3%82%BF%E3%82%B9%E3%82%AF-3-2--actibity-card-%E3%82%92%E3%82%BF%E3%82%B9%E3%82%AF%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%A8%E3%81%97%E3%81%A6%E3%82%BF%E3%83%96%E3%81%AB%E8%BF%BD%E5%8A%A0)
    
    * [**タブのシングルサインオン(SSO)**](Ex02-SSO.md)

    
3. [**ボット**](Ex03.md)
    * [**ボットの登録**](Ex03.md#%E3%83%9C%E3%83%83%E3%83%88%E3%81%AE%E7%99%BB%E9%8C%B2)

    * [**ボットのシングル サインオン (SSO)**](Ex03-SSO.md)
    
4. [**メッセージング拡張**](Ex04.md)
    * [**検索機能の実装**](Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-1--%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E6%8B%A1%E5%BC%B5---wikipedia-%E6%A4%9C%E7%B4%A2%E6%A9%9F%E8%83%BD%E3%81%AE%E5%AE%9F%E8%A3%85)
    * [**操作機能の実装**](Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E6%8B%A1%E5%BC%B5---%E6%93%8D%E4%BD%9C%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AB%E3%82%88%E3%82%8B%E5%A4%96%E9%83%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E9%80%A3%E6%90%BA)
    
5. [**コネクタ**](Ex06.md)
    * [**受信 Webhook を利用したチャネルへの通知**](Ex06.md#%E3%82%BF%E3%82%B9%E3%82%AF-1--incomming-webhook-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E3%83%81%E3%83%A3%E3%83%8D%E3%83%AB%E3%81%B8%E3%81%AE%E9%80%9A%E7%9F%A5)
    * [**送信Webhook を利用した外部サービスの呼び出し**](Ex06.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E9%80%81%E4%BF%A1outgoing-webhook-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E5%A4%96%E9%83%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E5%91%BC%E3%81%B3%E5%87%BA%E3%81%97)


