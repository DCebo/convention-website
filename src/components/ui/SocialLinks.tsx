import { getSocialLinks } from '@/config/socialLinks';

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  linkClassName?: string;
}

const SocialLinks = ({ 
  className = "flex items-center space-x-3", 
  iconSize = "h-4 w-4",
  linkClassName = "text-gray-300 hover:text-purple-400 transition-colors duration-200"
}: SocialLinksProps) => {
  const socialLinks = getSocialLinks();

  return (
    <div className={className}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          className={linkClassName}
          aria-label={social.ariaLabel}
          target={social.url !== '#' ? '_blank' : undefined}
          rel={social.url !== '#' ? 'noopener noreferrer' : undefined}
        >
          <svg
            className={iconSize}
            fill="currentColor"
            viewBox={social.viewBox || '0 0 24 24'}
          >
            <path d={social.icon} />
          </svg>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;