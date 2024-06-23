"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LazyMotion, domAnimation, m, useScroll, useTransform } from 'framer-motion';
import get_image_from_path from 'app/components/actions/image_path';
import { bebas_neue } from 'app/fonts';

const AboutCarousel = ({ works }) => {
  const scrollRef = useRef(null);
  const sliderCount = works.length;
  const windowWidth = window.outerWidth
  let pos = windowWidth > 1200 ? (sliderCount%2 === 0 ? ((sliderCount/2)*100) : ((Math.floor(sliderCount/2)*100)+70)) : sliderCount*100;
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end end'],
  });
  const img = {
    left: windowWidth > 639 ? "-70vw" : "-50vw",
  }
  const translateX = useTransform(scrollYProgress, [0.6, 1], ['0vw', `-${pos-100}vw`]);
  const left = useTransform(scrollYProgress, [0.4, 0.6], ['0', img.left]);
  return (
    <section className="relative" style={{ height: sliderCount == 1 ? `100vh` : `${(sliderCount/2) * 100}vh` }} ref={scrollRef}>
      <div className="sticky top-0">
        <div className="flex w-full h-full transition-all duration-300 ease-bouncy overflow-hidden">
          <LazyMotion features={domAnimation}>
          <m.div className="h-full flex transform relative" style={{ translateX, width: `${pos}vw`}}>
            {
              works.map((item,index) => (
                <div key={item.slug} className={`${index%2===0 ? "w-screen lg:w-[calc(70vw)]" : "w-screen lg:w-[calc(30vw)]"} lg:mx-4 relative group flex items-end h-screen`}>
                  <div className="lg:pt-80 h-[50vh] md:h-full w-full">
                    <div className='p-2 border border-gray-50 h-full w-full group-hover:border-gray-200 transition-[borders] duration-300 ease-bouncy'>
                      <div className='h-full w-full relative overflow-hidden'>
                        <Image
                          src={get_image_from_path(item.featured_image[0].source)}
                          alt={item.featured_image[0].alt}
                          style={{ objectFit: "cover" }}
                          fill={true}
                          sizes='(max-width: 1024px) 100vw, 50vw'
                          priority={index == 0 || index == 1 ? true : false}
                        />
                        <Link href={`gallery/${item.slug}`} className='w-full h-full absolute top-0 left-0'><span className='opacity-0'>{item.title}</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            <m.div style={{ left }} className="absolute w-[70vw] sm:w-[50vw] h-screen flex items-end bg-white top-0 left-0 px-8 lg:pb-8">
                <div>
                    <span className='text-3xl'>Check out our</span>
                    <h1 className={bebas_neue.className + ' text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] leading-none'}>Gallery</h1>
                </div>
            </m.div>
          </m.div>
          </LazyMotion>
        </div>
      </div>
    </section>
  );
};

export default AboutCarousel;