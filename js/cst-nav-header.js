export class CstNavHeader extends HTMLElement {
    // コンストラクタ（初期化）
    constructor() {
        super();
        // Shadow DOMを開いて、外部からスタイルが干渉しないように「カプセル化」する
        this.attachShadow({ mode: 'open' });
    }

    // 2. 要素が画面（DOM）に追加された瞬間に実行される処理
    connectedCallback() {
        this.render();
    }

    // 実際の描画ロジック
    render() {
        // 親のHTMLから title="..." で渡された値を受け取る（なければデフォルト値）
        const titleText = this.getAttribute('title') || 'MySites';
        const toolName = this.getAttribute('toolName') || 'Tools';
        const contactPath = this.getAttribute('contactPath') || 'contact.html';

        // 自分が置かれている場所を基準に、CSSの絶対URLを自動計算する
        const cssUrl = new URL('../css/cst-nav-header.css', import.meta.url).href;

        // パスの取得
        const path = window.location.pathname.toLowerCase();

        const isTopPage = path.endsWith('/') || path.endsWith('/index.html');

        let titleHtml = "";
        let backHtml = "";
        if (isTopPage) {
            titleHtml = titleText;
        } else {
            backHtml = `
                <a href="./" id="smartBackBtn" class="back-button">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span class="back-text">戻る</span>
                </a>
            `;
            titleHtml = `${toolName} - <a href="./" class="header-inline-brand-link" title="トップページへ戻る">${titleText}</a>`
        }

        // Shadow DOMの中に、CSSのリンクとHTML構造を流し込む
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${cssUrl}">
            
            <header>
                ${backHtml}
                <h1>${titleHtml}</h1>
                <a href="${contactPath}" class="contact-icon" title="お問い合わせ" >
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>
            </header>
        `;

        const backBtn = this.shadowRoot.getElementById('smartBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                // <a>タグのデフォルトの動き（href="./"への遷移）を一旦キャンセル
                e.preventDefault();

                const isContactPage = window.location.pathname.endsWith('contact.html');

                if (isContactPage) {
                    // お問い合わせページの場合
                    if (window.history.length > 1) {
                        window.history.back(); // 履歴があれば1つ戻る
                    } else {
                        window.location.href = "./"; // 履歴がなければトップへ
                    }
                } else {
                    // 通常のツールページの場合
                    // 履歴があり、かつ「自分のサイト内」からの遷移であれば戻る
                    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
                        window.history.back();
                    } else {
                        window.location.href = "./"; // ブックマーク等から直接来た場合はトップへ
                    }
                }
            });
        }
    }
}

// カスタムタグ <cst-nav-header> としてブラウザに登録！
customElements.define('cst-nav-header', CstNavHeader);