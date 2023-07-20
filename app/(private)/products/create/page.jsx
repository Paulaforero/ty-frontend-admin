'use client'

import CreationPageView from '@/components/creation-page-view'
import useProductCreationPage from '@/components/products/hooks/use-creation-products-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  useProductCreationPage()

  return (
    <CreationPageView
      title="Producto"
      submitLabel="Crear producto"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}