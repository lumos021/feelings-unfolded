// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AnimationProvider } from '../context/AnimationContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Feelings Unfolded with Sakina | Emotional Wellness & Counseling',
  description: 'Journey through emotional wellness with Sakina. Professional counseling, mindfulness workshops, and therapeutic services for your mental well-being.',
  keywords: 'emotional wellness, counseling, therapy, mindfulness, mental health, Sakina, feelings unfolded',
  openGraph: {
    title: 'Feelings Unfolded with Sakina',
    description: 'Professional emotional wellness and counseling services to help you navigate your emotional journey.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Feelings Unfolded with Sakina',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feelings Unfolded with Sakina',
    description: 'Professional emotional wellness and counseling services.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2a9d8f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}
