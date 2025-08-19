import { LucideIcon } from "lucide-react";

export interface SubItem {
  label: string;
  icon: LucideIcon;
  subItems?: SubItem[];
}

export interface SidebarItem {
  id: string;
  iconOutline: LucideIcon;
  iconSolid: LucideIcon;
  label: string;
  subItems: SubItem[];
}

export interface SidebarState {
  activeItem: string | null;
  isSecondaryOpen: boolean;
  activeSecondary: string | null;
  expandedSubItem: string | null;
}
