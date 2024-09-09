import express, { json } from "express";
import prisma from '../prisma';  // Import the Prisma singleton instance

const problem = express.Router();

problem.get('/', async (req, res) => {
  const problems = await prisma.problem.findMany();
  res.json(problems);
});

export default problem;