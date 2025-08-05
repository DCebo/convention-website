const ConventionFocus = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Focus On</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-semibold mb-2">Trading Card Games</h3>
            <p className="text-gray-600">Pokemon, Magic: The Gathering, Yu-Gi-Oh! and more</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚾</div>
            <h3 className="text-xl font-semibold mb-2">Sports Cards</h3>
            <p className="text-gray-600">Baseball, basketball, football, and vintage collections</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Collectibles</h3>
            <p className="text-gray-600">Rare finds, limited editions, and gaming memorabilia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConventionFocus;