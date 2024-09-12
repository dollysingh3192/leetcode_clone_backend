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
const prisma_1 = __importDefault(require("../prisma"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Default data for the Problem collection
        const problems = [
            {
                title: 'Two Sum',
                description_body: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
                difficulty: 'Easy',
                testCases: {
                    create: [
                        { input: '[2, 7, 11, 15], 9', output: '[0, 1]' },
                        { input: '[3, 2, 4], 6', output: '[1, 2]' },
                    ],
                },
            },
            {
                title: 'Reverse Integer',
                description_body: 'Given a signed 32-bit integer x, return x with its digits reversed.',
                difficulty: 'Medium',
                testCases: {
                    create: [
                        { input: '123', output: '321' },
                        { input: '-123', output: '-321' },
                    ],
                },
            },
            {
                title: 'Palindrome Number',
                description_body: 'Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.',
                difficulty: 'Easy',
                testCases: {
                    create: [
                        { input: '121', output: 'true' },
                        { input: '-121', output: 'false' },
                    ],
                },
            },
        ];
        // Insert problems into the database
        for (const problem of problems) {
            yield prisma_1.default.problem.create({
                data: problem,
            });
        }
    });
}
main()
    .then(() => {
    console.log('Data seeded successfully');
})
    .catch((error) => {
    console.error('Error seeding data: ', error);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}));
