const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\ChanderPrakash\\web\\todo';
const componentDir = path.join(baseDir, 'src', 'components');

// Create components directory if it doesn't exist
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Move component files
const files = [
  'TodoForm.tsx',
  'TodoForm.module.css',
  'TodoItem.tsx',
  'TodoItem.module.css',
  'ProgressBar.tsx',
  'ProgressBar.module.css'
];

files.forEach(file => {
  const oldPath = path.join(baseDir, file);
  const newPath = path.join(componentDir, file);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${file}`);
  }
});

console.log('Setup complete!');
