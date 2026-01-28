/// <reference types="@workadventure/iframe-api-typings" />

/**
 * github: https://github.com/freddale4/wa
 * map: https://freddale4.github.io/wa/office.json
 */

const POWER_AUTOMATE_URL = "https://prod-19.northcentralus.logic.azure.com:443/workflows/fd3d8b7f682e425681c1d5e14b2529fb/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=Xs6Glt1hNgQ8G_6JQLPXO3cHF53Kopp-rgPQqhwcyJ8";

console.log("presence.js carregado");


async function sendEvent(eventType, zoneName) {
    const player = WA.player;

    const payload = {
        userId: player.id,
        userName: player.name,
        eventType: eventType, // ENTER | LEAVE
        zone: zoneName,
        eventTime: new Date().toISOString(),
        source: "WorkAdventure"
    };

    try {
        await fetch(POWER_AUTOMATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.error("Erro ao enviar evento:", err);
    }
}

WA.onInit().then(() => {

    console.log("WA - onInit - CARREGADO!!!");
    
    const ZONE_ID = "7885b63c-00eb-498b-a5da-e02904be36e4";

    WA.room.onEnterZone(ZONE_ID, () => {
        sendEvent("ENTER", ZONE_ID);
    });

    WA.room.onLeaveZone(ZONE_ID, () => {
        sendEvent("LEAVE", ZONE_ID);
    });
});
