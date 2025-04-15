'use client';

import { useRouter } from 'next/navigation';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider placement="top-center" toastProps={{ color: 'success' }} />
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  )
}
