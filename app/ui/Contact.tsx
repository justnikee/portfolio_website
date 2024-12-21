import React from 'react'
import MaskContainer from '../components/MaskContainer'

type Props = {}

const Contact = (props: Props) => {
  return (
    <div id='Contact' className='flex justify-center py-32 px-5'>
        <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto relative'>
        <MaskContainer title="Let's Build Something Great!!" 
        email='nikhil98161@gmail.com' 
        description="I'm always open to new opportunities, collaborations, and connections. Feel free to reach out to ask a question, share your project idea, talk about cats or the meaning of life."/>
        </div>
    </div>
  )
}

export default Contact