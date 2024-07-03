const fs = require('fs');
const path = require('path');

const JSON_FOLDER = "./.json";
const DATA_FOLDER = "src/database/json";

// 读取quotes.json文件
const quotesData = JSON.parse(fs.readFileSync(`${DATA_FOLDER}/quotes.json`, 'utf8'));

// 假设从2024年4月15日开始，每天对应1个quotes_id
const startDate = new Date('2024-04-15');
const dateToIdMap = {};

quotesData.quotes.forEach((quote, index) => {
    // 为每个quote生成一个对应的日期字符串
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const dateString = date.toISOString().split('T')[0];

    // 将日期字符串与quote的work_id关联，之前关联的是quote.id，现在关联的是work_id
    dateToIdMap[dateString] = quote.work_id;
    // dateToIdMap[dateString] = quote.id;
});

// 将映射对象保存为JSON格式
const jsonContent = JSON.stringify(dateToIdMap, null, 2);

try {
    // create folder if it doesn't exist
    if (!fs.existsSync(JSON_FOLDER)) {
        fs.mkdirSync(JSON_FOLDER);
    }

    // 将结果写入 date.json
    fs.writeFileSync(`${JSON_FOLDER}/date.json`,
        jsonContent, 'utf-8'
    );

    console.log('date.json has been generated successfully.');
} catch (err) {
    console.error(err);
}
