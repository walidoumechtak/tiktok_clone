import { useState } from 'react'
import AuthModal from './components/AuthModal'
import { useGeneralStore } from './stores/generalStore'
import EditProfileModal from './components/EditProfileModal'


function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen)
  const isEditProfileOpen = useGeneralStore((state) => state.isEditProfileOpen)
  return (
    <div>
      {
        isLoginOpen && <AuthModal />
      }
      {
        isEditProfileOpen && <EditProfileModal />
      }
    </div>
  )
}

export default App
