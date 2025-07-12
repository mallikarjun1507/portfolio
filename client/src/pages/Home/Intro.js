import React from 'react';
import { useSelector } from "react-redux";

function Intro() {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { intro } = portfolioData;
    const { first_name, last_name, welcome_text, description, caption } = intro;
    return (
        <div className="h-[80vh] bg-primary flex flex-col items-start justify-enter gap-8 py-10">
            <h1 className='text-white'>{welcome_text || ""}</h1>
            <h1 className='text-7xl sm:text-3xl text-secondary font-semibold'>{first_name || ""} {last_name || ""}</h1>
            <h1 className='text-7xl sm:text-3xl text-white font-semibold'>{caption || ""}</h1>
            <p className='text-white 2/3'> {description || ""} </p>
            <button className='border-2 border-tertairy text-tertairy px-10 py-3 rounded'>Get Started</button>

        </div>
    )
}
export default Intro; 