import { lazy, Suspense } from 'react';
import { Metadata } from 'next';
import TopScrollAnim from 'app/homepage/TopScrollAnim';
const PortfolioCarousel = lazy(() => import('app/homepage/PortfolioCarousel'));
const TextReveal = lazy(() => import('app/components/js/TextReveal'));
const ScrollCarousel = lazy(() => import('app/homepage/ScrollCarousel'));
import get_image_from_path from 'app/components/actions/image_path';
import { BannerProps, PortfolioItemProps, WorkProps } from 'app/interfaces/ApiProps';

async function getData(): Promise<{ home_banner: BannerProps; works: WorkProps[]; portfolios: PortfolioItemProps[] }> {
  const res = await fetch(`${process.env.APIURL}/home-data`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const meta = await fetch(`${process.env.APIURL}/meta-data/home-page`).then((res) => res.json())
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

export default async function Home(): Promise<JSX.Element> {
  const { home_banner, works, portfolios } = await getData();
  const animCounter = 0.95 / works.length;

  return (
    <>
      <TopScrollAnim
        text={home_banner.slogan}
        imageSrc={get_image_from_path(home_banner.images[0].source)}
        imageAlt={home_banner.images[0].alt}
        viewport="600vh"
      />
      <Suspense fallback={<div>loading...</div>}>
        <section className="py-40 overflow-hidden bg-gray-1000 text-white relative">
          <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <TextReveal>{home_banner.description1}</TextReveal>
              </div>
            </div>
          </div>
        </section>
        <section style={{minHeight:`${works.length*600}px`}} className={`w-full relative bg-gray-1000 text-white pb-40 lg:pb-0`}>
          {works.map((item, index) => (
            <ScrollCarousel
              zIndex={index}
              key={index}
              data={item}
              animateStart={index * animCounter}
              animateStop={(index + 1) * animCounter}
            />
          ))}
        </section>
        <PortfolioCarousel portfolios={portfolios} />
      </Suspense>
    </>
  );
}
