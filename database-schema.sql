-- Database Schema for E-Learning Platform

-- Categories table (existing)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table (enhanced)
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10,2),
  difficulty TEXT,
  category_id INTEGER REFERENCES categories(id),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course sections (topics)
CREATE TABLE IF NOT EXISTS course_sections (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons (subtopics)
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES course_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT, -- HTML content
  video_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT FALSE,
  duration INTEGER, -- in seconds
  type TEXT DEFAULT 'lesson', -- lesson, exercise, chart
  initial_code TEXT,
  language TEXT, -- html, css, javascript, python, etc.
  show_ide BOOLEAN DEFAULT FALSE,
  chart_data JSONB, -- for chart lessons
  exercise JSONB, -- {question, tests: [{input, expected}]}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- trading_chart, code_editor, etc.
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tool conditions
CREATE TABLE IF NOT EXISTS tool_conditions (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL, -- 'course', 'section', 'lesson'
  entity_id INTEGER NOT NULL,
  tool_id INTEGER REFERENCES tools(id),
  enabled BOOLEAN DEFAULT FALSE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, tool_id)
);

-- Tests table
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL, -- 'section', 'lesson'
  entity_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  questions JSONB NOT NULL, -- array of {question, options: [], correct_answer_index}
  passing_score INTEGER DEFAULT 70, -- percentage
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

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
('Web Development', 'web-development'),
('Data Science', 'data-science'),
('Finance', 'finance'),
('Programming', 'programming')
ON CONFLICT (slug) DO NOTHING;