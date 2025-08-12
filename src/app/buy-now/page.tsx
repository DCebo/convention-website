import PageLayout from '@/components/layout/PageLayout'
import EventbriteCheckout from '@/components/tickets/EventBriteTicketPurchase'

export default function BuyNowPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Get Your Convention Passes
            </h1>
            <p className="text-lg text-gray-600">
              Choose from our available pass types and secure your spot at the
              convention
            </p>
          </div>

          <EventbriteCheckout eventId="1445387455789" />
        </div>
      </div>
    </PageLayout>
  )
}
