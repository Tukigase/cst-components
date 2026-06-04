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
        const titleText = this.getAttribute('title') || 'デフォルトタイトル';

        // 自分が置かれている場所を基準に、CSSの絶対URLを自動計算する
        const cssUrl = new URL('../css/cst-nav-header.css', import.meta.url).href;

        // Shadow DOMの中に、CSSのリンクとHTML構造を流し込む
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${cssUrl}">
            
            <header>
                <h1>${titleText}</h1>
            </header>
        `;
    }
}

// カスタムタグ <cst-nav-header> としてブラウザに登録！
customElements.define('cst-nav-header', CstNavHeader);