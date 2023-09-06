import dotenv from "dotenv";
dotenv.config();

export default function getConfig() {
  const SERVER_NAME = process.env.SERVER_NAME || "server";
  return {
    name: SERVER_NAME,
    id: "1",
    baserUrls: {
      note: "/",
    },
    port: process.env.PORT || 3001,
    mongodb: {
      url: process.env.MONGODB_URL,
      db: process.env.MONGODB_DB || SERVER_NAME,
    },
    morgan: {
      logStyle: "dev",
    },
    cors: {
      origin: ["*", "http://localhost:3000", "notes.dynotxt.com"],
      credentials: true,
    },
  };
}
