import AboutSection from './AboutSection';

const ConventionHistory = () => {
  return (
    <AboutSection 
      title="Our Story & Vision" 
      backgroundColor="primary"
      textAlign="center"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* History Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">Our History</h3>
            
            <div className="space-y-6 text-left flex-1">
              <div className="border-l-4 border-primary pl-6">
                <h4 className="text-lg font-bold text-primary mb-2">2019 - The Beginning</h4>
                <p className="text-gray-700">
                  Collect-It-Con was born from a simple idea: create a space where TCG and sports card 
                  enthusiasts could come together to share their passion. Our founders, a group of 
                  dedicated collectors and players, organized the first small gathering in a local 
                  community center with just 50 attendees.
                </p>
              </div>
              
              <div className="border-l-4 border-secondary pl-6">
                <h4 className="text-lg font-bold text-secondary mb-2">2020-2021 - Growing Community</h4>
                <p className="text-gray-700">
                  Despite global challenges, we adapted and grew our community through virtual events 
                  and smaller, safe gatherings. We learned the importance of flexibility and 
                  community support, which strengthened our resolve to create inclusive experiences.
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-6">
                <h4 className="text-lg font-bold text-accent mb-2">2022-Present - Expansion Era</h4>
                <p className="text-gray-700">
                  With our community now spanning hundreds of members, we&apos;ve expanded to larger 
                  venues and more diverse programming. Our conventions now feature multiple tournament 
                  formats, vendor halls, and educational workshops for collectors of all levels.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">Our Vision</h3>
            
            <div className="text-left space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-3">Building Bridges</h4>
                <p className="text-gray-700">
                  We envision Collect-It-Con as more than just a convention—it&apos;s a bridge connecting 
                  diverse communities. From seasoned tournament players to casual collectors, from 
                  young enthusiasts to veteran hobbyists, we create spaces where everyone belongs.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6">
                <h4 className="text-xl font-bold text-secondary mb-3">Innovation & Growth</h4>
                <p className="text-gray-700">
                  As we look to the future, we&apos;re committed to innovation in how we serve our 
                  community. This includes embracing new technologies, expanding into related 
                  entertainment sectors, and continuously improving the convention experience.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6">
                <h4 className="text-xl font-bold text-accent mb-3">Legacy of Connection</h4>
                <p className="text-gray-700">
                  Our ultimate vision is to leave a lasting legacy—a thriving ecosystem where 
                  friendships are formed, skills are developed, and the joy of collecting and 
                  playing brings people together across all boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Be Part of Our Story</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            Every convention, every tournament, every connection made is part of our growing story. 
            Join us as we continue to build something special together—a community that celebrates 
            the passion, strategy, and joy that cards bring to our lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/buy-now" 
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center w-full sm:w-auto"
            >
              Join Our Next Event
            </a>
            <a 
              href="/participate/volunteer" 
              className="bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 inline-block text-center w-full sm:w-auto"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default ConventionHistory;