// Type definitions for connect-pg-simple 4.2
// Project: https://github.com/voxpelli/node-connect-pg-simple#readme
// Definitions by: Pasi Eronen <https://github.com/pasieronen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import { RequestHandler } from "express";
import { Store, SessionOptions } from "@holdyourwaffle/express-session";
import { Pool, PoolConfig } from "pg";
import { Session } from 'inspector';

export default function connectPgSimple(session: (options?: SessionOptions) => RequestHandler): typeof PGStore;

declare class PGStore extends Store {
  constructor(options?: PGStoreOptions);

  close(): void;
  pruneSessions(callback?: (err: Error) => void): void;

  private quotedTable(): string;
  private getExpireTime(maxAge?: number): number;
  private query(query: string, params?: any[], callback?: (err: Error) => void): void;
  private query(query: string, callback?: (err: Error) => void): void;

  get(sid: string, callback: (err: Error) => void): void;
  set(sid: string, session: SessionData, callback?: (err: Error) => void): void;
  destroy(sid: string, callback?: (err: Error) => void): void;
  touch(sid: string, session: SessionData, callback?: (err: Error) => void): void;
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
