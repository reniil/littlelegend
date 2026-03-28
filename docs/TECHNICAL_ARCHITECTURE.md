# LittleLegend Technical Architecture

## Overview
Full-stack architecture for LittleLegend app - childhood achievement tracker that transforms into adult CV.

---

## Stack Overview

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **State** | Zustand, React Query (TanStack Query) |
| **Backend** | Next.js API Routes, tRPC |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | Supabase Auth |
| **Storage** | Cloudflare R2 (documents), Supabase Storage (images) |
| **Queue** | Inngest (background jobs) |
| **PDF Gen** | Puppeteer + Handlebars |
| **Email** | Resend |
| **Analytics** | PostHog |
| **Hosting** | Vercel (frontend), Supabase (database) |

---

## Database Schema

### Core Tables

```sql
-- Users (parents)
create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  avatar_url text,
  subscription_tier text default 'free', -- free, family, premium
  subscription_status text default 'active',
  stripe_customer_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Children (managed by parents)
create table children (
  id uuid default gen_random_uuid() primary key,
  parent_id uuid references users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  gender text, -- boy, girl, other, prefer_not_to_say
  avatar_url text,
  avatar_type text default 'illustration', -- illustration, photo, cartoon
  bio text,
  privacy_level text default 'private', -- private, family, public
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Categories for activities
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  icon text not null,
  color text not null,
  description text,
  display_order integer default 0,
  is_active boolean default true
);

-- Activities/Entries
create table activities (
  id uuid default gen_random_uuid() primary key,
  child_id uuid references children(id) on delete cascade,
  category_id uuid references categories(id),
  title text not null,
  organization text,
  description text,
  start_date date not null,
  end_date date,
  status text default 'completed', -- completed, ongoing, dropped
  grade_or_level text,
  achievements text[], -- array of specific achievements
  skills_developed text[], -- array of skills
  is_verified boolean default false,
  institution_id uuid,
  verification_token text,
  cv_translation text, -- auto-generated professional description
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Evidence/Documents attached to activities
create table evidence (
  id uuid default gen_random_uuid() primary key,
  activity_id uuid references activities(id) on delete cascade,
  type text not null, -- certificate, photo, video, document
  file_url text not null,
  thumbnail_url text,
  file_name text,
  file_size integer,
  mime_type text,
  caption text,
  uploaded_at timestamp with time zone default now()
);

-- Institutions (for verification)
create table institutions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null, -- school, sports_club, arts_center, etc.
  email_domain text,
  verification_key text unique,
  api_key text,
  logo_url text,
  website text,
  is_verified boolean default false,
  created_at timestamp with time zone default now()
);

-- CV Templates
create table cv_templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  layout jsonb not null, -- template structure
  styles jsonb, -- CSS styles
  is_default boolean default false,
  is_active boolean default true
);

-- Generated CVs
create table generated_cvs (
  id uuid default gen_random_uuid() primary key,
  child_id uuid references children(id) on delete cascade,
  template_id uuid references cv_templates(id),
  age_at_generation integer,
  file_url text,
  file_size integer,
  download_count integer default 0,
  generated_at timestamp with time zone default now()
);

-- Activity Shares (for social/verification)
create table shares (
  id uuid default gen_random_uuid() primary key,
  activity_id uuid references activities(id) on delete cascade,
  share_token text unique not null,
  expires_at timestamp with time zone,
  view_count integer default 0,
  created_at timestamp with time zone default now()
);

-- Notifications
create table notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  type text not null, -- achievement, reminder, verification, etc.
  title text not null,
  message text,
  is_read boolean default false,
  action_url text,
  created_at timestamp with time zone default now()
);

-- User Settings
create table user_settings (
  user_id uuid references users(id) on delete cascade primary key,
  email_notifications boolean default true,
  weekly_digest boolean default true,
  achievement_alerts boolean default true,
  verification_requests boolean default true,
  theme text default 'light', -- light, dark, system
  language text default 'en',
  timezone text default 'UTC'
);
```

### Indexes

```sql
-- Performance indexes
create index idx_children_parent on children(parent_id);
create index idx_activities_child on activities(child_id);
create index idx_activities_category on activities(category_id);
create index idx_activities_dates on activities(start_date, end_date);
create index idx_activities_verified on activities(is_verified);
create index idx_evidence_activity on evidence(activity_id);
create index idx_generated_cvs_child on generated_cvs(child_id);
create index idx_notifications_user on notifications(user_id, is_read);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
alter table users enable row level security;
alter table children enable row level security;
alter table activities enable row level security;
alter table evidence enable row level security;

-- Users can only see their own data
create policy "Users can see own data" on users
  for all using (auth.uid() = id);

-- Parents can see their children's data
create policy "Parents can see own children" on children
  for all using (auth.uid() = parent_id);

-- Parents can see activities for their children
create policy "Parents can see activities for their children" on activities
  for all using (
    auth.uid() in (
      select parent_id from children where id = activities.child_id
    )
  );

-- Parents can see evidence for their children's activities
create policy "Parents can see evidence" on evidence
  for all using (
    auth.uid() in (
      select parent_id from children 
      where id in (
        select child_id from activities where id = evidence.activity_id
      )
    )
  );
```

