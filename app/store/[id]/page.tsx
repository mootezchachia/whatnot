import { StoreProfile } from "@/components/store-profile"
import { StoreProducts } from "@/components/store-products"
import { StoreReviews } from "@/components/store-reviews"

interface StorePageProps {
  params: {
    id: string
  }
}

export default function StorePage({ params }: StorePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <StoreProfile storeId={params.id} />
      <div className="container mx-auto px-4 py-6">
        <StoreProducts storeId={params.id} />
        <StoreReviews storeId={params.id} />
      </div>
    </div>
  )
}
