'use server'

import { updateTag } from 'next/cache'

export async function refreshTopPosts() {
  // DB更新の代わりにタグだけ更新。実APIは固定でも「Rendered at」が更新されて効果を体感できる
  updateTag('posts:top') // ← 同一リクエスト内で直ちに新鮮化（read-your-writes）
}