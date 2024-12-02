import Link from 'next/link';
import React from 'react'

type LinkItmes = {
    title: string;
    link: string;
}

type Props = {
    links: LinkItmes[];
}

const FooterLinks = ({links}: Props) => {
  return (
    <div className='flex flex-col gap-3'>
         {links.map((link, index) => (
            <Link className='font-[outfit] text-[#fefce899]' key={index} href={link.link}>{link.title}</Link>
         ))}
    </div>
  )
}


export default FooterLinks