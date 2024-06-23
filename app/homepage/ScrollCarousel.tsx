"use client"
import { FC, useRef } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import get_image_from_path from 'app/components/actions/image_path';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import { WorkProps } from 'app/interfaces/ApiProps';
import { useMediaQuery } from 'react-responsive';

interface ScrollCarouselProps {
  data:WorkProps;
  animateStart:number;
  animateStop:number;
  zIndex:number;
}

const ScrollCarousel: FC<ScrollCarouselProps> = ({ data,animateStart,animateStop,zIndex }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end end'],
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  const scale = useTransform(scrollYProgress, [zIndex == 0 ? 0.1 : animateStart, animateStop], [0, 1]);
  const bottom = useTransform(scrollYProgress, [animateStart, animateStop], [zIndex == 0 ? "0px" : "400px", "0px"]);
  return (
    <>
      {  isDesktopOrLaptop ?
        <div ref={scrollRef} className='h-full absolute top-0 left-0 w-full' style={{zIndex}}>
            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto h-full w-full'>
                <div className='sticky w-full h-[calc(100vh-128px)] top-16'>
                  <LazyMotion features={domAnimation}>
                    <m.div style={{scale}} className={`h-full w-full relative rounded-lg will-change-transform`}>
                        <Image
                            src={get_image_from_path(data.images[0].source)} 
                            alt={data.images[0].alt} 
                            className="object-cover rounded-lg" 
                            fill={true} 
                            sizes='(max-width: 768px) 100vw, 80vw'
                            loading='lazy'
                        />
                        <div className='absolute bg-gray-900 bg-opacity-20 top-0 left-0 w-full h-full '/>
                    </m.div>
                    </LazyMotion>
                    <div className='absolute top-0 left-0 w-full h-full items-center justify-center flex flex-col'>
                        <span className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Check our</span>
                        <div className='overflow-hidden'>
                            <LazyMotion features={domAnimation}>
                            <m.h2 style={{bottom}} className='relative text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 mb-8 font-black'>
                              {data.title}
                              <span className='text-sm sm:text-base font-normal text-center block'>Photoshoot</span>
                            </m.h2>
                            </LazyMotion>
                        </div>
                        <ButtonComponent className='text-xl sm:text-2xl lg:text-3xl' href={`gallery`} tagType='a'>Check my works</ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className='h-full top-0 left-0 w-full'>
            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto h-full w-full'>
                <div className='w-full h-[calc(100vh-128px)] relative mb-8'>
                    <div className={`h-full w-full relative rounded-lg will-change-transform`}>
                        <Image
                            src={get_image_from_path(data.images[0].source)} 
                            alt={data.images[0].alt} 
                            className="object-cover rounded-lg" 
                            fill={true} 
                            sizes='(max-width: 768px) 100vw, 80vw'
                            loading='lazy'
                        />
                        <div className='absolute bg-gray-900 bg-opacity-20 top-0 left-0 w-full h-full '/>
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full items-center justify-center flex flex-col'>
                        <span className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Check our</span>
                        <div className='overflow-hidden'>
                              <h2 className='relative text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 mb-8 font-black'>
                                {data.title}
                                <span className='text-sm sm:text-base font-normal text-center block'>Photoshoot</span>
                              </h2>
                        </div>
                        <ButtonComponent className='text-xl sm:text-2xl lg:text-3xl' href={`gallery`} tagType='a'>Check my works</ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
      }
    </>
  );
};

export default ScrollCarousel;