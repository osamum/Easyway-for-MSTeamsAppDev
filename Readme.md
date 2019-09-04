# Microsoft Teams 開発者向け簡易チュートリアル
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
* メッセージ拡張

## 要件
このチュートリアルを実施するには以下の環境が必要です。

* **Microsoft Office 365 Business Premium 以上の[ライセンス](https://products.office.com/ja-JP/compare-all-microsoft-office-products-b?tab=2)**

    ライセンスを持っていない開発者は [Office 365 開発者プログラム](https://developer.microsoft.com/ja-JP/office/dev-program
)に参加して開発者用の無料の Office 365 のサブスクリプションを入手することもできます。このサブスクリプションでは [Office 365 Enterprise E3 Developer](https://docs.microsoft.com/ja-jp/office/developer-program/office-365-developer-program-get-started) が 1 年間無償で使用することができます。

* **Microsoft Teams 管理センターでサイドローディングの許可**

    Microsoft Teams 管理センターにて、開発したアプリケーションがサイドローディングできるように許可を行ってください。
    
    具体的には [Microsoft Teams 管理センター](https://admin.teams.microsoft.com/)のメニュー\[Teams のアプリ\] - \[[セットアップ ポリシー](https://admin.teams.microsoft.com/policies/app-setup/edit/)\] で 「カスタム アプリのアップロードを許可」をオンにします。

    <img src="images/SetupPolicy.png" width="400">


* **[Visual Studio 2018 以上のエディション](https://visualstudio.microsoft.com/ja/vs/)、もしくは [Visual Studio Code](https://code.visualstudio.com/Download)**

    ボットとメッセージ拡張の開発のチュートリアルで使用します。

    ボットを C# で開発する場合は Visual Studio 201x を JavaScript で開発する場合は Visual Studio Code と [Node.js](https://nodejs.org/en/) をが必要です。

    また、Visual Studio Code を使用する場合は、ローカル環境で Web サーバーを動かすために以下のコマンドを使用して http-server をインストールしてください。

    ```
    npm install http-server -g
    ```

* **デスクトップ版 Microsoft Teams**

    アプリケーションの登録を行うにはデスクトップ版の Microsoft Teams が必要です。[Office 365 ポータル](https://www.office.com/?)からインストールしておいてください。

* **[ngrok](https://ngrok.com/download)**

    ローカル環境で動作させた開発中のアプリケーションをインターネットを介して一時的にアクセスできるようにするために使用します。


## 目次
1. [**Microsoft Teams アプリケーション開発について**](Tut01.md)
2. [**Microsoft Teams アプリケーションの新規作成**](Tut02.md)
    * [App Studio を使用したマニフェストファイルの作成](Tut02.md#app-studio-を使用した-teams-アプリケーションの登録)
3. [**タブ アプリケーション**](Tut03.md)
    * [パーソナル タブ](Tut03.md#%E3%82%BF%E3%82%B9%E3%82%AF-1--%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AB-%E9%9D%99%E7%9A%84-%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)
    * [チーム タブ](Tut03.md#%E3%83%81%E3%83%BC%E3%83%A0-%E6%A7%8B%E6%88%90%E5%8F%AF%E8%83%BD-%E3%82%BF%E3%83%96%E3%81%AE%E8%BF%BD%E5%8A%A0)
    * タブ アプリケーションのシングルサインオン
4. [**ボット**](Tut04.md)
    * ボットの登録
    * Teams Bot Builder SDK を使用した拡張
5. [**メッセージ拡張とメッセージアクション**](Tut05.md)
6. [**コネクタ**](Tut06.md)
