import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { SearchHeader } from "@/components/search-header"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <div className="container mx-auto px-4 py-6">
        <ProductFilters />
        <ProductGrid />
      </div>
    </div>
  )
}
