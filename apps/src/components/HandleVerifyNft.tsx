import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAnchorProgram } from "./anchorUtils";

export const handleVerifyNft = async (e: React.FormEvent, nftPublicKey: string, eventPublicKey: string, wallet: ReturnType<typeof useAnchorWallet>) => {
    e.preventDefault();

    if (!wallet?.publicKey) {
        toast.error("Please connect your wallet!");
        return;
    }

    try {
        const { program } = getAnchorProgram(wallet);

        const eventAccount = await program.account.event.fetch(new PublicKey(eventPublicKey));
        if (!eventAccount) {
            toast.error("Event not found");
            return;
        }

        const tickets = await program.account.ticket.all([
            {
                memcmp: {
                    offset: 8, // Taille de l'en-tête de l'account.
                    bytes: eventPublicKey,
                },
            },
        ]);
        // Find the ticket with the matching NFT mint
        const ticket = tickets.find((t) => {
            const nftMint = t.account.nftMint as PublicKey | undefined;
            return nftMint && nftMint.equals(new PublicKey(nftPublicKey));
        });
        if (!ticket) {
            toast.error("Aucun ticket associé à cet événement pour ce NFT.");
            return;
        }

        toast.success("NFT vérifié avec succès !");
    } catch (err) {
        toast.error("NFT verification failed.");
        console.error("Failed to verify NFT.", err);
    }
};
