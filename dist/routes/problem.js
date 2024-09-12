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
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../prisma")); // Import the Prisma singleton instance
const rabbit_sender_1 = __importDefault(require("../rabbit-sender"));
const problem = express_1.default.Router();
problem.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problems = yield prisma_1.default.problem.findMany();
    res.json(problems);
}));
problem.get("/submit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const problem = yield prisma_1.default.problem.findUnique({
            where: {
                id: id,
            },
            include: {
                testCases: {
                    select: {
                        id: true,
                        input: true,
                        output: true,
                    },
                },
            },
        });
        res.json(problem);
    }
    catch (e) {
        console.log(e);
    }
}));
problem.post("/submit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get problem ID from URL
        const { code } = req.body; // Get submitted code from request body
        // const problem = await prisma.problem.findUnique({
        //     where: {
        //         id: id,
        //     },
        // });
        // Message to be sent to the queue
        const message = JSON.stringify({
            problemId: id,
            codeSubmission: code,
            timestamp: new Date().toISOString()
        });
        // Get the singleton AMQP service instance and send the message to the queue
        const amqpService = yield rabbit_sender_1.default.getInstance();
        yield amqpService.sendToQueue(message);
        // Respond to the client
        res.status(200).send({ message: 'Code submitted successfully!', problemId: id });
    }
    catch (err) {
        console.error('Error submitting code:', err);
        res.status(500).send({ error: 'Failed to submit code' });
    }
}));
exports.default = problem;
