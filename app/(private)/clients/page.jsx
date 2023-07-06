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

  const filters = [
    {
      label: 'Filtar por ciudad',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
    {
      label: 'Filtrar por manager',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
  ]

  return (
    <DataPageView
      title="Clientes"
      createButtonLabel="Agregar clientes"
      columns={columns}
      rows={clients}
    />
  )
}
