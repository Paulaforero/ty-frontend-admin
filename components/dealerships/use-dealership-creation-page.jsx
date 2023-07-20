'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDealershipCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    rif: '',
    name: '',
    cityNumber: '',
    stateId: '',
    managerNationalId: '',
  })

  const [citiesList, setCitiesList] = useState([])
  const [staffList, setStaffList] = useState([])

  const fetchCitiesList = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedCitiesList = responseData.data

      setCitiesList(fetchedCitiesList)
    } catch (error) {
      notify({
        message: 'Error obteniendo la lista de ciudades.',
        severity: 'error',
      })
    }
  }, [notify])

  const fetchStaffList = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.staff, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStaffList = responseData.data

      setStaffList(fetchedStaffList)
    } catch (error) {
      notify({
        message: 'Error obteniendo la lista de empleados.',
        severity: 'error',
      })
    }
  }, [notify])

  const createVehicle = async () => {
    try {
      const response = await fetch(BACKEND_URLS.clients, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/clients')

      notify({
        message: '¡Cliente creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el cliente...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Rif',
      name: 'rif',
      type: 'text',
      required: true,
    },
    {
      label: 'Nombre',
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'Ciudad',
      name: 'cityNumber',
      type: 'select',
      required: true,
      options: citiesList.map(city => {
        return {
          label: city.name,
          value: JSON.stringify({ cityNumber: city.cityNumber, stateId: city.stateId }),
        }
      }),
    },
    {
      label: 'Cédula del encargado',
      name: 'managerNationalId',
      type: 'select',
      options: staffList.map(employee => {
        return {
          label: employee.nationalId,
          value: employee.nationalId,
        }
      }),
    },
  ]

  const handleChange = event => {
    if (event.target.name === 'cityNumber') {
      const parsedValues = JSON.parse(event.target.value)
      setFormValues({
        ...formValues,
        ['cityNumber']: parsedValues.cityNumber,
        ['stateId']: parsedValues.stateId,
      })
      console.log(formValues)
    } else {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    createVehicle()
  }

  useEffect(() => {
    fetchCitiesList()
    fetchStaffList()
  }, [fetchCitiesList, fetchStaffList])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
