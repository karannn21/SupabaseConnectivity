import { LucideIcon } from "lucide-react";

export interface SubItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  subItems?: SubItem[];
}

export interface SidebarItem {
  id: string;
  iconOutline: LucideIcon;
  iconSolid: LucideIcon;
  label: string;
  subItems: SubItem[];
}
