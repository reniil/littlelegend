# LittleLegend - Full Implementation for Windsurf

## Project Structure

```
littlelegend/
├── .cursorrules              # Cursor/Windsurf AI rules
├── README.md                 # Project documentation
├── IMPLEMENTATION.md         # Implementation guide
├── ARCHITECTURE.md           # Technical architecture
├── DESIGN.md                 # Design specifications
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── layout.tsx            # Root layout
│   │   │   ├── globals.css           # Global styles
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login page
│   │   │   ├── signup/
│   │   │   │   └── page.tsx          # Signup page
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Dashboard
│   │   │   ├── child/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Child profile
│   │   │   ├── activity/
│   │   │   │   └── new/
│   │   │   │       └── page.tsx      # Add activity
│   │   │   └── cv/
│   │   │       └── page.tsx          # CV preview
│   │   ├── components/
│   │   │   ├── ui/                   # Reusable UI components
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── activity/
│   │   │   │   ├── ActivityCard.tsx
│   │   │   │   ├── ActivityForm.tsx
│   │   │   │   └── ActivityList.tsx
│   │   │   ├── child/
│   │   │   │   ├── ChildCard.tsx
│   │   │   │   ├── ChildProfile.tsx
│   │   │   │   └── Timeline.tsx
│   │   │   └── cv/
│   │   │       ├── CVTemplate.tsx
│   │   │       └── CVPreview.tsx
│   │   └── lib/
│   │       ├── utils.ts              # Utility functions
│   │       ├── auth.ts               # Auth helpers
│   │       └── api.ts                # API client
│   ├── public/
│   │   ├── images/
│   │   └── fonts/
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json
├── backend/                  # API server (optional)
│   └── src/
│       ├── routes/
│       ├── models/
│       └── utils/
└── database/
    └── schema.sql
```

## Windsurf Instructions

1. **Open Project**: Open `littlelegend/frontend` folder in Windsurf
2. **Install Dependencies**: Run `npm install` in terminal
3. **Start Dev Server**: Run `npm run dev`
4. **Open Browser**: Navigate to `http://localhost:3000`

## Key Files for Windsurf

### 1. .cursorrules
Tell Windsurf AI how to work with this codebase.

### 2. Component Architecture
- All UI components in `src/components/ui/`
- Page-specific components in `src/components/[feature]/`
- Use Tailwind for styling
- Follow TypeScript strict mode

### 3. Data Flow
- Server Actions for mutations
- tRPC (if implemented) for queries
- React Query for client-side caching

## Implementation Checklist

### Phase 1: Core Setup
- [ ] Project initialization
- [ ] Tailwind configuration
- [ ] Layout components
- [ ] Navigation

### Phase 2: Auth
- [ ] Login page
- [ ] Signup flow
- [ ] Auth context
- [ ] Protected routes

### Phase 3: Dashboard
- [ ] Dashboard layout
- [ ] Child profile cards
- [ ] Activity list
- [ ] Statistics widgets

### Phase 4: Activities
- [ ] Activity form
- [ ] Image upload
- [ ] Timeline view
- [ ] Category filtering

### Phase 5: CV Generation
- [ ] CV templates
- [ ] PDF generation
- [ ] Preview mode
- [ ] Download

## Component Templates

### Button Component
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Card Component
```tsx
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

## Color System

Use Tailwind classes:
- Primary: `bg-royal-purple-700`, `text-royal-purple-700`
- Secondary: `bg-legend-gold-500`, `text-legend-gold-500`
- Success: `bg-growth-green-500`, `text-growth-green-500`
- Background: `bg-cream-50`
- Text: `text-midnight-800`

## Commands for Windsurf

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run TypeScript check
npx tsc --noEmit

# Format code
npx prettier --write .
```

## API Endpoints (Mock)

```typescript
const API = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
  },
  children: {
    list: '/api/children',
    create: '/api/children',
    get: (id: string) => `/api/children/${id}`,
    update: (id: string) => `/api/children/${id}`,
    delete: (id: string) => `/api/children/${id}`,
  },
  activities: {
    list: '/api/activities',
    create: '/api/activities',
    update: (id: string) => `/api/activities/${id}`,
    delete: (id: string) => `/api/activities/${id}`,
  },
  cv: {
    generate: '/api/cv/generate',
    download: (id: string) => `/api/cv/${id}/download`,
  },
};
```

## Testing Strategy

```bash
# Unit tests
npm test

# E2E tests (Playwright)
npx playwright test

# Coverage
npm run test:coverage
```

## Deployment

### Vercel (Recommended)
1. Connect GitHub repo
2. Set environment variables
3. Auto-deploy on push

### Environment Variables
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Help

For Windsurf AI:
- Use `// windsurf:` comments to guide AI
- Reference components by path
- Use TypeScript interfaces for props
- Follow existing file structure

---

Ready for Windsurf implementation!
