const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'src', 'posts');

function fixDateInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // 匹配 date: yyyy-mm-dd hh:mm:ss +xxxx
  // 兼容没有前导零的日期格式
  content = content.replace(
  /^date:\s*(\d{4}-\d{1,2}-\d{1,2})\s+\d{1,2}:\d{2}:\d{2}\s+\+\d{4}/m,
  'date: $1'
	);
	// 兼容 date: yyyy-mm-dd +xxxx
	content = content.replace(
	  /^date:\s*(\d{4}-\d{1,2}-\d{1,2})\s*\+\d{4}/m,
	  'date: $1'
	);
	// 兼容没有前导零的日期格式
	content = content.replace(
	  /^date:\s*(\d{4})-(\d{1,2})-(\d{1,2})\s+\d{1,2}:\d{2}:\d{2}\s+\+\d{4}/m,
	  (match, y, m, d) => `date: ${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
	);

	
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.md')) {
      fixDateInFile(fullPath);
      console.log('Fixed:', fullPath);
    }
  });
}

walkDir(postsDir);