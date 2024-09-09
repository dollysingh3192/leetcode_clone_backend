import express, { json } from "express";
import prisma from '../prisma';  // Import the Prisma singleton instance

const problem = express.Router();

problem.get('/', async (req, res) => {
  const problems = await prisma.problem.findMany();
  res.json(problems);
});

problem.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const problem = await prisma.problem.findUnique({
            where: {
                id: id,
            },
        });
        res.json(problem);
    } catch (e) {
        console.log(e);
    }
});

export default problem;