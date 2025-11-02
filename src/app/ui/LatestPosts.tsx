
const LatestPosts = async () => {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store',// ← 毎回最新データを取得
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts: { id: number; title: string }[] = await res.json();

    return (
        <section className="space-y-2">
            <h2 className="text-xl font-semibold">Dynamic Latest Posts</h2>
            <ul className="list-disc pl-5">
                {posts.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
            <p className="text-sm opacity-70">Fetched at: {new Date().toLocaleString()}</p>
        </section>
    )
}

export default LatestPosts