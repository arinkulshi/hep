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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const Patient_1 = require("../entity/Patient");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepository = index_1.dataSource.getRepository(Patient_1.Patient);
    const patient = patientRepository.create(req.body);
    yield patientRepository.save(patient);
    return res.send(patient);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepository = index_1.dataSource.getRepository(Patient_1.Patient);
    const patients = yield patientRepository.find({
        relations: ["exercises"],
    });
    const activePatients = patients.map((patient) => {
        const activeExercises = patient.exercises.filter((exercise) => exercise.isActive);
        return Object.assign(Object.assign({}, patient), { exercises: activeExercises });
    });
    return res.send(activePatients);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientRepository = index_1.dataSource.getRepository(Patient_1.Patient);
    yield patientRepository.delete(req.params.id);
    return res.send({ message: "Patient deleted" });
}));
module.exports = router;
module.exports = router;
