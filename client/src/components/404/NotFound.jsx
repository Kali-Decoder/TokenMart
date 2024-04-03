import React from 'react'
import BackGradients from '../BackGradients'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <BackGradients />
            <div className='flex flex-col h-screen justify-center items-center bg-black'>
                <h1 className='m-4 text-[12rem] text-[#4f46e5] font-semibold'>Oops!</h1>
                    <h2 className='text-white font-semibold mt-[2vh] mb-[1vh]'>404 - PAGE NOT FOUND</h2>
                    <p className='text-white'>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
                <Link to={'/'} className='mt-[4vh]'>
                    <a className='bg-[#4f46e5] w-[10vw] rounded-full text-white text=[4rem] p-3'>Go To HomePage</a>
                </Link>
            </div>
        </>
    )
}

export default NotFound