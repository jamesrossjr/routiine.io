# SPRINT 2 TESTING GUIDE
## Features Implemented & Test Plan

**Sprint:** Sprint 2 (Weeks 3-4)
**Status:** Ready for Testing
**Date:** 2025-11-04

---

## Features to Test

### 1. Database Query Optimization ✅
- Performance indexes created
- Query helper utilities implemented
- Optimized query patterns

### 2. OAuth Social Login ✅
- Google OAuth flow
- GitHub OAuth flow
- OAuth connection storage
- User creation/linking

---

## Prerequisites

### 1. PostgreSQL Setup

```bash
# Install PostgreSQL (if not already installed)
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# Create database
createdb routiine_dev

# Or using psql:
psql -U postgres
CREATE DATABASE routiine_dev;
\q
```

### 2. Environment Variables

Update `.env` with your database credentials:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/routiine_dev
JWT_SECRET=dev-jwt-secret-change-in-production-make-it-long-and-random
JWT_REFRESH_SECRET=dev-refresh-token-secret-also-change-this-in-production
APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Run Migrations

```bash
# Generate migration from schema
pnpm db:generate

# Apply migration
pnpm db:migrate

# OR push schema directly (for development)
pnpm db:push

# Open Drizzle Studio to verify tables
pnpm db:studio
```

### 4. Apply Performance Indexes

```bash
# Connect to database
psql -U postgres -d routiine_dev

# Run the indexes script
\i server/database/indexes.sql

# Verify indexes created
\di

# Exit
\q
```

---

## Manual Testing

### Test 1: User Registration

```bash
# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123"
  }' \
  -c cookies.txt \
  -v

# Expected Response:
# Status: 200
# Body: {
#   "success": true,
#   "message": "Account created successfully",
#   "user": { ... }
# }
# Cookies: accessToken, refreshToken

# Verify in database:
psql -U postgres -d routiine_dev -c "SELECT * FROM users WHERE email = 'test@example.com';"
psql -U postgres -d routiine_dev -c "SELECT * FROM subscriptions WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com');"
```

**Expected Results:**
- ✅ User created in `users` table
- ✅ Subscription created with status 'trial'
- ✅ Trial ends 14 days from now
- ✅ Password is hashed (not plaintext)
- ✅ Cookies set with httpOnly flag

---

### Test 2: User Login

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "rememberMe": false
  }' \
  -c cookies.txt \
  -v

# Expected Response:
# Status: 200
# Body: {
#   "success": true,
#   "message": "Login successful",
#   "user": { ... }
# }

# Test invalid password
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "WrongPassword"
  }' \
  -v

# Expected Response:
# Status: 401
# Body: { "message": "Invalid email or password" }
```

**Expected Results:**
- ✅ Successful login with correct credentials
- ✅ Returns user object (no password)
- ✅ Sets authentication cookies
- ✅ Updates lastLogin timestamp
- ✅ Rejects invalid credentials with 401

---

### Test 3: Protected Endpoint (Get Current User)

```bash
# Get current user (with cookies from login)
curl http://localhost:3000/api/auth/me \
  -b cookies.txt \
  -v

# Expected Response:
# Status: 200
# Body: {
#   "success": true,
#   "user": { ...user data... },
#   "subscription": { ...subscription data... }
# }

# Test without authentication
curl http://localhost:3000/api/auth/me \
  -v

# Expected Response:
# Status: 401
# Body: { "message": "Unauthorized - Please log in" }
```

**Expected Results:**
- ✅ Returns user data when authenticated
- ✅ Returns subscription info
- ✅ Rejects unauthenticated requests with 401
- ✅ No password in response

---

### Test 4: Token Refresh

```bash
# Wait 1 minute (access token expires in 15 min, but let's test the refresh mechanism)
# Or manually expire the access token cookie

# Call refresh endpoint
curl -X POST http://localhost:3000/api/auth/refresh \
  -b cookies.txt \
  -c cookies.txt \
  -v

# Expected Response:
# Status: 200
# Body: { "success": true, "message": "Token refreshed successfully" }
# New access token set in cookies

# Verify can still access protected route
curl http://localhost:3000/api/auth/me \
  -b cookies.txt \
  -v

# Expected: 200 OK
```

**Expected Results:**
- ✅ Refresh token validated
- ✅ New access token generated
- ✅ Cookies updated
- ✅ Can access protected routes with new token

---

### Test 5: Logout

```bash
# Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt \
  -c cookies.txt \
  -v

# Expected Response:
# Status: 200
# Body: { "success": true, "message": "Logged out successfully" }
# Cookies cleared

# Try to access protected route after logout
curl http://localhost:3000/api/auth/me \
  -b cookies.txt \
  -v

# Expected Response:
# Status: 401
# Body: { "message": "Unauthorized - Please log in" }
```

**Expected Results:**
- ✅ Refresh token removed from database
- ✅ Cookies cleared
- ✅ Cannot access protected routes after logout

---

### Test 6: Input Validation

```bash
# Test invalid email
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "password": "TestPass123"
  }' \
  -v

# Expected: 400 Bad Request
# Body contains validation errors

# Test weak password
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test2@example.com",
    "password": "weak"
  }' \
  -v

# Expected: 400 Bad Request
# Body: { "message": "Password must be at least 8 characters" }

# Test missing fields
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test"
  }' \
  -v

# Expected: 400 Bad Request
```

**Expected Results:**
- ✅ Email format validated
- ✅ Password strength enforced (8+ chars, uppercase, lowercase, number)
- ✅ Required fields checked
- ✅ Clear error messages returned

---

### Test 7: Duplicate Email Prevention

```bash
# Try to register with existing email
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "test@example.com",
    "password": "TestPass123"
  }' \
  -v

# Expected Response:
# Status: 409 Conflict
# Body: { "message": "An account with this email already exists" }
```

**Expected Results:**
- ✅ Rejects duplicate email with 409
- ✅ Clear error message
- ✅ No duplicate records created

---

### Test 8: OAuth Flow (Google)

**Prerequisites:**
- Google OAuth app created in Google Cloud Console
- Client ID and Secret added to `.env`
- Redirect URI configured: `http://localhost:3000/api/auth/oauth/google/callback`

```bash
# Step 1: Start dev server
pnpm dev

# Step 2: Open browser and navigate to:
http://localhost:3000/api/auth/oauth/google

# Expected:
# - Redirects to Google consent screen
# - Shows permissions (email, profile)

# Step 3: Click "Allow"
# Expected:
# - Redirects back to callback URL
# - User created in database (if new)
# - OAuth connection stored
# - Redirects to /dashboard with cookies set

# Step 4: Verify in database
psql -U postgres -d routiine_dev -c "SELECT * FROM users WHERE email = 'your-google-email@gmail.com';"
psql -U postgres -d routiine_dev -c "SELECT * FROM oauth_connections WHERE provider = 'google';"

# Step 5: Test accessing protected route
curl http://localhost:3000/api/auth/me \
  -H "Cookie: accessToken=<token-from-browser>; refreshToken=<token-from-browser>" \
  -v

# Expected: 200 OK with user data
```

**Expected Results:**
- ✅ Google OAuth consent screen appears
- ✅ User redirected back after approval
- ✅ User created/linked in database
- ✅ OAuth connection stored with tokens
- ✅ Can access protected routes

**Common Issues:**
- ⚠️ "Redirect URI mismatch" - Check OAuth app settings in Google Console
- ⚠️ "Invalid state" - Clear browser cookies and try again
- ⚠️ "OAuth not configured" - Check .env has GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

---

### Test 9: OAuth Flow (GitHub)

**Prerequisites:**
- GitHub OAuth app created in GitHub Developer Settings
- Client ID and Secret added to `.env`
- Callback URL configured: `http://localhost:3000/api/auth/oauth/github/callback`

```bash
# Open browser and navigate to:
http://localhost:3000/api/auth/oauth/github

# Expected:
# - Redirects to GitHub authorization screen
# - Shows permissions (email, profile)

# Click "Authorize"
# Expected:
# - Redirects back to callback
# - User created/linked
# - OAuth connection stored
# - Redirects to /dashboard

# Verify in database
psql -U postgres -d routiine_dev -c "SELECT * FROM oauth_connections WHERE provider = 'github';"
```

**Expected Results:**
- ✅ GitHub authorization screen appears
- ✅ User redirected after authorization
- ✅ User created/linked
- ✅ OAuth connection stored
- ✅ Can access protected routes

---

### Test 10: Database Performance

```bash
# Open psql
psql -U postgres -d routiine_dev

# Check indexes exist
\di

# Expected: Should see ~40+ indexes

# Test query performance with EXPLAIN ANALYZE
EXPLAIN ANALYZE SELECT * FROM signals WHERE user_id = '<user-id>' ORDER BY timestamp DESC LIMIT 20;

# Expected: Should use index scan, not sequential scan

# Test signal feed query
EXPLAIN ANALYZE
SELECT s.*, c.name as client_name
FROM signals s
LEFT JOIN clients c ON s.client_id = c.id
WHERE s.user_id = '<user-id>'
ORDER BY s.timestamp DESC
LIMIT 20;

# Expected: Index scans used
```