---

## API Architecture

### tRPC Router Structure

```typescript
// server/routers/_app.ts
import { router } from '../trpc';
import { userRouter } from './user';
import { childRouter } from './child';
import { activityRouter } from './activity';
import { cvRouter } from './cv';
import { institutionRouter } from './institution';

export const appRouter = router({
  user: userRouter,
  child: childRouter,
  activity: activityRouter,
  cv: cvRouter,
  institution: institutionRouter,
});

export type AppRouter = typeof appRouter;
```

### User Router

```typescript
// server/routers/user.ts
export const userRouter = router({
  // Get current user
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { settings: true },
    });
  }),

  // Update profile
  updateProfile: protectedProcedure
    .input(z.object({ name: z.string().optional(), avatarUrl: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  // Get dashboard stats
  getDashboard: protectedProcedure.query(async ({ ctx }) => {
    const children = await ctx.prisma.child.findMany({
      where: { parentId: ctx.session.user.id },
      include: {
        _count: { select: { activities: true } },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    const totalActivities = children.reduce((sum, c) => sum + c._count.activities, 0);
    const categories = await ctx.prisma.activity.groupBy({
      by: ['categoryId'],
      where: {
        child: { parentId: ctx.session.user.id },
      },
      _count: true,
    });

    return { children, totalActivities, categoryCount: categories.length };
  }),
});
```

### Child Router

```typescript
// server/routers/child.ts
export const childRouter = router({
  // List children
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.child.findMany({
      where: { parentId: ctx.session.user.id },
      orderBy: { createdAt: 'asc' },
    });
  }),

  // Create child
  create: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      dateOfBirth: z.date(),
      gender: z.string().optional(),
      avatarUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.child.create({
        data: {
          ...input,
          parentId: ctx.session.user.id,
        },
      });
    }),

  // Get child with activities
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.child.findFirst({
        where: { id: input.id, parentId: ctx.session.user.id },
        include: {
          activities: {
            orderBy: { startDate: 'desc' },
            include: { category: true, evidence: true },
          },
        },
      });
    }),

  // Get timeline
  getTimeline: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const activities = await ctx.prisma.activity.findMany({
        where: { childId: input.id },
        orderBy: { startDate: 'desc' },
        include: { category: true, evidence: true },
      });

      // Group by year
      const grouped = activities.reduce((acc, activity) => {
        const year = new Date(activity.startDate).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(activity);
        return acc;
      }, {} as Record<number, typeof activities>);

      return grouped;
    }),
});
```

### Activity Router

```typescript
// server/routers/activity.ts
export const activityRouter = router({
  // Create activity
  create: protectedProcedure
    .input(z.object({
      childId: z.string().uuid(),
      categoryId: z.string().uuid(),
      title: z.string().min(1),
      organization: z.string().optional(),
      description: z.string().optional(),
      startDate: z.date(),
      endDate: z.date().optional(),
      status: z.enum(['completed', 'ongoing', 'dropped']).default('completed'),
      gradeOrLevel: z.string().optional(),
      achievements: z.array(z.string()).optional(),
      skillsDeveloped: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify parent owns child
      const child = await ctx.prisma.child.findFirst({
        where: { id: input.childId, parentId: ctx.session.user.id },
      });

      if (!child) throw new TRPCError({ code: 'FORBIDDEN' });

      // Generate CV translation
      const cvTranslation = await generateCVTranslation(input);

      return ctx.prisma.activity.create({
        data: {
          ...input,
          cvTranslation,
        },
      });
    }),

  // Update activity
  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      title: z.string().min(1).optional(),
      organization: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(['completed', 'ongoing', 'dropped']).optional(),
      gradeOrLevel: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const activity = await ctx.prisma.activity.findFirst({
        where: {
          id: input.id,
          child: { parentId: ctx.session.user.id },
        },
      });

      if (!activity) throw new TRPCError({ code: 'NOT_FOUND' });

      return ctx.prisma.activity.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // Delete activity
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const activity = await ctx.prisma.activity.findFirst({
        where: {
          id: input.id,
          child: { parentId: ctx.session.user.id },
        },
      });

      if (!activity) throw new TRPCError({ code: 'NOT_FOUND' });

      return ctx.prisma.activity.delete({ where: { id: input.id } });
    }),

  // Upload evidence
  uploadEvidence: protectedProcedure
    .input(z.object({
      activityId: z.string().uuid(),
      type: z.enum(['certificate', 'photo', 'video', 'document']),
      file: z.any(), // FileUpload type
    }))
    .mutation(async ({ ctx, input }) => {
      // Upload to Cloudflare R2
      const fileUrl = await uploadToR2(input.file);
      
      return ctx.prisma.evidence.create({
        data: {
          activityId: input.activityId,
          type: input.type,
          fileUrl,
          fileName: input.file.name,
          fileSize: input.file.size,
          mimeType: input.file.type,
        },
      });
    }),
});
```

### CV Router

