import mockPickups from '@/services/mockData/pickups.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const pickupService = {
  async getAll() {
    await delay(250)
    return [...mockPickups]
  },

  async getById(id) {
    await delay(200)
    const pickup = mockPickups.find(pickup => pickup.Id === id)
    if (!pickup) {
      throw new Error('Pickup not found')
    }
    return { ...pickup }
  },

  async create(pickupData) {
    await delay(400)
    const newPickup = {
      ...pickupData,
      Id: Math.max(...mockPickups.map(p => p.Id)) + 1
    }
    mockPickups.push(newPickup)
    return { ...newPickup }
  },

  async update(id, pickupData) {
    await delay(350)
    const index = mockPickups.findIndex(pickup => pickup.Id === id)
    if (index === -1) {
      throw new Error('Pickup not found')
    }
    mockPickups[index] = { ...mockPickups[index], ...pickupData }
    return { ...mockPickups[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockPickups.findIndex(pickup => pickup.Id === id)
    if (index === -1) {
      throw new Error('Pickup not found')
    }
    const deletedPickup = mockPickups.splice(index, 1)[0]
    return { ...deletedPickup }
  }
}