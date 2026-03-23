-- Migration script to insert static course data into new schema

-- Insert courses (only if they don't already exist)
INSERT INTO courses (title, slug, description, thumbnail_url, price, difficulty, category_id, is_published)
SELECT
  'Web Development Masterclass',
  'web-development',
  'Master HTML, CSS, and JavaScript from scratch. Build beautiful, responsive websites with modern web technologies.',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  299.00,
  'Beginner',
  (SELECT id FROM categories WHERE slug = 'web-development'),
  TRUE
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'web-development');

INSERT INTO courses (title, slug, description, thumbnail_url, price, difficulty, category_id, is_published)
SELECT
  'Data Science Fundamentals',
  'data-science',
  'Learn Python for data science, visualization, and basic machine learning. Analyze real datasets and build predictive models.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  349.00,
  'Intermediate',
  (SELECT id FROM categories WHERE slug = 'data-science'),
  TRUE
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'data-science');

INSERT INTO courses (title, slug, description, thumbnail_url, price, difficulty, category_id, is_published)
SELECT
  'Forex Trading Masterclass',
  'forex-trading',
  'Learn professional forex trading strategies, technical analysis, and risk management. Start trading with confidence.',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
  249.00,
  'Advanced',
  (SELECT id FROM categories WHERE slug = 'finance'),
  TRUE
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'forex-trading');

-- Insert course sections (topics)
INSERT INTO course_sections (course_id, title, order_index)
SELECT id, 'HTML Fundamentals', 1 FROM courses WHERE slug = 'web-development'
UNION ALL
SELECT id, 'CSS Styling', 2 FROM courses WHERE slug = 'web-development'
UNION ALL
SELECT id, 'JavaScript Programming', 3 FROM courses WHERE slug = 'web-development'
UNION ALL
SELECT id, 'Data Science Basics', 1 FROM courses WHERE slug = 'data-science'
UNION ALL
SELECT id, 'Python Programming', 2 FROM courses WHERE slug = 'data-science'
UNION ALL
SELECT id, 'Data Analysis', 3 FROM courses WHERE slug = 'data-science'
UNION ALL
SELECT id, 'Forex Basics', 1 FROM courses WHERE slug = 'forex-trading'
UNION ALL
SELECT id, 'Market Analysis', 2 FROM courses WHERE slug = 'forex-trading'
UNION ALL
SELECT id, 'Trading Strategies', 3 FROM courses WHERE slug = 'forex-trading';

