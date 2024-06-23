"use client"
import React, { FC, useRef } from 'react';
import Image from 'next/image';
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import get_image_from_path from 'app/components/actions/image_path';
import { bebas_neue } from 'app/fonts';
import { PortfolioItemProps } from 'app/interfaces/ApiProps';

interface ImageAnimateComponentProps {
  viewport?: string;
  data:PortfolioItemProps;
}

const ImageAnimateComponent: FC<ImageAnimateComponentProps> = ({
  viewport = '300vh',
  data
}) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"]
  });
  const width = useTransform(scrollYProgress, [0.4, 1], ['33vw', '100vw']);
  const opacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0]);

  return (
    <section ref={scrollRef} style={{ height: viewport }} className="relative">
      <div className="h-screen sticky top-0 w-full overflow-hidden">
        <div className='w-[200px] h-[200px] bg-orange-900 filter blur-3xl absolute top-[100px] -left-[100px] rounded-full'/>
        <div className='w-[200px] h-[200px] bg-gray-900 filter blur-3xl absolute top-[700px] -right-[100px] rounded-full'/>
        <div className='absolute top-0 left-0 w-full h-full px-8 items-center flex'>
              <LazyMotion features={domAnimation}>
              <m.div transition={{ stiffness: 10, damping: 0, ease: 'easeInOut', duration: 1 }} initial={{ bottom:"-500px"}} animate={{ bottom:"0px" }} style={{ opacity}} className='transform relative h-full w-11/2 sm:w-8/12 md:w-7/12 lg:w-6/12 z-10 flex flex-col justify-center items-center text-center lg:ml-20 mix-blend-exclusion'>
                <div className='w-full mb-4'>
                  <span className='border border-gray-900 px-2 py-1 text-sm inline-block mr-4'>{data.date}</span>
                  <span className='border border-gray-900 px-2 py-1 text-sm inline-block'>{data.category}</span>
                </div>
                <h1 className={`${bebas_neue.className} text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl`} dangerouslySetInnerHTML={{__html:data.title}}/>
              </m.div>
              </LazyMotion>
        </div>
        <div className="overflow-hidden h-full w-full relative">
          <div className='h-full w-full flex justify-end'>
            <LazyMotion features={domAnimation}>
            <m.div style={{width}} className='h-screen w-[30vw]'>
              <div className="w-full h-full p-2 mx-auto">
                <div className='w-full h-full relative'>
                  <Image
                    src={get_image_from_path(data.featured_image[0].source)}
                    alt={data.featured_image[0].alt}
                    style={{ objectFit: "cover" }}
                    fill={true}
                    sizes='(max-width: 768px) 33vw, 40vw'
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

export default ImageAnimateComponent;