const fs = require("fs");
const path = require("path");

// 定义JSON文件的路径
const jsonFilePath = 'src/data/collection_quotes.json'; // 请根据实际情况修改路径
const outputDirectory = 'src/content/'; // 输出Markdown文件的目录

// 读取JSON文件并转换为Markdown文件
function convertJsonToMarkdown(filePath) {
    // 读取JSON文件
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        // 解析JSON数据
        const obj = JSON.parse(data);
        const key = Object.keys(obj)[0]; // 获取第一个key，假设只有一个key
        const items = obj[key];
        const outputDir = outputDirectory + key;

        // 确保输出目录存在
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // 为每个对象创建Markdown文件
        items.forEach(item => {
            const markdownContent = createMarkdownContent(item);
            const markdownFileName = path.join(outputDir, `${item.id}.md`);
            fs.writeFile(markdownFileName, markdownContent, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing Markdown file for id ${item.id}:`, err);
                } else {
                    console.log(`Markdown file created for id ${item.id}`);
                }
            });
        });
    });
}

// 将对象转换为Markdown格式的字符串
function createMarkdownContent(obj) {
    let frontmatter = '---\n';
    for (const [key, value] of Object.entries(obj)) {
        frontmatter += `${key}: ${typeof value === 'string' ? `"${value}"` : value}\n`;
    }
    frontmatter += '---\n';
    return frontmatter;
}

// 调用函数
convertJsonToMarkdown(jsonFilePath);
