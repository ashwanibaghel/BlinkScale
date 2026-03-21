export function BrandMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="22" fill="url(#brand-gradient)" />
      <path
        d="M20 18H35C43.837 18 51 25.163 51 34C51 42.837 43.837 50 35 50H20V18Z"
        fill="white"
        fillOpacity="0.12"
      />
      <path
        d="M24 18H35.5C42.956 18 49 24.0442 49 31.5C49 38.9558 42.956 45 35.5 45H24V18Z"
        fill="white"
        fillOpacity="0.96"
      />
      <path
        d="M24 31H36.5C40.6421 31 44 34.3579 44 38.5C44 42.6421 40.6421 46 36.5 46H24V31Z"
        fill="#101728"
      />
      <defs>
        <linearGradient
          id="brand-gradient"
          x1="8"
          y1="8"
          x2="56"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4D8BFF" />
          <stop offset="0.5" stopColor="#6185FF" />
          <stop offset="1" stopColor="#8A67FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GlobeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3.5 9H20.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 15H20.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3C14.0711 5.18835 15.2482 8.07614 15.3125 11.0898C15.3769 14.1035 14.3243 17.0357 12.3484 19.3103"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 3C9.92893 5.18835 8.75179 8.07614 8.68746 11.0898C8.62313 14.1035 9.6757 17.0357 11.6516 19.3103"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CodeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 8L4 12L8 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8L20 12L16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4L10 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SupportIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3L19 7V11.5C19 16.1944 16.1096 20.4014 12 21C7.89042 20.4014 5 16.1944 5 11.5V7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.5 11.5L11.25 13.25L14.75 9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChipIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 20V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 20V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 9H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 15H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 9H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 15H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StrategyIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 18L10 12L13.5 15.5L20 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9H20V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuoteIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 7H11L9.5 12H12V17H7V12.5L8 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15 7H18L16.5 12H19V17H14V12.5L15 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3.5L14.4721 8.50886L20 9.3127L16 13.2111L16.9443 18.7114L12 16.1111L7.05573 18.7114L8 13.2111L4 9.3127L9.52786 8.50886L12 3.5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 10V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 17V13.5C12 11.8431 13.3431 10.5 15 10.5C16.6569 10.5 18 11.8431 18 13.5V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.98 7H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function DribbbleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 6.5C10.25 9.5 12.5 13.75 13.75 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.75 6.25C13.4 8.35 10.2 9.5 7 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.5 14C15.85 13.25 12.85 13.35 9.75 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function XIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 5L18 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 5L6 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
