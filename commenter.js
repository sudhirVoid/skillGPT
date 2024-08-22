const fs = require('fs');
const path = require('path');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles.filter(file => file.endsWith('.ts'));
}

// Function to comment out all console.log
function commentConsoleLogs(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const updatedContent = fileContent.replace(/console\.log\((.*?)\);/g, '// console.log($1);');
    fs.writeFileSync(filePath, updatedContent, 'utf8');
}

const allFiles = getAllFiles('./src');

allFiles.forEach(filePath => {
    commentConsoleLogs(filePath);
    console.log(`Updated: ${filePath}`);
});
