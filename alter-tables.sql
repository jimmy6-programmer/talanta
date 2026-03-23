-- Alter existing tables to add new columns for the enhanced schema

-- Add new columns to lessons table
ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'lesson',
ADD COLUMN IF NOT EXISTS initial_code TEXT,
ADD COLUMN IF NOT EXISTS language TEXT,
ADD COLUMN IF NOT EXISTS show_ide BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS chart_data JSONB,
ADD COLUMN IF NOT EXISTS exercise JSONB;

-- Drop course_id column if it exists (we use section_id now)
ALTER TABLE lessons DROP COLUMN IF EXISTS course_id;

-- Ensure course_sections table has description and video_url
ALTER TABLE course_sections
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Create tools table if it doesn't exist
CREATE TABLE IF NOT EXISTS tools (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop and recreate tool_conditions table with correct types
DROP TABLE IF EXISTS tool_conditions;
CREATE TABLE tool_conditions (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  tool_id INTEGER REFERENCES tools(id),
  enabled BOOLEAN DEFAULT FALSE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, tool_id)
);

-- Drop and recreate tests table with correct types
DROP TABLE IF EXISTS tests;
CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  title TEXT NOT NULL,
  questions JSONB NOT NULL,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entity_type, entity_id)
);

-- Insert default tools
INSERT INTO tools (name, display_name) VALUES
('trading_chart', 'Trading Chart'),
('code_editor', 'Code Editor'),
('whiteboard', 'Whiteboard'),
('calculator', 'Calculator')
ON CONFLICT (name) DO NOTHING;