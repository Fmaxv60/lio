import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const jsonPath = path.join(process.cwd(), 'questions.json');
        const questions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        const question = questions[Math.floor(Math.random() * questions.length)];

        res.status(200).json({
            question: question.texte
        });

    } catch (err) {
        res.status(500).json({
            error: "Erreur"
        });
    }
}