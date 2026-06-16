export default async function handler(request, response) {
    // 1. On accepte uniquement les requêtes POST
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Méthode non autorisée' });
    }

    const { texteQuestion, categorie } = request.body;

    // 2. On récupère le Webhook depuis les variables d'environnement de Vercel
    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookURL) {
        return response.status(500).json({ error: "Le Webhook Discord n'est pas configuré sur le serveur." });
    }

    // 3. Préparation du message pour Discord
    const message = {
        embeds: [{
            title: texteQuestion,
            fields: [
                { name: "Catégorie suggérée", value: categorie }
            ],
            color: 6516881
        }]
    };

    try {
        // 4. Envoi du message depuis le SERVEUR Vercel vers Discord
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
        return response.status(500).json({ error: "Impossible de contacter Discord" });
    }
}