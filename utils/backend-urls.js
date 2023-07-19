const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export const BACKEND_URLS = {
  cities: BACKEND_URL + '/cities',
  vehicles: BACKEND_URL + '/vehicles',
  clients: BACKEND_URL + '/clients',
  vehicleModels: BACKEND_URL + '/vehicle-models',
  activities: BACKEND_URL + '/activities'
}