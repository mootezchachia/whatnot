import { AuctionGrid } from "@/components/auction-grid"
import { AuctionFilters } from "@/components/auction-filters"
import { AuctionHeader } from "@/components/auction-header"

export default function AuctionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AuctionHeader />
      <div className="container mx-auto px-4 py-6">
        <AuctionFilters />
        <AuctionGrid />
      </div>
    </div>
  )
}
