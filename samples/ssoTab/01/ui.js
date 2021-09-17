var $id = (id) => { return document.getElementById(id) };
var display = null,
tabContent = null;

window.addEventListener('DOMContentLoaded', () => {
    display = $id('display'),
        tabContent = $id('mailItems');

    $id('logOnButton').addEventListener('click', () => {
        logon();
    });
});

//情報表示用のエレメントを追加
function showItem(text) {
    let elm = document.createElement('div');
    elm.innerText = text;
    display.appendChild(elm);
}

//メールの一覧を描画
function renderMailList(data) {
    data.value.map((d, i) => {
        try {
            if (i < 10) {
                const contentItem = document.createElement('div');
                contentItem.appendChild(document.createElement('hr'));
                const subject = document.createElement('div');
                subject.innerText = `[タイトル]\n${d.subject}`;
                contentItem.appendChild(subject);
                const from = document.createElement('div');
                from.innerText = `[送信者]\n${d.from.emailAddress.address}`;
                contentItem.appendChild(from);
                const body = document.createElement('div');
                body.innerText = `[本文]\n${d.bodyPreview}...`;
                contentItem.appendChild(body);
                tabContent.appendChild(contentItem);
            }
        }
        catch (err) {
            showItem(err.message);
        }
    })
}