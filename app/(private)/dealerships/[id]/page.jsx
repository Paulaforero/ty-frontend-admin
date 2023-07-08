'use client'

import EditPageView from '@/components/edition-page-view'

export default function EditPage() {
   const dealership = {
      rif: 'J-123456789',
      name: 'Concesionaria A',
      city_id: 1,
      manager_id: 'M-987654321',
    }
   return <EditPageView />
}
