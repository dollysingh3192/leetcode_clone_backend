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
const amqplib_1 = __importDefault(require("amqplib"));
const QUEUE_NAME = 'judge';
class AMQPService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!AMQPService.instance) {
                AMQPService.instance = new AMQPService();
                yield AMQPService.instance.initialize();
            }
            return AMQPService.instance;
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                this.connection = yield amqplib_1.default.connect('amqp://localhost');
            }
            if (!this.channel) {
                this.channel = yield this.connection.createChannel();
                yield this.channel.assertQueue(QUEUE_NAME, { durable: true });
            }
        });
    }
    sendToQueue(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                this.channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
            }
            else {
                throw new Error('AMQP channel is not initialized');
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.close();
            }
        });
    }
}
exports.default = AMQPService;
