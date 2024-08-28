'use client'

import React, { useState } from 'react';

const CreateNftForm = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [uri, setUri] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const nftData = {
      name,
      symbol,
      uri,
    };

    try {
      // Call your backend API to create the NFT
      const response = await fetch('/api/create-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nftData),
      });

      if (!response.ok) {
        throw new Error('Failed to create NFT');
      }

      // Handle success
      alert('NFT created successfully!');
      setName('');
      setSymbol('');
      setUri('');
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create NFT</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="symbol">Symbol</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="uri">URI</label>
          <input
            type="text"
            id="uri"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Create NFT
        </button>
      </form>
    </div>
  );
};

export default CreateNftForm;
