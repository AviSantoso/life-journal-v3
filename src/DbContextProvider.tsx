import { createContext, useContext, useEffect } from "react";
import { Schema, Repository, InferSchema } from "redis-om";
import { createClient } from "redis";

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
  journalEntryRepository: Repository<JournalEntry>;
};

export const journalEntrySchema = new Schema(
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

export type JournalEntry = InferSchema<typeof journalEntrySchema>;

export const journalEntryRepository = new Repository(
  journalEntrySchema,
  redisClient
);

await journalEntryRepository.createIndex();

export const RedisClientContext = createContext<TDbContext>({
  redisClient,
  journalEntryRepository,
});

export function useRedisClient() {
  return useContext(RedisClientContext);
}

export function DbContextProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    redisClient.connect();
    return () => {
      redisClient.disconnect();
    };
  }, []);

  return (
    <RedisClientContext.Provider
      value={{
        redisClient,
        journalEntryRepository,
      }}
    >
      {children}
    </RedisClientContext.Provider>
  );
}
