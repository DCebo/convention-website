import AboutSection from './AboutSection';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  emoji: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Convention Director",
    bio: "With over 10 years of experience in event management and a lifelong passion for TCGs, Alex leads our team with vision and dedication to creating unforgettable experiences.",
    emoji: "🎯"
  },
  {
    name: "Sarah Martinez",
    role: "Tournament Coordinator",
    bio: "A former professional TCG player and certified judge, Sarah ensures our tournaments run smoothly and fairly for competitors of all skill levels.",
    emoji: "🏆"
  },
  {
    name: "Mike Johnson",
    role: "Vendor Relations Manager",
    bio: "Mike brings extensive retail experience and deep knowledge of the sports card market, helping us curate the best vendors and dealers for our events.",
    emoji: "🤝"
  },
  {
    name: "Emily Rodriguez",
    role: "Community Outreach Specialist",
    bio: "Emily is passionate about building inclusive communities and ensuring every attendee feels welcome, regardless of their experience level or background.",
    emoji: "🌟"
  }
];

const TeamSection = () => {
  return (
    <AboutSection 
      title="Meet Our Team" 
      backgroundColor="white"
      textAlign="center"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xl text-center mb-12 text-gray-700">
          Our dedicated team of passionate organizers and community builders work tirelessly 
          to create exceptional convention experiences for everyone.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 text-center">
              <div className="mb-4">
                {member.image ? (
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <Image 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="text-4xl">{member.emoji}</div>
                  </div>
                )}
                <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                <p className="text-secondary font-medium">{member.role}</p>
              </div>
              <p className="text-gray-700 leading-relaxed text-left">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Join Our Team</h3>
          <p className="text-lg text-gray-700 mb-6">
            We&apos;re always looking for passionate volunteers and team members who share our 
            vision of creating amazing convention experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/participate/volunteer" 
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center w-full sm:w-52"
            >
              Volunteer
            </a>
            <a 
              href="/contact" 
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center w-full sm:w-52"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default TeamSection;