**Expected Results:**
- ✅ All indexes created successfully
- ✅ Queries use indexes (not sequential scans)
- ✅ Query execution time < 5ms for indexed queries
- ✅ pg_trgm extension enabled for full-text search

---

## Automated Testing Checklist

### ✅ Database Schema
- [ ] All 15 tables created
- [ ] Foreign keys enforced
- [ ] Enums working correctly
- [ ] UUID primary keys generated
- [ ] Timestamps auto-populated

### ✅ Authentication
- [ ] User registration creates user
- [ ] Password hashed securely
- [ ] Login validates credentials
- [ ] JWT tokens generated correctly
- [ ] Cookies set with httpOnly flag
- [ ] Session stored in database
- [ ] Token refresh works
- [ ] Logout clears session

### ✅ Authorization
- [ ] requireAuth middleware blocks unauthenticated requests
- [ ] Protected routes return 401 without auth
- [ ] User can access own data only

### ✅ Validation
- [ ] Email format validated
- [ ] Password strength enforced
- [ ] Required fields checked
- [ ] Duplicate emails prevented
- [ ] Clear error messages

### ✅ OAuth
- [ ] Google OAuth redirects correctly
- [ ] Google callback handles tokens
- [ ] GitHub OAuth redirects correctly
- [ ] GitHub callback handles tokens
- [ ] OAuth creates/links users
- [ ] OAuth connections stored
- [ ] State parameter prevents CSRF

### ✅ Performance
- [ ] Indexes created on all foreign keys
- [ ] Composite indexes for common queries
- [ ] Full-text search enabled
- [ ] Query execution < 5ms

---

## Known Issues / TODO

### 🐛 Current Issues
1. **argon2 not compiled** - Using scrypt instead (works fine)
2. **No actual PostgreSQL instance** - Need to set up locally
3. **No unit tests yet** - Should add Jest/Vitest
4. **No integration tests** - Should add Playwright/Cypress

### ✨ Improvements for Next Sprint
1. Add email verification
2. Add password reset flow
3. Add rate limiting
4. Add CSRF protection
5. Add comprehensive test suite
6. Set up CI/CD pipeline
7. Add monitoring & logging

---

## Test Results Template

```markdown
## Test Execution Report

**Tester:** [Your Name]
**Date:** [Date]
**Environment:** Development/Staging

### Test Results

| Test # | Feature | Status | Notes |
|--------|---------|--------|-------|
| 1 | User Registration | ✅ PASS | |
| 2 | User Login | ✅ PASS | |
| 3 | Protected Endpoint | ✅ PASS | |
| 4 | Token Refresh | ✅ PASS | |
| 5 | Logout | ✅ PASS | |
| 6 | Input Validation | ✅ PASS | |
| 7 | Duplicate Prevention | ✅ PASS | |
| 8 | Google OAuth | ⏸️ SKIP | No OAuth credentials |
| 9 | GitHub OAuth | ⏸️ SKIP | No OAuth credentials |
| 10 | Database Performance | ✅ PASS | |

### Summary
- **Total Tests:** 10
- **Passed:** 8
- **Failed:** 0
- **Skipped:** 2
- **Pass Rate:** 100% (of executed tests)

### Issues Found
None

### Recommendations
- Set up OAuth credentials for full E2E testing
- Add automated test suite
- Document OAuth app setup process
```

---

## Next Steps After Testing

1. ✅ Verify all tests pass
2. ✅ Document any issues found
3. ✅ Commit code to git
4. ✅ Create pull request
5. ✅ Code review
6. ✅ Merge to main
7. ✅ Deploy to staging
8. ✅ Run tests on staging
9. ✅ Deploy to production

---

## Support

If tests fail, check:
1. PostgreSQL is running (`pg_isready`)
2. Database exists (`psql -l`)
3. Migrations applied (`pnpm db:push`)
4. Environment variables set (`.env` file)
5. Server is running (`pnpm dev`)
6. Ports are available (3000 for app, 5432 for postgres)

**Report Issues:** Create GitHub issue with test results and error logs

---

**Testing Guide Version:** 1.0
**Last Updated:** 2025-11-04
