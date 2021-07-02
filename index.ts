import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({
    origin: "*",
    methods: ["POST"]
}));
app.use(express.static('public'))
app.use(express.json());

const calculateDogYears = (dogAge: number) => {
    return dogAge * 7;
}

const convertToHumanFromDog = (humanAge: number) => {
    return humanAge / 7;
}

app.post('/api/dog-to-human', (req, res) => {
    if (typeof req.body.age === "number") {
        res.json({
            status: 'OK',
            age: calculateDogYears(req.body.age)
        })
    } else {
        res.status(400).json({
            status: 'User error',
            message: 'Input must be a number'
        })
    }
});

app.post('/api/human-to-dog', (req, res) => {
    if (typeof req.body.age === "number") {
        res.json({
            status: 'OK',
            age: convertToHumanFromDog(req.body.age)
        })
    } else {
        res.status(400).json({
            status: 'User error',
            message: 'Input must be a number'
        })
    }
});

const port: number = Number.parseInt(process.env.PORT as string) || 3000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});