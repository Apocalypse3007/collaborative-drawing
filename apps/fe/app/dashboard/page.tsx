"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { HTTP_BACKEND } from "@/config";
import Link from 'next/link';

interface Room {
  id: string;
  name: string;
  createdAt: string;
  lastActive: string;
}

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${HTTP_BACKEND}/rooms`);
        setRooms(data.rooms);
      } catch (err) {
        setError('Failed to load rooms');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101c2c] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101c2c] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">Error</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101c2c] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Drawing Rooms</h1>
          <Link 
            href="/rooms/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Create New Room
          </Link>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12 bg-[#1a2b44] rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-white">No Rooms Found</h3>
            <p className="text-gray-300">Create a new room to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link 
                key={room.id}
                href={`/canvas/${room.id}`}
                className="block bg-[#1a2b44] p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{room.name}</h3>
                <div className="text-sm text-gray-300">
                  <p>Created: {new Date(room.createdAt).toLocaleDateString()}</p>
                  <p>Last active: {new Date(room.lastActive).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 