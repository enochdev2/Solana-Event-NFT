import React from 'react';
import ComputersCanvas from './canvas/Computers';

const Hero = () => {
  return (
    <div className=" relative flex flex-col h-screen md:flex-row items-start justify-between  text-white">
      <ComputersCanvas/>
      {/* Left Side: Text and Button */}
      <div className=" absolute top-1 left-8flex-1 md:w-1/2 p-4 lg:pl-20 mt-28 space-y-16">
      <div className='bg-gradient-to-r from-[#1d0318]/20 via-[#220606] /20 to-[#10011b]/20 backdrop-blur-sm px-2 py-3'>
        <h1 className="text-5xl font-bold  bg-gradient-to-r from-[#f305cb] via-[#ff0000] to-[#8c06fa] text-transparent mb-10 bg-clip-text">
        Welcome to our events and NFTs platform.
        </h1>
      </div>
        <p className="text-2xl font-semibold mb-6  bg-black/20 text-purple-100 px-5 py-3 rounded-xl  ">
        Join our NFT event marketplace to explore exclusive NFT drops, connect with creators, and bid on unique digital assets. Our platform, built on the Solana blockchain, allows event organizers to create unique events and sell tickets as NFTs. Experience a new way to engage with the world of digital art and collectibles.
        </p>
        <button>
        <a
          href="/explore"
          className="bg-gradient-to-r from-[#eb0ebf] via-[#e21c1c] to-[#9206f7] backdrop-blur-lg text-xl font-bold  text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Explore Now
        </a>
        </button>
      </div>

      {/* Right Side: Image */}
      {/* <div className="flex-1 md:w-1/2 p-4">
        <img
          src='nft.png'
          alt="NFT Event"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div> */}
    </div>
  );
};

export default Hero;
