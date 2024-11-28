import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

type Props = {}

const links = ["About", "Post", "Gallery", "Use", "Work", "Contact"];

const Header = (props: Props) => {
  return (
    <header className='w-full pt-5'>
        <div className='max-w-[800px] h-[52px] m-auto flex items-center justify-between w-full bg-[hsla(0,0%,5%,.6)] rounded-[100px] py-2 px-6 border border-[#212121]' style={{
            boxShadow: '0 .6px .6px -1.25px rgba(0,0,0,.467),0 2.2px 2.2px -2.5px rgba(0,0,0,.41),0 10px 10px -3.75px rgba(0,0,0,.16)',
            backdropFilter: 'blur(12px)',
        }}>
        <div>
             <Link className='' href={'/'}>
             <Image width={90} height={40} alt='Nikhil Logo' src='/main_images/NIKHIL.png' />
             </Link>
         </div>
         <div className='flex gap-4'>
            {
                links.map((link, index) => (
                    <Link className='font-[outfit]' href={"#"} key={index}>
                        <span>{links[index]}</span>
                    </Link>
                ))
            }
         </div>
        </div>
    </header>
  )
}


export default Header