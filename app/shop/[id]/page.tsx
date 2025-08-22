import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { ProductReviews } from "@/components/product-reviews"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <ProductDetail productId={params.id} />
      <div className="container mx-auto px-4 py-6">
        <ProductReviews productId={params.id} />
        <RelatedProducts productId={params.id} />
      </div>
    </div>
  )
}
