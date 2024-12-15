import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='flex justify-center py-32'>
        <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto'>
            <div className='flex justify-center'>
                <h1 className='font-[MainFont] text-[100px] leading-[60px] uppercase font-bold text-center md:leading-[100px]' style={{
                    fontSize: 'clamp(4rem, 10vw, 7rem)',
                    textShadow: '0 5px 10px rgba(0, 87, 255, .1), 0 -5px 8px rgba(255, 90, 0, .15), 0 0 15px hsla(0, 0%, 100%, .15)'
                }}>
                    <span className='block'>Cooking</span>
                    <span className='block'>Things</span>
                    <span className='block'>For Web</span>
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Hero