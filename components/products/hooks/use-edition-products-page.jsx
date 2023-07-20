'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useProductsEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
    name: '',
    description : '',
    isEcologic : '',
    supplyLineId : '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const [supplyLine, setSupplyLine]= useState([])
  
  const fetchSupplyLine = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.supplyLines, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedSupplyLine= responseData.data

      setSupplyLine(fetchedSupplyLine)
    } catch (error) {
      notify({
        message: 'Error obteniendo las lineas de suministro',
        severity: 'error',
      })
    }
  }, [notify])

  const inputs = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'name',
      required: true,
    },
    {
      label: 'Linea de suministro (ID)',
      type: 'select',
      options: supplyLine.map(supplyLine => ({
        label: supplyLine.name,
        value: supplyLine.id,
      })),
      name: 'supplyLineId',
      required: true,
    },
    {
        label: 'Descripción',
        type: 'text',
        name: 'description',
        required: true,
      },
      {
      type: 'select',
      options: [
        {
          label: 'Verdadero',
          value: true,
        },
        {
          label: 'Falso',
          value: false,
        },
      ],
      name: 'isEcologic',
      label: 'Es ecológico',
      required: true,
    }
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const fetchProductData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.products}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedProductData = responseData.data

      setFormValues(fetchedProductData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del producto.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  const editProduct = async () => {
    try {
      const { id, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.products}?id=${id}`,
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
        message: '¡Se ha editado el producto exitosamente!',
        severity: 'success',
      })

      router.push('/products')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el producto.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editProduct()
  }

  useEffect(() => {
    fetchProductData(),
    fetchSupplyLine()
  }, [fetchProductData, fetchSupplyLine])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id,
  }
}
