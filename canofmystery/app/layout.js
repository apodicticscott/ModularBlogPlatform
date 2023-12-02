import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Can of Mystery',
  description: 'Blog site',
}

export default function RootLayout({ children }) {
  return (
    <html data-theme="mytheme" className="bg-neutral-200" lang="en">
      <body className={inter.className}>
          <div className="container bg-neutral-200 h-screen w-screen">  
          <Navbar />  
          {children}
          <Footer />
          </div>
      </body>
    </html>
  );    
}
