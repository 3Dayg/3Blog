import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
  Outlet
} from '@tanstack/react-router'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Post from './pages/Post/Post'
import { PostsProvider } from './contexts/PostsContext'
import './App.css'

// Root component that provides the layout
function RootComponent() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

// Create the root route OUTSIDE of components
const rootRoute = new RootRoute({
  component: RootComponent
})

// Create the home route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function IndexComponent() {
    console.log('🏡 Home route - rendering')
    return <Home />
  }
})

// Create the post route
const postRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/post/$slug',
  component: function PostComponent() {
    console.log('📄 Post route - rendering')
    return <Post />
  }
})

// Create the router tree OUTSIDE of components
const routeTree = rootRoute.addChildren([indexRoute, postRoute])

// Create the router instance OUTSIDE of components
const router = new Router({ routeTree })

// Main App component
function App() {
  return (
    <PostsProvider>
      <RouterProvider router={router} />
    </PostsProvider>
  )
}

export default App
