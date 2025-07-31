'use client';

import { PageLayout } from '@/components/layout';
import { MissionStatement, ConventionFocus, ConventionHistory, TeamSection } from '@/components/about';

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              About ConventionHub
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our passion for bringing together the TCG and sports card community
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <MissionStatement />

      {/* Convention Focus */}
      <ConventionFocus />

      {/* Convention History */}
      <ConventionHistory />

      {/* Team Section */}
      <TeamSection />
    </PageLayout>
  );
}