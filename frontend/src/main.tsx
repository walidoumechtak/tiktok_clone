import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Feed from './pages/Feed.tsx'
import Profile from './pages/Profile.tsx'
import Upload from './pages/Upload.tsx'
import Post from './pages/Post.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'

const route = createBrowserRouter([
  {
    path:'/',
    element:  <ProtectedRoutes>
                <Feed /> 
              </ProtectedRoutes>
  },
  {
    path: '/profile/:id',
    element:  <Profile />
  },
  {
    path: '/upload',
    element:  <ProtectedRoutes>
                <Upload />
              </ProtectedRoutes>
  },
  {
    path: '/post/:id',
    element:  <Post />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
    <App />
  </StrictMode>,
)