-- Insert lessons (subtopics)
INSERT INTO lessons (section_id, title, slug, order_index, is_preview, duration, type, content, show_ide, initial_code, language, exercise) VALUES
((SELECT id FROM course_sections WHERE title = 'HTML Fundamentals'), 'Introduction to HTML', 'introduction-to-html', 1, TRUE, 300, 'exercise',
 '<h3>What is HTML?</h3>
 <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
 <h3>Basic HTML Structure</h3>
 <p>Every HTML document follows a basic structure:</p>
 <h3>Key Concepts</h3>
 <ul>
 <li><strong>Elements:</strong> The building blocks of HTML</li>
 <li><strong>Tags:</strong> Mark the start and end of elements</li>
 <li><strong>Attributes:</strong> Provide additional information about elements</li>
 <li><strong>Semantic HTML:</strong> Uses tags that describe their purpose</li>
 </ul>', TRUE, '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        p {
            line-height: 1.6;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <h1>Welcome to HTML</h1>
    <div class="container">
        <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
        <h2>Key Features:</h2>
        <ul>
            <li>Structure web content</li>
            <li>Create links between pages</li>
            <li>Embed images and multimedia</li>
            <li>Build forms for user input</li>
        </ul>
        <p>HTML uses tags to define elements, and each tag serves a specific purpose.</p>
    </div>
</body>
</html>', 'html', '{"question": "Create an HTML page with a header, main content area, and footer", "tests": [{"input": "Check for header tag", "expected": "Header element exists"}, {"input": "Check for main content", "expected": "Main content area exists"}, {"input": "Check for footer", "expected": "Footer element exists"}]}'),
((SELECT id FROM course_sections WHERE title = 'CSS Styling'), 'CSS Fundamentals', 'css-fundamentals', 1, TRUE, 360, 'exercise',
 '<h3>What is CSS?</h3>
 <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, paper, or in other media.</p>
 <h3>CSS Syntax</h3>
 <p>CSS rules consist of selectors and declarations:</p>
 <h3>Selectors</h3>
 <ul>
 <li><strong>Element Selector:</strong> Selects elements by tag name</li>
 <li><strong>Class Selector:</strong> Selects elements with a specific class attribute</li>
 <li><strong>ID Selector:</strong> Selects an element with a specific ID attribute</li>
 <li><strong>Attribute Selector:</strong> Selects elements with specific attributes</li>
 </ul>', TRUE, '/* CSS Styles */
body {
    font-family: ''Arial'', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}
.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
}
h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
}
.card {
    background-color: #f8f9fa;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 6px;
    border-left: 4px solid #3498db;
    transition: all 0.3s ease;
}
.card:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.btn {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s ease;
}
.btn:hover {
    background-color: #2980b9;
}
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    h1 {
        font-size: 1.5em;
    }
}', 'css', '{"question": "Create a CSS class that styles a button with hover effects", "tests": [{"input": "Check button background color", "expected": "Button has blue background"}, {"input": "Check hover effect", "expected": "Button darkens on hover"}, {"input": "Check border radius", "expected": "Button has rounded corners"}]}'),
((SELECT id FROM course_sections WHERE title = 'JavaScript Programming'), 'JavaScript Basics', 'javascript-basics', 1, TRUE, 420, 'exercise',
 '<h3>What is JavaScript?</h3>
 <p>JavaScript is a programming language that allows you to implement complex features on web pages. It enables interactive web pages and is an essential part of web applications.</p>
 <h3>Variables and Data Types</h3>
 <p>JavaScript has several primitive data types:</p>
 <h3>Functions</h3>
 <p>Functions are reusable blocks of code that perform a specific task:</p>', TRUE, '// JavaScript Examples

// Variables
let message = ''Hello, World!'';
const PI = 3.14159;
var count = 5;

// Data types
console.log(typeof message); // string
console.log(typeof PI); // number
console.log(typeof count); // number

// Functions
function greet(name) {
    return \`Hello, \${name}!\`;
}

const add = (a, b) => a + b;

// Objects
const person = {
    name: ''John Doe'',
    age: 30,
    hobbies: [''reading'', ''coding'', ''gaming''],
    address: {
        street: ''123 Main St'',
        city: ''New York'',
        country: ''USA''
    },
    greet: function() {
        console.log(\`Hello, my name is \${this.name}\`);
    }
};

// Arrays
const numbers = [1, 2, 3, 4, 5];

// Array methods
const doubled = numbers.map(num => num * 2);
const even = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);

// DOM manipulation
document.addEventListener(''DOMContentLoaded'', function() {
    const button = document.querySelector(''button'');
    const container = document.querySelector(''.container'');
    
    button.addEventListener(''click'', function() {
        const newElement = document.createElement(''div'');
        newElement.textContent = ''Dynamic Content!'';
        newElement.className = ''dynamic'';
        container.appendChild(newElement);
    });
});', 'javascript', '{"question": "Create a function that reverses a string", "tests": [{"input": "hello", "expected": "olleh"}, {"input": "JavaScript", "expected": "tpircSavaJ"}, {"input": "", "expected": ""}]}'),
((SELECT id FROM course_sections WHERE title = 'JavaScript Programming'), 'Advanced JavaScript Concepts', 'advanced-javascript', 2, FALSE, 480, 'exercise', '<h3>Advanced JavaScript Concepts</h3><p>Deep dive into closures, prototypes, and async programming.</p>', TRUE, '// Advanced JavaScript\nconsole.log("Advanced concepts");', 'javascript', '{"question": "Implement a closure", "tests": [{"input": "test", "expected": "closure works"}]}'),
((SELECT id FROM course_sections WHERE title = 'JavaScript Programming'), 'DOM Manipulation', 'dom-manipulation', 3, FALSE, 390, 'exercise', '<h3>DOM Manipulation</h3><p>Learn to manipulate the Document Object Model.</p>', TRUE, '// DOM manipulation\nconsole.log("DOM code");', 'javascript', '{"question": "Create and append an element", "tests": [{"input": "div", "expected": "element created"}]}'),
((SELECT id FROM course_sections WHERE title = 'Data Science Basics'), 'Introduction to Data Science', 'data-science-intro', 1, TRUE, 300, 'exercise',
 '<h3>What is Data Science?</h3>
 <p>Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.</p>
 <h3>Key Components</h3>
 <ul>
 <li><strong>Data Collection:</strong> Gathering data from various sources</li>
 <li><strong>Data Cleaning:</strong> Preprocessing and cleaning messy data</li>
 <li><strong>Exploratory Analysis:</strong> Understanding patterns and relationships</li>
 <li><strong>Machine Learning:</strong> Building predictive models</li>
 <li><strong>Visualization:</strong> Communicating findings effectively</li>
 </ul>', TRUE, '# Python for Data Science
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv(''data.csv'')

# Basic information about the dataset
print("Dataset Shape:", df.shape)
print("\\nFirst 5 Rows:")
print(df.head())

# Summary statistics
print("\\nSummary Statistics:")
print(df.describe())

# Check for missing values
print("\\nMissing Values:")
print(df.isnull().sum())

# Data visualization
plt.figure(figsize=(10, 6))
sns.histplot(df[''value''], bins=30, kde=True)
plt.title(''Distribution of Values'')
plt.xlabel(''Value'')
plt.ylabel(''Frequency'')
plt.show()

# Correlation heatmap
correlation_matrix = df.corr()
plt.figure(figsize=(12, 8))
sns.heatmap(correlation_matrix, annot=True, cmap=''coolwarm'', vmin=-1, vmax=1)
plt.title(''Correlation Heatmap'')
plt.show()

# Basic machine learning example
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Prepare data
X = df[[''feature1'', ''feature2'', ''feature3'']]
y = df[''target'']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\\nModel Evaluation:")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R-squared Score: {r2:.2f}")

# Coefficients
print("\\nModel Coefficients:")
print(pd.DataFrame({''Feature'': X.columns, ''Coefficient'': model.coef_}))', 'python', '{"question": "Write a Python function to calculate the mean, median, and standard deviation of a dataset", "tests": [{"input": "[1, 2, 3, 4, 5]", "expected": "Mean: 3, Median: 3, Std: 1.41"}, {"input": "[10, 20, 30, 40, 50]", "expected": "Mean: 30, Median: 30, Std: 14.14"}, {"input": "[5, 5, 5, 5, 5]", "expected": "Mean: 5, Median: 5, Std: 0"}]}'),
((SELECT id FROM course_sections WHERE title = 'Python Programming'), 'Python for Data Analysis', 'python-data-analysis', 1, FALSE, 360, 'exercise', '<h3>Python for Data Analysis</h3><p>Learn to use Python libraries for data manipulation.</p>', TRUE, '# Python data analysis\nprint("Data analysis")', 'python', '{"question": "Load and analyze CSV data", "tests": [{"input": "test.csv", "expected": "data loaded"}]}'),
((SELECT id FROM course_sections WHERE title = 'Data Analysis'), 'Data Visualization', 'data-visualization', 1, FALSE, 420, 'exercise', '<h3>Data Visualization</h3><p>Create compelling visualizations with matplotlib and seaborn.</p>', TRUE, '# Data visualization\nprint("Visualization code")', 'python', '{"question": "Create a bar chart", "tests": [{"input": "data", "expected": "chart created"}]}'),
((SELECT id FROM course_sections WHERE title = 'Data Analysis'), 'Statistical Analysis', 'statistical-analysis', 2, FALSE, 480, 'exercise', '<h3>Statistical Analysis</h3><p>Apply statistical methods to data.</p>', TRUE, '# Statistical analysis\nprint("Stats code")', 'python', '{"question": "Calculate correlation", "tests": [{"input": "dataset", "expected": "correlation calculated"}]}'),
((SELECT id FROM course_sections WHERE title = 'Data Analysis'), 'Machine Learning Basics', 'machine-learning-basics', 3, FALSE, 390, 'exercise', '<h3>Machine Learning Basics</h3><p>Introduction to machine learning algorithms.</p>', TRUE, '# Machine learning\nprint("ML code")', 'python', '{"question": "Train a simple model", "tests": [{"input": "data", "expected": "model trained"}]}'),
((SELECT id FROM course_sections WHERE title = 'Forex Basics'), 'Introduction to Forex Trading', 'forex-trading-intro', 1, TRUE, 240, 'chart',
 '<h3>What is Forex Trading?</h3>
 <p>Forex (Foreign Exchange) trading involves buying and selling currencies with the aim of making a profit. The forex market is the largest and most liquid financial market in the world.</p>
 <h3>Key Concepts</h3>
 <ul>
 <li><strong>Currency Pairs:</strong> Currencies are traded in pairs (e.g., EUR/USD)</li>
 <li><strong>Exchange Rate:</strong> The price of one currency in terms of another</li>
 <li><strong>Pips:</strong> The smallest unit of price movement</li>
 <li><strong>Leverage:</strong> Borrowed capital to increase trading position size</li>
 </ul>
 <h3>Trading Hours</h3>
 <p>The forex market is open 24 hours a day, 5 days a week, with trading sessions overlapping across major financial centers.</p>', FALSE, NULL, NULL, '{"type": "candlestick", "symbol": "EUR/USD", "timeframe": "1H", "data": [{"time": "2024-01-01", "open": 1.0850, "high": 1.0860, "low": 1.0845, "close": 1.0855}, {"time": "2024-01-02", "open": 1.0855, "high": 1.0870, "low": 1.0850, "close": 1.0865}, {"time": "2024-01-03", "open": 1.0865, "high": 1.0875, "low": 1.0860, "close": 1.0870}, {"time": "2024-01-04", "open": 1.0870, "high": 1.0878, "low": 1.0865, "close": 1.0872}, {"time": "2024-01-05", "open": 1.0872, "high": 1.0880, "low": 1.0868, "close": 1.0875}, {"time": "2024-01-06", "open": 1.0875, "high": 1.0890, "low": 1.0870, "close": 1.0885}, {"time": "2024-01-07", "open": 1.0885, "high": 1.0900, "low": 1.0880, "close": 1.0895}, {"time": "2024-01-08", "open": 1.0895, "high": 1.0910, "low": 1.0885, "close": 1.0905}, {"time": "2024-01-09", "open": 1.0905, "high": 1.0920, "low": 1.0895, "close": 1.0915}, {"time": "2024-01-10", "open": 1.0915, "high": 1.0930, "low": 1.0900, "close": 1.0925}]}'),
((SELECT id FROM course_sections WHERE title = 'Market Analysis'), 'Currency Pairs and Market Structure', 'currency-pairs', 1, FALSE, 300, 'lesson', '<h3>Currency Pairs</h3><p>Learn about major, minor, and exotic currency pairs.</p>', FALSE, NULL, NULL, NULL),
((SELECT id FROM course_sections WHERE title = 'Market Analysis'), 'Technical Analysis Basics', 'technical-analysis', 2, FALSE, 360, 'lesson', '<h3>Technical Analysis</h3><p>Introduction to charts, indicators, and patterns.</p>', FALSE, NULL, NULL, NULL),
((SELECT id FROM course_sections WHERE title = 'Trading Strategies'), 'Advanced Chart Patterns', 'advanced-chart-patterns', 1, FALSE, 420, 'lesson', '<h3>Chart Patterns</h3><p>Learn advanced chart patterns for trading.</p>', FALSE, NULL, NULL, NULL),
((SELECT id FROM course_sections WHERE title = 'Trading Strategies'), 'Risk Management Strategies', 'risk-management', 2, FALSE, 390, 'lesson', '<h3>Risk Management</h3><p>Essential risk management techniques for traders.</p>', FALSE, NULL, NULL, NULL);

-- Add tool conditions for forex trading course (show trading chart)
INSERT INTO tool_conditions (entity_type, entity_id, tool_id, enabled) VALUES
('course', (SELECT id FROM courses WHERE slug = 'forex-trading'), (SELECT id FROM tools WHERE name = 'trading_chart'), TRUE);

-- Add tool conditions for web development (show code editor)
INSERT INTO tool_conditions (entity_type, entity_id, tool_id, enabled) VALUES
('course', (SELECT id FROM courses WHERE slug = 'web-development'), (SELECT id FROM tools WHERE name = 'code_editor'), TRUE);

-- Sample tests (simplified)
INSERT INTO tests (entity_type, entity_id, title, questions, passing_score) VALUES
('section', (SELECT id FROM course_sections WHERE title = 'HTML Fundamentals'), 'HTML Fundamentals Test',
 '[{"question": "What does HTML stand for?", "options": ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"], "correct_answer_index": 0}]',
 70),
('lesson', (SELECT id FROM lessons WHERE slug = 'javascript-basics'), 'JavaScript Basics Test',
 '[{"question": "What is JavaScript?", "options": ["A programming language", "A markup language", "A database"], "correct_answer_index": 0}]',
 70);

-- Update existing courses that don't have thumbnail images
UPDATE courses
SET thumbnail_url = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop'
WHERE thumbnail_url IS NULL OR thumbnail_url = '';