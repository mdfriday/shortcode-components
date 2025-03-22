document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const markdownFilesList = document.getElementById('markdownFiles');
    const renderedContent = document.getElementById('renderedContent');
    
    let activeFile = null;
    
    // 加载Markdown文件列表
    async function loadMarkdownFiles() {
        try {
            const response = await fetch('/api/markdown-files');
            const data = await response.json();
            
            if (data.success && data.files.length > 0) {
                // 清空现有列表
                markdownFilesList.innerHTML = '';
                
                // 添加每个文件到列表
                data.files.forEach(file => {
                    const li = document.createElement('li');
                    li.textContent = file;
                    li.addEventListener('click', () => {
                        // 移除其他文件的active类
                        document.querySelectorAll('#markdownFiles li').forEach(item => {
                            item.classList.remove('active');
                        });
                        
                        // 添加active类到当前选中的文件
                        li.classList.add('active');
                        
                        // 渲染选中的文件
                        renderMarkdownFile(file);
                    });
                    
                    markdownFilesList.appendChild(li);
                });
                
                // 默认渲染第一个文件
                if (data.files.length > 0) {
                    const firstFile = data.files[0];
                    document.querySelector('#markdownFiles li').classList.add('active');
                    renderMarkdownFile(firstFile);
                }
            } else {
                markdownFilesList.innerHTML = '<li class="no-files">没有找到Markdown文件</li>';
            }
        } catch (error) {
            console.error('加载Markdown文件列表失败:', error);
            markdownFilesList.innerHTML = '<li class="error">加载文件列表失败</li>';
        }
    }
    
    // 渲染Markdown文件
    async function renderMarkdownFile(filename) {
        try {
            // 显示加载状态
            renderedContent.innerHTML = '<div class="loading">加载中...</div>';
            
            const response = await fetch(`/api/render/${filename}`);
            const data = await response.json();
            
            if (data.success) {
                // 渲染内容
                renderedContent.innerHTML = data.content;
                
                // 记录当前活跃的文件
                activeFile = filename;
            } else {
                renderedContent.innerHTML = '<div class="error">渲染文件失败</div>';
            }
        } catch (error) {
            console.error('渲染Markdown文件失败:', error);
            renderedContent.innerHTML = '<div class="error">渲染文件失败</div>';
        }
    }
    
    // 初始化加载文件列表
    loadMarkdownFiles();
}); 