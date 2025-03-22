import express from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import cors from 'cors';
import { Shortcode } from '../../../src';

const app = express();
const PORT = 3001;

// Get the current directory
const currentDir = process.cwd();

// 使用CORS中间件
app.use(cors());

// 设置静态文件目录
app.use(express.static(path.join(currentDir, './public')));

// 设置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(currentDir, './views'));

// 创建Shortcode实例
const shortcode = new Shortcode();

// 获取markdown文件列表的API
app.get('/api/markdown-files', async (req: express.Request, res: express.Response) => {
  try {
    const markdownDir = path.join(currentDir, './src/mds');
    const files = await fs.readdir(markdownDir);
    const markdownFiles = files.filter((file: string) => file.endsWith('.md'));
    
    res.json({
      success: true,
      files: markdownFiles
    });
  } catch (error) {
    console.error('Error reading markdown files:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read markdown files'
    });
  }
});

// 获取并渲染markdown文件的API
app.get('/api/render/:filename', async (req: express.Request, res: express.Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(currentDir, './src/mds', filename);
    
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    const markdownContent = await fs.readFile(filePath, 'utf8');
    const renderedContent = shortcode.render(markdownContent);
    
    res.json({
      success: true,
      content: renderedContent
    });
  } catch (error) {
    console.error('Error rendering markdown:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to render markdown file'
    });
  }
});

// 主页面路由
app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 