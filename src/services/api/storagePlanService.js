import mockPlans from '@/services/mockData/storagePlans.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const storagePlanService = {
  async getAll() {
    await delay(200)
    return [...mockPlans]
  },

  async getById(id) {
    await delay(200)
    const plan = mockPlans.find(plan => plan.Id === id)
    if (!plan) {
      throw new Error('Storage plan not found')
    }
    return { ...plan }
  },

  async create(planData) {
    await delay(400)
    const newPlan = {
      ...planData,
      Id: Math.max(...mockPlans.map(p => p.Id)) + 1
    }
    mockPlans.push(newPlan)
    return { ...newPlan }
  },

  async update(id, planData) {
    await delay(350)
    const index = mockPlans.findIndex(plan => plan.Id === id)
    if (index === -1) {
      throw new Error('Storage plan not found')
    }
    mockPlans[index] = { ...mockPlans[index], ...planData }
    return { ...mockPlans[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockPlans.findIndex(plan => plan.Id === id)
    if (index === -1) {
      throw new Error('Storage plan not found')
    }
    const deletedPlan = mockPlans.splice(index, 1)[0]
    return { ...deletedPlan }
  }
}