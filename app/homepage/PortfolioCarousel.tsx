"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { LazyMotion, domAnimation, m, useScroll, useTransform } from 'framer-motion';
import get_image_from_path from 'app/components/actions/image_path';


const PortfolioCarousel = ({ portfolios }) => {
  const scrollRef = useRef(null);
  const sliderCount = portfolios.length;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1200px)'
  })
  const notMobile = useMediaQuery({
    query: '(min-width:768px)'
  })
  let pos = isDesktopOrLaptop ? (sliderCount%2 === 0 ? ((sliderCount/2)*100) : ((Math.floor(sliderCount/2)*100)+70)) : sliderCount*100;
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end end'],
  });
  const leftX = useTransform(scrollYProgress, [0.3, 1], ['0vw', `-${pos-100}vw`]);
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <>
      {
        notMobile ? 
        <section className="relative" style={{ height: `${(sliderCount/2) * 100}vh` }} ref={scrollRef}>
          <div className="sticky top-0">
            <div className="flex w-full h-full duration-300 ease-bouncy overflow-hidden">
            <LazyMotion features={domAnimation}>
              <m.div className="h-full flex relative" style={{ left:leftX, width: `${pos}vw`}}>
                {
                  portfolios.map((item,index) => (
                    <div key={item.slug} className={`${index%2===0 ? "w-screen lg:w-[calc(70vw)]" : "w-screen lg:w-[calc(30vw)]"} lg:mx-4 relative group`}>
                      <div className="lg:py-20 h-screen w-full">
                        <div className='p-2 border border-gray-50 h-full w-full group-hover:border-gray-200 transition-[border] duration-300 ease-bouncy'>
                          <div className='h-full w-full relative overflow-hidden'>
                            <Image
                              src={get_image_from_path(item.featured_image[0].source)}
                              alt={item.featured_image[0].alt}
                              style={{ objectFit: "cover" }}
                              fill={true}
                              sizes='(max-width: 1024px) 100vw, 50vw'
                              loading='lazy'
                            />
                            <Link href={`gallery/${item.slug}`} className='w-full h-full absolute top-0 left-0 cursor-pointer'><span className='opacity-0'>{item.title}</span></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                <m.div style={{ left }} className="absolute w-screen h-screen bg-white top-0 left-0"/>
              </m.div>
              </LazyMotion>
            </div>
          </div>
        </section>
        :
        <section className="relative py-20">
          <div className="top-0">
            <div className="flex w-full h-full duration-300 ease-bouncy">
              <div className="h-full w-full flex flex-wrap relative px-8">
                {
                  portfolios.map((item,index) => (
                    <div key={item.slug} className={`w-full lg:mx-4 relative group mb-8`}>
                      <div className="lg:py-20 h-[500px] w-full">
                        <div className='p-2 border border-gray-50 h-full w-full group-hover:border-gray-200 transition-[border] duration-300 ease-bouncy'>
                          <div className='h-full w-full relative overflow-hidden'>
                            <Image
                              src={get_image_from_path(item.featured_image[0].source)}
                              alt={item.featured_image[0].alt}
                              style={{ objectFit: "cover" }}
                              fill={true}
                              sizes='(max-width: 1024px) 100vw, 50vw'
                              loading='lazy'
                            />
                            <Link href={`gallery/${item.slug}`} className='w-full h-full absolute top-0 left-0 cursor-pointer'><span className='opacity-0'>{item.title}</span></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      }  

    </>
  );
};

export default PortfolioCarousel;