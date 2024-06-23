import { lazy, Suspense } from 'react';
import 'material-icons/iconfont/material-icons.css';
import './globals.css';
import { roboto } from 'app/fonts';
import Preloader from 'app/components/ui/PreloaderComponent';
import SiteHeader from './layouts/header';
import { CompanyDataProps } from 'app/interfaces/ApiProps';
import { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
const SiteFooter = lazy(() => import('app/layouts/footer'));
const CustomCursor = lazy(() => import('app/components/js/customCursor'));
export const metadata: Metadata = {
  metadataBase: new URL('https://api.bibekphotography.com.au'),
}
export const revalidate = 0;
async function getData():Promise<{ site_info: CompanyDataProps}>{
  const res = await fetch(`${process.env.APIURL}/company-data`, )
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
export default async function RootLayout({ children }){
  const {site_info} = await getData()
  return (
    <html lang="en">
      <body className={`${roboto.className} text-gray-900`}>
        {/* animations */}
        
        <SiteHeader siteInfo={site_info}/>
        <main>
          <Preloader>
            {children}
          </Preloader>
        </main>
        <Suspense fallback={<div>Loading...</div>}>
          <SiteFooter siteInfo={site_info}/>
        </Suspense>
      </body>
    </html>
  );
};