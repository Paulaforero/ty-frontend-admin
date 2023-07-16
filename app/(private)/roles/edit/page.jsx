'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useRoleEditionPage from '@/components/roles/use-role-edition-page'
export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = useRoleEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Cargo"
          submitLabel="Guardar cargo"
          id={`#${id}`}
          inputs={inputs}
          values={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
