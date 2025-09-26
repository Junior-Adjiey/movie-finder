import { Link, NavLink, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './context/FavoritesContext'
import ThemeToggle from './components/ThemeToggle'
import './index.css'

function Layout() {
  return (
    <FavoritesProvider>
      <header className="container header">
        <Link to="/" className="brand link">🎬 Movie Finder</Link>
        <nav className="toolbar">
          <NavLink className="link" to="/">Home</NavLink>
          <NavLink className="link" to="/favorites">Favorites</NavLink>
          <ThemeToggle />
        </nav>
      </header>
      <Outlet />
    </FavoritesProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/movie/:id', element: <Details /> },
      { path: '/favorites', element: <Favorites /> },
    ]
  }
])

export default function App() { return <RouterProvider router={router} /> }