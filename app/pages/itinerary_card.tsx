import React from 'react';

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

type ItineraryCardProps = {
  itinerary: Itinerary;
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Day {itinerary.id} : {itinerary.heading}
      </h2>
      {itinerary.image && (
        <img
          src={itinerary.image}
          alt={itinerary.heading}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <ul className="space-y-2">
        {itinerary.bullet_points.map((point, index) => (
          <li key={index} className="text-gray-700">
            <strong className="text-gray-900">{point.name}:</strong> {point.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryCard;