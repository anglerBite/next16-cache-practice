🧠 Next.js 16 Cache Components Playground

Next.js 16で新しく導入された Cache Components と Partial Pre-Rendering（PPR） を体験するためのミニアプリです。
キャッシュされる領域・動的に再描画される領域を感じ取れます。

⸻

🚀 Features（できること）
	•	"use cache" を使った 部分的キャッシュ（PPR）
	•	cacheTag / updateTag による キャッシュの即時再検証
	•	fetch(..., { cache: "no-store" }) による 動的データのストリーミング
	•	<Suspense> を使った 静的と動的の共存レンダリング

⸻

🏗️ ディレクトリ構成
app/
 ├─ page.tsx               // メインページ：キャッシュ領域＋動的領域を並列描画
 ├─ actions.ts             // Server Action：updateTagでキャッシュを即時更新
 └─ ui/
     ├─ CachedTopPosts.tsx // "use cache" + cacheTag('posts:top')
     ├─ LatestPosts.tsx    // no-store fetchで毎回取得
next.config.ts              // cacheComponentsフラグを有効化

⚙️ 動作環境
	•	Node.js 18 以上（Next.js 16対応）
	•	Next.js 16（App Router）
	•	TypeScript（任意）
	•	Tailwind CSS（任意）

💡 仕組みの概要

1. CachedTopPosts – “use cache”
'use cache'
cacheTag('posts:top')
cacheLife('max')

このコンポーネントは静的にキャッシュされてPPRシェルに含まれる。
cacheTag('posts:top') によりキャッシュにラベルが付けられ、updateTag('posts:top') を呼ぶと再検証される。

2. LatestPosts – 動的領域（no-store）
fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' })

この部分はキャッシュされず、毎リクエストで実行される。
<Suspense> の中で後からストリーミングされるため、**PPRの体感（先に見える静的UI＋遅れて届く動的データ）**ができる。

3. updateTag – キャッシュの即時再検証
updateTag('posts:top')

タグ posts:top に紐づくキャッシュを即座に無効化（invalidate）。
次の読み込みで再フェッチ・再描画が行われる。
この挙動は“削除”ではなく“期限切れにして再生成”に近い。

🔄 データの流れと責務

コンポーネント              データの取得                        キャッシュ性                                責務
CachedTopPosts            外部API (jsonplaceholder)         ✅ "use cache" によりPPRキャッシュ           静的・再利用可能な一覧の提供
LatestPosts               外部API (jsonplaceholder)         ❌ no-store により都度取得                   動的・最新データの表示
refreshTopPosts             Server Action                  —                                          タグ付きキャッシュの無効化（即時反映）


🧩 純粋関数・副作用の観点
    •	"use cache" コンポーネントは純粋関数的：同じ引数・同じデータなら常に同じ出力を返す。
    •	fetch(..., { cache: 'no-store' }) は副作用的：環境やリクエストに依存するためプリレンダリング不可。
    •	<Suspense> により、純粋なレンダリング（先に確定する部分）と副作用的処理（遅れて来る部分）を分離している。

🧪 実験してみよう
1.	ページを開く → 「Cached Top Posts」と「Dynamic Latest Posts」が順に表示される。
2.	“Refresh cached button” ボタンを押す →
    •	updateTag('posts:top') が実行される
    •	「Rendered at: …」の時刻が更新される（キャッシュ再生成）
3.	Cookieを設定（DevToolsやServer Action経由） → 「Hello, Naoki」と表示される。

🧭 学べることまとめ
	•	"use cache" の仕組みとキャッシュキーの自動生成
	•	cacheTag / updateTag / revalidateTag の関係
	•	"no-store" / "use cache" / <Suspense> の正しい分離
	•	静的レンダリング（Static）と動的レンダリング（Dynamic）の共存デザイン

📘 参考資料
	•	Next.js 16 Release Blog
	•	Cache Components Docs
	•	Partial Pre-Rendering (PPR)

🧩 Conceptual takeaway

Next.js 16 のキャッシュは「ページ単位」から「コンポーネント単位」へ。
"use cache" を付けた関数は、純粋関数としてのReactコンポーネントにキャッシュレイヤを持たせる新しい時代の設計思想。

静と動の切り分けをコードで明示できるようになると、
アプリ全体の“再現性・可読性・パフォーマンス”が一気に洗練される。# next16-cache-practice
