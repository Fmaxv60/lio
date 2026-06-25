import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        // 1. Trouver le chemin absolu du fichier questions.json dans ton projet Vercel
        const jsonPath = path.join(process.cwd(), 'questions.json');
        
        // 2. Lire le fichier
        const fileData = fs.readFileSync(jsonPath, 'utf8');
        const questions = JSON.parse(fileData);

        if (!questions || questions.length === 0) {
            return res.status(404).send("Aucune question trouvée.");
        }

        // 3. Tirer une question au sort de manière purement aléatoire
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[randomIndex];

        // 4. Formater le texte pour Glance (avec un emoji de vibe optionnel si présent)
        const vibePrefix = selectedQuestion.vibe ? `⚡ *${selectedQuestion.vibe}* \n\n` : '';
        const badgeCategory = `[${selectedQuestion.categorie_nom}] `;
        
        const responseText = `${badgeCategory}\n${vibePrefix}${selectedQuestion.texte}`;

        // 5. Renvoyer en texte brut avec encodage UTF-8 pour les accents
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send(responseText);

    } catch (error) {
        console.error("Erreur API Glance:", error);
        return res.status(500).send("Erreur lors de la récupération de la question.");
    }
}