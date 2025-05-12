const { Client } = require('discord.js-selfbot-v13');
const config = require(`${process.cwd()}/config.json`);
const client = new Client();

const interval = (1000*60*2)+30000; // 2h + 30s en ms
const DISBOARD_ID = "302050872383242240"; // ID de l'application DISBOARD

client.on('ready', async () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);

    try {
        const channel = await client.channels.fetch(config.channelID);
        if (!channel || !channel.send) {
            console.error('❌ Salon introuvable ou invalide.');
            return;
        }

        // Fonction pour envoyer la commande /bump
        const sendBump = async () => {
            try {
                // Utilisation de sendSlash avec l'ID d'application de DISBOARD
                await channel.sendSlash(DISBOARD_ID, "bump");
                console.log(`[${new Date().toLocaleTimeString()}] ✅ /bump envoyé au premier salon !`);
            } catch (err) {
                console.error('❌ Erreur lors de l\'envoi de /bump :', err);
            }
        };

        sendBump(); // Envoi immédiat
        setInterval(sendBump, interval); // Répète toutes les 2h30

    } catch (err) {
        console.error('❌ Erreur lors de la récupération du salon :', err);
    }
});

client.login(config.selfbotToken);
