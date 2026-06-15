import type { LucideIcon } from "lucide-react";

export type ListItemProps = {
  /** One of icon / avatar / initials provides the left circle content. */
  icon?: LucideIcon;
  avatar?: string;
  initials?: string;
  /** Tint for the icon circle background (defaults to soft violet). */
  iconBg?: string;
  /** Icon colour (defaults to violet). */
  iconColor?: string;
  title: string;
  meta?: string;
  /** Right-aligned slot — a link, button, or status pill. */
  action?: React.ReactNode;
};

export function ListItem({
  icon: Icon,
  avatar,
  initials,
  iconBg = "#EEEDF8",
  iconColor = "#6D5FD8",
  title,
  meta,
  action,
}: ListItemProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold"
        style={{ backgroundColor: avatar ? undefined : iconBg, color: iconColor }}
      >
        {avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={avatar} alt={title} className="h-full w-full object-cover" />
        ) : Icon ? (
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        ) : (
          initials
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        {meta && <p className="truncate text-xs text-muted">{meta}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
