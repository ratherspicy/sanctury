import {
  Shield,
  Landmark,
  TrendingUp,
  FolderOpen,
  Wrench,
  Store,
  Droplet,
  Zap,
  Home,
  Droplets,
  Thermometer,
  Bug,
  Lock,
  Users,
  PawPrint,
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for concept → icon mapping across the
 * authenticated My Sanctury area. Always pull icons from here so the
 * visual language stays consistent everywhere.
 */
export const ICON_MAP = {
  insurance: Shield,
  mortgage: Landmark,
  equity: TrendingUp,
  documents: FolderOpen,
  maintenance: Wrench,
  marketplace: Store,
  plumbing: Droplet,
  electrical: Zap,
  structural: Home,
  mould: Droplets,
  warmth: Thermometer,
  pest: Bug,
  security: Lock,
  household: Users,
  pet: PawPrint,
  categories: LayoutGrid,
  good: CheckCircle2,
  attention: AlertTriangle,
  urgent: AlertCircle,
  unknown: HelpCircle,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICON_MAP;
