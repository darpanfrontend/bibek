import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import AboutCarousel from 'app/gallery/components/AboutCarousel';
import MotionComponent from 'app/components/ui/AnimMotionComponent';
import get_image_from_path from 'app/components/actions/image_path';
import { bebas_neue } from 'app/fonts';
import { WorkProps } from 'app/interfaces/ApiProps';

async function getData(slug=null): Promise<{ works: WorkProps[]; works_by_slug: WorkProps[] }> {
    const url = slug==null ? `${process.env.APIURL}/get-works-by-slug/` : `${process.env.APIURL}/get-works-by-slug/${slug}`
    const res = await fetch(url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        notFound()
    }
    return res.json()
}
export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const meta = await fetch(`${process.env.APIURL}/meta-data/gallery`).then((res) => res.json())
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

export default async function Gallery({searchParams}): Promise<JSX.Element>{
    const {works,works_by_slug} = await getData(searchParams.category)
    return (
        <>
        <div className={`${bebas_neue.className} absolute top-44 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold z-[1] px-8 w-screen overflow-x-scroll`}>
            <ul className='flex pr-8'>
            {
                works.map(item => (
                <li key={item.slug} className={`${searchParams.category == item.slug ? "text-gray-900" : "text-gray-400"} inline-flex mr-8 last:mr-0 mb-4 `}>
                    <MotionComponent variants='letterSpacing'>
                        <Link href={`/gallery?category=${item.slug}`} >{item.title}</Link>
                    </MotionComponent>
                </li>
                ))
            }
            </ul>
        </div>
            {
                works_by_slug.length > 0 ? 
                    <AboutCarousel works={works_by_slug}/> 
                :
                    <section className='h-screen flex items-center justify-center'>
                        <div className='sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 px-8 text-center'>
                            <MotionComponent>

                                <span className={" text-5xl font-bold mb-4 block"}>No photos found</span>
                                <p className={" text-2xl text-gray-700"}>Currently we dont have photos in this category, we will update it once we will click it.</p>
                            </MotionComponent>
                        </div>
                    </section>
            }
        </>
    )
}