import { AuctionDetail } from "@/components/auction-detail"
import { BidHistory } from "@/components/bid-history"
import { RelatedAuctions } from "@/components/related-auctions"

interface AuctionPageProps {
  params: {
    id: string
  }
}

export default function AuctionPage({ params }: AuctionPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <AuctionDetail auctionId={params.id} />
      <div className="container mx-auto px-4 py-6">
        <BidHistory auctionId={params.id} />
        <RelatedAuctions auctionId={params.id} />
      </div>
    </div>
  )
}
