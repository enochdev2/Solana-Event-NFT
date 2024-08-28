"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js"
import { useRouter } from "next/navigation";
import { getAnchorProgram } from "./anchorUtils";
import idl from "./anchor/idl/idl.json"


const DisplayItem = () => { 
    const router = useRouter()
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [pda, setPda] = useState<null | string>(null);
    const [events, setEvents] = useState<any>([]);
    const wallet = useAnchorWallet();



    useEffect(() => {
      const fetchEvents = async () => {
          if (!wallet?.publicKey) {
              return;
          }

          // Récupère le programme Anchor et le Provider.
          const { connection, program } = getAnchorProgram(wallet);

          try {
              // Récupère les comptes du programme.
              const accounts = await connection.getProgramAccounts(new PublicKey(idl.address));

              // Récupère les données de chaque compte événement.
              const eventAccounts = await Promise.all(
                  accounts.map(async ({ pubkey, accoun }:any) => {
                      try {
                          const fetchedAccountData = await program.account.event.fetch(pubkey);

                          return {
                              publicKey: pubkey,
                              accountData: fetchedAccountData,
                          };
                      } catch (e) {
                          return null;
                      }
                  }),
              );

              // Filtre les comptes valides et met à jour l'état.
              setEvents(eventAccounts.filter((account:any) => account !== null));
          } catch (err) {
              console.error("Failed to fetch events.", err);
          }
      };

      fetchEvents();
  }, [wallet]);


    // const fetchData = async () => {
    
    //     try {
    //       if (connection && publicKey && program) {
    //         const { pdaAddress, bump } = getPda(publicKey);
    //         setPda(pdaAddress.toString());
    //         const data = await program.account.todoState.fetch(pdaAddress);
    //         console.log("data is", data);
    //         setTodos(data.todos);
    //       }
    //     } catch (error: any) {
    //       if (error.message.includes("Account does not exist or has no data")) {
    //         const transaction = await program.methods
    //           .initializePda()
    //           .accounts({
    //             signer: publicKey!,
    //           })
    //           .transaction();
    //         const transactionSignature = await sendTransaction(
    //           transaction,
    //           connection
    //         );
    
    //         console.log("3", transactionSignature);
    //       }
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchData();
    //   }, [connection, publicKey, program]);


  return (
    <div className="container mx-auto px-4 lg:px-12 min-h-screen py-8">
           <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-[#f305cb] via-[#ff0000] to-[#8c06fa] text-transparent bg-clip-text">NFT Event Listings</h1>
                <p className="text-pink-300 mb-10 w-2/3 my-5 text-center text-2xl m-auto mt-4">
                Discover all events created on the Solana blockchain. Click on an event to learn more and securely purchase tickets. Explore a world of events built on Solana. Click to learn more and buy tickets safely.


                </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events?.map((item:any, index:number) => (
          <div key={index} className="  rounded-lg overflow-hidden shadow-xl">
            {/* <img
              src={"/nft.png"}
              alt={item.title}
              className="w-full h-48 object-cover"
            /> */}
            <div className="p-4 bg-gradient-to-tl from-[#050391] via-[#023d8af8] to-[#2c1864] backdrop- backdrop-opacity-20">
              <h2 className="text-xl font-semibold">{item.accountData.title}</h2>
              <p className="text-gray-600">{item.accountData.description}</p>
              <p className="mb-2">
                   <b>Date of listing</b> : {new Date(item.accountData.date.toNumb1000).toLocaleString()}
              </p>

              <p className="mb-2">
                  <b> Place </b> : {item.accountData.location}
              </p>
              <p className="mb-2">
                  <b>Ticket Price</b> : {(item.accountData.ticketPrice.toNumber() / 1_000_000_000).toFixed(9)} SOL
              </p>
              <p className="mb-2 flex items-center justify-center">
                  <b>Organizer&apos;s public key</b> :{" "}
                  <span
                      className="truncate  p-1 rounded cursor-pointer ml-2"
                      // onClick={() => handleCopyToClipboard(event.accountData.organizer.toBase58())}
                  >
                      {item.accountData.organizer.toBase58()}
                  </span>
              </p>
              <p className="mb-2 flex items-center justify-center">
                  <b> Public key of the event </b> :{" "}
                  <span
                      className="truncate  p-1 rounded cursor-pointer ml-2"
                      // onClick={() => handleCopyToClipboard(event.publicKey.toBase58())}
                  >
                      {item.publicKey.toBase58()}
                  </span>
              </p>
              <p>
                  <Link
                      href={`/show-event/${item.publicKey.toBase58()}`}
                      className="group relative inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#eb0ebf] via-[#e21c1c] to-[#9206f7] backdrop-blur-lg hover:bg-indigo-700 mt-4"
                  >
                      Join the event
                  </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItem;
