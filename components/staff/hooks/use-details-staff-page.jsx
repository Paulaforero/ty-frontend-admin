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
    mainPhoneNo: '',
    secondaryPhoneNo: '',
    email: '',
    address: '',
    roleId: '',
    salary: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Nombre completo',
        value: employeeData.fullName,
      },
      {
        label: 'Telefono principal',
        value: employeeData.mainPhoneNo,
      },
      {
        label: 'Telefono secundario',
        value: employeeData.secondaryPhoneNo,
      },
      {
        label: 'Email',
        value: employeeData.email,
      },
      {
        label: 'Dirección',
        value: employeeData.address,
      },
      {
        label: 'Cargo (ID)',
        value: employeeData.roleId,
      },
      {
        label: 'Salario',
        value: employeeData.salary,
      },
    ],
    [employeeData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.staff}?national-id=${nationalId}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡El empleado se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/staff')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar al empleado.',
        severity: 'error',
      })
    }
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
      setEmployeeData(fetchedEmployeeData)
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

  return {
    rows,
    employeeData,
    handleDelete,
    isLoading,
    id: nationalId,
  }
}
