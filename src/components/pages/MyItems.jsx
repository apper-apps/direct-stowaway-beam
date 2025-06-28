import ItemGrid from '@/components/organisms/ItemGrid'

const MyItems = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Items</h1>
          <p className="text-gray-600 mt-1">Browse and manage your stored items</p>
        </div>
      </div>
      
      <ItemGrid />
    </div>
  )
}

export default MyItems