"use client"
import { FC, useRef } from 'react';
import Image from 'next/image';
import { LazyMotion, domAnimation,m, useScroll, useTransform } from "framer-motion";
import { bebas_neue } from 'app/fonts';
import { useMediaQuery } from 'react-responsive';
import { TopAnimProps } from 'app/interfaces/ApiProps';

const AnimateTopComponent: FC<TopAnimProps> = ({
  text,
  imageAlt,
  imageSrc,
  viewport,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  const img = {
    width: isDesktopOrLaptop ? "40%" : "80%",
    height: isDesktopOrLaptop ? "80%" : "60%",
    top:isDesktopOrLaptop ? "20%" : "80%"
  }
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"]
  });
  const bottom = useTransform(scrollYProgress, [0.5, 0.6], ["0px", "-500px"]);
  const left = useTransform(scrollYProgress, [0.5, 0.6], ["0px", "-500px"]);
  const right = useTransform(scrollYProgress, [0.8,0.9], ["32px", "0px"]);
  const top = useTransform(scrollYProgress, [0.2,0.9], [img.top,"0%"]);
  const width = useTransform(scrollYProgress, [0.5, 0.9], [img.width, '100%']);
  const height = useTransform(scrollYProgress, [0.5, 0.9], [img.height, '100%']);

  return (
    <section ref={scrollRef} style={{ height: viewport }} className="relative">
      <div className="h-screen sticky top-0 w-full overflow-hidden">
        <div className='w-[200px] h-[200px] bg-orange-900 filter blur-3xl absolute top-[100px] -left-[100px] rounded-full'/>
        <div className='w-[200px] h-[200px] bg-orange-900 filter blur-3xl absolute top-[700px] -right-[100px] rounded-full'/>
        <div className="overflow-hidden h-full w-full">
          <div className='px-8 mx-auto w-full h-full relative'>
            <div className='overflow-hidden absolute top-[200px]'>
              <LazyMotion features={domAnimation}>
                <m.div transition={{ stiffness: 10, damping: 0, ease: 'easeInOut', duration: 1 }} initial={{ opacity:0}} animate={{ opacity:1 }} style={{ bottom}} className='transform relative h-full w-full mx-auto z-10 flex flex-col justify-center'>
                  <h1 className={`${bebas_neue.className} text-gray-900 slogan-text-small`}>
                    <span>Bibek</span>
                    <span>Photography</span>
                  </h1>
                  <p className='w-full pr-8 lg:w-1/2 lg:text-xl lg:pr-20 pt-8'>{text}</p>
                </m.div>
              </LazyMotion>
            </div>
            <div className='overflow-hidden absolute bottom-8'>
              <LazyMotion features={domAnimation}>
                <m.div transition={{ stiffness: 10, damping: 0, ease: 'easeInOut', duration: 1,delay:2 }} initial={{ left:"-500px"}} animate={{ left:"0px" }} style={{ left}} className='transform relative h-full w-full mx-auto z-10 flex flex-col justify-center'>
                  <span className='text-xl font-bold'>@officiallybibek</span>
                </m.div>
              </LazyMotion>
            </div>
            <LazyMotion features={domAnimation}>
              <m.div  style={{  top, 
                          width, 
                          height,
                          right
                }} 
                className={'absolute right-8 h-screen w-screen'}>
                <div className="w-full h-full border border-gray-50 p-2 mx-auto">
                  <div className='w-full h-full relative'>
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      style={{ objectFit: "cover" }}
                      fill={true}
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 60vw,(max-width: 1280px) 40vw, 33vw'
                      priority
                    />
                  </div>
                </div>
              </m.div>
            </LazyMotion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimateTopComponent;