import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MenuPro - Restaurant Menu & Order Management',
  description: 'Full-stack restaurant menu and order management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  )
}
