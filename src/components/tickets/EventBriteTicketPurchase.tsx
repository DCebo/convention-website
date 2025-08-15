'use client'

import React, { useEffect, useState } from 'react'

interface EventbriteCheckoutProps {
  eventId: string
  modalTriggerElementId?: string
}

declare global {
  interface Window {
    EBWidgets: {
      createWidget: (config: {
        widgetType: string
        eventId: string
        iframeContainerId: string
        iframeContainerHeight?: number
        onOrderComplete?: () => void
      }) => void
    }
  }
}

const EventbriteCheckout: React.FC<EventbriteCheckoutProps> = ({ eventId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50 // 5 seconds max wait time

    const initializeWidget = () => {
      attempts++
      
      if (window.EBWidgets && typeof window.EBWidgets.createWidget === 'function') {
        try {
          const exampleCallback = function () {
            console.log('Order complete!')
          }

          window.EBWidgets.createWidget({
            // Required
            widgetType: 'checkout',
            eventId: eventId,
            iframeContainerId: `eventbrite-widget-container-${eventId}`,

            // Optional - Using 600px height for compact layout
            iframeContainerHeight: 600, // Widget height in pixels
            onOrderComplete: exampleCallback, // Method called when an order has successfully completed
          })
          
          setIsLoading(false)
          console.log('Eventbrite widget initialized successfully')
        } catch (err) {
          console.error('Error initializing Eventbrite widget:', err)
          setError('Failed to initialize Eventbrite widget')
          setIsLoading(false)
        }
      } else if (attempts < maxAttempts) {
        // If EBWidgets is not loaded yet, wait a bit and try again
        setTimeout(initializeWidget, 100)
      } else {
        console.error('Eventbrite widgets script failed to load after maximum attempts')
        setError('Eventbrite widgets script failed to load. Please refresh the page.')
        setIsLoading(false)
      }
    }

    // Add a small delay to ensure the script has time to load
    const timer = setTimeout(initializeWidget, 500)
    
    return () => clearTimeout(timer)
  }, [eventId])

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading ticket checkout...</span>
        </div>
      )}
      <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div id={`eventbrite-widget-container-${eventId}`} className="min-h-[600px] w-full"></div>
      </div>
    </div>
  )
}

export default EventbriteCheckout
