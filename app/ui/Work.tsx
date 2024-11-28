import React from 'react'
import Card from '../components/Card'

type Props = {}

const Work = (props: Props) => {
  return (
    <div className='flex justify-center sm:py-32 py-4'>
    <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto'>
    <div>
        <h2 className='sm:text-[5rem] font-[Heading] uppercase leading-[5rem] text-center mb-16'>Work</h2>
    </div>
    <div className='flex justify-between gap-6 twoIn'>
      <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis. Quisque maximus sem vitae turpis aliquam, et interdum erat auctor. Duis iaculis in erat ac laoreet. Ut sit amet mollis quam. Suspendisse id nisl dolor.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
      <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis. Quisque maximus sem vitae turpis aliquam, et interdum erat auctor. Duis iaculis in erat ac laoreet. Ut sit amet mollis quam. Suspendisse id nisl dolor.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    </div>
    <div className='flex justify-between gap-6 mt-5 threeIn'>
    <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    <Card title='Ecommerce Api' description='Api for ecommerce store Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in interdum metus. Vestibulum hendrerit augue porttitor lacus tristique ultricies. Vestibulum id quam quam. Curabitur nec ligula tincidunt, sagittis sem nec, congue turpis.' image={'/main_images/rb_2149379656.png'} stack={["JavaScript", "NodeJs", "ExpressJs", "MongoDB"]} />
    </div>
    </div>
    </div>
  )
}

export default Work