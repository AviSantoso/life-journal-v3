/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { Schema, Repository } from "redis-om";
import { createClient } from "redis";
import { JournalEntry, JournalEntryRepository } from "./types";

const REDIS_PASSWORD = import.meta.env.VITE_REDIS_PASSWORD;
const REDIS_HOST = import.meta.env.VITE_REDIS_HOST;
const REDIS_PORT = import.meta.env.VITE_REDIS_PORT;

if (!REDIS_PASSWORD || !REDIS_HOST || !REDIS_PORT) {
  throw new Error("Redis credentials are not set");
}

export const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

type TDbContext = {
  redisClient: typeof redisClient;
  journalEntryRepository: JournalEntryRepository;
};

export const journalEntrySchema = new Schema<JournalEntry>(
  "journalEntry",
  {
    title: { type: "string" },
    content: { type: "string" },
    date: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export const journalEntryRepository = new Repository(
  journalEntrySchema,
  redisClient
);

export const DbContext = createContext<TDbContext>({
  redisClient,
  journalEntryRepository,
});

export function useDbContext() {
  return useContext(DbContext);
}

export function DbContextProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function init() {
      await redisClient.connect();
      await journalEntryRepository.createIndex();
    }

    init();

    return () => {
      redisClient.disconnect();
    };
  }, []);

  return (
    <DbContext.Provider
      value={{
        redisClient,
        journalEntryRepository,
      }}
    >
      {children}
    </DbContext.Provider>
  );
}
