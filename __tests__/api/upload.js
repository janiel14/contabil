const frisby = require('frisby');
const fs = require('fs');
const path = require('path');
const host = 'http://localhost:7000';
const formData = frisby.formData();
let filePath = path.resolve(__dirname, './level1sampleFile.TXT');
let content = fs.createReadStream(filePath);
formData.append('balance', content);
it ('test send sample file level 1 for upload', function() {
    return frisby.post(host + '/api/upload?type=lv1', { body: formData })
    .expect('status', 200)
});