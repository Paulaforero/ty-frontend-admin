'use client'

import DataPageView from '@/components/data-page/data-page-view'
import { clients } from '@/mock/clients'

export default function DealershipsPage() {
  const columns = {
    national_id: 'Cedula',
    full_name: 'Nombre completo',
    main_phone_no: 'Telefono principal',
    secondary_phone_no: 'Telefono secundario',
    email: 'Correo electronico',
  }
  
  return (
    <DataPageView
      title="Clientes"
      createButtonLabel="Agregar clientes"
      columns={columns}
      rows={clients}
    />
  )
}
