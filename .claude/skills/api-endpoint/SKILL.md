---
name: api-endpoint
description: Supabase API endpoint creation. Use when creating API routes, database queries, or server actions.
---

# MetaCast API Endpoint Rules

## File Structure

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── schema.sql     # Database schema
├── app/
│   └── api/
│       └── [endpoint]/
│           └── route.ts   # API routes
└── actions/
    └── [feature].ts       # Server actions
```

## Supabase Client Usage

### Server-side (API Routes, Server Actions)
```typescript
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('table_name')
    .select('*')

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}
```

### Client-side
```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
```

## Server Actions Pattern

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createItem(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('items')
    .insert({
      name: formData.get('name'),
      user_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/items')
  return { data }
}
```

## Error Handling

```typescript
// Always return structured errors
if (error) {
  return Response.json(
    { error: error.message, code: error.code },
    { status: getStatusCode(error.code) }
  )
}

function getStatusCode(code: string): number {
  switch (code) {
    case 'PGRST116': return 404  // Not found
    case '23505': return 409     // Duplicate
    case '42501': return 403     // Permission denied
    default: return 500
  }
}
```

## Type Safety

```typescript
// Define types in src/types/database.ts
export interface Stream {
  id: string
  title: string
  status: 'scheduled' | 'live' | 'ended'
  user_id: string
  created_at: string
}

// Use in queries
const { data } = await supabase
  .from('streams')
  .select('*')
  .returns<Stream[]>()
```

## RLS (Row Level Security) Patterns

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own streams"
ON streams FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own data
CREATE POLICY "Users can create own streams"
ON streams FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own data
CREATE POLICY "Users can update own streams"
ON streams FOR UPDATE
USING (auth.uid() = user_id);
```

## Checklist

Before creating API endpoint:
- [ ] Use correct Supabase client (server vs client)
- [ ] Add proper error handling
- [ ] Define TypeScript types
- [ ] Consider RLS policies
- [ ] Use revalidatePath for mutations
- [ ] Return consistent response structure
