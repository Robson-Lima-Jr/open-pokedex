type IconProps = {
  size?: number;
  className?: string;
};

export function IconeSeta({ size = 24, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" />
    </svg>
  );
}

export function IconeFiltro({ size = 18, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 4h18" />
      <path d="M6 9h12" />
      <path d="M10 14h4" />
      <path d="M11 19h2" />
    </svg>
  );
}

export function IconePokeball({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z" />
    </svg>
  );
}

export function IconeLink({ size = 24, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z" />
    </svg>
  );
}

export function IconeBaixo({ size = 24, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
    </svg>
  );
}

export function IconeCard({ size = 24, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4,21H20a3,3,0,0,0,3-3V6a3,3,0,0,0-3-3H4A3,3,0,0,0,1,6V18A3,3,0,0,0,4,21ZM3,6A1,1,0,0,1,4,5H20a1,1,0,0,1,1,1V18a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1ZM5,16a1,1,0,0,1,1-1H9a1,1,0,0,1,0,2H6A1,1,0,0,1,5,16Zm0-3a1,1,0,0,1,1-1h6a1,1,0,0,1,0,2H6A1,1,0,0,1,5,13Z" />
    </svg>
  );
}

export function IconeLista({ size = 24, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path fillRule="evenodd" clip-rule="evenodd" d="M10.5 11.25H16.5V12.75H10.5V11.25Z"  />
      <path fillRule="evenodd" clip-rule="evenodd" d="M10.5 7.5H16.5V9H10.5V7.5Z"  />
      <path fillRule="evenodd" clip-rule="evenodd" d="M10.5 15H16.5V16.5H10.5V15Z"  />
      <path fillRule="evenodd" clip-rule="evenodd" d="M7.5 7.5H9V9H7.5V7.5Z"  />
      <path fillRule="evenodd" clip-rule="evenodd" d="M7.5 11.25H9V12.75H7.5V11.25Z"  />
      <path fillRule="evenodd" clip-rule="evenodd" d="M7.5 15H9V16.5H7.5V15Z"  />
      <path fillRule="evenodd" clip-rule="evenodd" d="M3.75 4.5L4.5 3.75H19.5L20.25 4.5V19.5L19.5 20.25H4.5L3.75 19.5V4.5ZM5.25 5.25V18.75H18.75V5.25H5.25Z"  />
    </svg>
  );
}
