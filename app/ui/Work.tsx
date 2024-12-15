import React from 'react'
import Card from '../components/Card'

type Props = {}

const Work = (props: Props) => {
  return (
    <div className='work flex justify-center py-32 px-4'>
    <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto'>
    <div>
        <h2 className='sm:text-[5rem] text-5xl leading-[3.5rem] font-[Heading] uppercase sm:leading-[5rem] text-center mb-16'>Work</h2>
    </div>
    <div className='flex flex-col sm:flex-row justify-between gap-6 twoIn'>
      <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis. Quisque maximus sem vitae turpis aliquam, et interdum erat auctor. Duis iaculis in erat ac laoreet. Ut sit amet mollis quam. Suspendisse id nisl dolor.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
      <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis. Quisque maximus sem vitae turpis aliquam, et interdum erat auctor. Duis iaculis in erat ac laoreet. Ut sit amet mollis quam. Suspendisse id nisl dolor.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    </div>
    <div className='flex flex-col sm:flex-row justify-between gap-6 mt-5 threeIn'>
    <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    </div>
    </div>
    <svg aria-hidden="true" className="svg-grid-work"><defs><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect></svg>
    </div>
  )
}

export default Work