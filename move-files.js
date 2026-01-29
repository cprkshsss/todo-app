#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();
const componentDir = path.join(baseDir, 'src', 'components');

// Create components directory
try {
  fs.mkdirSync(componentDir, { recursive: true });
  console.log('✓ Created components directory');
} catch (err) {
  console.error('Failed to create directory:', err.message);
}

// Files to move
const filesToMove = [
  { src: 'TodoForm.tsx', dest: 'src/components/TodoForm.tsx' },
  { src: 'TodoForm.module.css', dest: 'src/components/TodoForm.module.css' },
  { src: 'TodoItem.tsx', dest: 'src/components/TodoItem.tsx' },
  { src: 'TodoItem.module.css', dest: 'src/components/TodoItem.module.css' },
  { src: 'ProgressBar.tsx', dest: 'src/components/ProgressBar.tsx' },
  { src: 'ProgressBar.module.css', dest: 'src/components/ProgressBar.module.css' }
];

filesToMove.forEach(({ src, dest }) => {
  const srcPath = path.join(baseDir, src);
  const destPath = path.join(baseDir, dest);
  
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);
      console.log(`✓ Moved ${src}`);
    }
  } catch (err) {
    console.error(`Failed to move ${src}:`, err.message);
  }
});

console.log('✓ Setup complete');
