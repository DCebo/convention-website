import { ReactNode } from 'react';

interface AboutSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  backgroundColor?: 'white' | 'gray' | 'primary';
  textAlign?: 'left' | 'center';
}

const AboutSection = ({ 
  title, 
  children, 
  className = '', 
  backgroundColor = 'white',
  textAlign = 'left'
}: AboutSectionProps) => {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    primary: 'bg-primary/5'
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center'
  };

  return (
    <section className={`py-16 ${bgClasses[backgroundColor]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={textAlignClasses[textAlign]}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            {title}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;