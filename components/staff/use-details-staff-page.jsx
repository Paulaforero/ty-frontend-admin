'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useEmployeeDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const nationalId = searchParams.get('national-id')

  const [employeeData, setEmployeeData] = useState({
    nationalId: '',
    fullName: '',
    mainPhoneNo:'',
    secondaryPhoneNo: '',
    email:'',
    address: '',
    roleId: '',
    salary: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Nombre completo',
        value: EmployeeData.fullName,
      },
      {
        label: 'Telefono principal',
        value: EmployeeData.mainPhoneNo,
      },
      {
        label: 'Telefono secundario',
        value: EmployeeData.secondaryPhoneNo,
      },
      {
        label: 'Email',
        value: EmployeeData.email,
      },
      {
        label: 'Dirección',
        value: EmployeeData.address,
      },
      {
        label: 'Cargo (ID',
        value: EmployeeData.roleId,
      },
      {
        label: 'Salario',
        value: EmployeeData.salary,
      },
    ],
    [EmployeeData]
  )

  const handleSubmit = e => {
    e.preventDefault()
    editEmployee()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.cities}?Employee-number=${EmployeeNumber}&state-id=${stateId}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡La ciudad se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/cities')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la ciudad.',
        severity: 'error',
      })
    }
  }

  const fetchEmployeeData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.cities}/view?Employee-number=${EmployeeNumber}&state-id=${stateId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedEmployeeData = responseData.data
      setEmployeeData(fetchedEmployeeData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la ciudad.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, EmployeeNumber, stateId])

  useEffect(() => {
    fetchEmployeeData()
  }, [fetchEmployeeData])

  return {
    rows,
    EmployeeData,
    handleDelete,
    isLoading,
    name: EmployeeData.name,
    EmployeeNumber: EmployeeData.EmployeeNumber,
  }
}
