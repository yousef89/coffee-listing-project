"use client"
import Image from "next/image";
import Card from "./cards/card";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to show all products
  function showAllProducts() {
    setShowAvailableOnly(false);
  }

  // Function to show only available products
  function showAvailableProducts() {
    setShowAvailableOnly(true);
  }

  const filteredData = showAvailableOnly ? data.filter(item => item.available) : data;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#131215]">
      <img src="bg-cafe.jpg" alt="cafe background" className="absolute" />
      
      <div className="relative bg-[#1C1C1E] flex flex-col items-center font-sans rounded-[15px] w-[300px] sm:w-[700px] lg:w-[1050px] sm:pt-[30px] mt-[60px] py-[40px] mb-12 z-[1]">

        <svg className="absolute bottom-[1720px] sm:bottom-[950px] sm:left-[353px] md:bottom-[610px] md:left-[360px] lg:bottom-[680px] lg:left-[525px] z-[-1]" width="257" height="153" viewBox="0 0 257 153" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 71.8885C3.45531 57.3142 23.696 41.7169 33.6244 33.2805C66.0308 5.74397 114.381 -4.23546 155.905 5.8326C246.941 27.9052 154.103 161.746 80.308 136.587C52.5484 127.123 76.0283 89.2122 86.9341 76.2621C113.937 44.1978 164.916 27.0297 204.998 44.5915C239.889 59.8782 266.993 108.858 249.574 146.239C247.754 150.145 240.823 152.29 236.924 150.16C231.733 147.325 239.159 139.456 240.538 137.04" stroke="#302522" stroke-width="3" stroke-linecap="round"/>
        </svg>

        <h1 className="text-white text-[32px] font-400 sm:pt-[40px] md:pt-[50px] lg:pt-[40px]">Our Collection</h1>
        <p className="text-[#585C60] text-[16px] text-center font-600 pt-1 px-[40px] lg:max-w-[600px]">
          Introducing our Coffee Collection, 
          a selection of unique coffees from different
           roast types and origins, expertly roasted in 
           small batches and shipped fresh weekly.
        </p>

        <div className="flex gap-4 items-center justify-center py-6">
          <button
            className={`text-white py-[8px] px-[12px] font-600 rounded-[8px] duration-500 ${
              showAvailableOnly ? 'bg-transparent hover:bg-[#4a4e53]' : 'bg-[#6E757D]'
            }`}
            onClick={showAllProducts}
          >
            All Products
          </button>
          <button
            className={`text-white py-[8px] px-[12px] font-600 rounded-[8px] duration-500 ${
              showAvailableOnly ? 'bg-[#6E757D] ' : 'bg-transparent hover:bg-[#4a4e53]'
            }`}
            onClick={showAvailableProducts}
          >
            Available Now
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-[25px] sm:pb-[40px]">
          {filteredData.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}