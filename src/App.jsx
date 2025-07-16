import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
  Outlet,
  Link
} from '@tanstack/react-router'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Post from './pages/Post/Post'
import { usePosts } from './hooks/usePosts'
import './App.css'

// Root component that provides posts data
function RootComponent() {
  const { posts, loading, error } = usePosts()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6b7280'
      }}>
        Loading posts...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#dc2626'
      }}>
        Error loading posts: {error}
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Outlet context={{ posts }} />
      </main>
      <Footer />
    </div>
  )
}

// Create the root route
const rootRoute = new RootRoute({
  component: RootComponent
})

// Create the home route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function IndexComponent() {
    const context = rootRoute.useRouteContext()
    return <Home posts={context.posts} />
  }
})

// Create the post route
const postRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/post/$slug',
  component: function PostComponent() {
    const context = rootRoute.useRouteContext()
    return <Post posts={context.posts} />
  }
})

// Create the router
const routeTree = rootRoute.addChildren([indexRoute, postRoute])
const router = new Router({ routeTree })

function App() {
  return <RouterProvider router={router} />
}

export default App
