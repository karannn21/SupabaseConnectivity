"use client";

import { HeroUIProvider } from "@heroui/react";

export default function ClientHeroUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
