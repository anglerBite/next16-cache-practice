import { cacheLife, cacheTag } from "next/cache"

type Props = { limit?: number }

const CachedTopPosts = async ({ limit = 5 }: Props) => {
    'use cache'// ← この関数の出力がキャッシュ & PPRに乗る
    cacheTag('posts:top');// ← 更新用のタグ
    cacheLife('max');// ← 同じリクエストが来たときにキャッシュされたデータを返す。（迷ったらこれでOK）

    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts: { id: number; title: string }[] = await res.json();

    const top = posts.slice(0, limit);

    return (
        <section className="space-y-2">
            <h2 className="text-xl font-semibold">Cached Top Posts (limit: {limit})</h2>
            <ul className="list-disc pl-5">
                {top.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
            <p className="text-sm opacity-70">
                Rendered at: {new Date().toLocaleString()}
            </p>
        </section>
    )
}

export default CachedTopPosts