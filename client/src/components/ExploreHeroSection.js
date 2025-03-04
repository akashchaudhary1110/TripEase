import React from 'react'
import NearbyPlaces from './NearbyFetch'
import CreateItineraryModal from './CreateItineraryModal'

const ExploreHeroSection = ({coordinates,exploreVideo,error,isModalOpen,setIsModalOpen}) => {
  return (
    <>
       
    <div className="w-full mt-6 flex justify-center ">
      {!coordinates? (
        <div className="flex flex-col items-center text-center space-y-4 ">
          <h2
            className="text-5xl md:text-8xl   text-yellow-400"
            style={{ fontFamily: "Fascinate Inline, cursive" }}
          >
            Search the city you want to Explore
          </h2>
          {/* Responsive Video */}
          <div className="w-full max-w-3xl flex justify-center items-center">
            <video
              src={exploreVideo}
              autoPlay
              loop
              muted
              className="w-[80%] h-auto rounded-lg "
            />
          </div>
        </div>
      ):(
<div className="w-full overflow-hidden">
        <NearbyPlaces coordinates={coordinates} />
      </div>
      )}
    </div>
    {error && (
      <p className="text-red-500 text-center text-lg mt-2">{error}</p>
    )}
    {isModalOpen && (
      <CreateItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    )}
   </>
  )
}

export default ExploreHeroSection