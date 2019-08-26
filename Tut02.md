# Microsoft Teams アプリケーションの新規作成
Microsoft Teams アプリケーションは、既存の Web アプリケーションや既存の Microsoft Bot Framework で作られたボットを統合するか、それぞれ向けに作られた Teams 用の SDK で拡張して行います。

これらを Teams にアプリケーションとして登録する場合で必要となるのがアプリの定義です。

これはアプリケーションをタブやボットやメッセージ拡張といった、Teams のどのような機能として使用するかを JSON で記述した manifest.json というファイルを作成しマニフェストファイルとします。

このマニフェストファイルの作成を効率的に行う方法は以下の 2 つあります。

1. **GitHub の [SharePoint/sp-dev-docs リポジトリ](https://github.com/SharePoint/sp-dev-docs/blob/master/assets/teams-tab-manual.zip) からサンプルを入手**
2. **App Studio を使用する**

このチュートリアルでは App Studio を使用する方法を紹介します。

なお、手動によるマニフェストファイルの作成と Microsoft Teams の展開方法については以下のドキュメントをご覧ください。

* [**Web パーツ用の Microsoft Teams マニフェストを手動で作成して Microsoft Teams に展開する**](https://docs.microsoft.com/ja-jp/sharepoint/dev/spfx/web-parts/guidance/creating-team-manifest-manually-for-webpart)

## App Studio について
App Studio は Microsoft Teams のアプリケーションで、アプリマニフェストを含むアプリ パッケージの作成を GUI で行うためのツールです。

<img src="images/AppStudio.png" width="600">

App Studio はアプリ パッケージを作成するだけでなく以下の機能も提供します。

1. **ワン クリック サイドロード**
2. **Bot Framework (dev.botframework.com) のボットの認証と設定管理を統合**
3. **アダプティブカードのコードのレビュー**
4. **Microsoft Teams アプリで使用可能なコードレビュー (React の jsx)**

## App Studio のインストール
App Studio は既定の状態では Microsoft Teams にインストールされていないので、App Source から検索してインストールする必要があります。

App Studio のインストール手順は以下のとおりです。

1. Microsoft Teams 起動します。
2. 左側のメニューバーの下から 2 番目にあめメニュー \[アプリ\] をクリックします。
3. Microsoft Teams にインストールすることのできるアプリの一覧画面が表示されるので、その中から選択するか、同画面の左上の \[すべてを検索] ボックスで検索を行います。
4. App Studio のタイルをクリックし、\[チームに追加] ボタンをクリックしてインストールします。 

## App Studio を使用した Teams アプリケーションの登録


