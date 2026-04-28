/**
 * LogoMark — Reverted to clean font-based approach as requested.
 * Uses a small negative offset to make "v" and "p" touch elegantly.
 */
export function LogoMark({
  inverted = false,
  className = "",
}: {
  inverted?: boolean;
  className?: string;
}) {
  const fill = inverted ? "#ffffff" : "#0F172A";

  return (
    <svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="virtualpersonal.ai logo"
      className={className}
    >
      {/* "vp" — Centered, slightly larger, with elegant touch */}
      <text
        x="100"
        y="38"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
        fontSize="44"
        fontWeight="300"
        fill={fill}
      >
        <tspan>v</tspan>
        <tspan dx="-4.5">p</tspan>
      </text>

      {/* "virtualpersonal.ai" — below in clean regular weight */}
      <text
        x="100"
        y="66"
        textAnchor="middle"
        fontFamily="'Inter', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="18"
        fontWeight="400"
        letterSpacing="-0.4"
        fill={fill}
      >
        virtualpersonal.ai
      </text>
    </svg>
  );
}
