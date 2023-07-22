
'use client'

import CreationPageView from '@/components/creation-page-view'
import useDiscountCreationPage from '@/components/discounts/hooks/use-discount-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  useDiscountCreationPage()

  return (
    <CreationPageView
      title="Descuento"
      submitLabel="Crear descuento"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}