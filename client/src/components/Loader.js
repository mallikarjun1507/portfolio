import React from 'react'

function Loader() {
    return (
        <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
            <div className='flex gap-5 text-6xl font-semibold sm:text-3xl'>
                <h1 className='text-secondary m'>M</h1>
                <h1 className='text-white b'>B</h1>
                <h1 className='text-tertiry y'>Y</h1>

            </div>

        </div>
    )
}

export default Loader
