const { createChart } = require('lightweight-charts');

console.log('Lightweight Charts available methods:');
console.log('createChart:', typeof createChart);

// Try to create a chart (we'll use a dummy div)
const dummyDiv = {
  clientWidth: 800,
  clientHeight: 500,
  appendChild: () => {},
  style: {},
  getBoundingClientRect: () => ({ width: 800, height: 500 })
};

try {
  const chart = createChart(dummyDiv, { width: 800, height: 500 });
  console.log('\nChart instance created');
  console.log('Chart methods:', Object.keys(chart));
  
  // Check what series methods are available
  const seriesMethods = Object.keys(chart).filter(key => key.includes('Series') || key.includes('add'));
  console.log('\nSeries-related methods:', seriesMethods);
  
} catch (error) {
  console.error('Error:', error);
}