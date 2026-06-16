export default async function handler(request, response) {
    // 1. On accepte uniquement les requêtes POST
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Méthode non autorisée' });
    }

    try {
        // 2. Extraction et parsing manuel du body (sécurité pour Vercel Static)
        let body = '';
        for await (const chunk of request) {
            body += chunk;
        }
        
        if (!body) {
            return response.status(400).json({ error: 'Le corps de la requête est vide' });
        }

        const { texteQuestion, categorie } = JSON.parse(body);

        // 3. On récupère le Webhook depuis les variables d'environnement de Vercel
        const webhookURL = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookURL) {
            return response.status(500).json({ error: "Le Webhook Discord n'est pas configuré sur le serveur." });
        }

        // 4. Préparation du message pour Discord
        const message = {
            embeds: [{
                title: "💡 Nouvelle suggestion de question !",
                fields: [
                    { name: "Question", value: texteQuestion || "Non fournie" },
                    { name: "Catégorie suggérée", value: categorie || "Non fournie" }
                ],
                color: 6516881
            }]
        };

        // 5. Envoi du message vers Discord
        const discordResponse = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });

        if (discordResponse.ok) {
            return response.status(200).json({ message: 'Succès !' });
        } else {
            return response.status(500).json({ error: 'Erreur de réponse de Discord' });
        }

    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Erreur interne du serveur ou JSON invalide" });
    }
}