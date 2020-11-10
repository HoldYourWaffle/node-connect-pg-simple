// Type definitions for connect-pg-simple 4.2

import { RequestHandler } from "express";
import { Store, SessionData, SessionOptions } from "express-session";
import { Pool, PoolConfig } from "pg";

declare function connectPgSimple(session: (options?: SessionOptions) => RequestHandler): typeof connectPgSimple.PGStore;

declare namespace connectPgSimple {
  class PGStore extends Store {
      constructor(options?: PGStoreOptions);
      close(): void;
      pruneSessions(callback?: (err: Error) => void): void;

      get(sid: string, callback: (err: any, session?: SessionData | null) => void): void;
      set(sid: string, session: SessionData, callback?: (err?: any) => void): void;
      destroy(sid: string, callback?: (err?: any) => void): void;

      touch(sid: string, session: SessionData, callback?: () => void): void;
  }
  interface PGStoreOptions {
      pool?: Pool;
      pgPromise?: object; // not typed to avoid dependency to "pg-promise" module (which includes its own types)
      conString?: string;
      conObject?: PoolConfig;
      ttl?: number;
      schemaName?: string;
      tableName?: string;
      pruneSessionInterval?: false | number;
      // tslint:disable-next-line:prefer-method-signature
      errorLog?: (...args: any[]) => void;
  }
}

export = connectPgSimple;
