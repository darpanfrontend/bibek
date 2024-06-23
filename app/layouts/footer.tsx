import React, { FC } from 'react';
import Link from 'next/link';
import HeadingText from 'app/components/ui/HeadingText';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import ParallaxText from 'app/components/js/ParallaxText';
import MotionComponent from 'app/components/ui/AnimMotionComponent';

export const SiteFooter=({siteInfo}) => {
  return (
    <>
      <footer className='pb-8 sm:pb-16 min-h-screen bg-gray-900 text-white pt-4 flex flex-col justify-between'>
        <ParallaxText baseVelocity={1} textSize="text-9xl md:text-[200px]">
            <h2 className='mr-16'>Bibek Photography</h2> 
        </ParallaxText>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full text-sm">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 p-8 sm:p-16 border border-gray-50">
            <div className='w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:col-span-3 mb-12'>
              <HeadingText level={2} classList='text-5xl sm:text-6xl md:text-7xl lg:text-9xl align-baseline lg:col-span-2'>
                <span>Let's Talk</span>
              </HeadingText>
              <div className='flex md:items-end md:justify-end text-center mt-8 md:mt-0'>
                <ButtonComponent className='text-xl sm:text-2xl md:text-3xl md:w-full' href={`/contact`} tagType='a'>Request a project</ButtonComponent>
              </div>
            </div>
            <MotionComponent variants='letterSpacing'>
                <Link className="inline-block first:ml-0 last:mr-0 mx-2 mb-2 underline font-medium" href="/about">
                  About
                </Link> |
                <Link className="inline-block first:ml-0 last:mr-0 mx-2 mb-2 underline font-medium" href="/gallery">
                  Gallery
                </Link> |
                <Link className="inline-block first:ml-0 last:mr-0 mx-2 mb-2 underline font-medium" href="/contact">
                  Contact
                </Link>
            </MotionComponent>
            <MotionComponent variants='letterSpacing'>
                <a target="_blank" href="#" className="inline-block first:ml-0 last:mr-0 mx-2 mb-2 underline">
                  Facebook
                </a> |
                <a target="_blank" href="#" className="inline-block first:ml-0 last:mr-0 mx-2 mb-2 underline">
                  Instagram
                </a> |
                <a target="_blank" href="#" className="inline-block first:ml-0 last:mr-0 mx-2 mb-2 underline">
                  Youtube
                </a>
            </MotionComponent>
            <MotionComponent variants='letterSpacing'>
              <address className="not-italic mt-8 md:mt-0">
                <span className="block mb-3 relative">
                  {siteInfo.location}
                </span>
                <span className="block mb-3 relative">{siteInfo.phone1}</span>
                <span className="block relative">{siteInfo.info_email}</span>
              </address>
            </MotionComponent>
            <div className='col-span-3 pt-8 mt-8 relative w-full'>
              <div className="w-full h-[1px] absolute top-0 left-0 bg-gray-100 opacity-20 border-t" />
              <div className="md:grid md:grid-cols-2 xl:grid-cols-3">
                <div className='lg:col-span-2'>
                  <MotionComponent variants='letterSpacing'>
                    <p className='mb-4 md:mb-0'>
                      &copy; 2022 | All Rights reserved | Bibek Photography
                    </p>
                  </MotionComponent>
                </div>
                <MotionComponent variants='letterSpacing'>
                  <p>
                    Crafted with love by fourgradient
                  </p>
                </MotionComponent>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SiteFooter;