const request = require('supertest');
const app = require('../../app');
const { 
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo');
const { describe } = require('node:test');
const { loadPlanetsData } = require('../../models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');


describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
        await loadLaunchesData();
    });
    
    afterAll(async () => {
        await mongoDisconnect();
    });
    
    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
              .get('/v1/launches')
              .expect('Content-Type', /json/)
              .expect(200);
        });
    });
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
            launchDate: "January 1, 2030",
        };
    
        const launchDataWithoutDate = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
        };
    
        const launchDataWithBadDate = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
            launchDate: "BAD",
        };
    
        test('It should respond with 201 created', async () => {
            const response = await request(app)
              .post('/v1/launches')
              .send(completeLaunchData)
              .expect(201)
              .expect('Content-Type', /json/);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
              .post('/v1/launches')
              .send(launchDataWithoutDate)
              .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            });
        });
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
              .post('/v1/launches')
              .send(launchDataWithBadDate)
              .expect(400);
    
            expect(response.body).toStrictEqual({
                error: "Invalid date entered",
            });
        });
    });
});