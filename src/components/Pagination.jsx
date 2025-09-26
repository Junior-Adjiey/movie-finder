export default function Pagination({ page, total, perPage = 10, onPage }) {
  const pages = Math.ceil((total || 0) / perPage)
  if (pages <= 1) return null
  const prev = () => onPage(Math.max(1, page - 1))
  const next = () => onPage(Math.min(pages, page + 1))

  return (
    <div className="toolbar center" role="navigation" aria-label="Pagination">
      <button className="ghost" onClick={prev} disabled={page <= 1}>← Prev</button>
      <span className="badge">Page {page} / {pages}</span>
      <button className="ghost" onClick={next} disabled={page >= pages}>Next →</button>
    </div>
  )
}