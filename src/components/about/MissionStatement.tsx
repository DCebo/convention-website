import AboutSection from './AboutSection';

const MissionStatement = () => {
  return (
    <AboutSection 
      title="Our Mission" 
      backgroundColor="white"
      textAlign="center"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-xl leading-relaxed mb-6">
          At ConventionHub, our mission is to create the ultimate gathering place for 
          <span className="font-bold text-primary"> Trading Card Game (TCG)</span> enthusiasts and 
          <span className="font-bold text-secondary"> sports card collectors</span>. 
          We believe in fostering a vibrant community where passion meets competition, 
          and friendships are forged over shared interests.
        </p>
        
        <p className="text-lg leading-relaxed mb-6">
          We are dedicated to providing exceptional experiences that celebrate the artistry, 
          strategy, and collecting culture that makes our community so special. Whether you&apos;re 
          a seasoned tournament player, a casual collector, or someone just discovering the 
          world of cards, ConventionHub is your home.
        </p>

        <div className="bg-primary/10 rounded-2xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-bold text-primary mb-1">Community</h4>
              <p className="text-sm">Building lasting connections and friendships through shared passion</p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-12 bg-primary/20"></div>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold text-primary mb-1">Excellence</h4>
              <p className="text-sm">Delivering high-quality events and unforgettable experiences</p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-12 bg-primary/20"></div>
            </div>
            <div>
              <div className="text-3xl mb-2">🌟</div>
              <h4 className="font-bold text-primary mb-1">Inclusivity</h4>
              <p className="text-sm">Welcoming players and collectors of all skill levels and backgrounds</p>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default MissionStatement;