import React from 'react';
import { useSelector } from 'react-redux';
import Sectiontitle from '../../components/Sectiontitle';
function About() {
    
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { about } = portfolioData;
    const { skills , lottie_url, description } = about;

    return (
        <div>
            <Sectiontitle title='About' />
            <div className='flex  w-full item-center sm:flex-col'>
                <div className='h-[70vh] w-1/2 sm:w-full'>
                    <lottie-player src={lottie_url} speed="1" autoplay>
                    </lottie-player>


                </div>
                <div className='flex flex-col items-center gap-5 w-1/2 mt-24 sm:w-full'>
                    <p className='text-white'>{description || "" }</p>


                </div>
            </div>
            <div className='py-5'>
                <h1 className='text-tertairy text-xl'>Here are few tecnologies I have been working with recently:</h1>

                <div className='flex flex-wrap gap-10 mt-5'>
                    {skills.map((skill, index) => (
                        <div key={index} className='border border-tertairy py-3 px-10'>
                            <h1 className='text-tertairy'>{skill}</h1>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default About;

