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
import { ApolloProvider } from "@apollo/client"
import { client } from './utils/apolloClient.ts'
import ReactDOM from 'react-dom'
import React from 'react'

const router = createBrowserRouter([
  {
    path:'/',
    element:  <ProtectedRoutes>
                <Feed /> 
              </ProtectedRoutes>
  },
  {
    path: '/profile/:id',
    element:  <ProtectedRoutes>
              <Profile />
              </ProtectedRoutes>
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
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />

      <App />
    </ApolloProvider>
  </React.StrictMode>
)

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <ApolloProvider client={client}>
//       <RouterProvider router={router} />
//       <App />
//     </ApolloProvider>
//   </StrictMode>
// )
