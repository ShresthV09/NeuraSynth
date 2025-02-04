import React, { useEffect, useState } from 'react';
import ItineraryCard from './itinerary_card';

type BulletPoint = {
  name: string;
  text: string;
};

type Itinerary = {
  id: number;
  heading: string;
  image: string;
  bullet_points: BulletPoint[];
};

type ItineraryData = {
  title: string;
  array: Itinerary[];
};

const defaultItineraryData: ItineraryData = {
  title: "My Dynamic Itinerary",
  array: [
    {
      id: 1,
      heading: "Arrival in Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bullet_points: [
        {
          name: "Morning",
          text: "Arrive in Tokyo, go through customs and immigration, and check into the hotel.",
        },
        {
          name: "Afternoon",
          text: "Visit Shibuya Crossing, Hachiko Statue, and explore the Shibuya area."
        },
        {
          name: "Evening",
          text: "Dine in Omoide Yokocho, a lively alley full of small restaurants and bars."
        }
      ]
    },
    {
      id: 2,
      heading: "Explore Kyoto",
      image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      bullet_points: [
        {
          name: "Morning",
          text: "Visit Fushimi Inari-taisha Shrine and enjoy the scenic trails."
        },
        {
          name: "Afternoon",
          text: "Explore Kinkaku-ji (Golden Pavilion) and nearby attractions."
        },
        {
          name: "Evening",
          text: "Stroll around Gion District and spot traditional teahouses."
        }
      ]
    }
  ]
};

const ItineraryPage: React.FC = () => {
  const [itineraryData, setItineraryData] = useState<ItineraryData>(defaultItineraryData); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch('https://your-api-url.com/itinerary');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data: ItineraryData = await response.json();
        setItineraryData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading itinerary...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!itineraryData.array.length) return <p className="text-center text-gray-500">No itineraries available.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        {itineraryData.title}
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {itineraryData.array.map((itinerary) => (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;