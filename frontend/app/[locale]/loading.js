import React from 'react'
import Image from 'next/image';
import renadylLogo from '../../public/renadyl_logo.svg'

export default function Loading() {
    return (<div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center'>
    <Image
        src={renadylLogo}
        width={300}
        className='animate-pulse'
    />
</div>)
}