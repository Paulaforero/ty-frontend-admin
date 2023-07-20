'use client'

import DataPageView from '@/components/data-page-view'
import useProductsDataPage from '@/components/products/hooks/use-products-data-page'
export default function ProductsPage() {
  const { products, columns, handleDelete } = useProductsDataPage()

  return (
    <DataPageView
      title="Productos"
      createButtonLabel="Agregar producto"
      rows={products}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}