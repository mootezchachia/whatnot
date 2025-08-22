import { BehaviorSubject, Subject, type Observable } from "rxjs"

export interface BidEvent {
  auctionId: string
  bidderId: string
  amount: number
  timestamp: Date
  type: "BID_PLACED" | "BID_REJECTED" | "AUCTION_EXTENDED" | "AUCTION_ENDED"
}

export interface AuctionState {
  id: string
  currentBid: number
  highBidderId: string
  endsAt: Date
  isExtended: boolean
  bidCount: number
}

export class AuctionSocketService {
  private socket: WebSocket | null = null
  private connectionStatus = new BehaviorSubject<"connected" | "disconnected" | "connecting">("disconnected")
  private bidEvents = new Subject<BidEvent>()
  private auctionUpdates = new Subject<AuctionState>()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor() {
    this.connect()
  }

  connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) return

    this.connectionStatus.next("connecting")

    // Simulate WebSocket connection for demo purposes
    setTimeout(() => {
      this.connectionStatus.next("connected")
      this.reconnectAttempts = 0
      this.startHeartbeat()
    }, 1000)
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    this.connectionStatus.next("disconnected")
  }

  subscribeToAuction(auctionId: string): void {
    // Simulate subscription to auction events
    console.log(`[v0] Subscribed to auction ${auctionId}`)
  }

  placeBid(auctionId: string, amount: number, bidderId: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate bid placement with validation
      setTimeout(() => {
        const success = Math.random() > 0.1 // 90% success rate

        if (success) {
          this.bidEvents.next({
            auctionId,
            bidderId,
            amount,
            timestamp: new Date(),
            type: "BID_PLACED",
          })

          // Simulate auction state update
          this.auctionUpdates.next({
            id: auctionId,
            currentBid: amount,
            highBidderId: bidderId,
            endsAt: new Date(Date.now() + 300000), // 5 minutes from now
            isExtended: false,
            bidCount: Math.floor(Math.random() * 50) + 1,
          })
        } else {
          this.bidEvents.next({
            auctionId,
            bidderId,
            amount,
            timestamp: new Date(),
            type: "BID_REJECTED",
          })
        }

        resolve(success)
      }, 500)
    })
  }

  getBidEvents(): Observable<BidEvent> {
    return this.bidEvents.asObservable()
  }

  getAuctionUpdates(): Observable<AuctionState> {
    return this.auctionUpdates.asObservable()
  }

  getConnectionStatus(): Observable<"connected" | "disconnected" | "connecting"> {
    return this.connectionStatus.asObservable()
  }

  private startHeartbeat(): void {
    // Simulate heartbeat to maintain connection
    setInterval(() => {
      if (this.connectionStatus.value === "connected") {
        // Send ping message
        console.log("[v0] Heartbeat sent")
      }
    }, 30000)
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`[v0] Reconnection attempt ${this.reconnectAttempts}`)
        this.connect()
      }, Math.pow(2, this.reconnectAttempts) * 1000)
    }
  }

  // Simulate soft extend functionality
  simulateSoftExtend(auctionId: string): void {
    setTimeout(() => {
      this.auctionUpdates.next({
        id: auctionId,
        currentBid: 0,
        highBidderId: "",
        endsAt: new Date(Date.now() + 600000), // Extended by 10 minutes
        isExtended: true,
        bidCount: 0,
      })
    }, 2000)
  }
}

export const auctionSocketService = new AuctionSocketService()
