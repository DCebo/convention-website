import { PageLayout } from '@/components/layout';

export default function ArtShowPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-accent rounded-full flex items-center justify-center">
              <div className="text-4xl">🖼️</div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-primary mb-4">Art Show</h1>
          
          {/* Coming Soon Message */}
          <div className="bg-card-bg border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">To Be Announced</h2>
            <p className="text-lg text-gray-600 mb-6">
              Prepare to be amazed by our upcoming art show! We&apos;re organizing a spectacular display of 
              artwork from talented artists in the gaming and collectibles community.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-accent/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Coming Soon</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-accent mr-2">🖼️</span>
                  Curated art exhibitions and galleries
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🖼️</span>
                  Featured artists and their collections
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🖼️</span>
                  Art sales and auction opportunities
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">🖼️</span>
                  Interactive art experiences and workshops
                </li>
              </ul>
            </div>
          </div>

          {/* Stay Updated */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Be among the first to see our art show announcements! Follow us to stay informed about participating artists and featured works.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Follow on Facebook
              </a>
              <a
                href="#"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}