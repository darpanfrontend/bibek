import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ImageAnimateComponent from './components/ImageAnimateComponent';
import MotionComponent from 'app/components/ui/AnimMotionComponent';
import get_image_from_path from 'app/components/actions/image_path';
import { PortfolioItemProps } from 'app/interfaces/ApiProps';

async function getData(slug):Promise<{ portfolio: PortfolioItemProps}> {
    const res = await fetch(`${process.env.APIURL}/portfolio/${slug}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        notFound()
    }
    return res.json()
}
export async function generateMetadata({params}): Promise<Metadata> {
  // fetch data
  const meta = await fetch(`${process.env.APIURL}/meta-data/${params.slug}`).then((res) => res.json())
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

export default async function Portfolio({params}){
    const {portfolio} = await getData(params.slug)
    return (
        <>
        <ImageAnimateComponent data={portfolio} viewport='600vh'/>
        <section className='overflow-hidden relative py-40'>
            <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto relative">
                <div className='relative lg:grid lg:grid-cols-2 gap-x-40'>
                    <div className='text-4xl font-bold'>
                        <div className="lg:flex lg:flex-wrap mb-8">
                            <div className='w-full lg:w-1/2 text-gray-300'>
                                <MotionComponent variants="letterSpacing">
                                    Project Date
                                </MotionComponent>
                            </div>
                            <div className='w-full mt-4 lg:mt-0 lg:w-1/2'>
                                <MotionComponent variants="letterSpacing">
                                    {portfolio.date}
                                </MotionComponent>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-8">
                            <div className='w-full lg:w-1/2 text-gray-300'>
                                <MotionComponent variants="letterSpacing">
                                    Client
                                </MotionComponent>
                            </div>
                            <div className='w-full mt-4 lg:mt-0 lg:w-1/2'>
                                <MotionComponent variants="letterSpacing">
                                    {portfolio.client}
                                </MotionComponent>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className='w-full lg:w-1/2 text-gray-300'>
                                <MotionComponent variants="letterSpacing">
                                    Client Address
                                </MotionComponent>
                            </div>
                            <div className='w-full mt-4 lg:mt-0 lg:w-1/2'>
                                <MotionComponent variants="letterSpacing">
                                    {portfolio.country}
                                </MotionComponent>
                            </div>
                        </div>
                    </div>
                    <div className='text-2xl lg:pl-20 mt-12 lg:mt-0'>
                        <MotionComponent variants='letterSpacing'>
                            <p>{portfolio.description}</p>
                        </MotionComponent>
                    </div>
                </div>
            </div>
        </section>
        {
            portfolio.video_id != null &&
            <section className='relative overflow-hidden'>
                <MotionComponent>
                    <div className="w-full h-screen border border-gray-50 p-2 relative">
                        <iframe src={`https://www.youtube.com/embed/${portfolio.video_id}?si=spyZ0PMldHEuf2xQ`} title="YouTube video player" className="border-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"/>
                    </div>
                </MotionComponent>
            </section>
        }
        <section className={`${portfolio.video_id == null ? 'pb-40' : 'py-40'}`}>
            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto relative'>
                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {
                        portfolio.images.map(item => (
                            <MotionComponent key={item.source} >
                                <div className="h-[600px] border border-gray-50 p-2 relative">
                                    <div className='w-full h-full relative'>
                                        <Image
                                            src={get_image_from_path(item.source)}
                                            alt={item.alt}
                                            fill={true}
                                            style={{objectFit:"cover"}}
                                            sizes='(max-width: 1280px) 50vw,(max-width: 768px) 100vw, 33vw'
                                            loading='lazy'
                                        />
                                    </div>
                                </div>
                            </MotionComponent>
                        ))
                    }
                </div>
            </div>
        </section>
        </>
    )
}