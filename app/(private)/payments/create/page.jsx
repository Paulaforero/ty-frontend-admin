'use client'

import CreationPageView from '@/components/creation-page-view'
import usePaymentCreationPage from '@/components/payments/hooks/use-payment-cration-page'


export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  usePaymentCreationPage()

  return (
    <CreationPageView
      title="Pago"
      submitLabel="Crear pago"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

