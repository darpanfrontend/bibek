import Image from 'next/image';
import { Metadata } from 'next';
import AnimateTopComponent from 'app/about/components/AnimateTopComponent';
const ParallaxText = lazy(() => import('app/components/js/ParallaxText'));
const HeadingText = lazy(() => import('app/components/ui/HeadingText'));
const MotionComponent = lazy(() => import('app/components/ui/AnimMotionComponent'));
import get_image_from_path from 'app/components/actions/image_path';
import { BannerProps, WorkProps } from 'app/interfaces/ApiProps';
import { lazy, Suspense } from 'react';

async function getData(): Promise<{ about_banner: BannerProps; works: WorkProps[] }> {
  const res = await fetch(`${process.env.APIURL}/about-data`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const meta = await fetch(`${process.env.APIURL}/meta-data/about`).then((res) => res.json())
  return {
    title: meta.title,
    description:meta.description,
    openGraph: {
      images: [{
        url: get_image_from_path(meta.images[0].source),
        width: 800,
        height: 600,
        alt: meta.images[0].alt,
      }],
    }
  }
}
export default async function About(): Promise<JSX.Element>{
  const {about_banner,works} = await getData()
  return (
    <>
      <AnimateTopComponent imageSrc={get_image_from_path(about_banner.featured_image[0].source)} imageAlt={about_banner.featured_image[0].alt} text={about_banner.description1} viewport='600vh'/>
      <Suspense fallback={<div>loading...</div>}>
        <section className='py-40 overflow-hidden'>
          <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
            <div className='relative grid lg:grid-cols-2 pb-28'>
              <div className='lg:pr-64 mb-8 lg:mb-0'>
                <MotionComponent variants='letterSpacing'>
                  <span className='text-3xl'>About Us</span>
                </MotionComponent>
              </div>
              <div className='flex'>
                <MotionComponent variants='letterSpacing'>
                  <HeadingText level={2} classList='heading-text'>
                      <span>Learn </span>
                      <span>About Us </span>
                  </HeadingText>
                </MotionComponent>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 lg:pr-20 mb-12 lg:mb-0 flex items-end'>
                  <MotionComponent className="w-full">
                    <div className="w-full h-[400px] lg:h-[600px] border border-gray-50 p-2 mx-auto">
                        <div className='w-full h-full relative'>
                        <Image
                            src={get_image_from_path(about_banner.images[0].source)}
                            alt={about_banner.images[0].alt}
                            style={{ objectFit: "cover" }}
                            fill={true}
                            sizes='(max-width: 1024px) 100vw, 50vw'
                            loading='lazy'
                        />
                        </div>
                    </div>
                  </MotionComponent>
              </div>
              <div className='w-full lg:w-6/12'>
                <MotionComponent className="w-full">
                  <div className="w-full h-[400px] lg:h-[600px] border border-gray-50 p-2 mx-auto">
                      <div className='w-full h-full relative'>
                      <Image
                          src={get_image_from_path(about_banner.images[1].source)}
                          alt={about_banner.images[1].alt}
                          style={{ objectFit: "cover" }}
                          fill={true}
                          sizes='(max-width: 1024px) 100vw, 50vw'
                          loading='lazy'
                      />
                      </div>
                  </div>
                </MotionComponent>
                  <div className='mt-16 text-2xl font-normal'>
                    <MotionComponent variants='letterSpacing'>
                      <p>{about_banner.description2}</p>
                    </MotionComponent>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-2 border-t border-b border-orange-50 mb-40'>  
          <div className='py-12 bg-orange-50'>
              <ParallaxText baseVelocity={-5} textSize="text-9xl lg:text-[300px]">
                  <span className='mr-16 text-gray-900' dangerouslySetInnerHTML={{__html:about_banner.slogan}}/>
              </ParallaxText>
          </div>
        </section>
        <section className='overflow-hidden'>
          <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
            <div className='relative pb-28'>
              <div className='flex mb-28'>
                  <MotionComponent variants='letterSpacing'>
                    <HeadingText level={2} classList='heading-text'>
                        <span>Our </span>
                        <span>Expertise</span>
                    </HeadingText>
                  </MotionComponent>
              </div>
              <div className='w-full lg:w-10/12 mx-auto'>
                  {
                      works.map(item => (
                          <MotionComponent key={item.title}>
                            <div className='text-3xl lg:text-6xl border-b border-orange-50 pb-8 lg:mb-8 last:border-0 relative group hover:border-gray-900 transition-[border] duration-300 ease-in-out-quart'>
                                <h3 className='mix-blend-normal group-hover:mix-blend-difference relative z-[1] group-hover:px-8 pt-8 px-0 transition-[padding] duration-300 font-semibold ease-in-out-quart'>{item.title}</h3>              
                                <div className='absolute top-0 right-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out-quart z-0'>
                                    <Image
                                        src={get_image_from_path(item.images[0].source)}
                                        alt={item.images[0].alt}
                                        style={{ objectFit: "cover" }}
                                        fill={true}
                                        sizes='(max-width: 1024px) 100vw, 80vw'
                                        loading='lazy'
                                    />
                                </div>
                            </div>
                          </MotionComponent>
                      ))
                  }
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </>
  )
}