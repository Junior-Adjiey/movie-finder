import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => (
    document.documentElement.classList.contains('dark')
  ))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button className="ghost" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}