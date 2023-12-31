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
  activities: BACKEND_URL + '/activities',
  products: BACKEND_URL + '/products',
  services: BACKEND_URL + '/services',
  roles: BACKEND_URL + '/roles',
  discounts: BACKEND_URL + '/discounts',
  activitiesPrices: BACKEND_URL + '/activities-prices',
  invoices: BACKEND_URL + '/invoices',
  orders: BACKEND_URL + '/orders',
  payments: BACKEND_URL + '/payments'
}
