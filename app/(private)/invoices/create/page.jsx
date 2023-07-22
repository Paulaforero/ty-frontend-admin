'use client'

import CreationPageView from '@/components/creation-page-view'
import useInvoiceCreationPage from '@/components/invoices/hooks/use invoice-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  useInvoiceCreationPage()

  return (
    <CreationPageView
      title="Factura"
      submitLabel="Crear factura"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
