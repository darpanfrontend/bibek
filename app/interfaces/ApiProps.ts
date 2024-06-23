export interface CompanyDataProps {
  images:{
    source:string;
    alt:string;
  }[];
  location:string;
  phone1:string;
  info_email:string;
  gmap:string;
}
export interface BannerProps {
  slogan: string;
  images: { 
    source: string; 
    alt: string 
  }[];
  featured_image: { 
    source: string; 
    alt: string 
  };
  description1: string;
  description2: string;
}
  
export interface WorkProps {
  title: string;
  images: {
    source: string;
    alt: string;
  }[];
  slug:string;
  // Add properties specific to your work data structure
}
  
export interface PortfolioItemProps {
  date:string;
  client:string;
  country:string;
  description:string;
  images:{
      source:string;
      alt:string
  }[];
  category: string; // Add the missing property
  title: string;
  featured_image: {
      source: string;
      alt: string;
  }[];
  video_id:string;
  slug:string;
}

export interface TopAnimProps {
  text?: string;
  imageSrc?: string;
  imageAlt?:string;
  viewport?: string;
}
export interface FormProps {
  name: string;
  email: string;
  phone?: string; // Optional phone number
  address?: string; // Optional address
  message: string;
}