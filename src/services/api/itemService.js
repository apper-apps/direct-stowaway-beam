import mockItems from '@/services/mockData/items.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const itemService = {
  async getAll() {
    await delay(300)
    return [...mockItems]
  },

  async getById(id) {
    await delay(200)
    const item = mockItems.find(item => item.Id === id)
    if (!item) {
      throw new Error('Item not found')
    }
    return { ...item }
  },

  async create(itemData) {
    await delay(400)
    const newItem = {
      ...itemData,
      Id: Math.max(...mockItems.map(i => i.Id)) + 1,
      storedDate: new Date().toISOString().split('T')[0],
      status: 'scheduled'
    }
    mockItems.push(newItem)
    return { ...newItem }
  },

  async update(id, itemData) {
    await delay(350)
    const index = mockItems.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Item not found')
    }
    mockItems[index] = { ...mockItems[index], ...itemData }
    return { ...mockItems[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockItems.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Item not found')
    }
    const deletedItem = mockItems.splice(index, 1)[0]
    return { ...deletedItem }
  }
}