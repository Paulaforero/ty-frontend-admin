'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useEmployeeCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    nationalId: '',
    fullName: '',
    mainPhoneNo: '',
    secondaryPhoneNo: '',
    email: '',
    address: '',
    roleId: '',
    salary: '',
  })
  const [roles, setRoles] = useState([])

  const createEmployee = async () => {
    try {
      const response = await fetch(BACKEND_URLS.staff, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/staff')

      notify({
        message: '¡Empleado creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el empleado...',
        severity: 'error',
      })
    }
  }

  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.roles, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedRoles = responseData.data

      setRoles(fetchedRoles)
    } catch (error) {
      notify({
        message: 'Error obteniendo los cargos',
        severity: 'error',
      })
    }
  }, [notify])

  const inputs = [
    {
      label: 'Cedula',
      type: 'text',
      name: 'nationalId',
      required: true,
    },
    {
      label: 'Nombre completo',
      type: 'text',
      name: 'fullName',
      required: true,
    },
    {
      label: 'Teléfono principal',
      type: 'text',
      name: 'mainPhoneNo ',
      required: true,
    },
    {
      label: 'Teléfono secundario',
      type: 'text',
      name: 'secondaryPhoneNo',
      required: true,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      required: true,
    },
    {
      label: 'Dirección',
      type: 'text',
      name: 'address',
      required: true,
    },
    {
      label: 'Cargo',
      type: 'select',
      options: roles.map(roles => ({
        label: roles.name,
        value: roles.id,
      })),
      name: 'roleId',
      required: true,
    },
    {
      label: 'Salario',
      type: 'number',
      name: 'salary',
      required: true,
      adornment: '$',
      min: 0,
    },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue

    if (name === 'salary') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createEmployee()
  }

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
