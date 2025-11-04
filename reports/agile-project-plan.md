# ROUTIINE.IO - AGILE PROJECT PLAN

**Project Duration:** 28-39 weeks (7-10 months)
**Team Structure:** Full-stack developers, Backend engineers, Frontend engineers, DevOps, QA
**Methodology:** Scrum with 2-week sprints
**Total Sprints:** 14-20 sprints

---

## TABLE OF CONTENTS

1. [Themes](#themes)
2. [Epics by Theme](#epics-by-theme)
3. [User Stories & Tasks](#user-stories--tasks)
4. [Sprint Planning](#sprint-planning)
5. [Story Point Estimation Guide](#story-point-estimation-guide)

---

## THEMES

### Theme 1: Foundation & Infrastructure
**Business Objective:** Establish secure, scalable technical foundation for the platform
**Duration:** Sprints 1-4 (8 weeks)
**Success Metrics:** Authentication working, database operational, CI/CD pipeline deployed

### Theme 2: Core Signal Intelligence
**Business Objective:** Build real-time signal detection and scoring engine
**Duration:** Sprints 5-9 (10 weeks)
**Success Metrics:** Signals tracked in real-time, scoring algorithm accurate, momentum calculations functional

### Theme 3: CRM Integration Hub
**Business Objective:** Enable seamless data synchronization with major CRM platforms
**Duration:** Sprints 10-15 (12 weeks)
**Success Metrics:** 4 CRM integrations live, OAuth flows working, bi-directional sync operational

### Theme 4: Sales Intelligence Dashboard
**Business Objective:** Deliver actionable insights through intuitive dashboard experience
**Duration:** Sprints 6-12 (14 weeks, parallel with other themes)
**Success Metrics:** Dashboard fully functional, real-time updates, mobile responsive

### Theme 5: Discovery & Assessment Tools
**Business Objective:** Provide pain point analysis and qualification tools
**Duration:** Sprints 13-16 (8 weeks)
**Success Metrics:** 7-point assessment working, historical tracking, export capabilities

### Theme 6: Subscription & Monetization
**Business Objective:** Implement tiered pricing and billing infrastructure
**Duration:** Sprints 16-18 (6 weeks)
**Success Metrics:** Payment processing live, plan upgrades working, usage tracking accurate

### Theme 7: Analytics & Reporting
**Business Objective:** Enable data-driven decision making with comprehensive analytics
**Duration:** Sprints 17-20 (8 weeks)
**Success Metrics:** Historical trends available, export functionality, coaching insights delivered

---

## EPICS BY THEME

### Theme 1: Foundation & Infrastructure

#### Epic 1.1: Database Architecture & Setup
**Priority:** P0 (Critical)
**Story Points:** 21
**Dependencies:** None
**Sprint:** 1-2

#### Epic 1.2: Authentication & Authorization System
**Priority:** P0 (Critical)
**Story Points:** 34
**Dependencies:** Epic 1.1
**Sprint:** 2-4

#### Epic 1.3: DevOps & Deployment Pipeline
**Priority:** P0 (Critical)
**Story Points:** 13
**Dependencies:** Epic 1.1
**Sprint:** 2-3

---

### Theme 2: Core Signal Intelligence

#### Epic 2.1: Signal Detection Engine
**Priority:** P0 (Critical)
**Story Points:** 55
**Dependencies:** Epic 1.1, 1.2
**Sprint:** 5-7

#### Epic 2.2: Momentum Scorecard System
**Priority:** P0 (Critical)
**Story Points:** 34
**Dependencies:** Epic 2.1
**Sprint:** 7-9

#### Epic 2.3: Real-Time Signal Processing
**Priority:** P1 (High)
**Story Points:** 21
**Dependencies:** Epic 2.1
**Sprint:** 8-9

---

### Theme 3: CRM Integration Hub

#### Epic 3.1: Salesforce Integration
**Priority:** P0 (Critical)
**Story Points:** 34
**Dependencies:** Epic 1.2, 2.1
**Sprint:** 10-12

#### Epic 3.2: HubSpot Integration
**Priority:** P1 (High)
**Story Points:** 34
**Dependencies:** Epic 3.1
**Sprint:** 11-13

#### Epic 3.3: Zoho CRM Integration
**Priority:** P2 (Medium)
**Story Points:** 21
**Dependencies:** Epic 3.1
**Sprint:** 13-14

#### Epic 3.4: Pipedrive Integration
**Priority:** P2 (Medium)
**Story Points:** 21
**Dependencies:** Epic 3.1
**Sprint:** 14-15

---

### Theme 4: Sales Intelligence Dashboard

#### Epic 4.1: Dashboard Core Infrastructure
**Priority:** P0 (Critical)
**Story Points:** 21
**Dependencies:** Epic 1.2, 2.1
**Sprint:** 6-7

#### Epic 4.2: Signal Feed & Activity Timeline
**Priority:** P0 (Critical)
**Story Points:** 21
**Dependencies:** Epic 4.1
**Sprint:** 8-9

#### Epic 4.3: Analytics Visualizations
**Priority:** P1 (High)
**Story Points:** 21
**Dependencies:** Epic 4.1, 2.2
**Sprint:** 10-11

#### Epic 4.4: Task Management & Quick Actions
**Priority:** P1 (High)
**Story Points:** 13
**Dependencies:** Epic 4.1
**Sprint:** 11-12

---

### Theme 5: Discovery & Assessment Tools

#### Epic 5.1: Signal Discovery Assessment Tool
**Priority:** P1 (High)
**Story Points:** 34
**Dependencies:** Epic 4.1
**Sprint:** 13-15

#### Epic 5.2: Assessment History & Tracking
**Priority:** P2 (Medium)
**Story Points:** 13
**Dependencies:** Epic 5.1
**Sprint:** 15-16

---

### Theme 6: Subscription & Monetization

#### Epic 6.1: Subscription Management System
**Priority:** P0 (Critical)
**Story Points:** 34
**Dependencies:** Epic 1.2
**Sprint:** 16-18

#### Epic 6.2: Payment Processing Integration
**Priority:** P0 (Critical)
**Story Points:** 21
**Dependencies:** Epic 6.1
**Sprint:** 17-18

---

### Theme 7: Analytics & Reporting

#### Epic 7.1: Historical Trend Analytics
**Priority:** P1 (High)
**Story Points:** 21
**Dependencies:** Epic 2.1, 2.2
**Sprint:** 17-18

#### Epic 7.2: Reporting & Export Engine
**Priority:** P2 (Medium)
**Story Points:** 13
**Dependencies:** Epic 7.1
**Sprint:** 19-20

#### Epic 7.3: Manager Coaching Insights
**Priority:** P1 (High)
**Story Points:** 21
**Dependencies:** Epic 2.2, 7.1
**Sprint:** 19-20

---

## USER STORIES & TASKS

---

## EPIC 1.1: Database Architecture & Setup

### Story 1.1.1: Set Up PostgreSQL Database Infrastructure
**As a** DevOps Engineer
**I want to** provision and configure a PostgreSQL database
**So that** we have a reliable, scalable data storage layer

**Story Points:** 5
**Priority:** P0
**Acceptance Criteria:**
- PostgreSQL 15+ instance deployed
- Connection pooling configured
- Backup strategy implemented
- Read replicas configured for scaling
- Database monitoring enabled

#### Tasks:

**Task 1.1.1.1: Provision PostgreSQL Instance** (2 points)
- Subtask: Choose cloud provider (AWS RDS, Google Cloud SQL, or self-hosted)
- Subtask: Configure instance size and storage
- Subtask: Set up VPC and security groups
- Subtask: Configure SSL/TLS encryption
- Subtask: Document connection parameters

**Task 1.1.1.2: Configure Connection Pooling** (1 point)
- Subtask: Install and configure PgBouncer
- Subtask: Set pool size and connection limits
- Subtask: Configure timeout parameters
- Subtask: Test connection pool performance

**Task 1.1.1.3: Implement Backup & Recovery** (2 points)
- Subtask: Configure automated daily backups
- Subtask: Set up point-in-time recovery (PITR)
- Subtask: Test backup restoration process
- Subtask: Document recovery procedures
- Subtask: Set up backup retention policy (30 days)

---

### Story 1.1.2: Design and Implement Database Schema
**As a** Backend Developer
**I want to** create a normalized database schema with all required tables
**So that** we can store user, signal, and business data efficiently

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- All 12 data models implemented (User, Signal, MomentumScore, etc.)
- Foreign key relationships established
- Indexes created for performance
- UUID primary keys configured
- Timestamps (createdAt, updatedAt) on all tables

#### Tasks:

**Task 1.1.2.1: Create Core User & Auth Tables** (2 points)
- Subtask: Create `users` table with all fields
- Subtask: Create `sessions` table for JWT tokens
- Subtask: Create `oauth_connections` table
- Subtask: Add indexes on email, id
- Subtask: Write migration script

**Task 1.1.2.2: Create Signal & Scoring Tables** (2 points)
- Subtask: Create `signals` table with type, category, impact
- Subtask: Create `momentum_scores` table
- Subtask: Create `signal_assessments` table with JSON fields
- Subtask: Add foreign keys to users table
- Subtask: Add indexes on userId, timestamp, clientId

**Task 1.1.2.3: Create CRM & Client Tables** (2 points)
- Subtask: Create `crm_connections` table with encrypted tokens
- Subtask: Create `clients` table
- Subtask: Create `opportunities` table
- Subtask: Create `activities` table
- Subtask: Add relationship constraints

**Task 1.1.2.4: Create Subscription & Content Tables** (1 point)
- Subtask: Create `subscriptions` table
- Subtask: Create `tasks` table
- Subtask: Create `pricing_plans` table
- Subtask: Create `blog_posts` table
- Subtask: Add appropriate indexes

**Task 1.1.2.5: Write Database Seeding Scripts** (1 point)
- Subtask: Create seed data for pricing plans
- Subtask: Create sample users for testing
- Subtask: Create sample signals and activities
- Subtask: Create sample CRM data
- Subtask: Document seeding process

---

### Story 1.1.3: Set Up Database Migration System
**As a** Backend Developer
**I want to** implement a migration management system
**So that** schema changes can be versioned and applied consistently

**Story Points:** 3
**Priority:** P0
**Acceptance Criteria:**
- Migration tool configured (Prisma, Drizzle, or node-pg-migrate)
- Initial migration created
- Rollback capability tested
- Migration CI/CD integration

#### Tasks:

**Task 1.1.3.1: Configure Migration Tool** (1 point)
- Subtask: Install Prisma or Drizzle ORM
- Subtask: Configure database connection
- Subtask: Create initial migration
- Subtask: Document migration workflow

**Task 1.1.3.2: Create Migration Scripts** (1 point)
- Subtask: Write up migration for schema
- Subtask: Write down migration for rollback
- Subtask: Test migration on staging
- Subtask: Add migration to CI/CD pipeline

**Task 1.1.3.3: Set Up Schema Validation** (1 point)
- Subtask: Add schema validation tests
- Subtask: Create type definitions from schema
- Subtask: Generate TypeScript types
- Subtask: Document schema changes process

---

### Story 1.1.4: Implement Database Query Optimization
**As a** Backend Developer
**I want to** optimize database queries for performance
**So that** the application responds quickly under load

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- Indexes created on frequently queried fields
- Query execution plans analyzed
- N+1 query issues prevented
- Database query monitoring enabled

#### Tasks:

**Task 1.1.4.1: Create Performance Indexes** (2 points)
- Subtask: Add composite index on signals(userId, timestamp)
- Subtask: Add index on activities(userId, clientId)
- Subtask: Add index on opportunities(userId, stage)
- Subtask: Add index on tasks(userId, dueDate, status)
- Subtask: Add full-text search indexes for client names

**Task 1.1.4.2: Implement Query Monitoring** (2 points)
- Subtask: Set up pg_stat_statements extension
- Subtask: Configure slow query logging
- Subtask: Set up query performance alerts
- Subtask: Create dashboard for query metrics

**Task 1.1.4.3: Optimize Common Queries** (1 point)
- Subtask: Analyze signal feed query performance
- Subtask: Optimize dashboard stats queries
- Subtask: Add query result caching where appropriate
- Subtask: Document query optimization patterns

---

## EPIC 1.2: Authentication & Authorization System

### Story 1.2.1: Implement User Registration System
**As a** New User
**I want to** register for an account with email and password
**So that** I can access the platform

**Story Points:** 5
**Priority:** P0
**Acceptance Criteria:**
- Email/password registration working
- Email validation with Zod schema
- Password hashing with bcrypt/argon2
- Duplicate email detection
- Welcome email sent on registration

#### Tasks:

**Task 1.2.1.1: Create Registration API Endpoint** (2 points)
- Subtask: Create `POST /api/auth/register` endpoint
- Subtask: Implement Zod validation schema
- Subtask: Check for existing email
- Subtask: Return appropriate error messages
- Subtask: Write unit tests

**Task 1.2.1.2: Implement Password Hashing** (1 point)
- Subtask: Install argon2 or bcrypt library
- Subtask: Hash password before storage
- Subtask: Configure hashing parameters (salt rounds)
- Subtask: Add password strength validation (min 8 chars)

**Task 1.2.1.3: Create User Record in Database** (1 point)
- Subtask: Insert new user with hashed password
- Subtask: Generate UUID for user ID
- Subtask: Set default subscription tier (trial)
- Subtask: Set createdAt timestamp
- Subtask: Return user object (without password)

**Task 1.2.1.4: Send Welcome Email** (1 point)
- Subtask: Set up email service (SendGrid/Mailgun/AWS SES)
- Subtask: Create welcome email template
- Subtask: Send email asynchronously
- Subtask: Add email to background job queue
- Subtask: Handle email sending failures gracefully

---

### Story 1.2.2: Implement User Login System
**As a** Registered User
**I want to** log in with my email and password
**So that** I can access my dashboard

**Story Points:** 5
**Priority:** P0
**Acceptance Criteria:**
- Login endpoint functional
- Password verification working
- JWT tokens generated
- Refresh tokens implemented
- "Remember me" functionality

#### Tasks:

**Task 1.2.2.1: Create Login API Endpoint** (2 points)
- Subtask: Create `POST /api/auth/login` endpoint
- Subtask: Validate email and password fields
- Subtask: Query user from database
- Subtask: Return 401 if user not found
- Subtask: Write unit tests

**Task 1.2.2.2: Implement Password Verification** (1 point)
- Subtask: Compare provided password with hashed password
- Subtask: Use constant-time comparison to prevent timing attacks
- Subtask: Return error on invalid credentials
- Subtask: Implement rate limiting (5 attempts per 15 min)

**Task 1.2.2.3: Generate JWT Tokens** (2 points)
- Subtask: Install jsonwebtoken library
- Subtask: Create access token (15 min expiry)
- Subtask: Create refresh token (7 days or 30 days if "remember me")
- Subtask: Sign tokens with secret key
- Subtask: Store refresh token in database
- Subtask: Return tokens in httpOnly cookies

---

### Story 1.2.3: Implement OAuth Social Login (Google & GitHub)
**As a** New User
**I want to** sign up using my Google or GitHub account
**So that** I can register quickly without creating a password

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Google OAuth flow working
- GitHub OAuth flow working
- User created or linked on OAuth callback
- OAuth tokens stored securely
- Error handling for OAuth failures

#### Tasks:

**Task 1.2.3.1: Set Up OAuth Providers** (2 points)
- Subtask: Register app on Google Cloud Console
- Subtask: Register app on GitHub OAuth Apps
- Subtask: Configure redirect URIs
- Subtask: Store client IDs and secrets in environment variables
- Subtask: Document OAuth setup process

**Task 1.2.3.2: Create OAuth Redirect Endpoints** (2 points)
- Subtask: Create `GET /api/auth/google` redirect endpoint
- Subtask: Create `GET /api/auth/github` redirect endpoint
- Subtask: Create `GET /api/auth/google/callback` handler
- Subtask: Create `GET /api/auth/github/callback` handler
- Subtask: Handle OAuth state parameter for CSRF protection

**Task 1.2.3.3: Implement OAuth User Creation/Linking** (3 points)
- Subtask: Exchange auth code for access token
- Subtask: Fetch user profile from OAuth provider
- Subtask: Check if user exists by email
- Subtask: Create new user if doesn't exist
- Subtask: Link OAuth account if user exists
- Subtask: Store OAuth tokens in database
- Subtask: Generate JWT and log user in

**Task 1.2.3.4: Update Frontend OAuth Buttons** (1 point)
- Subtask: Connect Google button to `/api/auth/google`
- Subtask: Connect GitHub button to `/api/auth/github`
- Subtask: Add loading states during OAuth flow
- Subtask: Handle OAuth errors in UI
- Subtask: Test OAuth flow end-to-end

---

### Story 1.2.4: Implement Session Management & Token Refresh
**As a** Logged-in User
**I want to** stay logged in without re-entering credentials
**So that** I have a seamless experience

**Story Points:** 5
**Priority:** P0
**Acceptance Criteria:**
- Access tokens automatically refreshed
- Sessions persisted across browser restarts (if "remember me")
- Logout clears all tokens
- Expired sessions handled gracefully

#### Tasks:

**Task 1.2.4.1: Create Token Refresh Endpoint** (2 points)
- Subtask: Create `POST /api/auth/refresh` endpoint
- Subtask: Validate refresh token from cookie
- Subtask: Check token exists in database
- Subtask: Generate new access token
- Subtask: Optionally rotate refresh token
- Subtask: Return new tokens

**Task 1.2.4.2: Implement Frontend Token Refresh Logic** (2 points)
- Subtask: Create axios/fetch interceptor
- Subtask: Detect 401 responses
- Subtask: Call refresh endpoint
- Subtask: Retry original request with new token
- Subtask: Redirect to login if refresh fails

**Task 1.2.4.3: Create Logout Endpoint** (1 point)
- Subtask: Create `POST /api/auth/logout` endpoint
- Subtask: Delete refresh token from database
- Subtask: Clear httpOnly cookies
- Subtask: Invalidate session
- Subtask: Return success response

---

### Story 1.2.5: Implement Role-Based Access Control (RBAC)
**As a** System Administrator
**I want to** control access based on user roles
**So that** users only see features appropriate for their role

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- Roles defined (sales_rep, manager, admin)
- Permissions mapped to routes
- Middleware enforces authorization
- Frontend respects user roles

#### Tasks:

**Task 1.2.5.1: Define Role & Permission System** (1 point)
- Subtask: Create roles enum in database
- Subtask: Define permissions matrix
- Subtask: Document role capabilities
- Subtask: Add role field to User model

**Task 1.2.5.2: Create Authorization Middleware** (2 points)
- Subtask: Create `requireAuth` middleware
- Subtask: Create `requireRole(roles)` middleware
- Subtask: Extract user from JWT token
- Subtask: Check user role against required roles
- Subtask: Return 403 if unauthorized

**Task 1.2.5.3: Protect API Endpoints** (1 point)
- Subtask: Add middleware to signal endpoints
- Subtask: Add middleware to admin endpoints
- Subtask: Add middleware to manager endpoints
- Subtask: Test authorization enforcement

**Task 1.2.5.4: Implement Frontend Role Checks** (1 point)
- Subtask: Create `useAuth` composable
- Subtask: Expose user role to components
- Subtask: Hide/show UI elements based on role
- Subtask: Add route guards for role-restricted pages

---

### Story 1.2.6: Implement Password Reset Flow
**As a** User who forgot my password
**I want to** reset my password via email
**So that** I can regain access to my account

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- "Forgot password" link sends reset email
- Reset link expires after 1 hour
- Password can be changed via reset link
- Old password is invalidated

#### Tasks:

**Task 1.2.6.1: Create Password Reset Request Endpoint** (2 points)
- Subtask: Create `POST /api/auth/forgot-password` endpoint
- Subtask: Validate email address
- Subtask: Generate secure reset token (crypto.randomBytes)
- Subtask: Store token with expiry in database
- Subtask: Send reset email with link

**Task 1.2.6.2: Create Password Reset Endpoint** (2 points)
- Subtask: Create `POST /api/auth/reset-password` endpoint
- Subtask: Validate reset token
- Subtask: Check token expiry
- Subtask: Validate new password
- Subtask: Hash new password and update user
- Subtask: Invalidate reset token

**Task 1.2.6.3: Create Frontend Reset Flow** (1 point)
- Subtask: Create forgot password page
- Subtask: Create reset password page with token param
- Subtask: Add form validation
- Subtask: Show success/error messages
- Subtask: Redirect to login after success

---

### Story 1.2.7: Implement Security Hardening
**As a** Security Engineer
**I want to** protect the application from common attacks
**So that** user data remains secure

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Rate limiting implemented
- CSRF protection enabled
- SQL injection prevented
- XSS protection enabled
- Security headers configured

#### Tasks:

**Task 1.2.7.1: Implement Rate Limiting** (2 points)
- Subtask: Install express-rate-limit or h3-rate-limit
- Subtask: Configure rate limits for auth endpoints (5 req/15min)
- Subtask: Configure rate limits for API endpoints (100 req/15min)
- Subtask: Return 429 on rate limit exceeded
- Subtask: Add rate limit headers

**Task 1.2.7.2: Add CSRF Protection** (2 points)
- Subtask: Generate CSRF tokens for forms
- Subtask: Validate CSRF token on state-changing requests
- Subtask: Use SameSite cookies
- Subtask: Test CSRF protection

**Task 1.2.7.3: Configure Security Headers** (1 point)
- Subtask: Add Content-Security-Policy header
- Subtask: Add X-Frame-Options: DENY
- Subtask: Add X-Content-Type-Options: nosniff
- Subtask: Add Strict-Transport-Security (HSTS)
- Subtask: Test headers with security scanner

**Task 1.2.7.4: Implement Input Validation & Sanitization** (2 points)
- Subtask: Use Zod schemas for all API inputs
- Subtask: Sanitize user-generated content
- Subtask: Escape HTML in outputs
- Subtask: Use parameterized queries (prevent SQL injection)
- Subtask: Validate file uploads

**Task 1.2.7.5: Add Security Monitoring** (1 point)
- Subtask: Log failed login attempts
- Subtask: Set up alerts for suspicious activity
- Subtask: Monitor for brute force attacks
- Subtask: Create security incident response plan

---

## EPIC 1.3: DevOps & Deployment Pipeline

### Story 1.3.1: Set Up CI/CD Pipeline
**As a** DevOps Engineer
**I want to** automate testing and deployment
**So that** code changes are deployed safely and quickly

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- GitHub Actions or GitLab CI configured
- Automated tests run on PR
- Staging environment deploys on merge to develop
- Production deploys on merge to main
- Rollback capability exists

#### Tasks:

**Task 1.3.1.1: Configure CI Pipeline** (3 points)
- Subtask: Create GitHub Actions workflow file
- Subtask: Set up Node.js environment
- Subtask: Install dependencies
- Subtask: Run linting (ESLint)
- Subtask: Run type checking (TypeScript)
- Subtask: Run unit tests
- Subtask: Run integration tests
- Subtask: Generate code coverage report

**Task 1.3.1.2: Set Up Staging Environment** (2 points)
- Subtask: Provision staging server/container
- Subtask: Configure environment variables
- Subtask: Set up staging database
- Subtask: Configure deployment secrets in GitHub
- Subtask: Create staging deployment workflow

**Task 1.3.1.3: Set Up Production Deployment** (2 points)
- Subtask: Provision production server (Vercel/Netlify/AWS)
- Subtask: Configure production database
- Subtask: Set up environment variables
- Subtask: Create production deployment workflow
- Subtask: Add manual approval step for production
- Subtask: Configure custom domain

**Task 1.3.1.4: Implement Rollback Strategy** (1 point)
- Subtask: Tag releases with version numbers
- Subtask: Keep previous deployment artifacts
- Subtask: Create rollback workflow
- Subtask: Test rollback process
- Subtask: Document rollback procedure

---

### Story 1.3.2: Implement Monitoring & Logging
**As a** DevOps Engineer
**I want to** monitor application health and errors
**So that** I can quickly identify and resolve issues

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- Error tracking configured (Sentry)
- Application logs centralized
- Performance monitoring enabled
- Uptime monitoring configured
- Alerting set up for critical issues

#### Tasks:

**Task 1.3.2.1: Set Up Error Tracking** (2 points)
- Subtask: Create Sentry account
- Subtask: Install Sentry SDK
- Subtask: Configure error capture
- Subtask: Add source maps for stack traces
- Subtask: Set up error alerts

**Task 1.3.2.2: Configure Application Logging** (2 points)
- Subtask: Install logging library (pino, winston)
- Subtask: Configure structured logging
- Subtask: Set up log levels (debug, info, warn, error)
- Subtask: Send logs to centralized service (Datadog, LogDNA)
- Subtask: Create log rotation policy

**Task 1.3.2.3: Set Up Performance Monitoring** (1 point)
- Subtask: Install performance monitoring (New Relic, Datadog APM)
- Subtask: Track API response times
- Subtask: Monitor database query performance
- Subtask: Set up performance alerts
- Subtask: Create performance dashboard

---

## EPIC 2.1: Signal Detection Engine

### Story 2.1.1: Implement Signal Data Model & API
**As a** Backend Developer
**I want to** create APIs for capturing and retrieving signals
**So that** we can track buyer behavior

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- `POST /api/signals` endpoint creates signals
- `GET /api/signals` endpoint retrieves user's signals
- Signals filtered by type, priority, date range
- Pagination implemented
- Real-time signal creation working

#### Tasks:

**Task 2.1.1.1: Create Signal Creation API** (3 points)
- Subtask: Create `POST /api/signals` endpoint
- Subtask: Validate signal payload with Zod
- Subtask: Insert signal into database
- Subtask: Calculate signal impact score
- Subtask: Trigger momentum score recalculation
- Subtask: Return created signal object
- Subtask: Write unit tests

**Task 2.1.1.2: Create Signal Retrieval API** (3 points)
- Subtask: Create `GET /api/signals` endpoint
- Subtask: Add query params (type, priority, startDate, endDate)
- Subtask: Implement pagination (limit, offset)
- Subtask: Filter by userId from auth context
- Subtask: Order by timestamp DESC
- Subtask: Return paginated results with metadata
- Subtask: Write unit tests

**Task 2.1.1.3: Optimize Signal Queries** (2 points)
- Subtask: Add database index on (userId, timestamp)
- Subtask: Add database index on (userId, priority)
- Subtask: Implement query result caching (5 min TTL)
- Subtask: Load test signal retrieval
- Subtask: Optimize N+1 queries with client data

---

### Story 2.1.2: Implement Email Tracking Signals
**As a** Sales Rep
**I want to** track when prospects open my emails
**So that** I can follow up at the right time

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- Tracking pixels embedded in emails
- Email opens recorded as signals
- Multiple opens tracked separately
- Email client and location captured
- Signals appear in feed within 30 seconds

#### Tasks:

**Task 2.1.2.1: Create Email Tracking Pixel Endpoint** (3 points)
- Subtask: Create `GET /api/track/email/:trackingId` endpoint
- Subtask: Return 1x1 transparent GIF
- Subtask: Parse tracking ID to get userId, emailId
- Subtask: Record email open signal
- Subtask: Capture user agent and IP address
- Subtask: Handle multiple opens (increment count)

**Task 2.1.2.2: Implement Email Sending Integration** (5 points)
- Subtask: Create `POST /api/emails/send` endpoint
- Subtask: Generate unique tracking ID
- Subtask: Embed tracking pixel in email HTML
- Subtask: Send email via email service (SendGrid/Mailgun)
- Subtask: Store sent email record
- Subtask: Handle email sending failures

**Task 2.1.2.3: Create Email Open Signal Processor** (3 points)
- Subtask: Determine signal priority (first open = high, subsequent = medium)
- Subtask: Calculate signal impact score (+6 for first open, +2 for subsequent)
- Subtask: Enrich signal with email subject, recipient
- Subtask: Trigger real-time notification
- Subtask: Update client engagement score

**Task 2.1.2.4: Frontend Email Open Display** (2 points)
- Subtask: Show email open signals in feed
- Subtask: Display "Email opened" with timestamp
- Subtask: Show email subject and recipient
- Subtask: Indicate if first open or repeat
- Subtask: Add icon and priority badge

---

### Story 2.1.3: Implement Website Visit Tracking
**As a** Sales Rep
**I want to** know when prospects visit our website
**So that** I can gauge their interest level

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- JavaScript tracking code embeddable
- Page views recorded as signals
- Session tracking implemented
- Pages visited and duration captured
- Anonymous visitors identified when they convert

#### Tasks:

**Task 2.1.3.1: Create Website Tracking Script** (4 points)
- Subtask: Write JavaScript tracking snippet
- Subtask: Track page views with document.referrer
- Subtask: Track session duration
- Subtask: Capture UTM parameters
- Subtask: Send data to tracking endpoint
- Subtask: Handle tracking consent (GDPR)
- Subtask: Minimize script size and load time

**Task 2.1.3.2: Create Tracking Data Endpoint** (3 points)
- Subtask: Create `POST /api/track/pageview` endpoint
- Subtask: Accept page URL, referrer, session ID
- Subtask: Identify user from session cookie or email
- Subtask: Create page view signal
- Subtask: Update session activity timestamp
- Subtask: Return 204 No Content

**Task 2.1.3.3: Implement Session Management** (3 points)
- Subtask: Generate session ID on first visit
- Subtask: Store session in database
- Subtask: Track session start and end time
- Subtask: Calculate session duration
- Subtask: Link sessions to users when they log in

**Task 2.1.3.4: Create Page View Signal Processor** (3 points)
- Subtask: Determine signal priority based on page (pricing = high, blog = low)
- Subtask: Calculate signal impact (+4 for pricing, +2 for features, +1 for blog)
- Subtask: Detect multiple visits and increase urgency
- Subtask: Identify visitor by email if available
- Subtask: Display in signal feed with page title

---

### Story 2.1.4: Implement Document View Tracking
**As a** Sales Rep
**I want to** track when prospects view my proposals and documents
**So that** I know they're reviewing my materials

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Document viewer embedded in platform
- PDF views tracked
- Time spent on each page tracked
- Download events captured
- Signals created for meaningful engagement (>30 sec)

#### Tasks:

**Task 2.1.4.1: Create Document Upload & Storage** (3 points)
- Subtask: Create `POST /api/documents/upload` endpoint
- Subtask: Validate file type (PDF only initially)
- Subtask: Upload to cloud storage (S3/GCS)
- Subtask: Generate shareable link with tracking
- Subtask: Store document metadata in database

**Task 2.1.4.2: Build Document Viewer** (3 points)
- Subtask: Integrate PDF.js or similar viewer
- Subtask: Track page views and time per page
- Subtask: Track scroll depth
- Subtask: Send tracking events to backend
- Subtask: Detect when viewer is closed

**Task 2.1.4.3: Create Document View Signal Processor** (2 points)
- Subtask: Create signal when document opened
- Subtask: Create signal when viewed >30 seconds
- Subtask: Create signal when fully scrolled
- Subtask: Calculate engagement score from time spent
- Subtask: Display in feed with document name

---

### Story 2.1.5: Implement CRM Activity Import Signals
**As a** Sales Rep
**I want to** import my CRM activities as signals
**So that** my momentum score reflects all my work

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- CRM activities synced (calls, emails, meetings)
- Activities converted to appropriate signal types
- Historical activities imported on connection
- Incremental sync runs every 15 minutes
- Duplicate detection prevents double-counting

#### Tasks:

**Task 2.1.5.1: Create CRM Activity Sync Job** (5 points)
- Subtask: Create background job for each CRM platform
- Subtask: Fetch activities since last sync timestamp
- Subtask: Map CRM activity types to signal types
- Subtask: Extract relevant metadata (contact, subject, outcome)
- Subtask: Create signals in batch
- Subtask: Update last sync timestamp
- Subtask: Handle API rate limits and errors

**Task 2.1.5.2: Implement Duplicate Detection** (3 points)
- Subtask: Store external CRM activity ID
- Subtask: Check for existing signal before creating
- Subtask: Skip if already imported
- Subtask: Update signal if activity changed
- Subtask: Log skipped duplicates

**Task 2.1.5.3: Create Historical Data Import** (3 points)
- Subtask: On CRM connection, import last 90 days
- Subtask: Batch import in chunks of 100
- Subtask: Show progress indicator to user
- Subtask: Handle import failures gracefully
- Subtask: Allow manual re-import if needed

**Task 2.1.5.4: Schedule Incremental Sync** (2 points)
- Subtask: Set up cron job (every 15 minutes)
- Subtask: Queue sync jobs for each connected user
- Subtask: Process jobs asynchronously
- Subtask: Monitor job success/failure rates
- Subtask: Retry failed syncs with exponential backoff

---

## EPIC 2.2: Momentum Scorecard System

### Story 2.2.1: Implement Momentum Score Calculation Algorithm
**As a** Backend Developer
**I want to** calculate momentum scores based on activity and conversion signals
**So that** sales reps can see their performance trends

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- Score algorithm implemented (0-100 scale)
- Activity trend calculated (% change)
- Conversion trend calculated (% change)
- Score recalculated on new signals
- Historical scores stored for trending

#### Tasks:

**Task 2.2.1.1: Design Scoring Algorithm** (3 points)
- Subtask: Define score components (40% activity, 40% conversion, 20% consistency)
- Subtask: Calculate activity score from signal count and types
- Subtask: Calculate conversion score from deal progression
- Subtask: Calculate consistency score from daily activity pattern
- Subtask: Normalize to 0-100 scale
- Subtask: Document algorithm with examples

**Task 2.2.1.2: Implement Score Calculation Function** (5 points)
- Subtask: Create `calculateMomentumScore(userId)` function
- Subtask: Query signals from last 30 days
- Subtask: Query opportunities and stage changes
- Subtask: Calculate activity trend (compare to previous 30 days)
- Subtask: Calculate conversion trend (compare win rates)
- Subtask: Compute weighted score
- Subtask: Write comprehensive unit tests

**Task 2.2.1.3: Create Score Recalculation Trigger** (3 points)
- Subtask: Trigger recalculation on new signal creation
- Subtask: Debounce recalculations (max once per 5 minutes)
- Subtask: Queue score calculations as background jobs
- Subtask: Handle calculation errors gracefully
- Subtask: Log calculation performance

**Task 2.2.1.4: Store Historical Scores** (2 points)
- Subtask: Save calculated score to momentum_scores table
- Subtask: Keep daily snapshots for trending
- Subtask: Create index on (userId, calculatedAt)
- Subtask: Clean up scores older than 1 year
- Subtask: Query historical scores for trend charts

---

### Story 2.2.2: Create Momentum Score API Endpoints
**As a** Frontend Developer
**I want to** fetch momentum scores via API
**So that** I can display them in the dashboard

**Story Points:** 5
**Priority:** P0
**Acceptance Criteria:**
- `GET /api/momentum-score` returns current score
- `GET /api/momentum-score/history` returns historical data
- Score includes breakdown (activity, conversion, consistency)
- Trend data included (up/down, percentage change)

#### Tasks:

**Task 2.2.2.1: Create Current Score Endpoint** (2 points)
- Subtask: Create `GET /api/momentum-score` endpoint
- Subtask: Fetch latest score from database
- Subtask: Return score with breakdown and trends
- Subtask: Handle case where score doesn't exist yet
- Subtask: Add caching (5 min TTL)
- Subtask: Write unit tests

**Task 2.2.2.2: Create Historical Score Endpoint** (2 points)
- Subtask: Create `GET /api/momentum-score/history` endpoint
- Subtask: Accept date range parameters
- Subtask: Query scores for date range
- Subtask: Return array of scores with timestamps
- Subtask: Implement pagination for large datasets
- Subtask: Write unit tests

**Task 2.2.2.3: Create Score Insights Endpoint** (1 point)
- Subtask: Create `GET /api/momentum-score/insights` endpoint
- Subtask: Calculate insights (e.g., "Up 15% this week")
- Subtask: Identify top contributing activities
- Subtask: Suggest actions to improve score
- Subtask: Return insights object

---

### Story 2.2.3: Build Scorecard UI Component
**As a** Sales Rep
**I want to** see my momentum score displayed prominently
**So that** I understand my current performance

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Scorecard shows current score (0-100)
- Doughnut chart visualizes score
- Activity and conversion trends displayed
- Color-coded by performance level
- Animated score transitions

#### Tasks:

**Task 2.2.3.1: Update ScoreCard Component** (3 points)
- Subtask: Connect to `GET /api/momentum-score` endpoint
- Subtask: Display score number with animation
- Subtask: Update Chart.js doughnut chart
- Subtask: Show activity trend (e.g., "+12%")
- Subtask: Show conversion trend (e.g., "-3%")
- Subtask: Handle loading and error states

**Task 2.2.3.2: Implement Score Color Coding** (2 points)
- Subtask: Define color thresholds (0-40 red, 41-70 yellow, 71-100 green)
- Subtask: Apply colors to score display
- Subtask: Apply colors to chart
- Subtask: Add visual indicators (arrows for trends)

**Task 2.2.3.3: Add Score Breakdown Modal** (2 points)
- Subtask: Create modal/popover for detailed breakdown
- Subtask: Show activity score, conversion score, consistency score
- Subtask: Display contributing signals
- Subtask: Show comparison to previous period
- Subtask: Add "How is this calculated?" help text

**Task 2.2.3.4: Implement Real-Time Score Updates** (1 point)
- Subtask: Set up WebSocket or SSE connection
- Subtask: Listen for score change events
- Subtask: Update UI when score changes
- Subtask: Animate score transition

---

### Story 2.2.4: Implement Manager Scorecard View
**As a** Sales Manager
**I want to** see my team's momentum scores
**So that** I can identify coaching opportunities

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Team scorecard page accessible to managers
- All team members' scores displayed
- Sortable by score, name, trend
- Filterable by score range
- Individual score details viewable

#### Tasks:

**Task 2.2.4.1: Create Team Score API Endpoint** (3 points)
- Subtask: Create `GET /api/team/momentum-scores` endpoint
- Subtask: Require manager role
- Subtask: Fetch scores for all team members
- Subtask: Include user name, avatar, score, trends
- Subtask: Support sorting and filtering
- Subtask: Write unit tests

**Task 2.2.4.2: Build Team Scorecard Page** (3 points)
- Subtask: Create `/dashboard/team` page
- Subtask: Display team members in card grid
- Subtask: Show score with color coding
- Subtask: Show trends for each member
- Subtask: Add sorting controls
- Subtask: Add filtering controls

**Task 2.2.4.3: Add Score Comparison Features** (2 points)
- Subtask: Calculate team average score
- Subtask: Highlight top performers
- Subtask: Highlight struggling reps (score < 40)
- Subtask: Show score distribution chart
- Subtask: Add export functionality (CSV)

---

## EPIC 2.3: Real-Time Signal Processing

### Story 2.3.1: Implement WebSocket Infrastructure
**As a** Backend Developer
**I want to** set up WebSocket connections
**So that** we can push real-time updates to clients

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- WebSocket server configured
- Authentication handled via JWT
- Connection management implemented
- Reconnection logic working
- Broadcasting to specific users

#### Tasks:

**Task 2.3.1.1: Set Up WebSocket Server** (3 points)
- Subtask: Install socket.io or ws library
- Subtask: Create WebSocket server on separate port or path
- Subtask: Configure CORS for WebSocket connections
- Subtask: Handle connection lifecycle (connect, disconnect)
- Subtask: Implement connection pooling

**Task 2.3.1.2: Implement WebSocket Authentication** (3 points)
- Subtask: Accept JWT token in connection handshake
- Subtask: Verify token and extract userId
- Subtask: Associate connection with userId
- Subtask: Reject connections with invalid tokens
- Subtask: Handle token expiration during connection

**Task 2.3.1.3: Build Broadcasting System** (2 points)
- Subtask: Create `broadcastToUser(userId, event, data)` function
- Subtask: Create `broadcastToRoom(room, event, data)` function
- Subtask: Track user connections in memory/Redis
- Subtask: Handle multiple connections per user
- Subtask: Clean up disconnected connections

---

### Story 2.3.2: Implement Real-Time Signal Notifications
**As a** Sales Rep
**I want to** receive instant notifications when new signals arrive
**So that** I can respond immediately to prospect actions

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- New signals pushed via WebSocket
- Notifications appear in UI within 2 seconds
- Toast/notification component shows signal
- Signal feed updates automatically
- Audio/visual alert for high-priority signals

#### Tasks:

**Task 2.3.2.1: Emit Signal Events** (2 points)
- Subtask: On signal creation, emit WebSocket event
- Subtask: Send event to user's WebSocket connection
- Subtask: Include full signal object in payload
- Subtask: Add event type ('signal:created')
- Subtask: Handle offline users (store for later)

**Task 2.3.2.2: Implement Frontend WebSocket Client** (2 points)
- Subtask: Create WebSocket connection in Nuxt plugin
- Subtask: Authenticate with JWT token
- Subtask: Listen for 'signal:created' events
- Subtask: Add signal to reactive state
- Subtask: Implement reconnection logic

**Task 2.3.2.3: Build Notification UI** (1 point)
- Subtask: Create toast notification component
- Subtask: Show signal summary on arrival
- Subtask: Play sound for high-priority signals
- Subtask: Add click action to view signal details
- Subtask: Auto-dismiss after 5 seconds

---

### Story 2.3.3: Implement Live Momentum Score Updates
**As a** Sales Rep
**I want to** see my momentum score update in real-time
**So that** I can see the immediate impact of my activities

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- Score updates pushed via WebSocket
- Scorecard animates to new value
- Trend arrows update
- Score history chart updates

#### Tasks:

**Task 2.3.3.1: Emit Score Update Events** (2 points)
- Subtask: After score recalculation, emit WebSocket event
- Subtask: Send event to user's connection
- Subtask: Include new score and trends
- Subtask: Include what triggered the change

**Task 2.3.3.2: Update Frontend Score Display** (2 points)
- Subtask: Listen for 'score:updated' events
- Subtask: Animate score transition in ScoreCard
- Subtask: Update chart with new values
- Subtask: Show brief flash/highlight to indicate update

**Task 2.3.3.3: Add Score Change Notification** (1 point)
- Subtask: Show toast when score changes significantly (>5 points)
- Subtask: Display "Your score increased by 8 points!"
- Subtask: Link to what caused the change
- Subtask: Celebrate milestones (score reaches 80, 90, 100)

---

## EPIC 3.1: Salesforce Integration

### Story 3.1.1: Implement Salesforce OAuth Flow
**As a** Sales Rep
**I want to** connect my Salesforce account
**So that** Routiine can access my CRM data

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Salesforce OAuth redirect working
- Access token and refresh token stored
- Connection status displayed in UI
- Token refresh automated
- Disconnection option available

#### Tasks:

**Task 3.1.1.1: Register Salesforce Connected App** (2 points)
- Subtask: Create Connected App in Salesforce
- Subtask: Configure OAuth scopes (api, refresh_token)
- Subtask: Set redirect URI
- Subtask: Store client ID and secret in env variables
- Subtask: Document setup process

**Task 3.1.1.2: Create Salesforce OAuth Endpoints** (3 points)
- Subtask: Create `GET /api/crm/salesforce/connect` redirect
- Subtask: Create `GET /api/crm/salesforce/callback` handler
- Subtask: Exchange authorization code for tokens
- Subtask: Fetch user info from Salesforce
- Subtask: Store tokens in crm_connections table (encrypted)
- Subtask: Set connection status to 'connected'

**Task 3.1.1.3: Implement Token Refresh Logic** (2 points)
- Subtask: Detect 401 responses from Salesforce API
- Subtask: Use refresh token to get new access token
- Subtask: Update stored access token
- Subtask: Retry original request
- Subtask: Handle refresh token expiration

**Task 3.1.1.4: Build Connection UI** (1 point)
- Subtask: Add "Connect Salesforce" button
- Subtask: Show connection status badge
- Subtask: Display connected user/org info
- Subtask: Add "Disconnect" button
- Subtask: Show last sync timestamp

---

### Story 3.1.2: Sync Salesforce Contacts to Clients
**As a** Sales Rep
**I want to** import my Salesforce contacts
**So that** they appear in Routiine as clients

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- Contacts synced on initial connection
- Incremental sync runs every 30 minutes
- Contact fields mapped correctly
- Duplicates handled intelligently
- Sync errors logged and reported

#### Tasks:

**Task 3.1.2.1: Create Salesforce Contact Sync Job** (5 points)
- Subtask: Query Salesforce Contacts API
- Subtask: Handle pagination (200 records per page)
- Subtask: Map Contact fields to Client model
- Subtask: Fetch related Account for company name
- Subtask: Store Salesforce Contact ID as externalId
- Subtask: Insert/update clients in database
- Subtask: Handle API rate limits (sleep between batches)

**Task 3.1.2.2: Implement Incremental Sync** (3 points)
- Subtask: Query contacts modified since last sync
- Subtask: Use SystemModstamp field for change detection
- Subtask: Update changed clients
- Subtask: Create new clients
- Subtask: Handle deleted contacts (soft delete)

**Task 3.1.2.3: Create Sync Job Scheduler** (3 points)
- Subtask: Create cron job (every 30 minutes)
- Subtask: Queue Salesforce sync for each connected user
- Subtask: Process jobs with background worker
- Subtask: Track sync status (in_progress, completed, failed)
- Subtask: Retry failed syncs

**Task 3.1.2.4: Build Sync Status UI** (2 points)
- Subtask: Show "Syncing..." indicator during sync
- Subtask: Display sync statistics (X contacts synced)
- Subtask: Show last sync time
- Subtask: Add "Sync Now" manual trigger button
- Subtask: Display sync errors with details

---

### Story 3.1.3: Sync Salesforce Opportunities
**As a** Sales Rep
**I want to** import my Salesforce opportunities
**So that** conversion tracking works in Routiine

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- Opportunities synced with contacts
- Stage changes tracked
- Opportunity value and probability synced
- Closed won/lost dates captured
- Pipeline value calculated

#### Tasks:

**Task 3.1.3.1: Create Opportunity Sync Job** (5 points)
- Subtask: Query Salesforce Opportunities API
- Subtask: Map Opportunity fields to Routiine model
- Subtask: Link opportunities to synced clients
- Subtask: Store Salesforce Opportunity ID
- Subtask: Sync stage, amount, probability, close date
- Subtask: Insert/update opportunities

**Task 3.1.3.2: Implement Stage Change Detection** (3 points)
- Subtask: Compare previous and current stage
- Subtask: Create activity record for stage changes
- Subtask: Generate signal for positive stage movement
- Subtask: Generate signal for stalled deals
- Subtask: Update momentum score on stage change

**Task 3.1.3.3: Track Closed Won/Lost** (3 points)
- Subtask: Detect when opportunity closes
- Subtask: Record close date and reason
- Subtask: Update conversion metrics
- Subtask: Create completion signal
- Subtask: Calculate win rate for user

**Task 3.1.3.4: Build Opportunity Display** (2 points)
- Subtask: Show opportunities in dashboard
- Subtask: Display stage pipeline view
- Subtask: Show opportunity value and probability
- Subtask: Highlight recent stage changes
- Subtask: Link opportunities to clients

---

### Story 3.1.4: Sync Salesforce Activities (Tasks, Events)
**As a** Sales Rep
**I want to** import my Salesforce activities
**So that** my activity metrics are accurate

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Tasks and Events synced
- Activity types mapped correctly
- Completed activities tracked
- Due dates respected
- Bidirectional sync (Routiine → Salesforce)

#### Tasks:

**Task 3.1.4.1: Sync Salesforce Tasks** (3 points)
- Subtask: Query Salesforce Tasks API
- Subtask: Map Task to Activity/Task models
- Subtask: Sync task status (completed, pending)
- Subtask: Link tasks to contacts and opportunities
- Subtask: Create signals for completed tasks

**Task 3.1.4.2: Sync Salesforce Events (Meetings)** (3 points)
- Subtask: Query Salesforce Events API
- Subtask: Map Events to Activity model
- Subtask: Sync event type (call, meeting)
- Subtask: Sync event date and attendees
- Subtask: Create signals for meetings held

**Task 3.1.4.3: Implement Bidirectional Sync** (2 points)
- Subtask: When activity created in Routiine, create in Salesforce
- Subtask: When task completed in Routiine, update Salesforce
- Subtask: Handle conflicts (last write wins)
- Subtask: Log sync operations for debugging

---

## EPIC 3.2: HubSpot Integration

### Story 3.2.1: Implement HubSpot OAuth Flow
**As a** Sales Rep
**I want to** connect my HubSpot account
**So that** Routiine can access my CRM data

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- HubSpot OAuth working
- Access token stored securely
- Connection displayed in UI
- Token refresh automated

#### Tasks:

**Task 3.2.1.1: Register HubSpot App** (2 points)
- Subtask: Create app in HubSpot Developer Portal
- Subtask: Configure OAuth scopes (contacts, deals, timeline)
- Subtask: Set redirect URI
- Subtask: Store client ID and secret

**Task 3.2.1.2: Create HubSpot OAuth Endpoints** (3 points)
- Subtask: Create `/api/crm/hubspot/connect` redirect
- Subtask: Create `/api/crm/hubspot/callback` handler
- Subtask: Exchange code for tokens
- Subtask: Fetch portal info
- Subtask: Store tokens encrypted

**Task 3.2.1.3: Implement Token Refresh** (2 points)
- Subtask: Detect 401 from HubSpot API
- Subtask: Use refresh token to get new access
- Subtask: Update stored token
- Subtask: Retry request

**Task 3.2.1.4: Build Connection UI** (1 point)
- Subtask: Add "Connect HubSpot" button
- Subtask: Show connection status
- Subtask: Display portal name
- Subtask: Add disconnect option

---

### Story 3.2.2: Sync HubSpot Contacts
**As a** Sales Rep
**I want to** import HubSpot contacts
**So that** they appear as clients in Routiine

**Story Points:** 13
**Priority:** P1
**Acceptance Criteria:**
- Contacts imported on connection
- Incremental sync every 30 minutes
- Contact properties mapped
- Company associations preserved

#### Tasks:

**Task 3.2.2.1: Create HubSpot Contact Sync** (5 points)
- Subtask: Query HubSpot Contacts API v3
- Subtask: Handle pagination (100 per page)
- Subtask: Map contact properties to Client fields
- Subtask: Fetch associated company
- Subtask: Store HubSpot contact ID
- Subtask: Insert/update clients

**Task 3.2.2.2: Implement Incremental Sync** (3 points)
- Subtask: Use lastmodifieddate filter
- Subtask: Sync only changed contacts
- Subtask: Handle deleted contacts
- Subtask: Update last sync timestamp

**Task 3.2.2.3: Schedule Sync Jobs** (3 points)
- Subtask: Create cron for HubSpot sync
- Subtask: Queue jobs per user
- Subtask: Track sync status
- Subtask: Retry failures

**Task 3.2.2.4: Build Sync UI** (2 points)
- Subtask: Show sync progress
- Subtask: Display sync stats
- Subtask: Add manual sync button
- Subtask: Show errors

---

### Story 3.2.3: Sync HubSpot Deals
**As a** Sales Rep
**I want to** import HubSpot deals
**So that** my pipeline is tracked in Routiine

**Story Points:** 13
**Priority:** P1
**Acceptance Criteria:**
- Deals synced with contacts
- Deal stages mapped
- Deal value tracked
- Closed dates captured

#### Tasks:

**Task 3.2.3.1: Create Deal Sync Job** (5 points)
- Subtask: Query HubSpot Deals API
- Subtask: Map deal properties to Opportunity
- Subtask: Link deals to contacts
- Subtask: Sync dealstage to stage enum
- Subtask: Sync amount, closedate, probability

**Task 3.2.3.2: Track Deal Stage Changes** (3 points)
- Subtask: Compare previous stage
- Subtask: Create activity for changes
- Subtask: Generate signals
- Subtask: Update momentum score

**Task 3.2.3.3: Handle Closed Deals** (3 points)
- Subtask: Detect closed won/lost
- Subtask: Record close date
- Subtask: Update conversion metrics
- Subtask: Calculate win rate

**Task 3.2.3.4: Display Deals** (2 points)
- Subtask: Show in dashboard
- Subtask: Pipeline visualization
- Subtask: Link to contacts
- Subtask: Highlight changes

---

## EPIC 4.1: Dashboard Core Infrastructure

### Story 4.1.1: Build Dashboard Layout & Navigation
**As a** Sales Rep
**I want to** navigate between dashboard sections easily
**So that** I can access all features quickly

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Sidebar navigation working
- Top header with user menu
- Responsive mobile layout
- Active route highlighting
- Breadcrumb navigation

#### Tasks:

**Task 4.1.1.1: Create Dashboard Layout Component** (3 points)
- Subtask: Build sidebar with navigation links
- Subtask: Create header with logo and user menu
- Subtask: Implement collapsible sidebar for mobile
- Subtask: Add main content area
- Subtask: Make responsive (breakpoints: sm, md, lg, xl)

**Task 4.1.1.2: Implement Navigation Menu** (2 points)
- Subtask: Add menu items (Dashboard, Signals, Clients, Opportunities, Tasks, Settings)
- Subtask: Highlight active route
- Subtask: Add icons to menu items
- Subtask: Implement nested menu items
- Subtask: Add keyboard navigation

**Task 4.1.1.3: Build User Menu** (2 points)
- Subtask: Show user avatar and name
- Subtask: Add dropdown with Profile, Settings, Logout
- Subtask: Display subscription tier badge
- Subtask: Add notifications icon with badge count
- Subtask: Implement dark mode toggle

**Task 4.1.1.4: Add Breadcrumb Navigation** (1 point)
- Subtask: Generate breadcrumbs from route
- Subtask: Make breadcrumb items clickable
- Subtask: Style appropriately
- Subtask: Hide on mobile

---

### Story 4.1.2: Create Dashboard Home Page
**As a** Sales Rep
**I want to** see an overview of my key metrics
**So that** I can quickly assess my performance

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Key metrics displayed (signals, activities, conversion rate)
- Momentum scorecard prominent
- Recent signals feed
- Upcoming tasks list
- Quick action buttons

#### Tasks:

**Task 4.1.2.1: Build Stats Cards** (2 points)
- Subtask: Create StatsCard component
- Subtask: Display active signals count
- Subtask: Display this week's activities count
- Subtask: Display conversion rate %
- Subtask: Display pipeline value
- Subtask: Add trend indicators (up/down arrows)

**Task 4.1.2.2: Integrate Momentum Scorecard** (2 points)
- Subtask: Place scorecard prominently
- Subtask: Fetch score from API
- Subtask: Display with animation
- Subtask: Link to detailed view

**Task 4.1.2.3: Add Recent Signals Feed** (2 points)
- Subtask: Fetch latest 10 signals
- Subtask: Display with icons and timestamps
- Subtask: Color code by priority
- Subtask: Add "View All" link
- Subtask: Real-time updates via WebSocket

**Task 4.1.2.4: Add Quick Actions** (2 points)
- Subtask: Add "Log Activity" button
- Subtask: Add "Create Task" button
- Subtask: Add "Run Signal Assessment" button
- Subtask: Add "Connect CRM" button (if not connected)
- Subtask: Implement action modals

---

### Story 4.1.3: Implement Global Search
**As a** Sales Rep
**I want to** search for clients, opportunities, and activities
**So that** I can quickly find what I need

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- Search bar in header
- Searches clients, opportunities, signals
- Results grouped by type
- Keyboard shortcut (Cmd/Ctrl + K)
- Recent searches saved

#### Tasks:

**Task 4.1.3.1: Create Search API Endpoint** (2 points)
- Subtask: Create `GET /api/search` endpoint
- Subtask: Accept query parameter
- Subtask: Search across clients, opportunities, activities
- Subtask: Use full-text search or LIKE queries
- Subtask: Return grouped results
- Subtask: Limit to 20 results total

**Task 4.1.3.2: Build Search UI Component** (2 points)
- Subtask: Create search input in header
- Subtask: Implement autocomplete dropdown
- Subtask: Group results by type
- Subtask: Add icons and metadata
- Subtask: Navigate to item on click

**Task 4.1.3.3: Add Keyboard Shortcuts** (1 point)
- Subtask: Listen for Cmd/Ctrl + K
- Subtask: Focus search input
- Subtask: Arrow keys to navigate results
- Subtask: Enter to select
- Subtask: Escape to close

---

## EPIC 4.2: Signal Feed & Activity Timeline

### Story 4.2.1: Build Signal Feed Page
**As a** Sales Rep
**I want to** see all my signals in one place
**So that** I can review and act on them

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- All signals displayed in reverse chronological order
- Filterable by type, priority, date range
- Grouped by date
- Infinite scroll or pagination
- Mark as read/unread

#### Tasks:

**Task 4.2.1.1: Create Signal Feed Component** (3 points)
- Subtask: Fetch signals from `GET /api/signals`
- Subtask: Display in list with icons
- Subtask: Show signal type, client, timestamp
- Subtask: Color code by priority
- Subtask: Implement pagination (20 per page)

**Task 4.2.1.2: Add Signal Filters** (2 points)
- Subtask: Add type filter dropdown (all, email, page view, etc.)
- Subtask: Add priority filter (all, high, medium, low)
- Subtask: Add date range picker
- Subtask: Apply filters to API query
- Subtask: Show active filters with clear button

**Task 4.2.1.3: Implement Date Grouping** (2 points)
- Subtask: Group signals by date (Today, Yesterday, This Week, etc.)
- Subtask: Add date headers
- Subtask: Calculate relative time (2 hours ago)
- Subtask: Make grouping collapsible

**Task 4.2.1.4: Add Signal Actions** (1 point)
- Subtask: Add "Mark as Read" button
- Subtask: Add "View Client" link
- Subtask: Add "Create Task" quick action
- Subtask: Add "Dismiss" option

---

### Story 4.2.2: Build Activity Timeline
**As a** Sales Rep
**I want to** see a timeline of all my activities
**So that** I can track what I've done

**Story Points:** 5
**Priority:** P1
**Acceptance Criteria:**
- Activities displayed chronologically
- Activity types distinguished visually
- Linked to clients and opportunities
- Editable and deletable
- Filterable by type and client

#### Tasks:

**Task 4.2.2.1: Create Activity Timeline Component** (2 points)
- Subtask: Fetch activities from `GET /api/activities`
- Subtask: Display in timeline format
- Subtask: Show activity type icon
- Subtask: Display description and timestamp
- Subtask: Link to related client/opportunity

**Task 4.2.2.2: Add Activity Filters** (1 point)
- Subtask: Filter by activity type
- Subtask: Filter by client
- Subtask: Filter by date range
- Subtask: Apply filters to API

**Task 4.2.2.3: Implement Activity CRUD** (2 points)
- Subtask: Add "Log Activity" button
- Subtask: Create activity form modal
- Subtask: Edit existing activities
- Subtask: Delete activities with confirmation
- Subtask: Update timeline in real-time

---

## EPIC 4.3: Analytics Visualizations

### Story 4.3.1: Build Activity Trend Chart
**As a** Sales Rep
**I want to** see my activity trends over time
**So that** I can understand my work patterns

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Line chart showing activities per day
- Last 30 days displayed
- Activity types color-coded
- Tooltips show details
- Exportable as image

#### Tasks:

**Task 4.3.1.1: Create Activity Trend API** (2 points)
- Subtask: Create `GET /api/analytics/activity-trend` endpoint
- Subtask: Accept date range parameter
- Subtask: Aggregate activities by day
- Subtask: Group by activity type
- Subtask: Return array of {date, counts by type}

**Task 4.3.1.2: Build Chart Component** (3 points)
- Subtask: Use Chart.js line chart
- Subtask: Plot activities per day
- Subtask: Multiple lines for each activity type
- Subtask: Add legend
- Subtask: Style chart appropriately

**Task 4.3.1.3: Add Interactivity** (2 points)
- Subtask: Tooltips on hover
- Subtask: Click to filter by date
- Subtask: Zoom/pan for longer ranges
- Subtask: Toggle activity types on/off

**Task 4.3.1.4: Add Export Functionality** (1 point)
- Subtask: Export chart as PNG
- Subtask: Export data as CSV
- Subtask: Add export button to UI

---

### Story 4.3.2: Build Conversion Funnel Visualization
**As a** Sales Rep
**I want to** see my deal progression funnel
**So that** I can identify where deals are getting stuck

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Funnel chart showing deals at each stage
- Conversion rates between stages
- Filterable by date range
- Drilldown to see deals in each stage

#### Tasks:

**Task 4.3.2.1: Create Conversion Funnel API** (3 points)
- Subtask: Create `GET /api/analytics/conversion-funnel` endpoint
- Subtask: Count opportunities at each stage
- Subtask: Calculate conversion rates between stages
- Subtask: Calculate average time in each stage
- Subtask: Return funnel data structure

**Task 4.3.2.2: Build Funnel Chart** (3 points)
- Subtask: Use Chart.js or custom SVG funnel
- Subtask: Display stages (Discovery → Proposal → Negotiation → Closed Won)
- Subtask: Size segments by opportunity count
- Subtask: Show conversion percentages

**Task 4.3.2.3: Add Drilldown Functionality** (2 points)
- Subtask: Click stage to see opportunities
- Subtask: Show opportunity list in modal
- Subtask: Display opportunity details
- Subtask: Link to opportunity page

---

### Story 4.3.3: Build Signal Heatmap
**As a** Sales Rep
**I want to** see when my prospects are most active
**So that** I can time my outreach better

**Story Points:** 5
**Priority:** P2
**Acceptance Criteria:**
- Heatmap showing signal activity by day of week and hour
- Color intensity based on signal count
- Filterable by signal type
- Tooltips show exact counts

#### Tasks:

**Task 4.3.3.1: Create Heatmap Data API** (2 points)
- Subtask: Create `GET /api/analytics/signal-heatmap` endpoint
- Subtask: Aggregate signals by day of week and hour
- Subtask: Return 7x24 matrix of counts
- Subtask: Support filtering by signal type

**Task 4.3.3.2: Build Heatmap Visualization** (2 points)
- Subtask: Create heatmap component (D3.js or Chart.js)
- Subtask: Display 7 rows (days) x 24 columns (hours)
- Subtask: Color cells based on signal count
- Subtask: Add axis labels

**Task 4.3.3.3: Add Tooltips and Filters** (1 point)
- Subtask: Show count on hover
- Subtask: Add signal type filter
- Subtask: Update heatmap on filter change

---

## EPIC 5.1: Signal Discovery Assessment Tool

### Story 5.1.1: Build Discovery Assessment UI
**As a** Sales Rep
**I want to** assess client pain points across 7 dimensions
**So that** I can qualify opportunities properly

**Story Points:** 13
**Priority:** P1
**Acceptance Criteria:**
- All 7 assessment dimensions displayed
- 1-5 rating scale for each
- Notes field for each dimension
- Total score calculated (0-35)
- Intensity level shown
- Progress indicator

#### Tasks:

**Task 5.1.1.1: Enhance DiscoveryTracker Component** (5 points)
- Subtask: Display all 7 signal categories
- Subtask: Add 1-5 star rating input for each
- Subtask: Add textarea for notes on each
- Subtask: Add "assessed" checkbox
- Subtask: Calculate total score dynamically
- Subtask: Display intensity level (Minimal, Mild, Moderate, Significant, Severe)

**Task 5.1.1.2: Add Client Selection** (2 points)
- Subtask: Add client autocomplete input
- Subtask: Fetch clients from API
- Subtask: Create new client if doesn't exist
- Subtask: Pre-fill salesperson name from user profile

**Task 5.1.1.3: Implement Progress Tracking** (2 points)
- Subtask: Show progress bar (X of 7 assessed)
- Subtask: Highlight incomplete dimensions
- Subtask: Validate all assessed before submit
- Subtask: Show warning if score is low

**Task 5.1.1.4: Add Assessment Guidance** (2 points)
- Subtask: Add help text for each dimension
- Subtask: Add examples for each rating level
- Subtask: Add tooltips explaining scoring
- Subtask: Link to documentation

**Task 5.1.1.5: Style Assessment UI** (2 points)
- Subtask: Use card layout for each dimension
- Subtask: Color code by score (red/yellow/green)
- Subtask: Responsive design for mobile
- Subtask: Add visual indicators for assessed items

---

### Story 5.1.2: Implement Assessment Save & Retrieval
**As a** Sales Rep
**I want to** save my assessments
**So that** I can review them later

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Assessments saved to database
- Draft mode for incomplete assessments
- Final submission with validation
- Edit existing assessments
- Delete assessments

#### Tasks:

**Task 5.1.2.1: Create Assessment API Endpoints** (3 points)
- Subtask: Create `POST /api/signal-assessment` to save
- Subtask: Create `GET /api/signal-assessment/:id` to retrieve
- Subtask: Create `PUT /api/signal-assessment/:id` to update
- Subtask: Create `DELETE /api/signal-assessment/:id` to delete
- Subtask: Validate payload with Zod

**Task 5.1.2.2: Implement Save Functionality** (2 points)
- Subtask: Save as draft on each input change (debounced)
- Subtask: Final submit when all assessed
- Subtask: Store signals JSON in database
- Subtask: Calculate and store total score and intensity
- Subtask: Return saved assessment object

**Task 5.1.2.3: Implement Load & Edit** (2 points)
- Subtask: Load existing assessment on page load
- Subtask: Pre-fill form with saved data
- Subtask: Enable editing mode
- Subtask: Update on save

**Task 5.1.2.4: Add Delete Functionality** (1 point)
- Subtask: Add delete button with confirmation
- Subtask: Call delete API
- Subtask: Redirect after deletion

---

### Story 5.1.3: Create Assessment Results Page
**As a** Sales Rep
**I want to** see a summary of my assessment
**So that** I can understand the qualification outcome

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Overall score and intensity displayed
- Breakdown by dimension shown
- Recommendations based on score
- Exportable as PDF
- Shareable with manager

#### Tasks:

**Task 5.1.3.1: Build Results Summary** (3 points)
- Subtask: Display total score prominently
- Subtask: Show intensity level with color coding
- Subtask: Display radar chart of 7 dimensions
- Subtask: Show client name and date
- Subtask: Add visual score gauge

**Task 5.1.3.2: Add Dimension Breakdown** (2 points)
- Subtask: List all 7 dimensions with ratings
- Subtask: Show notes for each
- Subtask: Highlight strongest and weakest signals
- Subtask: Compare to average scores

**Task 5.1.3.3: Generate Recommendations** (2 points)
- Subtask: Based on score, suggest next actions
- Subtask: Low score (0-14): "Qualification concerns"
- Subtask: Medium score (15-24): "Qualified opportunity"
- Subtask: High score (25-35): "High-priority prospect"
- Subtask: Display recommended follow-up strategy

**Task 5.1.3.4: Add Export & Share** (1 point)
- Subtask: Export to PDF with branding
- Subtask: Include all assessment data
- Subtask: Add "Share with Manager" button
- Subtask: Send email notification with link

---

## EPIC 5.2: Assessment History & Tracking

### Story 5.2.1: Build Assessment History Page
**As a** Sales Rep
**I want to** view all my past assessments
**So that** I can track client qualification over time

**Story Points:** 8
**Priority:** P2
**Acceptance Criteria:**
- All assessments listed
- Sorted by date (newest first)
- Filterable by client, score range, date
- Searchable
- Click to view details

#### Tasks:

**Task 5.2.1.1: Create Assessment List API** (2 points)
- Subtask: Create `GET /api/signal-assessments` endpoint
- Subtask: Return all user's assessments
- Subtask: Include client name, score, intensity, date
- Subtask: Support pagination
- Subtask: Support filtering and sorting

**Task 5.2.1.2: Build Assessment List UI** (3 points)
- Subtask: Display assessments in table or card grid
- Subtask: Show client name, score, intensity, date
- Subtask: Color code by intensity level
- Subtask: Add "View" button for each
- Subtask: Implement pagination

**Task 5.2.1.3: Add Filters & Search** (2 points)
- Subtask: Client filter dropdown
- Subtask: Score range slider
- Subtask: Date range picker
- Subtask: Search by client name
- Subtask: Apply filters to API query

**Task 5.2.1.4: Implement Sorting** (1 point)
- Subtask: Sort by date, score, client name
- Subtask: Toggle ascending/descending
- Subtask: Persist sort preference

---

### Story 5.2.2: Implement Assessment Comparison
**As a** Sales Rep
**I want to** compare assessments for the same client
**So that** I can see how their pain has evolved

**Story Points:** 5
**Priority:** P2
**Acceptance Criteria:**
- Select multiple assessments to compare
- Side-by-side comparison view
- Highlight changes in ratings
- Show score trend over time

#### Tasks:

**Task 5.2.2.1: Add Multi-Select to List** (1 point)
- Subtask: Add checkboxes to assessment list
- Subtask: Enable selecting 2-3 assessments
- Subtask: Show "Compare" button when selected

**Task 5.2.2.2: Build Comparison View** (3 points)
- Subtask: Display selected assessments side-by-side
- Subtask: Show each dimension's rating for each
- Subtask: Highlight changes (arrows up/down)
- Subtask: Show score progression line chart

**Task 5.2.2.3: Add Comparison Insights** (1 point)
- Subtask: Calculate which dimensions improved/worsened
- Subtask: Show overall trend (increasing pain, stable, decreasing)
- Subtask: Suggest actions based on trends

---

## EPIC 6.1: Subscription Management System

### Story 6.1.1: Implement Subscription Data Model & API
**As a** Backend Developer
**I want to** manage user subscriptions
**So that** we can track plan tiers and billing

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Subscription model implemented
- User assigned to plan on registration
- Plans upgradeable/downgradeable
- Trial period supported
- Subscription status tracked

#### Tasks:

**Task 6.1.1.1: Create Subscription Model** (2 points)
- Subtask: Subscriptions table already in schema
- Subtask: Create default subscription on user registration
- Subtask: Set trial status for new users (14-day trial)
- Subtask: Add foreign key to users table

**Task 6.1.1.2: Create Subscription API Endpoints** (3 points)
- Subtask: Create `GET /api/subscription` endpoint
- Subtask: Return user's subscription with plan details
- Subtask: Create `POST /api/subscription/upgrade` endpoint
- Subtask: Create `POST /api/subscription/cancel` endpoint
- Subtask: Validate plan changes (can't downgrade mid-billing cycle)

**Task 6.1.1.3: Implement Plan Change Logic** (2 points)
- Subtask: Calculate prorated charges for upgrades
- Subtask: Handle downgrades at end of period
- Subtask: Update subscription record
- Subtask: Trigger billing event
- Subtask: Send confirmation email

**Task 6.1.1.4: Add Trial Management** (1 point)
- Subtask: Check trial expiry on each request
- Subtask: Show trial countdown in UI
- Subtask: Block features when trial expires
- Subtask: Send trial ending reminder emails (3 days before)

---

### Story 6.1.2: Build Pricing Page with Plan Selection
**As a** User
**I want to** view and select a subscription plan
**So that** I can sign up for the service

**Story Points:** 5
**Priority:** P0
**Acceptance Criteria:**
- Pricing page displays 3 tiers
- Features listed for each plan
- Monthly/yearly toggle
- "Select Plan" buttons functional
- Current plan highlighted for logged-in users

#### Tasks:

**Task 6.1.2.1: Update Pricing Page Component** (2 points)
- Subtask: Pricing page already exists (pages/pricing.vue)
- Subtask: Fetch plans from `GET /api/pricing-plans`
- Subtask: Display Basic, Standard, Premium
- Subtask: Show monthly and yearly prices
- Subtask: List features for each plan

**Task 6.1.2.2: Add Plan Selection Logic** (2 points)
- Subtask: Connect "Select Plan" buttons
- Subtask: If not logged in, redirect to signup
- Subtask: If logged in, redirect to checkout
- Subtask: Pass selected plan ID to checkout

**Task 6.1.2.3: Highlight Current Plan** (1 point)
- Subtask: Fetch user's subscription
- Subtask: Highlight current plan card
- Subtask: Show "Current Plan" badge
- Subtask: Disable "Select Plan" for current plan

---

### Story 6.1.3: Implement Subscription Settings Page
**As a** User
**I want to** manage my subscription
**So that** I can upgrade, downgrade, or cancel

**Story Points:** 8
**Priority:** P0
**Acceptance Criteria:**
- Current plan displayed
- Upgrade/downgrade options shown
- Cancel subscription option
- Billing history visible
- Payment method editable

#### Tasks:

**Task 6.1.3.1: Create Subscription Settings Page** (3 points)
- Subtask: Create `/dashboard/settings/subscription` page
- Subtask: Fetch and display current subscription
- Subtask: Show plan name, price, billing cycle
- Subtask: Show next billing date
- Subtask: Display payment method (last 4 digits)

**Task 6.1.3.2: Add Plan Change UI** (2 points)
- Subtask: Show available plans to upgrade/downgrade
- Subtask: Calculate price difference
- Subtask: Show prorated charge preview
- Subtask: Add "Change Plan" button
- Subtask: Confirm change with modal

**Task 6.1.3.3: Implement Cancellation Flow** (2 points)
- Subtask: Add "Cancel Subscription" button
- Subtask: Show cancellation confirmation modal
- Subtask: Explain what happens on cancellation
- Subtask: Call `POST /api/subscription/cancel`
- Subtask: Update UI to show cancelled status

**Task 6.1.3.4: Display Billing History** (1 point)
- Subtask: Fetch invoices from payment processor
- Subtask: Display in table (date, amount, status)
- Subtask: Add "Download Invoice" links
- Subtask: Show upcoming invoice

---

### Story 6.1.4: Implement Usage-Based Limits
**As a** Backend Developer
**I want to** enforce plan limits
**So that** users can't exceed their tier's allowances

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Signal limits enforced (Basic: 500/mo, Standard: 2000/mo, Premium: unlimited)
- CRM connections limited (Basic: 1, Standard: 2, Premium: unlimited)
- Assessments limited (Basic: 10/mo, Standard: 50/mo, Premium: unlimited)
- Upgrade prompts shown when limit reached

#### Tasks:

**Task 6.1.4.1: Define Plan Limits** (1 point)
- Subtask: Add limits to pricing_plans table
- Subtask: Document limits in code
- Subtask: Create limits configuration file

**Task 6.1.4.2: Implement Usage Tracking** (3 points)
- Subtask: Count signals created this month
- Subtask: Count CRM connections
- Subtask: Count assessments created this month
- Subtask: Store counts in cache (Redis) for performance

**Task 6.1.4.3: Enforce Limits in API** (3 points)
- Subtask: Check limit before creating signal
- Subtask: Check limit before connecting CRM
- Subtask: Check limit before creating assessment
- Subtask: Return 403 with upgrade message if limit reached
- Subtask: Add middleware for limit checking

**Task 6.1.4.4: Add Usage Display in UI** (1 point)
- Subtask: Show usage stats in settings (e.g., "450/500 signals")
- Subtask: Show progress bar for usage
- Subtask: Display warning when approaching limit (90%)
- Subtask: Show "Upgrade" CTA when limit reached

---

## EPIC 6.2: Payment Processing Integration

### Story 6.2.1: Integrate Stripe Payment Processing
**As a** User
**I want to** pay for my subscription with a credit card
**So that** I can access premium features

**Story Points:** 13
**Priority:** P0
**Acceptance Criteria:**
- Stripe checkout working
- Card payment processed
- Subscription activated on success
- Webhooks handle payment events
- Failed payments handled gracefully

#### Tasks:

**Task 6.2.1.1: Set Up Stripe Account & Integration** (2 points)
- Subtask: Create Stripe account
- Subtask: Install Stripe SDK
- Subtask: Configure API keys (publishable and secret)
- Subtask: Set up test mode
- Subtask: Create products and prices in Stripe

**Task 6.2.1.2: Create Checkout Session Endpoint** (3 points)
- Subtask: Create `POST /api/checkout/create-session` endpoint
- Subtask: Accept plan ID and billing cycle
- Subtask: Create Stripe checkout session
- Subtask: Include customer email
- Subtask: Set success and cancel URLs
- Subtask: Return session ID

**Task 6.2.1.3: Build Checkout UI** (2 points)
- Subtask: Create checkout page
- Subtask: Redirect to Stripe Checkout
- Subtask: Use Stripe.js to handle redirect
- Subtask: Show loading state

**Task 6.2.1.4: Implement Webhook Handler** (4 points)
- Subtask: Create `POST /api/webhooks/stripe` endpoint
- Subtask: Verify webhook signature
- Subtask: Handle `checkout.session.completed` event
- Subtask: Activate subscription in database
- Subtask: Handle `invoice.payment_succeeded` event
- Subtask: Handle `invoice.payment_failed` event
- Subtask: Handle `customer.subscription.deleted` (cancellation)
- Subtask: Log all webhook events

**Task 6.2.1.5: Handle Payment Failures** (2 points)
- Subtask: Detect failed payment from webhook
- Subtask: Update subscription status to 'past_due'
- Subtask: Send payment failure email
- Subtask: Show alert in dashboard
- Subtask: Retry payment automatically (Stripe does this)

---

### Story 6.2.2: Implement Payment Method Management
**As a** User
**I want to** update my payment method
**So that** my subscription continues without interruption

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Current payment method displayed
- Add new payment method
- Remove payment methods
- Set default payment method

#### Tasks:

**Task 6.2.2.1: Create Payment Method API** (3 points)
- Subtask: Create `GET /api/payment-methods` endpoint
- Subtask: Fetch payment methods from Stripe
- Subtask: Return list with last4, brand, expiry
- Subtask: Create `POST /api/payment-methods` endpoint
- Subtask: Attach payment method to customer
- Subtask: Create `DELETE /api/payment-methods/:id` endpoint

**Task 6.2.2.2: Build Payment Method UI** (3 points)
- Subtask: Create payment methods page
- Subtask: Display saved cards
- Subtask: Add "Add Payment Method" button
- Subtask: Use Stripe Elements for card input
- Subtask: Validate card details
- Subtask: Save card on submit

**Task 6.2.2.3: Implement Default Payment Method** (2 points)
- Subtask: Show default badge on card
- Subtask: Add "Set as Default" button
- Subtask: Update default in Stripe
- Subtask: Refresh UI after update

---

## EPIC 7.1: Historical Trend Analytics

### Story 7.1.1: Implement Historical Data Storage
**As a** Backend Developer
**I want to** store historical snapshots of metrics
**So that** we can show trends over time

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Daily snapshots of momentum scores stored
- Signal counts aggregated by day
- Activity counts aggregated by day
- Conversion rates calculated daily
- Data retention policy (1 year)

#### Tasks:

**Task 7.1.1.1: Create Daily Snapshot Job** (3 points)
- Subtask: Create cron job to run at midnight
- Subtask: Calculate daily metrics for all users
- Subtask: Store momentum score snapshot
- Subtask: Store signal count by type
- Subtask: Store activity count by type
- Subtask: Calculate and store conversion rate

**Task 7.1.1.2: Create Metrics Tables** (2 points)
- Subtask: Create `daily_metrics` table
- Subtask: Columns: userId, date, momentumScore, signalCounts (JSON), activityCounts (JSON), conversionRate
- Subtask: Add indexes on (userId, date)
- Subtask: Write migration

**Task 7.1.1.3: Implement Data Retention** (2 points)
- Subtask: Create cleanup job (weekly)
- Subtask: Delete metrics older than 1 year
- Subtask: Archive to cold storage if needed
- Subtask: Log deletion counts

**Task 7.1.1.4: Backfill Historical Data** (1 point)
- Subtask: Calculate metrics for past dates
- Subtask: Run backfill script once
- Subtask: Validate backfilled data
- Subtask: Handle missing data gracefully

---

### Story 7.1.2: Build Trend Charts
**As a** Sales Rep
**I want to** see my performance trends over time
**So that** I can identify patterns and improvements

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Momentum score trend chart (30/60/90 days)
- Signal volume trend chart
- Activity volume trend chart
- Conversion rate trend chart
- Selectable date ranges

#### Tasks:

**Task 7.1.2.1: Create Trend API Endpoints** (3 points)
- Subtask: Create `GET /api/analytics/momentum-trend` endpoint
- Subtask: Accept date range parameter (30d, 60d, 90d, custom)
- Subtask: Query daily_metrics table
- Subtask: Return array of {date, score}
- Subtask: Create similar endpoints for signals, activities, conversion

**Task 7.1.2.2: Build Momentum Score Trend Chart** (2 points)
- Subtask: Create line chart component
- Subtask: Fetch data from momentum-trend endpoint
- Subtask: Plot score over time
- Subtask: Add target line (e.g., goal of 80)
- Subtask: Color code based on performance

**Task 7.1.2.3: Build Multi-Metric Dashboard** (2 points)
- Subtask: Create analytics page
- Subtask: Display multiple trend charts
- Subtask: Add date range selector
- Subtask: Synchronize all charts to same date range
- Subtask: Responsive grid layout

**Task 7.1.2.4: Add Trend Insights** (1 point)
- Subtask: Calculate trend direction (improving, declining, stable)
- Subtask: Calculate percentage change
- Subtask: Highlight significant changes
- Subtask: Display insights text (e.g., "Your momentum increased 25% this month")

---

## EPIC 7.2: Reporting & Export Engine

### Story 7.2.1: Implement Report Generation
**As a** Sales Manager
**I want to** generate reports on team performance
**So that** I can share insights with leadership

**Story Points:** 8
**Priority:** P2
**Acceptance Criteria:**
- Generate PDF reports
- Include key metrics and charts
- Customizable date range
- Team and individual reports
- Scheduled report delivery

#### Tasks:

**Task 7.2.1.1: Install PDF Generation Library** (1 point)
- Subtask: Install puppeteer or pdfkit
- Subtask: Configure for server-side rendering
- Subtask: Test PDF generation

**Task 7.2.1.2: Create Report Templates** (3 points)
- Subtask: Design HTML template for reports
- Subtask: Include header with logo and date range
- Subtask: Section for key metrics (scores, activities, conversions)
- Subtask: Section for trend charts (rendered as images)
- Subtask: Section for insights and recommendations
- Subtask: Style for print

**Task 7.2.1.3: Create Report Generation API** (3 points)
- Subtask: Create `POST /api/reports/generate` endpoint
- Subtask: Accept report type, user/team ID, date range
- Subtask: Fetch all relevant data
- Subtask: Render HTML template with data
- Subtask: Convert to PDF
- Subtask: Return PDF or download link

**Task 7.2.1.4: Add Report UI** (1 point)
- Subtask: Add "Generate Report" button to analytics page
- Subtask: Show report options modal (date range, format)
- Subtask: Trigger report generation
- Subtask: Download PDF when ready

---

### Story 7.2.2: Implement Data Export
**As a** Sales Rep
**I want to** export my data to CSV/Excel
**So that** I can analyze it in other tools

**Story Points:** 5
**Priority:** P2
**Acceptance Criteria:**
- Export signals to CSV
- Export activities to CSV
- Export assessments to CSV
- Export opportunities to CSV
- Include all relevant fields

#### Tasks:

**Task 7.2.2.1: Create CSV Export Utilities** (2 points)
- Subtask: Install csv-writer library
- Subtask: Create `generateCSV(data, columns)` utility
- Subtask: Handle special characters and escaping
- Subtask: Test with various data

**Task 7.2.2.2: Create Export API Endpoints** (2 points)
- Subtask: Create `GET /api/export/signals` endpoint
- Subtask: Create `GET /api/export/activities` endpoint
- Subtask: Create `GET /api/export/assessments` endpoint
- Subtask: Create `GET /api/export/opportunities` endpoint
- Subtask: Accept date range filter
- Subtask: Stream CSV response

**Task 7.2.2.3: Add Export Buttons to UI** (1 point)
- Subtask: Add "Export to CSV" button to each list page
- Subtask: Trigger download on click
- Subtask: Show loading state during export
- Subtask: Handle export errors

---

## EPIC 7.3: Manager Coaching Insights

### Story 7.3.1: Implement Coaching Recommendations Engine
**As a** Sales Manager
**I want to** receive coaching recommendations for my team
**So that** I can help struggling reps improve

**Story Points:** 13
**Priority:** P1
**Acceptance Criteria:**
- Identify reps with declining scores
- Identify reps with low activity
- Identify reps with stalled deals
- Generate specific recommendations
- Prioritize coaching needs

#### Tasks:

**Task 7.3.1.1: Build Scoring Algorithm** (5 points)
- Subtask: Detect momentum score decline >15% over 2 weeks
- Subtask: Detect activity below team average
- Subtask: Detect opportunities stalled >30 days
- Subtask: Detect low conversion rate (<20%)
- Subtask: Calculate coaching priority score
- Subtask: Identify root cause (low activity vs poor conversion)

**Task 7.3.1.2: Generate Recommendations** (3 points)
- Subtask: For low activity: "Increase outreach volume"
- Subtask: For low conversion: "Review discovery process"
- Subtask: For stalled deals: "Focus on follow-up cadence"
- Subtask: For inconsistent activity: "Establish daily routine"
- Subtask: Provide specific action items for each

**Task 7.3.1.3: Create Coaching Insights API** (3 points)
- Subtask: Create `GET /api/coaching/insights` endpoint
- Subtask: Require manager role
- Subtask: Analyze all team members
- Subtask: Return prioritized list of insights
- Subtask: Include rep name, issue, recommendation, priority

**Task 7.3.1.4: Build Coaching Dashboard** (2 points)
- Subtask: Create `/dashboard/coaching` page
- Subtask: Display insights in priority order
- Subtask: Show rep details and metrics
- Subtask: Link to rep's detailed view
- Subtask: Add "Mark as Addressed" action

---

### Story 7.3.2: Implement Team Performance Comparison
**As a** Sales Manager
**I want to** compare my team members' performance
**So that** I can identify best practices to share

**Story Points:** 8
**Priority:** P1
**Acceptance Criteria:**
- Side-by-side comparison of reps
- Key metrics displayed (score, activities, conversion)
- Leaderboard view
- Identify top performers
- Identify behaviors of top performers

#### Tasks:

**Task 7.3.2.1: Create Team Comparison API** (3 points)
- Subtask: Create `GET /api/team/comparison` endpoint
- Subtask: Fetch metrics for all team members
- Subtask: Calculate rankings
- Subtask: Identify top 20% performers
- Subtask: Return comparison data

**Task 7.3.2.2: Build Comparison Table** (3 points)
- Subtask: Display team members in table
- Subtask: Columns: Name, Score, Activities, Conversion Rate, Rank
- Subtask: Sortable by each column
- Subtask: Highlight top performers (green)
- Subtask: Highlight struggling reps (red)

**Task 7.3.2.3: Add Best Practices Analysis** (2 points)
- Subtask: Analyze behaviors of top 20%
- Subtask: Identify common patterns (activity types, frequency)
- Subtask: Display insights (e.g., "Top performers log 3x more calls")
- Subtask: Suggest replicating behaviors

---

## SPRINT PLANNING

### Sprint 1 (Weeks 1-2): Database & Auth Foundation

**Goal:** Set up database infrastructure and begin authentication system

**Stories:**
- 1.1.1: Set Up PostgreSQL Database Infrastructure (5 pts)
- 1.1.2: Design and Implement Database Schema (8 pts)
- 1.1.3: Set Up Database Migration System (3 pts)
- 1.2.1: Implement User Registration System (5 pts)

**Total Points:** 21
**Team Capacity:** 20-25 points

**Deliverables:**
- PostgreSQL database operational
- All tables created with relationships
- Migration system working
- User registration API functional

---

### Sprint 2 (Weeks 3-4): Authentication & DevOps

**Goal:** Complete authentication system and establish CI/CD

**Stories:**
- 1.1.4: Implement Database Query Optimization (5 pts)
- 1.2.2: Implement User Login System (5 pts)
- 1.2.4: Implement Session Management & Token Refresh (5 pts)
- 1.3.1: Set Up CI/CD Pipeline (8 pts)

**Total Points:** 23
**Team Capacity:** 20-25 points

**Deliverables:**
- Login working with JWT
- Session management functional
- CI/CD pipeline deployed
- Automated tests running

---

### Sprint 3 (Weeks 5-6): OAuth & Security

**Goal:** Add OAuth login and security hardening

**Stories:**
- 1.2.3: Implement OAuth Social Login (8 pts)
- 1.2.5: Implement Role-Based Access Control (5 pts)
- 1.2.6: Implement Password Reset Flow (5 pts)

**Total Points:** 18
**Team Capacity:** 20-25 points

**Deliverables:**
- Google and GitHub OAuth working
- RBAC implemented
- Password reset functional

---

### Sprint 4 (Weeks 7-8): Security & Monitoring

**Goal:** Harden security and add monitoring

**Stories:**
- 1.2.7: Implement Security Hardening (8 pts)
- 1.3.2: Implement Monitoring & Logging (5 pts)
- 2.1.1: Implement Signal Data Model & API (8 pts)

**Total Points:** 21
**Team Capacity:** 20-25 points

**Deliverables:**
- Rate limiting active
- Security headers configured
- Error tracking with Sentry
- Signal API endpoints created

---

### Sprint 5 (Weeks 9-10): Signal Detection - Email & Web

**Goal:** Build core signal detection capabilities

**Stories:**
- 2.1.2: Implement Email Tracking Signals (13 pts)
- 2.1.3: Implement Website Visit Tracking (13 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points (increased capacity)

**Deliverables:**
- Email tracking pixels working
- Website tracking script deployed
- Signals appearing in database

---

### Sprint 6 (Weeks 11-12): Dashboard Foundation

**Goal:** Build dashboard infrastructure and more signal types

**Stories:**
- 2.1.4: Implement Document View Tracking (8 pts)
- 4.1.1: Build Dashboard Layout & Navigation (8 pts)
- 4.1.2: Create Dashboard Home Page (8 pts)

**Total Points:** 24
**Team Capacity:** 25-30 points

**Deliverables:**
- Document tracking working
- Dashboard layout complete
- Dashboard home page functional

---

### Sprint 7 (Weeks 13-14): Momentum Scorecard

**Goal:** Implement momentum score calculation and display

**Stories:**
- 2.2.1: Implement Momentum Score Calculation Algorithm (13 pts)
- 2.2.2: Create Momentum Score API Endpoints (5 pts)
- 2.2.3: Build Scorecard UI Component (8 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- Momentum score algorithm working
- Scores calculated correctly
- Scorecard component displaying live data

---

### Sprint 8 (Weeks 15-16): CRM Activity Import & Real-Time

**Goal:** Import CRM activities and add real-time updates

**Stories:**
- 2.1.5: Implement CRM Activity Import Signals (13 pts)
- 2.3.1: Implement WebSocket Infrastructure (8 pts)
- 4.1.3: Implement Global Search (5 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- CRM activities syncing
- WebSocket server operational
- Global search working

---

### Sprint 9 (Weeks 17-18): Real-Time Features & Manager View

**Goal:** Complete real-time features and manager scorecard

**Stories:**
- 2.3.2: Implement Real-Time Signal Notifications (5 pts)
- 2.3.3: Implement Live Momentum Score Updates (5 pts)
- 2.2.4: Implement Manager Scorecard View (8 pts)
- 4.2.1: Build Signal Feed Page (8 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- Real-time notifications working
- Manager team view functional
- Signal feed page complete

---

### Sprint 10 (Weeks 19-20): Salesforce Integration Part 1

**Goal:** Establish Salesforce OAuth and contact sync

**Stories:**
- 3.1.1: Implement Salesforce OAuth Flow (8 pts)
- 3.1.2: Sync Salesforce Contacts to Clients (13 pts)

**Total Points:** 21
**Team Capacity:** 25-30 points

**Deliverables:**
- Salesforce connection working
- Contacts syncing automatically

---

### Sprint 11 (Weeks 21-22): Salesforce Integration Part 2

**Goal:** Complete Salesforce integration with opportunities

**Stories:**
- 3.1.3: Sync Salesforce Opportunities (13 pts)
- 3.1.4: Sync Salesforce Activities (8 pts)
- 4.2.2: Build Activity Timeline (5 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- Salesforce opportunities syncing
- Salesforce activities importing
- Activity timeline functional

---

### Sprint 12 (Weeks 23-24): HubSpot Integration & Analytics

**Goal:** Add HubSpot CRM integration and analytics charts

**Stories:**
- 3.2.1: Implement HubSpot OAuth Flow (8 pts)
- 3.2.2: Sync HubSpot Contacts (13 pts)
- 4.3.1: Build Activity Trend Chart (8 pts)

**Total Points:** 29
**Team Capacity:** 25-30 points

**Deliverables:**
- HubSpot connection working
- HubSpot contacts syncing
- Activity trend chart displaying

---

### Sprint 13 (Weeks 25-26): HubSpot Deals & Funnel Viz

**Goal:** Complete HubSpot integration and add conversion funnel

**Stories:**
- 3.2.3: Sync HubSpot Deals (13 pts)
- 4.3.2: Build Conversion Funnel Visualization (8 pts)
- 4.4.1: Build Task Management Widget (from Epic 4.4) (6 pts)

**Total Points:** 27
**Team Capacity:** 25-30 points

**Deliverables:**
- HubSpot deals syncing
- Conversion funnel chart complete
- Task management working

---

### Sprint 14 (Weeks 27-28): Zoho & Pipedrive

**Goal:** Add remaining CRM integrations

**Stories:**
- 3.3: Zoho CRM Integration (21 pts - full epic, condensed)
- 4.3.3: Build Signal Heatmap (5 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- Zoho integration functional
- Signal heatmap displaying

---

### Sprint 15 (Weeks 29-30): Pipedrive & Discovery Tool

**Goal:** Complete CRM integrations and start discovery tool

**Stories:**
- 3.4: Pipedrive Integration (21 pts - full epic, condensed)
- 5.1.1: Build Discovery Assessment UI (13 pts)

**Total Points:** 34
**Team Capacity:** 30-35 points

**Deliverables:**
- Pipedrive integration complete
- Discovery assessment UI built

---

### Sprint 16 (Weeks 31-32): Discovery Tool & Subscriptions

**Goal:** Complete discovery tool and start subscription system

**Stories:**
- 5.1.2: Implement Assessment Save & Retrieval (8 pts)
- 5.1.3: Create Assessment Results Page (8 pts)
- 6.1.1: Implement Subscription Data Model & API (8 pts)

**Total Points:** 24
**Team Capacity:** 25-30 points

**Deliverables:**
- Discovery assessments saving
- Assessment results displaying
- Subscription model implemented

---

### Sprint 17 (Weeks 33-34): Subscription Management & Billing

**Goal:** Complete subscription features and integrate Stripe

**Stories:**
- 6.1.2: Build Pricing Page with Plan Selection (5 pts)
- 6.1.3: Implement Subscription Settings Page (8 pts)
- 6.2.1: Integrate Stripe Payment Processing (13 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- Pricing page functional
- Subscription settings working
- Stripe payments processing

---

### Sprint 18 (Weeks 35-36): Usage Limits & Analytics

**Goal:** Enforce plan limits and start analytics features

**Stories:**
- 6.1.4: Implement Usage-Based Limits (8 pts)
- 6.2.2: Implement Payment Method Management (8 pts)
- 7.1.1: Implement Historical Data Storage (8 pts)

**Total Points:** 24
**Team Capacity:** 25-30 points

**Deliverables:**
- Plan limits enforced
- Payment methods manageable
- Historical metrics storing

---

### Sprint 19 (Weeks 37-38): Trend Analytics & Reporting

**Goal:** Build trend analytics and reporting features

**Stories:**
- 7.1.2: Build Trend Charts (8 pts)
- 7.2.1: Implement Report Generation (8 pts)
- 7.2.2: Implement Data Export (5 pts)
- 5.2.1: Build Assessment History Page (8 pts)

**Total Points:** 29
**Team Capacity:** 25-30 points

**Deliverables:**
- Trend charts displaying
- PDF reports generating
- CSV exports working
- Assessment history page complete

---

### Sprint 20 (Weeks 39-40): Coaching Insights & Polish

**Goal:** Add manager coaching features and final polish

**Stories:**
- 7.3.1: Implement Coaching Recommendations Engine (13 pts)
- 7.3.2: Implement Team Performance Comparison (8 pts)
- 5.2.2: Implement Assessment Comparison (5 pts)

**Total Points:** 26
**Team Capacity:** 25-30 points

**Deliverables:**
- Coaching insights generating
- Team comparison working
- Assessment comparison functional

---

## STORY POINT ESTIMATION GUIDE

**Point Scale:** Fibonacci (1, 2, 3, 5, 8, 13, 21, 34)

**1 Point (Trivial)**
- Simple UI update
- Configuration change
- Add a field to existing form
- Write basic unit test
- **Effort:** 1-2 hours

**2 Points (Easy)**
- Simple API endpoint (CRUD)
- Basic component creation
- Simple database query
- Basic form validation
- **Effort:** 2-4 hours

**3 Points (Moderate)**
- API endpoint with business logic
- Component with state management
- Database migration with relationships
- Integration test suite
- **Effort:** 4-8 hours

**5 Points (Complex)**
- Feature with multiple endpoints
- Complex component with interactions
- Advanced query optimization
- OAuth implementation
- **Effort:** 1-2 days

**8 Points (Very Complex)**
- Complete feature across stack
- Integration with external service
- Complex algorithm implementation
- Full page with multiple components
- **Effort:** 2-3 days

**13 Points (Epic)**
- Large feature requiring multiple parts
- Complex integration (CRM sync)
- Major refactoring
- Full workflow implementation
- **Effort:** 3-5 days

**21 Points (Major Epic)**
- Multiple related features
- Complete subsystem
- Full integration with all components
- **Effort:** 1 week
- **Consideration:** Should be broken into smaller stories

**34 Points (Too Large)**
- Multiple epics combined
- **Action Required:** Must be decomposed into smaller stories

---

## DEPENDENCIES & RISKS

### Critical Path Dependencies

**Authentication → Everything**
- All features require working authentication
- Risk: Delays in Sprint 1-3 impact entire project

**Database → All Backend Features**
- Signal detection, CRM sync, subscriptions all need DB
- Risk: Schema changes later are costly

**CRM OAuth → CRM Sync**
- Must have OAuth before syncing data
- Risk: OAuth approval delays from CRM vendors

**WebSocket → Real-Time Features**
- Real-time notifications depend on WebSocket infrastructure
- Risk: Scaling issues under load

### Technical Risks

**1. CRM API Rate Limits**
- **Risk:** Salesforce/HubSpot may throttle API calls
- **Mitigation:** Implement exponential backoff, caching, batch operations

**2. WebSocket Scalability**
- **Risk:** Many concurrent connections may overload server
- **Mitigation:** Use Redis for pub/sub, horizontal scaling

**3. Momentum Score Algorithm Accuracy**
- **Risk:** Algorithm may not accurately reflect performance
- **Mitigation:** A/B testing, user feedback, iterative refinement

**4. Payment Processing Failures**
- **Risk:** Failed payments or webhook issues
- **Mitigation:** Comprehensive error handling, manual reconciliation process

**5. Data Privacy & GDPR Compliance**
- **Risk:** Storing user data requires compliance
- **Mitigation:** Data retention policies, user consent, right to deletion

### Resource Risks

**1. Backend Developer Availability**
- **Impact:** Critical for Sprints 1-11 (auth, signals, CRM)
- **Mitigation:** Cross-train team members

**2. Frontend Developer Availability**
- **Impact:** Critical for Sprints 6-20 (dashboard, analytics)
- **Mitigation:** Start UI work early, use design system

**3. DevOps Expertise**
- **Impact:** Required for Sprint 2 (CI/CD), ongoing deployments
- **Mitigation:** External consultant if needed

---

## SUCCESS METRICS

### Sprint Success Criteria

**Every Sprint:**
- All story acceptance criteria met
- Unit tests written and passing
- Code reviewed and merged
- Deployed to staging
- No critical bugs

### Milestone Metrics

**Milestone 1 (Sprint 4): Foundation Complete**
- ✅ Users can register and log in
- ✅ Database operational with all tables
- ✅ CI/CD pipeline working
- ✅ Security hardening in place

**Milestone 2 (Sprint 9): Core Features Complete**
- ✅ Signals being detected and scored
- ✅ Momentum scores calculating correctly
- ✅ Dashboard displaying real-time data
- ✅ Real-time notifications working

**Milestone 3 (Sprint 15): CRM Integrations Complete**
- ✅ All 4 CRM platforms connected
- ✅ Contacts, opportunities, activities syncing
- ✅ Bi-directional sync operational

**Milestone 4 (Sprint 18): Monetization Ready**
- ✅ Subscription plans selectable
- ✅ Stripe payments processing
- ✅ Usage limits enforced
- ✅ Billing management working

**Milestone 5 (Sprint 20): Full Product Launch**
- ✅ All features complete
- ✅ Analytics and reporting functional
- ✅ Coaching insights delivering value
- ✅ Discovery tool operational
- ✅ Performance optimized
- ✅ Documentation complete

---

## BACKLOG PRIORITIZATION

### P0 (Critical - Must Have for MVP)
- Epic 1.1, 1.2: Database & Authentication
- Epic 2.1, 2.2: Signal Detection & Momentum Scoring
- Epic 3.1, 3.2: Salesforce & HubSpot Integration
- Epic 4.1, 4.2: Dashboard Core
- Epic 6.1, 6.2: Subscriptions & Payments

### P1 (High - Should Have)
- Epic 1.3: DevOps
- Epic 2.3: Real-Time Features
- Epic 4.3: Analytics Visualizations
- Epic 5.1: Discovery Assessment Tool
- Epic 7.1, 7.3: Trend Analytics & Coaching

### P2 (Medium - Nice to Have)
- Epic 3.3, 3.4: Zoho & Pipedrive Integration
- Epic 4.4: Task Management
- Epic 5.2: Assessment History
- Epic 7.2: Reporting & Export

### P3 (Low - Future Enhancements)
- Mobile app
- Advanced AI recommendations
- Integrations with marketing tools
- Custom reporting builder
- API for third-party integrations

---

## RELEASE STRATEGY

### Alpha Release (Sprint 9 - Week 18)
**Audience:** Internal team
**Features:** Auth, Signal Detection, Momentum Score, Basic Dashboard
**Goal:** Validate core functionality

### Beta Release (Sprint 15 - Week 30)
**Audience:** 10-20 friendly customers
**Features:** + CRM Integrations (Salesforce, HubSpot), Discovery Tool
**Goal:** Validate CRM integrations, gather feedback

### MVP Release (Sprint 18 - Week 36)
**Audience:** Public launch (limited)
**Features:** + Subscriptions, Payments, All 4 CRMs
**Goal:** Start revenue generation

### V1.0 Release (Sprint 20 - Week 40)
**Audience:** Full public launch
**Features:** + Analytics, Reporting, Coaching Insights
**Goal:** Complete product offering

---

## CONCLUSION

This agile project plan provides a comprehensive roadmap for building Routiine.io from the ground up. The 20-sprint plan spans 40 weeks (10 months) and delivers a full-featured sales intelligence platform with:

- ✅ Secure authentication & authorization
- ✅ Real-time signal detection & scoring
- ✅ Momentum scorecard system
- ✅ 4 CRM integrations (Salesforce, HubSpot, Zoho, Pipedrive)
- ✅ Interactive dashboard with analytics
- ✅ Signal discovery assessment tool
- ✅ Subscription management & payments
- ✅ Historical trend analytics
- ✅ Coaching insights for managers

**Total Estimated Story Points:** ~500 points
**Average Velocity:** 25 points/sprint
**Team Size:** 4-6 developers (2 backend, 2 frontend, 1 full-stack, 1 DevOps)

The plan balances frontend and backend work, manages dependencies carefully, and delivers value incrementally through regular releases. Each sprint has clear goals, deliverables, and success criteria.
