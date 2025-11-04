-- Performance Indexes for Routiine.io Database
-- Run after initial schema migration

-- Users Table Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Signals Table Indexes (High Query Volume)
CREATE INDEX IF NOT EXISTS idx_signals_user_id ON signals(user_id);
CREATE INDEX IF NOT EXISTS idx_signals_client_id ON signals(client_id);
CREATE INDEX IF NOT EXISTS idx_signals_user_timestamp ON signals(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_signals_priority ON signals(priority);
CREATE INDEX IF NOT EXISTS idx_signals_type_category ON signals(type, category);
CREATE INDEX IF NOT EXISTS idx_signals_timestamp ON signals(timestamp DESC);

-- Clients Table Indexes
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_external_id ON clients(external_id);
CREATE INDEX IF NOT EXISTS idx_clients_source ON clients(source);

-- Opportunities Table Indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_user_id ON opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_client_id ON opportunities(client_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_opportunities_user_stage ON opportunities(user_id, stage);
CREATE INDEX IF NOT EXISTS idx_opportunities_external_id ON opportunities(external_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_next_follow_up ON opportunities(next_follow_up);

-- Activities Table Indexes
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_client_id ON activities(client_id);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON activities(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_activities_user_timestamp ON activities(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_activities_external_id ON activities(external_id);

-- Tasks Table Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_user_status_due ON tasks(user_id, status, due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_related_client ON tasks(related_client_id);

-- Momentum Scores Table Indexes
CREATE INDEX IF NOT EXISTS idx_momentum_scores_user_id ON momentum_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_momentum_scores_calculated_at ON momentum_scores(calculated_at DESC);
CREATE INDEX IF NOT EXISTS idx_momentum_scores_user_calculated ON momentum_scores(user_id, calculated_at DESC);

-- Signal Assessments Table Indexes
CREATE INDEX IF NOT EXISTS idx_signal_assessments_user_id ON signal_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_signal_assessments_client_id ON signal_assessments(client_id);
CREATE INDEX IF NOT EXISTS idx_signal_assessments_date ON signal_assessments(assessment_date DESC);
CREATE INDEX IF NOT EXISTS idx_signal_assessments_total_score ON signal_assessments(total_score);
CREATE INDEX IF NOT EXISTS idx_signal_assessments_draft ON signal_assessments(is_draft);

-- CRM Connections Table Indexes
CREATE INDEX IF NOT EXISTS idx_crm_connections_user_id ON crm_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_connections_platform ON crm_connections(platform);
CREATE INDEX IF NOT EXISTS idx_crm_connections_status ON crm_connections(connection_status);
CREATE INDEX IF NOT EXISTS idx_crm_connections_user_platform ON crm_connections(user_id, platform);

-- Sessions Table Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_refresh_token ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- OAuth Connections Table Indexes
CREATE INDEX IF NOT EXISTS idx_oauth_connections_user_id ON oauth_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_connections_provider ON oauth_connections(provider);
CREATE INDEX IF NOT EXISTS idx_oauth_connections_provider_id ON oauth_connections(provider_id);

-- Subscriptions Table Indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_trial_ends ON subscriptions(trial_ends_at);

-- Daily Metrics Table Indexes
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_id ON daily_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_date ON daily_metrics(user_id, date DESC);

-- Blog Posts Table Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Pricing Plans Table Indexes
CREATE INDEX IF NOT EXISTS idx_pricing_plans_name ON pricing_plans(name);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_display_order ON pricing_plans(display_order);

-- Full-Text Search Indexes (PostgreSQL specific)
-- For searching clients by name or company
CREATE INDEX IF NOT EXISTS idx_clients_name_trgm ON clients USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_clients_company_trgm ON clients USING gin(company gin_trgm_ops);

-- Enable pg_trgm extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Composite Indexes for Common Query Patterns
CREATE INDEX IF NOT EXISTS idx_signals_user_client_time ON signals(user_id, client_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_user_stage_value ON opportunities(user_id, stage, value DESC);
CREATE INDEX IF NOT EXISTS idx_activities_user_client_time ON activities(user_id, client_id, timestamp DESC);

-- Comments documenting index usage
COMMENT ON INDEX idx_signals_user_timestamp IS 'Used for fetching user signals feed ordered by time';
COMMENT ON INDEX idx_opportunities_user_stage IS 'Used for pipeline views grouped by stage';
COMMENT ON INDEX idx_tasks_user_status_due IS 'Used for task lists filtered by status and sorted by due date';
COMMENT ON INDEX idx_daily_metrics_user_date IS 'Used for historical trend queries';
