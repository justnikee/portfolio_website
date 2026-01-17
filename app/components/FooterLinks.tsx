
import React from 'react'

type LinkItmes = {
  title: string;
  link: string;
}

type Props = {
  links: LinkItmes[];
}

const FooterLinks = ({ links }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {links.map((link, index) => (
        <a className='font-[outfit] text-[#fefce899]' key={index} href={link.link}>{link.title}</a>
      ))}
    </div>
  )
}


export default FooterLinks
