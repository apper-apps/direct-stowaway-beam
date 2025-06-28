import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import MyItems from '@/components/pages/MyItems'
import Schedule from '@/components/pages/Schedule'
import StoragePlans from '@/components/pages/StoragePlans'
import Account from '@/components/pages/Account'
import ItemDetail from '@/components/pages/ItemDetail'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="items" element={<MyItems />} />
          <Route path="items/:id" element={<ItemDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="plans" element={<StoragePlans />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
    </div>
  )
}

export default App