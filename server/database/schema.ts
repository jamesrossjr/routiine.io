import { pgTable, uuid, varchar, text, timestamp, integer, decimal, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const userRoleEnum = pgEnum('user_role', ['sales_rep', 'manager', 'admin'])
export const subscriptionTierEnum = pgEnum('subscription_tier', ['basic', 'standard', 'premium'])
export const signalTypeEnum = pgEnum('signal_type', ['positive', 'negative'])
export const signalCategoryEnum = pgEnum('signal_category', [
  'email_open',
  'page_view',
  'form_submission',
  'video_watched',
  'cart_abandoned',
  'bounce',
  'session_timeout',
  'document_view',
  'crm_activity',
])
export const signalPriorityEnum = pgEnum('signal_priority', ['high', 'medium', 'low'])
export const crmPlatformEnum = pgEnum('crm_platform', ['salesforce', 'hubspot', 'zoho', 'pipedrive'])
export const connectionStatusEnum = pgEnum('connection_status', ['connected', 'disconnected', 'error'])
export const clientSourceEnum = pgEnum('client_source', ['crm', 'manual', 'import'])
export const opportunityStageEnum = pgEnum('opportunity_stage', [
  'discovery',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost',
])
export const taskStatusEnum = pgEnum('task_status', ['pending', 'in_progress', 'completed'])
export const activityTypeEnum = pgEnum('activity_type', ['call', 'email', 'meeting', 'note', 'proposal_sent'])
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'cancelled', 'expired', 'trial'])
export const billingCycleEnum = pgEnum('billing_cycle', ['monthly', 'yearly'])
export const intensityLevelEnum = pgEnum('intensity_level', ['minimal', 'mild', 'moderate', 'significant', 'severe'])
export const documentTypeEnum = pgEnum('document_type', ['pdf', 'proposal', 'presentation', 'contract', 'other'])

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }), // Nullable for OAuth users
  role: userRoleEnum('role').notNull().default('sales_rep'),
  avatar: text('avatar'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').notNull().default('basic'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastLogin: timestamp('last_login'),
})

// Sessions Table (for JWT refresh tokens)
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  refreshToken: text('refresh_token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Password Reset Tokens Table
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// OAuth Connections Table
export const oauthConnections = pgTable('oauth_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  provider: varchar('provider', { length: 50 }).notNull(), // 'google', 'github'
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiry: timestamp('token_expiry'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Clients/Prospects Table
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }),
  contactTitle: varchar('contact_title', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  source: clientSourceEnum('source').notNull().default('manual'),
  externalId: varchar('external_id', { length: 255 }), // CRM ID
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Opportunities Table
export const opportunities = pgTable('opportunities', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  value: decimal('value', { precision: 12, scale: 2 }),
  stage: opportunityStageEnum('stage').notNull().default('discovery'),
  probability: integer('probability').default(0), // 0-100
  lastActivity: timestamp('last_activity'),
  nextFollowUp: timestamp('next_follow_up'),
  externalId: varchar('external_id', { length: 255 }), // CRM ID
  createdAt: timestamp('created_at').notNull().defaultNow(),
  closedAt: timestamp('closed_at'),
})

// Signals Table
export const signals = pgTable('signals', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'cascade' }),
  opportunityId: uuid('opportunity_id').references(() => opportunities.id, { onDelete: 'set null' }),
  type: signalTypeEnum('type').notNull(),
  category: signalCategoryEnum('category').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  impact: integer('impact').notNull(), // -5 to +6
  priority: signalPriorityEnum('priority').notNull().default('medium'),
  metadata: jsonb('metadata'), // Additional context
  timestamp: timestamp('timestamp').notNull().defaultNow(),
})

// Momentum Scores Table
export const momentumScores = pgTable('momentum_scores', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  score: integer('score').notNull().default(0), // 0-100
  activityScore: integer('activity_score').default(0),
  conversionScore: integer('conversion_score').default(0),
  consistencyScore: integer('consistency_score').default(0),
  activityTrend: integer('activity_trend').default(0), // Percentage change
  conversionTrend: integer('conversion_trend').default(0), // Percentage change
  signalCount: integer('signal_count').default(0),
  calculatedAt: timestamp('calculated_at').notNull().defaultNow(),
})

// Signal Assessments Table (Discovery Tool)
export const signalAssessments = pgTable('signal_assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'cascade' }),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  salesPersonName: varchar('salesperson_name', { length: 255 }).notNull(),
  assessmentDate: timestamp('assessment_date').notNull().defaultNow(),
  totalScore: integer('total_score').notNull().default(0), // 0-35
  intensityLevel: intensityLevelEnum('intensity_level').notNull().default('minimal'),
  signals: jsonb('signals').notNull(), // 7-point evaluation data
  isDraft: boolean('is_draft').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Activities Table
export const activities = pgTable('activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'cascade' }),
  activityType: activityTypeEnum('activity_type').notNull(),
  description: text('description').notNull(),
  outcome: text('outcome'),
  externalId: varchar('external_id', { length: 255 }), // CRM Activity ID
  timestamp: timestamp('timestamp').notNull().defaultNow(),
})

