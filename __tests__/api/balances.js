const frisby = require('frisby');
const host = 'http://localhost:7000';

it('Create one balance and delete', function () {
    return frisby.setup({
        request: {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
    }).post(host + '/api/balances', {
        body: 'description=TEST DESCRIPTION' +
        '&classifier=99999999999' +
        '&openingBalance=1.00' +
        '&debit=0' +
        '&credit=1.56' +
        '&finalBalance=2.56' +
        '&parent='
    }).expect('status', 200).then(function(response) {
        return frisby.delete(host + '/api/balances/' + response._json.data.classifier).expect('status', 200);
    });
});

it('Get one balance', function() {
    return frisby.get(host + '/api/balances/99999999').expect('status', 200);
});

it('Get all balances', function() {
    return frisby.get(host + '/api/balances/0/100').expect('status', 200);
});

it('Get all balances, using search', function() {
    return frisby.get(host + '/api/balances/0/100/TEST DESCRIPTION').expect('status', 200);
});