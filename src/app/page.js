"use client"
import Image from "next/image";
import Card1 from "./cards/card1";
import Card2 from "./cards/card2";
import Card3 from "./cards/card3";
import Card4 from "./cards/card4";
import Card5 from "./cards/card5";
import Card6 from "./cards/card6";
import FetchData1 from "./cards/fetch";
import { useState , useEffect } from "react";

export default function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Store each data object by ID
  const cardData = (id) => data.find(item => item.id === id);

  return (
    <div className="bg-[#131215] min-h-screen flex flex-col justify-start items-center">
      <img src="bg-cafe.jpg" alt="cafe background" className="w-auto h-min"></img>

      <div className="bg-[#1C1C1E] flex flex-col items-center font-sans px-[170px] rounded-[15px] pt-[60px] pb-[23px] absolute z-[1]">

        <h1 className="text-white text-[32px] font-400">Our Collection</h1>
        <p className="text-[#585C60] text-[16px] text-center w-[500px] font-600 pt-1">Introducing our Coffee Collection, 
          a selection of unique coffees from different
           roast types and origins, expertly roasted in 
           small batches and shipped fresh weekly.</p>

        <div className="flex gap-4 items-center justify-center pt-5 pb-12">
        <button className="text-white bg-[#6E757D] py-[8px] px-[14px] font-600 rounded-[8px] hover:bg-[#4a4e53] duration-500">All Products</button>
        <button className="text-white font-600 py-[8px] px-[14px] rounded-[8px] hover:bg-[#6E757D] duration-500">Available Now</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-[56px]">
          <Card1 {...cardData(1)} />
          <Card2 {...cardData(2)} />
          <Card3 {...cardData(3)} />
          <Card4 {...cardData(4)} />
          <Card5 {...cardData(5)} />
          <Card6 {...cardData(6)} />
        </div>
      </div>
    </div>
  );
}
