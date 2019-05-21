const frisby = require('frisby');
const fs = require('fs');
const host = 'http://localhost:7000';
const filePath = path.resolve(__dirname, './sampleFile.TXT');
let content = fs.createReadStream(filePath);
let formData = frisby.formData();
formData.append('balance', content);

it ('test send sample file for upload', function() {
    return frisby.post(host + '/api/upload', { body: formData })
    .expect('status', 200)
});