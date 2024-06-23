import { lazy, Suspense } from 'react';
import { Metadata } from 'next';
const ContactForm = lazy(() => import('app/contact/ContactForm'));
import MotionComponent from 'app/components/ui/AnimMotionComponent';
import HeadingText from 'app/components/ui/HeadingText';
import get_image_from_path from 'app/components/actions/image_path';
import { CompanyDataProps } from 'app/interfaces/ApiProps';

async function getData():Promise<{ site_info: CompanyDataProps}>{
  const res = await fetch(`${process.env.APIURL}/company-data`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const meta = await fetch(`${process.env.APIURL}/meta-data/contact`).then((res) => res.json())
  return {
    title: meta.title,
    description:meta.description,
    openGraph: {
      images: [{
        url:get_image_from_path(meta.images[0].source),
        width: 800,
        height: 600,
        alt: meta.images[0].alt,
      }],
    }
  }
}
export default async function Contact(): Promise<JSX.Element>{
  const {site_info} = await getData()
  return (
    <>
      <section className='pt-48 pb-40 overflow-hidden'>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className='relative break-words lg:grid lg:grid-cols-2 pb-40 border-b border-orange-50'>
            <div className='lg:pr-60 lg:mb-0 lg:order-1'>
              <MotionComponent variants='letterSpacing'>
                <span className='text-3xl opacity-80'>Let's Get Connected</span>
              </MotionComponent>
              <address className='not-italic block mt-20'>
              <MotionComponent variants='letterSpacing'>
                <a href='#' className='block mb-12'>
                    <span className='block text-3xl lg:text-4xl font-bold mb-4'>Address</span>
                    <span className='block text-2xl lg:text-3xl'>{site_info.location}</span>
                </a>
              </MotionComponent>
              <MotionComponent variants='letterSpacing'>
                <a href='mailto:info@bibekphotography.com.au' className='block mb-12'>
                    <span className='block text-3xl lg:text-4xl font-bold mb-4'>Email</span>
                    <span className='block text-2xl lg:text-3xl'>{site_info.info_email}</span>
                </a>
              </MotionComponent>
              <MotionComponent variants='letterSpacing'>
                <span className='block border-t border-orange-50 border-opacity-10 pt-12'>
                    <a href={'#'} className='inline-block text-xl mr-2 last:mr-0 leading-tight'>Facebook | </a>
                    <a href={'#'} className='inline-block text-xl mr-2 last:mr-0 leading-tight'>Instagram | </a>
                    <a href={'#'} className='inline-block text-xl mr-2 last:mr-0 leading-tight'>Twitter | </a>
                    <a href={'#'} className='inline-block text-xl mr-2 last:mr-0 leading-tight'>Linked In</a>
                </span>
              </MotionComponent>
              </address>
            </div>
            <div className='lg:flex hidden lg:order-2 mb-16'>
              <MotionComponent>
                <HeadingText level={2} classList='heading-text'>
                    <span>Get </span>
                    <span>In Touch </span>
                </HeadingText>
              </MotionComponent>
            </div>
          </div>
          <Suspense fallback={<div>loading...</div>}>
            <div className='relative grid lg:grid-cols-2 pt-40'>
              <div className='lg:pr-64 lg:mb-0 order-2 lg:order-1'>
                <MotionComponent variants='letterSpacing'>
                  <span className='text-3xl opacity-80'>Let's Talk</span>
                </MotionComponent>
                <MotionComponent variants='letterSpacing'>
                  <p className='not-italic block mt-20 text-2xl opacity-70'>
                    Let us know your requirements and we'll get back to you as soon as possible.
                  </p>
                </MotionComponent>
              </div>
              <div className='flex order-1 lg:order-2 mb-16'>
                <MotionComponent>
                  <HeadingText level={1} classList='heading-text'>
                      <span>Send A</span>
                      <span>Message</span>
                  </HeadingText>
                </MotionComponent>
              </div>
              <ContactForm url={`${process.env.APIURL}/send-email`}/>
            </div>
            <div className='relative mt-40 border border-orange-50 p-2'>
              <MotionComponent>
                <div className='h-[300px] lg:h-[600px] w-full bg-orange-50 filter grayscale'>
                  <iframe src={site_info.gmap} className='w-full h-full border-0' allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>  
                </div>
              </MotionComponent>
            </div>
          </Suspense>
        </div>
      </section>
    </>
  )
}