# Microsoft Teams アプリケーション開発について
開発方法について紹介する前に簡単に Microsoft Teams について紹介します。

## Microsoft Teams とは
Microsoft Teams は、Office 365 でのチーム コラボレーションのハブです。

チームが結束して成果をあげるのに必要な人、コンテンツ、ツールがここに集まります。

Tems ではチャットやファイル共有、ビデオ会議といった豊富な機能を提供しますが、アプリケーションを開発することによって、さらにその業務に最適なソリューションを提供できます。

## Microsoft Teams プラットフォームの特徴
Microsoft Teams はアプリケーションとしてでなく、サードパーティーのアプリやそれらを使用したプロセス、開発ツールも用意されており、単なるアプリケーションのカスタマイズではなく、開発のプラットフォームとして機能します。

このプラットフォームには 3 つの大きな特徴があります。

* **シームレスなコンテキストの切り替え**
* **場所に制限されないコミュニケーション**
* **エクスペリエンス (体験) の多様性**

### シームレスなコンテキストの切り替え
Microsoft Teams ではコンテキストを切り替えることなく、さまざまに異なるコンテキストを取得することができます。

たとえば業務で使用する複数の情報ツールからは、それぞれ異なる情報や、重複する情報が入ってきます。それらの情報を一か所に統合し情報収集の無駄を減らす、いわばキュレーションの能力です。

組織が既に使用しているすべてのアプリとツールを 1 つのユーザーインターフェイスにまとめることができるので、情報収集や業務ツールの使用にかかる工数を減らすことができます。

### 場所に制限されないコミュニケーション
Microsoft Teams はマルチプラットフォーム、マルチデバイスで動作するアプリケーションを提供しているうえ、Web ブラウザーでも動作するのでユーザーのデバイスを制限しません。

インターネットを介し、世界中のどこからでも接続できるので、チームでリアルタイムなコミュニケーションを取るときに一か所に集合する必要はありません。各々のいる場所で、テキスト、音声、あるいはビデオでコミュニケーションすることができます。

### エクスペリエンス (体験) の多様性
前述したように Microsoft Teams はさまざまな OS、デバイスで動作します。

例えば、ひとつのアプリケーションを PC で作業を行うオフィスワーカーも、フィールド サービス エンジニアのように作業現場からスマートフォンなどのモバイルデバイスでコミュニケーションを行うメンバーも使用できます。

ユースケースに合わせてアプリケーションを正しくデザインすれば、これまでのようにデスクトップとモバイル、さらには iOS と Android といったように 1 つのアプリケーションをわざわざ個別に開発する必要はありません。

## アプリケーション開発に使用する特徴的な機能
アプリケーションの開発で使用する Microsoft Teams の代表的な機能は大まかに以下の 4 つです。

* タブ
* ボット
* コネクタ
* メッセージ拡張

<img src="images/TypeOfTeamsApps.png" width="300">

これらの開発は既存の Web アプリケーションや、既存の Microsoft Bot Framework で作られたボットを統合するか、それぞれ向けに作られた Teams 用の SDK で拡張して行います。

<img src="images/TeamsApps_Concept.png" width="500">

## Microsoft Teams の SDK と API
既存の Web アプリケーションやボットを Microsoft Teams 用に拡張するために以下のような SDK が用意されています。

* **Web クライアント (タブ アプリケーションむけ)**

    [Microsoft Teams JavaScript client SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client)

* **ボット**

    Bot Builder SDK 4 - Microsoft Teams Extensions

    [C\#](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams-dotnet)

    [Node.js](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams-node)


上記に加え、Office 365 や Azure AD 内のユーザーに紐づく、アカウント情報やメールや予定表といったデータを取得するための Microsoft Graph API も使用できます。

* [**Microsoft Graph**](https://developer.microsoft.com/ja-jp/graph/)

また、Microsoft Graph には Microsoft Teams を API を介して操作するための Microsoft Teams API も含まれます。

* [**Microsoft Teams API の概要**](https://docs.microsoft.com/ja-jp/graph/teams-concept-overview)

この中には、Microsoft Teams のもう一つの大きな特色である通話やオンライン会議の API も含まれます。

* [**Microsoft Graph で通話とオンライン会議の API を使用する**](https://docs.microsoft.com/ja-jp/graph/api/resources/calls-api-overview?view=graph-rest-beta)

なお、このチュートリアルは、Microsoft Teams 初学者向けに Teams アプリの開発開始までのスピードアップを目的としているため Microsoft Graph 関連については扱いません。

## 目次
1. [**Microsoft Teams アプリケーション開発について**](Tut01.md)
2. [**Microsoft Teams アプリケーションの新規作成**](Tut02.md)
    * App Studio を使用したマニフェストファイルの作成
3. [**タブ アプリケーション**](Tut03.md)
    * パーソナル タブ
    * チーム タブ
    * タブ アプリケーションのシングルサインオン
4. [**ボット**](Tut04.md)
    * ボットの登録
    * Teams Bot Builder SDK を使用した拡張
5. [**メッセージ拡張とメッセージアクション**](Tut05.md)
6. [**コネクタ**](Tut06.md))
