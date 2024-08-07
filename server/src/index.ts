import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cros from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cros());
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
        data: {
            title,
            isCompleted,
        },
    });
    res.json(createTodo);
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
        where: { id },
        data: {
            title,
            isCompleted,
        },
    });
    res.json(editTodo);
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
        where: { id },
    });
    res.json(deleteTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
