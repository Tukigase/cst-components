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

        // 自分が置かれている場所を基準に、CSSの絶対URLを自動計算する
        const cssUrl = new URL('../css/cst-nav-header.css', import.meta.url).href;

        // パスの取得
        const path = window.location.pathname.toLowerCase();

        const isTopPage = path.endsWith('/') || path.endsWith('/index.html');

        let titleHtml = "";

        if (isTopPage) {
            titleHtml = titleText;
        } else {
            titleHtml = `${toolName} - <a href="./" class="header-inline-brand-link" title="トップページへ戻る">${titleText}</a>`
        }

        // Shadow DOMの中に、CSSのリンクとHTML構造を流し込む
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${cssUrl}">
            
            <header>
                <h1>${titleHtml}</h1>
                <a href="google.com" class="contact-icon" title="お問い合わせ" >
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>
            </header>
        `;
    }
}

// カスタムタグ <cst-nav-header> としてブラウザに登録！
customElements.define('cst-nav-header', CstNavHeader);