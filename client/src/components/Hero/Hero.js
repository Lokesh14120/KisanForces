import React from "react";
import { Link } from "react-router-dom";



import DesignIllustration from "../../images/codepic.svg";


const Home = () => {
    return (
        <>

            <div className="relative">
                <div className="flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24">
                    <div className="relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left">
                        <h1 className="mt-20  md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 leading-tight text-4xl sm:text-6xl font-black tracking-wide">
                            Data Structures <span className="text-primary-500 text-indigo-400">And</span> Algorithms
                        </h1>
                        <p className="my-5 lg:my-8 text-base xl:text-lg">
                            The art of programming is the skill of organizing complexity.
                        </p>
                        <h6 className=" mt-40  md:text-2xl lg:text-3xl xl:text-4xl text-gray-900 leading-tight text-4xl sm:text-6xl font-black tracking-wide">
                            Think <span className="text-primary-500 text-indigo-400">Efficiently</span>
                        </h6>
                        <Link to={"/problemlist"} className="bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-300 mt-4">Practice Now</Link>


                    </div>
                    <div className="relative mt-12 lg:mt--16 flex-1 flex flex-col justify-center lg:self-end">
                        <div className="flex justify-center lg:justify-end items-center">
                            <img className="min-w-0 w-full max-w-lg xl:max-w-lg" src={DesignIllustration} alt="Design Illustration" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;