import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Model to image mapping

import genericImage from '../assets/images/Callaway-Apex.JPG'; // Replace with actual generic image path
import CallawayApexImage from  '../assets/images/Callaway-Apex.JPG'; 
import CallawayBigBerthaImage from  '../assets/images/Callaway-BigBertha.JPG';
import CobraKingTourBlackImage from  '../assets/images/Cobra-KingTourBlack.JPG';
import CobraLimit3DImage from  '../assets/images/Cobra-Limit3D.JPG';
import Mizuno243TourImage from  '../assets/images/Mizuno-243Tour.JPG'; 
import MizunoJPX923TourImage from  '../assets/images/Mizuno-JPX923Tour.JPG';
import PingBluePrintImage from  '../assets/images/Ping-Blueprint.jpg';
import PingG425Image from  '../assets/images/Ping-G425.JPG';
import SrixonZX4Image from  '../assets/images/Srixon-ZX4.JPG'; 
import SrixonZX7Image from  '../assets/images/Srixon-ZX7.JPG'; 
import TaylorMadeP770Image from  '../assets/images/Taylormade-P770.JPG'; 
import TaylorMadeP790Image from  '../assets/images/Taylormade-P790.JPG'; 
import TitleistT100Image from  '../assets/images/Titleist-T100.JPG';
import TitleistT150Image from  '../assets/images/Titleist-T150.JPG';
// Brand and club data
const brandClubData = {
  Callaway: ['Apex', 'Big Bertha'],
  Cobra: ['King Tour Black', 'Cobra Limit3D'],
  Mizuno: ['JPX 923 Tour', 'JPX 943 Pro'],
  Ping: ['Blueprint', 'G425'],
  Srixon: ['ZX7', 'ZX4'],
  TaylorMade: ['P770', 'P790'],
  Titleist: ['T100', 'T150'],
  // Add additional brands and models here
};


// Add imports for all model images

const modelImages = {
  Apex: CallawayApexImage,
  'Big Bertha': CallawayBigBerthaImage,
  'King Tour Black': CobraKingTourBlackImage,
  'Cobra Limit3D': CobraLimit3DImage,
  '243 Tour': Mizuno243TourImage,
  'JPX 923 Tour': MizunoJPX923TourImage,
  Blueprint: PingBluePrintImage,
  G425: PingG425Image,
  ZX4: SrixonZX4Image,
  ZX7: SrixonZX7Image,
  P770: TaylorMadeP770Image,
  P790: TaylorMadeP790Image,
  T100: TitleistT100Image,
  T150: TitleistT150Image,
};

function Home() {
  const [selectedBrand, setSelectedBrand] = useState('');

  const allModels = Object.entries(brandClubData).flatMap(([brand, models]) =>
    models.map((model) => ({ brand, model }))
  );

  const displayedModels = selectedBrand
    ? allModels.filter((item) => item.brand === selectedBrand)
    : allModels;

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <div>
      <h1></h1>
      
      {/* Brand Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="brandSelect" className="text-lg font-medium">Select Brand:</label>
        <select
          id="brandSelect"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="ml-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Brands</option>
          {Object.keys(brandClubData).map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

       {/* Grid of Club Images */}
       <div className="grid grid-cols-4 gap-1">
        {displayedModels.map(({ brand, model }) => (
          <Link
            key={model}
            to={`/build?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`}
          >
            <div className="flex items-center justify-center w-50 h-50 border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={modelImages[model] || genericImage}
                alt={model}
                className="object-contain"
                style={{ width: '200px', height: '200px' }}
              />
              <p className="text-center mt-2">{model}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
