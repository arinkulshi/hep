"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe('Patient Routes', () => {
    it('should create a new patient', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPatient = {
            Name: 'John Doe',
            InjuryType: 'Sprained Ankle',
        };
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/patients')
            .send(newPatient);
        expect(response.status).toBe(200);
        expect(response.body.Name).toBe(newPatient.Name);
        expect(response.body.InjuryType).toBe(newPatient.InjuryType);
    }));
    it('should retrieve all patients', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/patients');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
