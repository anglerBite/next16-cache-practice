import { Suspense } from 'react'
import { refreshTopPosts } from './actions'
import CachedTopPosts from './ui/CachedTopPosts'
import LatestPosts from './ui/LatestPosts'

export default function Page() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Cache Components Playground</h1>

      {/* 先出し：キャッシュされる領域（limit違い2つでキーの違いを可視化） */}
      <div className="grid md:grid-cols-2 gap-6">
        <CachedTopPosts limit={5} />
        <CachedTopPosts limit={8} />
      </div>

      {/* タグ更新ボタン（Server Action） */}
      <form action={refreshTopPosts} className="space-x-2 border border-white p-4 rounded">
        <button
          className="px-3 py-1 rounded bg-gray-800 text-white cursor-pointer"
        >
          Refresh cached button (updateTag)
        </button>
        <span className="text-sm opacity-70">
          ボタン押下後、「Rendered at」が新しくなるはず
        </span>
      </form>

      {/* 後からレンダリング：動的断面はSuspense配下に */}
      <Suspense fallback={<div>Loading latest posts…</div>}>
        <LatestPosts />
      </Suspense>
    </main>
  )
}