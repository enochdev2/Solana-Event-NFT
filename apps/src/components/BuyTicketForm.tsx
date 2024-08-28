'use client'

import React, { useState, useEffect } from 'react';

const BuyTicketForm = () => {
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [ticketStatus, setTicketStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch event details on component mount
    const fetchEventDetails = async () => {
      try {
        const response = await fetch('/api/event-details');
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEventDetails(data);
      } catch (err:any) {
        setError(err.message);
      }
    };
    

    fetchEventDetails();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const purchaseData = {
      date_of_purchase: new Date(dateOfPurchase).getTime() / 1000, // Convert to UNIX timestamp
    };

    try {
      const response = await fetch('/api/buy-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (!response.ok) {
        throw new Error('Failed to buy ticket');
      }

      setTicketStatus('Ticket bought successfully!');
      setDateOfPurchase('');
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Buy Ticket</h1>

      {/* Event Details Section */}
      {eventDetails ? (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Event Details</h2>
          <p className="text-gray-700"><strong>Title:</strong> {eventDetails.title}</p>
          <p className="text-gray-700"><strong>Date:</strong> {new Date(eventDetails.date).toLocaleString()}</p>
          <p className="text-gray-700"><strong>Location:</strong> {eventDetails.location}</p>
          <p className="text-gray-700"><strong>Price:</strong> {eventDetails.ticket_price / 1000000000} SOL</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading event details...</p>
      )}

      {/* Error and Ticket Status */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {ticketStatus && <p className="text-green-500 mb-4">{ticketStatus}</p>}

      {/* Buy Ticket Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="dateOfPurchase">Date of Purchase</label>
          <input
            type="datetime-local"
            id="dateOfPurchase"
            value={dateOfPurchase}
            onChange={(e) => setDateOfPurchase(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Buy Ticket
        </button>
      </form>
    </div>
  );
};

export default BuyTicketForm;
