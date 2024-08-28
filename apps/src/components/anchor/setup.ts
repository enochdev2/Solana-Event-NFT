import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { IdlAccounts, Program } from "@coral-xyz/anchor";
import type { NftTicketing} from "./idl/idlType";
import idl from "./idl/idl.json";

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const ProgramID = new PublicKey(
  "Bj3Tg7NaUr8uRgZe358gutaqqNLvDJDZ3EzJXp9gNL44"
);

export const program = new Program(idl as NftTicketing, {
  connection,
});

export const getPda = (address: PublicKey) => {
  const [pdaAddress, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("TODO_ACC"), address.toBuffer()],
    program.programId
  );

  return {
    pdaAddress,
    bump,
  };
};

export type event = IdlAccounts<NftTicketing>["event"];
