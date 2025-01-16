import React from 'react'
import Card from '../components/Card'

const Work = () => {
  return (
    <div id='Work' className='work flex justify-center py-32 px-4'>
    <div className='sm:px-[32px] w-full sm:py-0 max-w-[1300px] m-auto'>
    <div>
        <h2 className='sm:text-[5rem] text-5xl leading-[3.5rem] font-[Heading] uppercase sm:leading-[5rem] text-center mb-16'>Work</h2>
    </div>
    <div className='flex flex-col sm:flex-row justify-between gap-6 twoIn'>
      <Card link="https://github.com/justnikee/next.stateofkind" title='State Of Kind' description='State of Kind is a modern e-commerce store built with Next.js, offering fast performance. Designed with Tailwind CSS, it provides a sleek, responsive layout. GSAP animations enhance user interaction, while powerful features like product filtering, advanced search, and efficient product management make browsing and purchasing seamless. Enjoy an intuitive, engaging shopping experience with State of Kind. 🚀' image={'/main_images/stateofkind.png'} stack={["NextJs", "Tailwind", "Prisma", "MongoDB", "GSAP"]} />
      <Card link='https://github.com/justnikee/Backend' title='E-commerce API' description='The E-commerce API is currently under development, built with Node.js, Express, and MongoDB. Utilizing Prisma 🔗 for database management, the API will provide robust functionality for handling product data, customer orders, and more. It includes features like product listings, user authentication, and order processing. As development progresses, it will offer efficient and scalable solutions for the store backend needs. 🔥' image={'/main_images/rb_2149379656.png'} stack={["Prisma", "NodeJs", "ExpressJs", "MongoDB"]} />
    </div>
    <div className='flex w-full flex-col flex-wrap sm:flex-row justify-between gap-6 mt-5 threeIn'>
    <Card link='https://planetdesert.com' title='PlanetDesert' description='I have been actively maintaining the PlanetDesrt site, a US-based e-commerce platform built on Shopify. 🛍️ My responsibilities include implementing new features as per client requirements, optimizing site performance, and ensuring a seamless user experience. Through continuous updates and enhancements, I strive to keep the site efficient, secure, and user-friendly, catering to its growing customer base.' image={'/main_images/planetdesert.png'} stack={["Shopify", "Javascript", "Liquid", "CSS"]} />
    <Card link='https://paufashion.com/' title='Paufashion' description='I built the PauFashion site from scratch using Shopify Liquid and JavaScript, following the clients requirements. 🛍️ The site is designed for a seamless shopping experience, with custom features, optimized performance, and a user-friendly interface. I ensured a fully tailored solution, integrating dynamic functionality while maintaining speed, security, and scalability for the growing business. 🚀' image={'/main_images/pau-fashion.png'} stack={["Shopify", "Liquid", "Javascript", "CSS"]} />
    <Card link='https://www.knovus.com.au/' title='Knovus' description='I worked with an Australian client to develop the Knovus e-commerce site on Shopify for their knitting business. 🧶🇦🇺 Using Shopify Liquid and JavaScript, I built a fully customized, feature-rich store with a seamless shopping experience, optimized performance, and a modern, user-friendly design. The site is meticulously tailored to the clients needs, ensuring smooth functionality, scalability, and ease of use. 🚀' image={'/main_images/knovus.png'} stack={["Shopify", "Liquid", "Javascript", "CSS"]} />
    </div>
    </div>
    <svg aria-hidden="true" className="svg-grid-work"><defs><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect></svg>
    </div>
  )
}

export default Work