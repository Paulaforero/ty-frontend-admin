const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export const BACKEND_URLS = {
  cities: BACKEND_URL + '/cities',
  states: BACKEND_URL + '/states',
  staff: BACKEND_URL + '/staff',
  dealerships: BACKEND_URL + '/dealerships',
  vehicles: BACKEND_URL + '/vehicles',
  clients: BACKEND_URL + '/clients',
  supplyLines: BACKEND_URL + '/supply-lines',
  vehicleModels: BACKEND_URL + '/vehicle-models',
  activities: BACKEND_URL + '/activities'
}
