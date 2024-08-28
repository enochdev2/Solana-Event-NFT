import { toast } from "react-toastify";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const handleCopyToClipboard = (publicKey: string) => {
    navigator.clipboard.writeText(publicKey).then(
        () => {
            toast.info("Public Key copiée dans le presse-papier");
        },
        (err) => {
            console.error("Failed to copy public key:", err);
        },
    );
};