// CRM Connections Table
export const crmConnections = pgTable('crm_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  platform: crmPlatformEnum('platform').notNull(),
  connectionToken: text('connection_token'), // Should be encrypted
  refreshToken: text('refresh_token'), // Should be encrypted
  apiKey: text('api_key'), // Should be encrypted
  connectionStatus: connectionStatusEnum('connection_status').notNull().default('disconnected'),
  connectedUserName: varchar('connected_user_name', { length: 255 }),
  connectedOrgName: varchar('connected_org_name', { length: 255 }),
  lastSyncAt: timestamp('last_sync_at'),
  settings: jsonb('settings'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Tasks Table
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  dueDate: timestamp('due_date'),
  priority: signalPriorityEnum('priority').notNull().default('medium'),
  status: taskStatusEnum('status').notNull().default('pending'),
  relatedClientId: uuid('related_client_id').references(() => clients.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
})

// Subscriptions Table
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plan: subscriptionTierEnum('plan').notNull().default('basic'),
  billingCycle: billingCycleEnum('billing_cycle').notNull().default('monthly'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  status: subscriptionStatusEnum('status').notNull().default('trial'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  startDate: timestamp('start_date').notNull().defaultNow(),
  endDate: timestamp('end_date'),
  trialEndsAt: timestamp('trial_ends_at'),
  autoRenew: boolean('auto_renew').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Pricing Plans Table
export const pricingPlans = pgTable('pricing_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  priceMonthly: decimal('price_monthly', { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal('price_yearly', { precision: 10, scale: 2 }).notNull(),
  features: jsonb('features').notNull(), // Array of feature strings
  limits: jsonb('limits'), // {signals: 500, crm_connections: 1, assessments: 10}
  highlighted: boolean('highlighted').notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Blog Posts Table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content').notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  publishedAt: timestamp('published_at'),
  tags: jsonb('tags'), // Array of tag strings
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Daily Metrics Table (for historical analytics)
export const dailyMetrics = pgTable('daily_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  momentumScore: integer('momentum_score'),
  signalCounts: jsonb('signal_counts'), // {email_open: 5, page_view: 10, ...}
  activityCounts: jsonb('activity_counts'), // {call: 3, email: 5, ...}
  conversionRate: decimal('conversion_rate', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Documents Table (for tracked document sharing)
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'cascade' }),
  opportunityId: uuid('opportunity_id').references(() => opportunities.id, { onDelete: 'set null' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  documentType: documentTypeEnum('document_type').notNull().default('other'),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  fileSize: integer('file_size').notNull(), // in bytes
  filePath: text('file_path').notNull(), // Storage path or URL
  trackingId: varchar('tracking_id', { length: 255 }).notNull().unique(),
  viewCount: integer('view_count').notNull().default(0),
  lastViewedAt: timestamp('last_viewed_at'),
  metadata: jsonb('metadata'), // Additional document info
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  signals: many(signals),
  activities: many(activities),
  signalAssessments: many(signalAssessments),
  clients: many(clients),
  tasks: many(tasks),
  momentumScores: many(momentumScores),
  crmConnections: many(crmConnections),
  sessions: many(sessions),
  oauthConnections: many(oauthConnections),
  passwordResetTokens: many(passwordResetTokens),
  subscription: one(subscriptions),
  opportunities: many(opportunities),
  dailyMetrics: many(dailyMetrics),
  documents: many(documents),
}))

export const clientsRelations = relations(clients, ({ many, one }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  signals: many(signals),
  opportunities: many(opportunities),
  activities: many(activities),
  tasks: many(tasks),
  signalAssessments: many(signalAssessments),
  documents: many(documents),
}))

export const opportunitiesRelations = relations(opportunities, ({ one, many }) => ({
  client: one(clients, {
    fields: [opportunities.clientId],
    references: [clients.id],
  }),
  user: one(users, {
    fields: [opportunities.userId],
    references: [users.id],
  }),
  signals: many(signals),
  documents: many(documents),
}))

export const signalsRelations = relations(signals, ({ one }) => ({
  user: one(users, {
    fields: [signals.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [signals.clientId],
    references: [clients.id],
  }),
  opportunity: one(opportunities, {
    fields: [signals.opportunityId],
    references: [opportunities.id],
  }),
}))

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [documents.clientId],
    references: [clients.id],
  }),
  opportunity: one(opportunities, {
    fields: [documents.opportunityId],
    references: [opportunities.id],
  }),
}))
