import React from 'react';
import { useSelector } from "react-redux";

function Intro() {
    const { loading, portfolioData } = useSelector((state) => state.root);

    // Use optional chaining and fallback to empty objects to avoid destructure errors
    const intro = portfolioData?.intro || {};
    const {
        first_name = "",
        last_name = "",
        welcome_text = "",
        description = "",
        caption = ""
    } = intro;

    if (loading || !portfolioData) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <span className="text-white text-2xl animate-pulse">Loading...</span>
            </div>
        );
    }

    return (
        <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10 px-10 sm:px-5">
            <h1 className='text-white'>{welcome_text}</h1>
            <h1 className='text-7xl sm:text-3xl text-secondary font-semibold'>
                {first_name} {last_name}
            </h1>
            <h1 className='text-7xl sm:text-3xl text-white font-semibold'>{caption}</h1>
            <p className='text-white w-2/3 sm:w-full'>{description}</p>
            <button className='border-2 border-tertairy text-tertairy px-10 py-3 rounded'>
                Get Started
            </button>
        </div>
    );
}

export default Intro;
