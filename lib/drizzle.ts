import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema })
