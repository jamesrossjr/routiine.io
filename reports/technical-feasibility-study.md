# ROUTIINE.IO - COMPREHENSIVE TECHNICAL FEASIBILITY STUDY & DECONSTRUCTION

---

## 1. FUNCTIONAL & USE CASE ANALYSIS

### Core Functions

**Primary Capabilities:**

1. **Sales Signal Detection & Scoring** - Real-time monitoring of buyer behavior signals (email opens, page views, form submissions, engagement drops)
2. **Momentum Scorecard** - Dynamic scoring system that evaluates sales rep performance based on live activity and conversion trends
3. **Signal Discovery Assessment** - Interactive tool for evaluating pain points across 7 dimensions (Surface Trigger, Personal Disruption, Financial Consequence, Operational Impact, Internal Visibility, Future Risk, Ownership & Commitment)
4. **CRM Integration Hub** - Connects to major CRMs (Salesforce, HubSpot, Zoho, Pipedrive) to sync data and track behaviors
5. **Dashboard & Analytics** - Comprehensive sales dashboard showing active signals, leads, conversion rates, activities, and tasks
6. **User Authentication** - Email/password login with OAuth options (Google, GitHub)
7. **Content Management** - Marketing pages, pricing plans, blog posts, and documentation
8. **Subscription Management** - Tiered pricing (Basic $9.9/mo, Standard $19.9/mo, Premium $29.9/mo)

### User Roles & Permissions

**Identified User Types:**

1. **Guest/Visitor**
   - View marketing homepage, pricing, blog
   - Access documentation
   - Sign up for account

2. **Registered User (Sales Rep)**
   - View personalized dashboard
   - Access signal feed (email opens, website visits, document views, follow-ups)
   - View momentum scorecard with activity/conversion metrics
   - Use Signal Discovery tool to assess client opportunities
   - View activities and upcoming tasks
   - Connect personal CRM accounts

3. **Sales Manager/Team Lead** (Inferred)
   - View team-wide scorecards
   - Access coaching insights
   - Monitor signal-based performance metrics
   - View aggregate conversion and activity trends

4. **Admin** (Inferred)
   - Manage user accounts and subscriptions
   - Configure CRM integrations
   - Manage content and blog posts
   - System configuration

### Key User Stories

1. **As a Sales Rep**, I want to view my active buyer signals in real-time, so that I can prioritize which prospects to follow up with immediately.

2. **As a Sales Rep**, I want to assess a client's pain points using the Signal Discovery tool, so that I can understand the urgency and severity of their needs before pitching.

3. **As a Sales Manager**, I want to see my team's Momentum Scorecard with activity and conversion trends, so that I can identify coaching opportunities before deals stall.

4. **As a Sales Rep**, I want to connect my Salesforce/HubSpot account, so that Routiine can automatically track my activities and surface relevant signals.

5. **As a Sales Rep**, I want to receive prioritized signal notifications (high/medium/low priority), so that I know which opportunities need immediate attention (e.g., "GlobalTech needs follow-up - 30 days without contact, $95K opportunity").

6. **As a Sales Manager**, I want to view behavioral signals rather than vanity metrics, so that I can coach based on effort aligned to outcomes rather than just CRM checkboxes.

7. **As a Company Admin**, I want to configure which CRM platforms my team can connect to, so that we maintain data security and compliance standards.

8. **As a Sales Rep**, I want to filter my signal feed by type (Follow-ups, Email Opens, Website Visits, Document Views), so that I can focus on specific engagement patterns.

9. **As a New User**, I want to sign up using Google OAuth, so that I can get started quickly without creating another password.

10. **As a Sales Rep**, I want to see my signal score change in real-time as I complete activities, so that I understand how my behaviors impact my momentum score.

---

## 2. DATA & CONTENT STRUCTURE ANALYSIS

### Key Data Objects

**Primary Data Models:**

1. **User**
2. **Signal**
3. **SignalAssessment** (Discovery data)
4. **MomentumScore**
5. **Activity**
6. **CRMConnection**
7. **Client/Prospect**
8. **Opportunity**
9. **Task**
10. **Subscription**
11. **BlogPost**
12. **PricingPlan**

### Object Attributes

**User**
- id (UUID)
- name (String)
- email (String, unique)
- password (Hashed)
- role (Enum: sales_rep, manager, admin)
- avatar (URL)
- subscriptionTier (Enum: basic, standard, premium)
- createdAt (Timestamp)
- lastLogin (Timestamp)

**Signal**
- id (UUID)
- userId (FK → User)
- clientId (FK → Client)
- opportunityId (FK → Opportunity, nullable)
- type (Enum: positive, negative)
- category (Enum: email_open, page_view, form_submission, video_watched, cart_abandoned, bounce, session_timeout)
- name (String) - e.g., "Email opened"
- impact (Integer) - Score impact (-5 to +6)
- priority (Enum: high, medium, low)
- timestamp (Timestamp)
- metadata (JSON) - Additional context

**SignalAssessment** (Discovery Tool Data)
- id (UUID)
- userId (FK → User)
- clientId (FK → Client)
- clientName (String)
- salesPersonName (String)
- assessmentDate (Date)
- totalScore (Integer, 0-35)
- intensityLevel (Enum: minimal, mild, moderate, significant, severe)
- signals (JSON Array) containing:
  - surfaceTrigger: {rating: 1-5, notes: String, assessed: Boolean}
  - personalDisruption: {rating: 1-5, notes: String, assessed: Boolean}
  - financialConsequence: {rating: 1-5, notes: String, assessed: Boolean}
  - operationalImpact: {rating: 1-5, notes: String, assessed: Boolean}
  - internalVisibility: {rating: 1-5, notes: String, assessed: Boolean}
  - futureRisk: {rating: 1-5, notes: String, assessed: Boolean}
  - ownershipCommitment: {rating: 1-5, notes: String, assessed: Boolean}
- createdAt (Timestamp)
- updatedAt (Timestamp)

**MomentumScore**
- id (UUID)
- userId (FK → User)
- score (Integer, 0-100)
- activityTrend (Integer) - Percentage change
- conversionTrend (Integer) - Percentage change
- signalCount (Integer)
- calculatedAt (Timestamp)

**Activity**
- id (UUID)
- userId (FK → User)
- clientId (FK → Client, nullable)
- activityType (Enum: call, email, meeting, note, proposal_sent)
- description (String)
- outcome (String, nullable)
- timestamp (Timestamp)

**CRMConnection**
- id (UUID)
- userId (FK → User)
- platform (Enum: salesforce, hubspot, zoho, pipedrive)
- connectionToken (Encrypted String)
- refreshToken (Encrypted String, nullable)
- apiKey (Encrypted String, nullable)
- connectionStatus (Enum: connected, disconnected, error)
- lastSyncAt (Timestamp)
- settings (JSON)
- createdAt (Timestamp)

**Client/Prospect**
- id (UUID)
- name (String)
- contactName (String)
- contactTitle (String) - e.g., "CTO"
- email (String)
- phone (String, nullable)
- company (String)
- source (Enum: crm, manual, import)
- externalId (String, nullable) - CRM ID
- createdAt (Timestamp)

**Opportunity**
- id (UUID)
- clientId (FK → Client)
- userId (FK → User) - Owner
- title (String)
- value (Decimal) - e.g., $95,000
- stage (Enum: discovery, proposal, negotiation, closed_won, closed_lost)
- probability (Integer, 0-100)
- lastActivity (Timestamp)
- nextFollowUp (Date, nullable)
- createdAt (Timestamp)
- closedAt (Timestamp, nullable)

**Task**
- id (UUID)
- userId (FK → User)
- title (String)
- description (String, nullable)
- dueDate (Date)
- priority (Enum: high, medium, low)
- status (Enum: pending, in_progress, completed)
- relatedClientId (FK → Client, nullable)
- createdAt (Timestamp)

**Subscription**
- id (UUID)
- userId (FK → User)
- plan (Enum: basic, standard, premium)
- billingCycle (Enum: monthly, yearly)
- price (Decimal)
- status (Enum: active, cancelled, expired, trial)
- startDate (Date)
- endDate (Date, nullable)
- autoRenew (Boolean)

**BlogPost**
- id (UUID)
- slug (String, unique)
- title (String)
- description (String)
- content (Markdown)
- author (String)
- publishedAt (Timestamp)
- tags (Array<String>)

**PricingPlan**
- id (UUID)
- name (String) - Basic, Standard, Premium
- description (String)
- priceMonthly (Decimal)
- priceYearly (Decimal)
- features (Array<String>)
- highlighted (Boolean)
- displayOrder (Integer)

### Data Relationships

**One-to-Many:**
- User → Signals (A user has many signals)
- User → Activities (A user has many activities)
- User → SignalAssessments (A user creates many assessments)
- Client → Opportunities (A client has many opportunities)
- Client → Signals (A client generates many signals)
- User → Tasks (A user has many tasks)

**One-to-One:**
- User → CRMConnection (A user has one active CRM connection per platform)
- User → Subscription (A user has one active subscription)
- User → MomentumScore (A user has one current momentum score, updated periodically)

**Many-to-One:**
- Signals → Client (Many signals belong to one client)
- Opportunities → User (Many opportunities belong to one sales rep)
- Activities → Client (Many activities relate to one client)

**Many-to-Many (implicit):**
- Users ↔ Clients (Through activities and opportunities - a user can interact with many clients, a client can be managed by multiple users in enterprise scenarios)

---

## 3. TECHNICAL & ARCHITECTURAL ANALYSIS

### Technology Stack

**Frontend:**
- **Framework:** Nuxt 3 (Vue.js 3.5.13) - Full-stack Vue framework with SSR/SSG capabilities
- **UI Framework:** Nuxt UI Pro 3.0.2 - Professional component library
- **CSS:** Tailwind CSS (via Nuxt UI) with custom fonts (Satoshi font family)
- **State Management:** Vue 3 Composition API with reactive refs/computed
- **Charts:** Chart.js 4.4.8 - Canvas-based data visualization
- **Form Validation:** Zod 3.24.2 - TypeScript-first schema validation
- **Icons:** Lucide icons, Simple Icons, Heroicons
- **Image Optimization:** @nuxt/image 1.10.0
- **Content Management:** @nuxt/content 3.4.0 - File-based CMS for markdown/YAML

**Backend:**
- **Runtime:** Nitro (Nuxt's server engine) - Universal server framework
- **API Layer:** h3 - HTTP framework for serverless/edge environments
- **Language:** TypeScript 5.8.2
- **Deployment:** Static site generation with API routes (Nitro prerendering)

**Build & Development:**
- **Package Manager:** pnpm 10.7.0
- **Type Checking:** vue-tsc 2.2.0
- **Linting:** ESLint 9.23.0 with @nuxt/eslint

**Database:**
- Not currently implemented in codebase (uses mock data)
- better-sqlite3 listed in dependencies suggests SQLite planned for local/development

**Authentication:**
- Frontend validation with Zod schemas
- OAuth providers: Google, GitHub (UI implemented, backend pending)
- Session management: Not yet implemented (would likely use JWT or Nuxt's auth module)

### Security & Authentication

**Observed Implementation:**

1. **Login Flow:**
   - Email/password form with Zod validation
   - Minimum 8 character password requirement
   - "Remember me" checkbox option
   - OAuth providers (Google, GitHub) - UI ready but backend not connected
   - Links to password recovery and terms of service

2. **Session Management:**
   - **Not yet implemented** - Currently shows console.log on form submit
   - Would require JWT tokens or session cookies
   - Likely pattern: httpOnly cookies for security

3. **API Security:**
   - CRM connection endpoint expects userId from `event.context.auth` (authentication middleware pattern)
   - Credentials stored with intention to encrypt (code references secure storage)
   - API endpoints use h3's createError for standardized error handling

4. **Data Protection:**
   - CRM tokens and API keys intended to be encrypted (mentioned in code comments)
   - Password hashing not yet implemented (would use bcrypt/argon2)

**Security Assessment:**
- 🟡 **In Development** - Authentication UI complete, backend integration pending
- 🟡 **Risk:** CRM credentials currently stored as plaintext in mock functions
- 🟢 **Good:** Input validation with Zod schemas prevents injection attacks
- 🟡 **Missing:** Rate limiting, CSRF protection, secure session management

### UI/UX Component Inventory

**Core Components:**

1. **Layout Components:**
   - `AppHeader` - Top navigation with logo, color mode toggle
   - `AppFooter` - Copyright footer with optional newsletter signup
   - `LoGo` / `LogoPro` - Brand logo components

2. **Feature Components:**
   - `ScoreCard` - Animated momentum scorecard with Chart.js doughnut visualization
   - `DiscoveryTracker` - Signal discovery assessment tool with 7-point evaluation
   - `PromotionalVideo` - Hero video/media component
   - `EmailSuggestions` - Email template component
   - `SeparatorIcon` - Visual separator element

3. **Dashboard Components (Inferred from pages/dashboard.vue):**
   - `StatsCard` - Metric display cards
   - `SignalFeed` - Real-time signal list
   - `ActivityFeed` - Activity timeline
   - `CrmConnectionStatus` - CRM integration status widget
   - `QuickActionsList` - Action shortcuts
   - `TasksList` - Task management widget
   - `Navbar` - Dashboard navigation
   - `Sidebar` - Dashboard sidebar menu

4. **Nuxt UI Pro Components (Used):**
   - `UPageHero` - Hero sections with title/description/CTA
   - `UPageSection` - Content sections
   - `UPageGrid` - Grid layouts
   - `UPageCard` - Card components with spotlight effects
   - `UPageColumns` - Multi-column layouts
   - `UPageCTA` - Call-to-action sections
   - `UPageAccordion` - FAQ accordions
   - `UPricingPlans` / `UPricingPlan` - Pricing tables
   - `UAuthForm` - Authentication forms
   - `UCard` - Generic card container
   - `UBadge` - Status badges
   - `UButton` - Buttons with variants
   - `UInput` - Form inputs
   - `UHeader` - Header component
   - `UFooter` - Footer component
   - `UColorModeButton` - Dark/light mode toggle
   - `UTabs` - Tab navigation
   - `UContainer` - Container wrapper

5. **Patterns & Features:**
   - Responsive design (mobile-first with sm/md/lg/xl breakpoints)
   - Dark mode support throughout
   - Animated score transitions
   - Real-time chart updates
   - Form validation feedback
   - Loading states
   - Toast notifications

---

## 4. API & DATA ACCESS STRATEGY

### API Identification

**Status: HYBRID - Partial API, Partial Server-Rendered**

**Existing API Endpoints:**

1. **`POST /api/crm/connect`** (server/api/crm/connect.ts)
   - **Purpose:** Connect user CRM accounts
   - **Request Body:**
     ```json
     {
       "platform": "salesforce" | "hubspot" | "zoho" | "pipedrive",
       "credentials": {
         "clientId": "string",
         "clientSecret": "string",
         "refreshToken": "string",
         "apiKey": "string",
         "apiToken": "string"
       },
       "settings": {}
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "connectionId": "conn_1234567890_abc123",
       "platform": "salesforce",
       "connected": true,
       "userName": "Salesforce User",
       "orgName": "Example Org",
       "message": "Successfully connected to salesforce"
     }
     ```
   - **Status:** Mock implementation - returns simulated success responses

**Content API (Nuxt Content):**
- Content queries use `queryCollection()` composable
- Example: `await useAsyncData('index', () => queryCollection('index').first())`
- Fetches data from `/content` directory (YAML/Markdown files)
- Data rendered server-side

**Observed Data Access Patterns:**

1. **Server-Side Content Rendering:**
   - Homepage, pricing, blog posts loaded from `/content/*.yml` and `/content/blog/*.md`
   - Data embedded in HTML during SSR/SSG
   - No API calls needed for static content

2. **Client-Side Components:**
   - ScoreCard and DiscoveryTracker use **local reactive state** (Vue refs)
   - No backend API integration yet - fully client-side simulations
   - Signal generation/scoring happens in browser with `setInterval`

3. **Authentication:**
   - Forms submit to client-side handlers with `console.log`
   - No actual API integration yet

**Missing API Endpoints (Needed for Production):**

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile
- `GET /api/signals` - Fetch user signals
- `POST /api/signals` - Create new signal
- `GET /api/momentum-score` - Get current momentum score
- `POST /api/signal-assessment` - Save signal discovery assessment
- `GET /api/signal-assessment/:id` - Retrieve assessment
- `GET /api/activities` - Fetch user activities
- `POST /api/activities` - Create activity
- `GET /api/tasks` - Fetch user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `GET /api/clients` - Fetch clients/prospects
- `POST /api/clients` - Create client
- `GET /api/opportunities` - Fetch opportunities
- `POST /api/opportunities` - Create opportunity
- `PUT /api/crm/:platform/sync` - Trigger CRM sync
- `GET /api/subscription` - Get subscription details
- `POST /api/subscription/upgrade` - Upgrade subscription

### Strategic Recommendation

**Recommended Strategy: C) Full Database & Logic Rebuild**

**Rationale:**

1. **No Production API Exists:**
   - Current codebase has only 1 functional API endpoint (CRM connect) with mock data
   - All dashboard data (signals, momentum scores, activities) is simulated client-side
   - Content is file-based (not dynamic/user-specific)

2. **Data is Not Publicly Accessible:**
   - User-specific data (signals, scores, assessments) requires authentication
   - No web scraping possible - data doesn't exist in public HTML
   - CRM integrations require OAuth/API keys from external services

3. **Application Logic is Complex:**
   - Real-time signal scoring algorithms
   - Momentum score calculations (activity trends, conversion trends)
   - Signal assessment logic (7-point evaluation system)
   - CRM data synchronization
   - User behavior tracking

**Implementation Requirements for Standalone Application:**

### **Phase 1: Database Layer**
- Choose database: PostgreSQL (recommended) or MySQL
- Implement all 12 data models (User, Signal, MomentumScore, etc.)
- Set up relationships and foreign keys
- Create indexes for performance (userId, timestamp, clientId)

### **Phase 2: Authentication System**
- Implement JWT-based authentication
- Password hashing with bcrypt/argon2
- OAuth integration (Google, GitHub)
- Session management with httpOnly cookies
- Role-based access control (RBAC)

### **Phase 3: Core API Development**
- Build all missing API endpoints (listed above)
- Implement signal detection logic
- Momentum score calculation engine
- Signal assessment CRUD operations
- Activity and task management

### **Phase 4: CRM Integration**
- Real OAuth flows for Salesforce, HubSpot, Zoho, Pipedrive
- Webhook listeners for real-time CRM events
- Data synchronization jobs (cron/scheduled tasks)
- Mapping CRM objects → Routiine data models

### **Phase 5: Real-Time Features**
- WebSocket connections for live signal updates
- Server-sent events (SSE) for momentum score changes
- Background jobs for score recalculation
- Notification system (email, in-app)

### **Phase 6: Analytics & Reporting**
- Historical trend data storage
- Aggregate reporting queries
- Export functionality (CSV, PDF)
- Dashboard metric calculations

**Estimated Development Effort:**
- **Database + Auth:** 2-3 weeks
- **Core API:** 4-6 weeks
- **CRM Integrations:** 3-4 weeks per CRM (12-16 weeks total)
- **Real-time Features:** 2-3 weeks
- **Analytics:** 2-3 weeks
- **Testing & Refinement:** 3-4 weeks

**Total: 28-39 weeks (7-10 months) for full-featured MVP**

---

## ALTERNATIVE STRATEGIES (NOT RECOMMENDED)

### A) API Integration - **NOT FEASIBLE**
❌ No production API exists beyond mock endpoints
❌ User data is not exposed via public API
❌ Requires authentication for all meaningful data

### B) Web Scraping - **NOT FEASIBLE**
❌ Dynamic data is client-side rendered (Vue reactive state)
❌ No public access to user-specific data
❌ Authentication wall prevents data access
❌ Data doesn't exist in HTML (generated in browser)
❌ Would violate terms of service

---

## CONCLUSION

Routiine.io is a sophisticated sales operations platform built on Nuxt 3 with a modern JAMstack architecture. The current codebase represents a **high-fidelity prototype** with:

✅ Complete frontend UI/UX
✅ Component architecture
✅ Client-side simulation logic
🟡 Minimal backend API (1 mock endpoint)
❌ No production database
❌ No authentication system
❌ No CRM integration backends

**To build a standalone application, you must implement the full backend infrastructure from scratch.** This includes authentication, database design, API development, CRM OAuth integrations, real-time scoring engines, and data synchronization logic.

The frontend can be largely reused or adapted, but the core business logic and data layer require complete development. This is not a data extraction project—it's a **full application rebuild** leveraging the existing design patterns and UI components as a blueprint.
