alright
— here’s a clean, dev-ready breakdown of everything that makes Whatnot special, plus a pragmatic blueprint (
with code) to
clone
the
core
experience
with Angular + Spring Boot.

\
---

# What makes Whatnot “wow”

### 1) Live + “Anytime” auctions in one marketplace

* Two auction modes: **Live Auctions** (inside a livestream) and **Anytime Auctions** (run without a live show). Buyers can filter by “Buy Format” to discover both. ([Whatnot Help Center][1])
\
* Sellers can **pre-create auctions**
when
they
go
live
those
auctions
automatically
appear in the
live
store
and
can
be **pinned**
for bidding on-stream; supports **extended bidding**
. ([Whatnot Help Center][2])
\
* **Auction rules** reduce shill bidding (e.g., “no bidding up prices”
obvious
input
errors
can
be
corrected
). ([Whatnot Help Center][3])

### 2) Livestreaming that’s sales-centric

\
* Native live shows
with **OBS/desktop support**, **screen
sharing**, and
a
dedicated
“Going Live” help suite
for sellers. ([Whatnot Help Center][4])
\
* **Co-hosting** lets two sellers
share
a
screen
and
audience
moderators
and
seller
commands (/announce, etc.) streamline show management. ([Reddit][5], [Whatnot Help Center][6])
\
* **Multicasting**: broadcast your Whatnot live directly to **YouTube, Facebook, or Twitch** (iOS/desktop) to grow reach. ([Whatnot Help Center][7])

\
### 3)
Engagement
mechanics
that
convert
\

\
* **Giveaways** (standard + buyer-appreciation), visible in-show
with a five-minute
entry
window
winners
drawn
automatically
shipping
responsibilities
depend
on
type. ([Whatnot Help Center][8])
\
* **Seller & moderator commands**, pinned items, show management tools, etc., all optimized to reduce friction during sales. ([Whatnot Help Center][6])

### 4) Payments that match mobile behavior

\
* Apple Pay, Google Pay, PayPal, Venmo, cards, iDEAL, plus **Buy Now, Pay Later** (Klarna/Affirm)
for BIN purchases. ([Whatnot Help Center][9])

\
#
#
#
5
) Shipping that encourages bigger baskets

\
* **Smart Bundling™** + **combined shipping**: buyers pay a capped first-shipment price and often add more items at low/no extra cost up to weight thresholds
sellers
can
also ** offer
free / discounted
shipping**
. ([Whatnot Help Center][10])
\
* Built-in **label generation** + BYOL (Bring Your Own Label) option in supported locations
clear
label
troubleshooting
guides. ([Whatnot Help Center][11])

\
### 6) Trust, support, and policy UX

\
* **Buyer Protection Policy** spells out coverage and refunds
dedicated
buyer
support
flows. ([Whatnot Help Center][12])

\
### 7) Fees tuned by category & value

\
* Baseline model: platform commission + payment processing
**category reductions** (e.g., Electronics 5%), **promotions by region/time**, and **reduced commission above \$1,500** on select categories. ([Whatnot Help Center][13])

### 8) Ecosystem/API
for pro sellers

\
* **OAuth + webhooks** in the dev
preview
Seller
API
announced
to
sync
inventory
and
operations. ([Whatnot Developers][14], [Value Added Resource][15])

\
---

\
# How to clone the experience (Angular + Spring Boot)

Below is a minimalist, production-minded slice that covers: live shows, auctions, bids, giveaways, orders, shipping, and payments scaffolding. It’s intentionally modular so you can grow it into a full platform.

## High-level architecture

* **Client (Angular)**

  * Feature modules: `live`, `auctions`, `store`, `checkout`, `profile`, `moderation`.
\
  * Real-time: STOMP/WebSocket
for bids, timers, chat; HTTP for catalog/search/profile.
\
  * Video
: WebRTC
for host → viewers;
RTMP
ingest (via OBS)
→ media server → HLS
for scale.
\
* **Backend (Spring Boot)**

\
  * Services
: Identity, Livestream, Auction, Bidding, Orders, Payments, Shipping, Messaging, Giveaway, Webhook.
\
  * **PostgreSQL**
for transactional data; **Redis** for locks, rate limits, and live counters.
\
  * **Kafka (or RabbitMQ)**
for events
: `BidPlaced`, \`AuctionExtended\`, \`GiveawayStarted/WinnerDrawn`, `OrderPaid`, `LabelGenerated`.
  * **Object storage** (S3 compatible/MinIO)
for assets.
  * **Stripe/PayPal** adapters; **Shippo/EasyPost** adapters; **OpenID Connect**
for auth (Keycloak/Cloud IdP).
* **Media**

  * RTMP ingest (Nginx-RTMP/MediaMTX) → HLS/DASH
CDN
or
WebRTC
SFU(Janus / mediasoup)
for low latency and multi-guest.

#
#
Core
data
model(essentials)
