import Image from 'next/image'

export default function Background() {
  return (
    <div className='h-screen w-screen fixed -z-50'>
      <Image src="/images/background.png" alt="background" className='object-cover overflow-hidden' />
    </div>
  )
}
