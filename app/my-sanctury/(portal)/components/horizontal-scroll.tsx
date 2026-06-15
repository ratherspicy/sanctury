type HorizontalScrollProps = {
  children: React.ReactNode;
  /**
   * If set, the row wraps to a grid of this many columns from the `sm`
   * breakpoint up. If omitted, it keeps scrolling horizontally on every
   * width (good for galleries that will grow).
   */
  smGridCols?: 2 | 3 | 4 | 5;
  /**
   * Bleed to the screen edges (negative margin + edge padding) so cards
   * sit flush with the page gutter. Default true. Set false when nesting
   * inside a padded card.
   */
  bleed?: boolean;
  className?: string;
};

const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

/**
 * Mobile-first horizontal snap-scroll row. On mobile it always scrolls
 * (overflow-x-auto, snap-x, scrollbar hidden). On desktop it either keeps
 * scrolling or wraps to a grid when smGridCols is provided.
 */
export function HorizontalScroll({
  children,
  smGridCols,
  bleed = true,
  className = "",
}: HorizontalScrollProps) {
  const edge = bleed ? "-mx-4 scroll-pl-4 px-4" : "";
  const desktop = smGridCols
    ? `sm:grid ${GRID_COLS[smGridCols]} sm:overflow-visible ${bleed ? "sm:mx-0 sm:px-0" : ""}`
    : "";

  return (
    <div
      className={`flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${edge} ${desktop} ${className}`}
    >
      {children}
    </div>
  );
}
