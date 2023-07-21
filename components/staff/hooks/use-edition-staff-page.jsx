'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useEmployeeEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const nationalId = searchParams.get('national-id')

  const [formValues, setFormValues] = useState({
    fullName: '',
    mainPhoneNo:'',
    secondaryPhoneNo: '',
    email:'',
    address: '',
    roleId: '',
    salary: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [roles, setRoles] = useState([])

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
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

  const fetchEmployeeData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.staff}/view?national-id=${nationalId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedEmployeeData = responseData.data

      setFormValues(fetchedEmployeeData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del empleado.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, nationalId])

  useEffect(() => {
    fetchEmployeeData()
  }, [fetchEmployeeData])

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

  const editEmployee = async () => {
    try {
      const { nationalId, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.staff}?national-id=${nationalId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toEditValues),
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado el empleado exitosamente!',
        severity: 'success',
      })

      router.push('/staff')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el empleado.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editEmployee()
  }

  useEffect(() => {
    fetchEmployeeData()
    fetchRoles()

  }, [fetchEmployeeData, fetchRoles ])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, nationalId,
  }
}
