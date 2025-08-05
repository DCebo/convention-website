const TeamSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl mb-4">👨‍💼</div>
            <h3 className="text-xl font-semibold mb-2">Event Director</h3>
            <p className="text-gray-600">Leading the convention experience</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Vendor Relations</h3>
            <p className="text-gray-600">Connecting with amazing vendors</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Community Manager</h3>
            <p className="text-gray-600">Building our gaming community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;