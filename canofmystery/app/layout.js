import { Lexend_Mega } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const LexM = Lexend_Mega(
  {
    subsets: ['latin'] 
  }
)

export const metadata = {
  title: 'Can of Mystery',
  description: 'Blog site',
}

export default function RootLayout({ children }) {
  return (
    <html data-theme="mytheme" className="" lang="en">
      <body className={`${LexM.className} tracking-tighter `}>
          <div className="container k h-screen min-w-full">  
            <Navbar className="z-50"/>
            {children}
            <Footer />
          </div>
      </body>
    </html>
  );    
}