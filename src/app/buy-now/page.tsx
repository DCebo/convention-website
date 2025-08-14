import PageLayout from '@/components/layout/PageLayout'
import EventbriteCheckout from '@/components/tickets/EventBriteTicketPurchase'

export default function BuyNowPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Get Your Convention Passes
            </h1>
            <p className="text-base sm:text-lg text-gray-600 px-2">
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
