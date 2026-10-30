export default function HeartIcon({ size = 18, filled = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7.500-4.600-9.500-9.300C1.100 8.400 3 5 6.300 5c2 0 3.700 1.100 4.600 2.800h2.200C14 6.100 15.700 5 17.700 5 21 5 22.900 8.400 21.500 11.700 19.500 16.400 12 21 12 21z" />
    </svg>
  );
}