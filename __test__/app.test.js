const request = require('supertest');
const app = require("../src/app");
const User = require("../src/model/User");

jest.mock('../src/model/User.js', () =>({ create: jest.fn()}))
describe('User routes', () => {
    test('should return all of the users', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        const parseResponse = JSON.parse(response.text);
        // console.log(parseResponse)
        expect(parseResponse[2].username).toBe('MalikW')
    })

    test('should create a user', async () => {
        User.create.mockResolvedValue({"username": "test", 'email': "test", 'password': 'test'})
        const response = await request(app).post('/users').send({"username": "test", 'email': "test", 'password': 'test'});


        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('test');
        expect(User.create).toHaveBeenCalledWith({"username": "test", 'email': "test", 'password': 'test'});
    })
})