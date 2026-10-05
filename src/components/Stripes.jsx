/** Gold diagonal corner stripes from the business card. Decorative. */
export default function Stripes({ corner = 'tr', className = '' }) {
  return (
    <span className={`stripes stripes--${corner} ${className}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}
