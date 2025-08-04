import AboutSection from './AboutSection';

const ConventionFocus = () => {
  return (
    <AboutSection 
      title="Our Convention Focus" 
      backgroundColor="gray"
      textAlign="center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Current Focus Areas</h3>
          
          <div className="bg-primary/10 rounded-xl p-6 shadow-lg">
            <p className="text-lg mb-6 text-center">
              Our conventions currently celebrate two passionate communities that share 
              a love for collecting, strategy, and connection:
            </p>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-3xl">🎴</div>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Trading Card Games (TCG)</h4>
                <p className="text-gray-700 leading-relaxed">
                  From Pokémon and Magic: The Gathering to Yu-Gi-Oh! and beyond, we celebrate 
                  all forms of strategic card gaming. Our tournaments feature multiple formats 
                  and skill levels, ensuring everyone can participate and compete. Join us for 
                  competitive play, casual games, and deck-building workshops.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <div className="text-3xl">⚾</div>
                </div>
                <h4 className="text-xl font-bold text-secondary mb-4">Sports Cards</h4>
                <p className="text-gray-700 leading-relaxed">
                  Whether you collect baseball, basketball, football, or any other sport, 
                  our conventions provide the perfect venue for trading, buying, and 
                  showcasing your prized collections. Connect with fellow collectors, 
                  discover rare finds, and participate in card breaks and auctions.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h6 className="font-bold text-primary mb-2">Our Current Mission</h6>
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    &quot;We are dedicated to creating exceptional experiences for TCG players and sports card 
                    collectors, fostering a community where strategy meets passion, and where every 
                    participant—from beginners to experts—finds their place in our growing family.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-accent mb-6 text-center">Future Expansion Plans</h3>
          
          <div className="bg-accent/10 rounded-xl p-6 shadow-lg">
            <p className="text-lg mb-6 text-center">
              We&apos;re excited to announce our plans to expand Collect-It-Con to include 
              even more communities and interests:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-2xl">🎭</div>
                </div>
                <h5 className="font-bold text-primary mb-2">Actors & Voice Actors</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Meet your favorite stars and voice talents from anime, games, and entertainment
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-2xl">🎨</div>
                </div>
                <h5 className="font-bold text-primary mb-2">Hobbyists & Creators</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Showcase crafts, art, and creative projects from talented community members
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <div className="text-2xl">🎮</div>
                </div>
                <h5 className="font-bold text-primary mb-2">Gaming Communities</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Board games, video games, tabletop RPGs, and more gaming experiences
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border-l-4 border-accent">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💭</div>
                <div>
                  <h6 className="font-bold text-primary mb-2">Our Expansion Vision</h6>
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    &quot;We envision Collect-It-Con as a multi-faceted convention experience that brings 
                    together diverse communities under one roof, fostering new connections and 
                    shared experiences across different interests and hobbies. Each expansion 
                    strengthens our core mission of building inclusive, passionate communities.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default ConventionFocus;