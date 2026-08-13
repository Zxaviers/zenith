// Route skeleton for Fase 1 — preserves the /devlog/:slug URL shape from the
// Vite app (src/pages/DevlogPost.jsx). Real content + styling arrives in
// Fase 4.
export default async function DevlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <main style={{ padding: '4rem', textAlign: 'center' }}>
      <h1>Devlog post: {slug}</h1>
      <p>Placeholder — devlog post content migrates in Fase 4.</p>
    </main>
  )
}