```typescript
// server/routers/cv.ts
export const cvRouter = router({
  // Generate CV
  generate: protectedProcedure
    .input(z.object({
      childId: z.string().uuid(),
      age: z.number().int().min(0).max(100),
      templateId: z.string().uuid().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get child with activities
      const child = await ctx.prisma.child.findFirst({
        where: { id: input.childId, parentId: ctx.session.user.id },
        include: {
          activities: {
            where: {
              startDate: {
                lte: new Date(new Date().setFullYear(
                  new Date().getFullYear() - (new Date().getFullYear() - input.age)
                )),
              },
            },
            orderBy: { startDate: 'desc' },
            include: { category: true },
          },
        },
      });

      if (!child) throw new TRPCError({ code: 'NOT_FOUND' });

      // Generate PDF
      const pdfBuffer = await generateCV(child, input.age);
      
      // Upload to storage
      const fileUrl = await uploadCV(pdfBuffer, child.id, input.age);

      // Save record
      return ctx.prisma.generatedCV.create({
        data: {
          childId: input.childId,
          templateId: input.templateId,
          ageAtGeneration: input.age,
          fileUrl,
          fileSize: pdfBuffer.length,
        },
      });
    }),

  // Download CV
  download: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const cv = await ctx.prisma.generatedCV.findFirst({
        where: {
          id: input.id,
          child: { parentId: ctx.session.user.id },
        },
      });

      if (!cv) throw new TRPCError({ code: 'NOT_FOUND' });

      // Increment download count
      await ctx.prisma.generatedCV.update({
        where: { id: input.id },
        data: { downloadCount: { increment: 1 } },
      });

      return cv;
    }),
});
```

---

## Authentication Flow

### Signup/Login Options
1. **Email/Password** - Supabase Auth
2. **Google OAuth** - Social login
3. **Apple Sign In** - iOS/Mac users

### Session Management
```typescript
// lib/auth.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Middleware for protected routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return res;
}
```

---

## File Storage

### Cloudflare R2 Setup
```typescript
// lib/storage.ts
import { S3Client } from '@aws-sdk/client-s3';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Upload function
export async function uploadToR2(file: File, path: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: path,
    Body: file,
    ContentType: file.type,
  });
  
  await r2Client.send(command);
  return `${process.env.R2_PUBLIC_URL}/${path}`;
}
```

### Storage Structure
```
bucket: littlelegend-uploads
├── evidence/
│   ├── {user_id}/
│   │   ├── {activity_id}/
│   │   │   ├── certificate.pdf
│   │   │   ├── photo.jpg
│   │   │   └── video.mp4
├── avatars/
│   ├── {user_id}.jpg
│   └── {child_id}.jpg
└── cvs/
    └── {child_id}_{age}.pdf
```

---

## PDF Generation

### CV Template Engine
```typescript
// lib/cv-generator.ts
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import Handlebars from 'handlebars';

export async function generateCV(child: Child, age: number) {
  // Group activities by category
  const grouped = groupByCategory(child.activities);
  
  // Transform to professional language
  const professional = transformToProfessional(grouped);
  
  // Load template
  const template = Handlebars.compile(cvTemplate);
  const html = template({
    child,
    age,
    activities: professional,
    generatedAt: new Date().toLocaleDateString(),
  });
  
  // Generate PDF
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
  });
  
  await browser.close();
  return pdf;
}
```

---

## Deployment

### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@db-url",
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_KEY": "@supabase-key",
    "R2_ENDPOINT": "@r2-endpoint",
    "R2_ACCESS_KEY": "@r2-access-key",
    "R2_SECRET_KEY": "@r2-secret-key"
  }
}
```

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudflare R2
R2_ENDPOINT=https://...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=littlelegend-uploads
R2_PUBLIC_URL=https://cdn.littlelegend.app

# Other
RESEND_API_KEY=re_...
POSTHOG_KEY=phc_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Development Setup

### 1. Initialize Project
```bash
# Create Next.js app with shadcn
echo "my-app" | npx shadcn@latest init --yes --template next --base-color stone

# Install dependencies
npm install @supabase/supabase-js @prisma/client @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zustand puppeteer @sparticuz/chromium
npm install -D prisma @types/node

# Initialize Prisma
npx prisma init
```

### 2. Database Setup
```bash
# Push schema to Supabase
npx prisma db push

# Generate client
npx prisma generate

# Seed categories
npx prisma db seed
```

### 3. Run Development
```bash
# Start dev server
npm run dev

# Start Prisma Studio (database UI)
npx prisma studio
```

---

## Testing Strategy

### Unit Tests
- tRPC procedures
- CV translation logic
- Utility functions

### Integration Tests
- Authentication flow
- Activity CRUD
- File upload
- PDF generation

### E2E Tests
- Signup → Add child → Add activity → Generate CV
- Institution verification flow

---

## Security Checklist

- [ ] RLS policies configured
- [ ] API rate limiting
- [ ] File upload size limits
- [ ] File type validation
- [ ] Input sanitization
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Secure session cookies
- [ ] HTTPS only

---

*Technical Architecture by Ben | Reniil Operations | Ready for implementation*
