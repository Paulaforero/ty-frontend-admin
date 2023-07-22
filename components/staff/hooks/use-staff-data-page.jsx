'use client'

import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useStaffDataPage() {
  const notify = useSnackbar()

  const [staff, setStaff] = useState([])

  const columns = {
    nationalId: 'Cédula',
    fullName: 'Nombre',
    mainPhoneNo: 'Tlf. Principal',
    secondaryPhoneNo: 'Tlf. Secundario',
    email: 'Correo electrónico',
    address: 'Dirección',
    roleId: 'Rol (ID)',
    salary: 'Salario',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'national-id': row.nationalId },
      }
    })

  const fetchStaff = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.staff, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStaff = responseData.data
      const formattedStaff = addIdAttrsObjectToEachRow(fetchedStaff)

      setStaff(formattedStaff)
    } catch (error) {
      notify({
        message: 'Error obteniendo los empleados.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({ 'national-id': nationalId }) => {
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
        message: '¡Se ha eliminado al empleado exitosamente!',
        severity: 'success',
      })

      fetchStaff()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el empleado.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [fetchStaff])

  return { staff, columns, handleDelete }
}
