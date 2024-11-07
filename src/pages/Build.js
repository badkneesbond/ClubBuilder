import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// Import images
import californiaImg from '../assets/images/california.png';
import floridaImg from '../assets/images/california.png';
import texasImg from '../assets/images/california.png';
import otherImg from '../assets/images/kbs.jpg';

import shaftKbsImg from '../assets/images/kbs.jpg';
import projectXImg from '../assets/images/ProjectX.jpg';
import ventusImg from '../assets/images/ventus.jpg';

import callawayIron from '../assets/images/CallawayLogo.JPG';
import cobraIron from '../assets/images/CobraLogo.JPG';
import miuraIron from '../assets/images/MiuraLogo.JPG';
import mizunoIron from '../assets/images/MizunoLogo.JPG';
import pingIron from '../assets/images/PingLogo.JPG';
import srixonIron from '../assets/images/SrixonLogo.JPG';
import taylorMadeIron from '../assets/images/TaylorMadeLogo.JPG';
import titleistIron from '../assets/images/TitleistLogo.JPG';

function CascadingDropdowns() {
  const location = useLocation(); 
  const [selectedBrand, setSelectedBrand] = useState('');
  const [availablebrands, setAvailablebrands] = useState([]);
  const [selectedShaft, setSelectedShaft] = useState('');
  const [alignment, setAlignment] = useState('right');
  const [pure, setPure] = useState('right');
  const [adjustment, setAdjustment] = useState('none');
  const [lieangle, setLieangle] = useState('none');
  
  const [selectedImageOption, setSelectedImageOption] = useState(null);
  const [selectedClubs, setSelectedClubs] = useState(['P', '9', '8', '7', '6', '5', '4', '3']);
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollContainerRef = useRef(null); // Ref for the scrollable container
  let scrollInterval = useRef(null); // Ref to store interval ID

  const brands = {
    Apex: ['KBS', 'Ventus', 'ProjectX'],
    'Big Bertha': ['KBS', 'Ventus', 'ProjectX'],
    'King Tour Black': ['KBS', 'Ventus', 'ProjectX'],
    'Cobra Limit3D': ['KBS', 'Ventus', 'ProjectX'],
    'AS-1': ['KBS', 'Ventus', 'ProjectX'],
    'KM-700': ['KBS', 'Ventus', 'ProjectX'],
    'JPX 923 Tour': ['KBS', 'Ventus', 'ProjectX'],
    'Blueprint': ['KBS', 'Ventus', 'ProjectX'],
    'ZX7': ['KBS', 'Ventus', 'ProjectX'],
    'P770': ['KBS', 'Ventus', 'ProjectX'],
    'P790': ['KBS', 'Ventus', 'ProjectX'],
    'T100': ['KBS', 'Ventus', 'ProjectX'],
  };

  // Shaft image mapping
  const shaftImages = {
    KBS: shaftKbsImg,
    Ventus: ventusImg,
    ProjectX: projectXImg,
  };

  const imageOptions = [
    { id: 1, imgSrc: callawayIron, label: 'Callaway', brands: ['Apex', 'Big Bertha'] },
    { id: 2, imgSrc: cobraIron, label: 'Cobra', brands: ['King Tour Black', 'Cobra Limit3D'] },
    { id: 3, imgSrc: miuraIron, label: 'Miura', brands: ['AS-1', 'KM-700'] },
    { id: 4, imgSrc: mizunoIron, label: 'Mizuno', brands: ['JPX 923 Tour', 'JPX 943 Pro'] },
    { id: 5, imgSrc: pingIron, label: 'Ping', brands: ['Blueprint', 'G425'] },
    { id: 6, imgSrc: srixonIron, label: 'Srixon', brands: ['ZX7', 'ZX4'] },
    { id: 7, imgSrc: taylorMadeIron, label: 'Taylormade', brands: ['P770', 'P790'] },
    { id: 8, imgSrc: titleistIron, label: 'Titleist', brands: ['T100', 'T150'] },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const brandParam = queryParams.get('brand');
    const modelParam = queryParams.get('model');

    if (brandParam) {
      const preselectedBrand = imageOptions.find(
        (option) => option.label.toLowerCase() === brandParam.toLowerCase()
      );

      if (preselectedBrand) {
        setSelectedImageOption(preselectedBrand);
        setAvailablebrands(preselectedBrand.brands);
        setSelectedBrand(''); // Reset selected model
      }
      // If a model is provided and is valid, preselect the model
      if (modelParam && preselectedBrand.brands.includes(modelParam)) {
        setSelectedBrand(modelParam);
      } else {
        setSelectedBrand(''); // Reset selected model if model is not valid
      }
    }
  }, [location.search]);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedShaft('');
  };

  const handleShaftChange = (shaft) => {
    setSelectedShaft(shaft);
  };

  const handleAlignmentChange = (e) => {
    if (!selectedImageOption) {
      setErrors((prevErrors) => ({ ...prevErrors, alignment: 'Please select a brand image first.' }));
      return;
    }
    setAlignment(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, alignment: '' }));
  };
  const handlePureChange = (e) => {
    if (!selectedImageOption) {
      setErrors((prevErrors) => ({ ...prevErrors, pure: 'Please select a brand image first.' }));
      return;
    }
    setPure(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, pure: '' }));
  };


  const handleAdjustmentChange = (e) => {
    if (!selectedImageOption) {
      setErrors((prevErrors) => ({ ...prevErrors, adjustment: 'Please select a brand image first.' }));
      return;
    }
    setAdjustment(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, Adjustment: '' }));
  };
  
  const handleLieangleChange = (e) => {
    if (!selectedImageOption) {
      setErrors((prevErrors) => ({ ...prevErrors, lieangle: 'Please select a brand image first.' }));
      return;
    }
    setLieangle(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, Lieangle: '' }));
  };

  const handleImageSelect = (optionId) => {
    const selectedOption = imageOptions.find((option) => option.id === optionId);
    if (selectedOption) {
      setSelectedImageOption(selectedOption);
      setAvailablebrands(selectedOption.brands);
      setSelectedBrand('');
      setSelectedShaft('');
      setAlignment('right');
      setPure('Yes');
      setSelectedClubs(['P', '9', '8', '7', '6', '5', '4', '3']);
      setErrors({});
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setFormSubmitted(false);
      setErrors((prevErrors) => ({ ...prevErrors, image: '', alignment: '', clubs: '' }));
    }
  };

  const handleClubSelection = (club) => {
    if (!selectedImageOption) {
      setErrors((prevErrors) => ({ ...prevErrors, clubs: 'Please select a brand image first.' }));
      return;
    }
    setSelectedClubs((prevSelectedClubs) =>
      prevSelectedClubs.includes(club)
        ? prevSelectedClubs.filter((c) => c !== club)
        : [...prevSelectedClubs, club]
    );
    setErrors((prevErrors) => ({ ...prevErrors, clubs: '' }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      firstName,
      lastName,
      email,
      phone,
      alignment,
      pure,
      adjustment,
      lieangle,
      brand: selectedImageOption?.label,
      model: selectedBrand,
      shaft: selectedShaft,
      clubs: selectedClubs.join(', '),
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/updateXml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('XML updated successfully');
  
        // Clear form data
        
        // Set formSubmitted to true to indicate successful submission
        setFormSubmitted(true);
      } else {
        console.error('Error updating XML');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Function to start scrolling left
  const startScrollLeft = () => {
    scrollInterval.current = setInterval(() => {
      scrollContainerRef.current.scrollBy({ left: -5, behavior: 'smooth' });
    }, 10); // Adjust speed by changing the interval duration
  };

  // Function to start scrolling right
  const startScrollRight = () => {
    scrollInterval.current = setInterval(() => {
      scrollContainerRef.current.scrollBy({ left: 5, behavior: 'smooth' });
    }, 10); // Adjust speed by changing the interval duration
  };

  // Function to stop scrolling
  const stopScroll = () => {
    clearInterval(scrollInterval.current);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Club Builder</h2>
        {formSubmitted ? (
        // Success message when the form is submitted successfully
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          <h3 className="text-xl font-semibold">Form Submitted Successfully!</h3>
          <p>Thank you for submitting your preferences. We will be in touch shortly.</p>
          <p>
          Alignment: {alignment}, Pured: {pure}, Adjustment: {adjustment}, Lie Angle: {lieangle}, Brand: {selectedImageOption.label}, Model: {selectedBrand}, Shaft: {selectedShaft}, Clubs: {selectedClubs.join(', ')}
        </p>
        </div>
        
      ) : (
        <>

<div className="flex space-x-6"> {/* Flex container for two-column layout */}
  
  {/* Left Column: 1x8 Grid Select Control */}
  <div className="w-1/4">
    <h3 className="text-lg font-medium text-gray-700 mb-2">Select Brand:</h3>
    <div className="grid grid-rows-8 gap-4"> {/* 1x8 grid layout */}
      {imageOptions.map((option) => (
        <div
          key={option.id}
          className={`flex-none h-20 p-2 border rounded-lg cursor-pointer flex items-center justify-center ${
            selectedImageOption && selectedImageOption.id === option.id
              ? 'border-indigo-500'
              : 'border-gray-300'
          }`}
          onClick={() => handleImageSelect(option.id)}
        >
          <img
            src={option.imgSrc}
            alt={option.label}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ))}
    </div>
    {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
  </div>

  {/* Right Column: Rest of the Controls */}
  <div className="w-3/4">
    
    {/* Brand and Shaft Dropdowns at the Top */}
    {selectedImageOption && (
      <>
        <label htmlFor="Brand" className="block text-lg font-medium text-gray-700 mb-2">
          Select Model:
        </label>
        <select
          id="Brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        >
          <option value="">Select a Model</option>
          {availablebrands.map((Brand, index) => (
            <option key={index} value={Brand}>
              {Brand}
            </option>
          ))}
        </select>
      </>
    )}

    {selectedBrand && brands[selectedBrand] && (
      <>
        <label htmlFor="shaft" className="block text-lg font-medium text-gray-700 mb-2">
          Select a Shaft:
        </label>
        <div className="relative">
          <div className="w-full bg-white border border-gray-300 rounded-lg">
            {brands[selectedBrand].map((shaft) => (
              <div
                key={shaft}
                onClick={() => handleShaftChange(shaft)}
                className={`flex flex-col justify-start p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedShaft === shaft ? 'bg-indigo-50' : ''
                }`}
              >
                <span className="text-gray-700 mb-2">{shaft}</span>
                <img
                  src={shaftImages[shaft] || otherImg}
                  alt={shaft}
                  className="w-full h-[40px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </>
    )}

    {/* Alignment Select Control */}
    {selectedImageOption && (
      <>
        <label htmlFor="alignment" className="block text-lg font-medium text-gray-700 mb-2">
          Select Hand:
        </label>
        <select
          id="alignment"
          value={alignment}
          onChange={handleAlignmentChange}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        >
          <option value="right">Right</option>
          <option value="left">Left</option>
        </select>
        {errors.alignment && <p className="text-red-500 text-sm mt-2">{errors.alignment}</p>}
      </>
    )}

    {/* Pure Select Control */}
    {selectedImageOption && (
      <>
        <div className="flex items-center mb-4">
          <label htmlFor="pure" className="mr-2 text-lg font-medium text-gray-700 mb-2">
            Do you want to Pure your shafts:
          </label>
          <div>
            <a href="https://sstpure.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://sstpure.com/wp-content/uploads/2018/02/sst-pure-logo-1.png"
                alt="Pure Website"
                style={{ width: '130px', height: '40px' }}
              />
            </a>
          </div>
        </div>
        <select
          id="pure"
          value={pure}
          onChange={handlePureChange}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.pure && <p className="text-red-500 text-sm mt-2">{errors.pure}</p>}
      </>
    )}

   {/* adjustment Select Control */}
   {selectedImageOption && (
          <>
            <label htmlFor="adjustment" className="block text-lg font-medium text-gray-700 mb-2">
              Length Adjustment (inches):
            </label>
            <select
              id="adjustment"
              value={adjustment}
              onChange={handleAdjustmentChange}
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            >
              <option value="none">none</option>
              <option value=".25">+.25</option>
              <option value=".5">+.5</option>
              <option value=".75">+.75</option>
              <option value=".1">+1</option>
              <option value="1.25">+1.25</option>
              <option value="1.5">+1.5</option>
              <option value="1.75">+1.75</option>
              <option value="2">+2</option>
              <option value="-.25">-.25</option>
              <option value="-.5">-.5</option>
              <option value="-.75">-.75</option>
              <option value="-.1">-1</option>
              <option value="-1.25">-1.25</option>
              <option value="-1.5">-1.5</option>
              <option value="-1.75">-1.75</option>
              <option value="-2">-2</option>
              

            </select>
        {errors.adjustment && <p className="text-red-500 text-sm mt-2">{errors.adjustment}</p>}
      </>
    )}

    {/* lieangle Select Control */}
    {selectedImageOption && (
          <>
            <label htmlFor="lieangle" className="block text-lg font-medium text-gray-700 mb-2">
              Lie Angle:
            </label>
            <select
              id="lieangle"
              value={lieangle}
              onChange={handleLieangleChange}
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            >
              <option value="none">none</option>
              <option value=".5 Deg up">.5 Deg up</option>
              <option value="1 Deg up">1 Deg up</option>
              <option value="1.5 Deg up">1.5 Deg up</option>
              <option value="2 Deg up">2 Deg up</option>
              <option value="2.5 Deg up">2.5 Deg up</option>
              <option value="3 Deg up">3 Deg up</option>
              <option value="3.5 Deg up">3.5 Deg up</option>
              <option value="4 Deg up">4 Deg up</option>
              <option value=".5 Deg flat">.5 Deg flat</option>
              <option value="1 Deg flat">1 Deg flat</option>
              <option value="1.5 Deg flat">1.5 Deg flat</option>
              <option value="2 Deg flat">2 Deg flat</option>
              <option value="2.5 Deg flat">2.5 Deg flat</option>
              <option value="3 Deg flat">3 Deg flat</option>
              <option value="3.5 Deg flat">3.5 Deg flat</option>
              <option value="4 Deg flat">4 Deg flat</option>
              
              

            </select>
        {errors.lieangle && <p className="text-red-500 text-sm mt-2">{errors.lieangle}</p>}
      </>
    )}

    {/* Club Multi Select Control */}
    {selectedImageOption && (
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Select Clubs:</h3>
        <div className="flex flex-wrap gap-2">
          {['G', 'P', '9', '8', '7', '6', '5', '4', '3', '2'].map((club) => (
            <div
              key={club}
              className={`w-12 h-12 flex items-center justify-center border rounded-lg cursor-pointer ${
                selectedClubs.includes(club) ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleClubSelection(club)}
            >
              {club}
            </div>
          ))}
        </div>
        {errors.clubs && <p className="text-red-500 text-sm mt-2">{errors.clubs}</p>}
      </div>
    )}

    {selectedShaft && selectedImageOption && (
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <h3 className="text-lg font-semibold">Setup:</h3>
        <p>
          Alignment: {alignment}, Pured: {pure}, Length Adjustment: {adjustment}, Lie Angle:{lieangle}, Brand: {selectedImageOption.label}, Model: {selectedBrand}, Shaft: {selectedShaft}, Clubs: {selectedClubs.join(', ')}
        </p>
      </div>
    )}
  </div>
</div>



        {/* User Information Form */}
        {selectedShaft && (
          <form onSubmit={handleFormSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Submit
            </button>
          </form>
        )}
        </>
      )}
      </div>
    </div>
  );
}

export default CascadingDropdowns;
