import renadylLogo from '@/public/renadyl_logo.svg';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="w-screen h-screen bg-backgroundPrimary flex justify-center items-center content-center">
            <Image
                src={renadylLogo}
                width={200}
                height={100}
                className='w-[200px]'
            />
        </div>
    )
}