/// <reference types="@workadventure/iframe-api-typings" />

const POWER_AUTOMATE_URL = "https://prod-19.northcentralus.logic.azure.com:443/workflows/fd3d8b7f682e425681c1d5e14b2529fb/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=Xs6Glt1hNgQ8G_6JQLPXO3cHF53Kopp-rgPQqhwcyJ8";

console.log("presence.js carregado");

// 📐 Área TRABALHO (WAM)
const TRABALHO_AREA = {
    name: "TRABALHO",
    x: 33,
    y: 82,
    width: 950,
    height: 497
};

let inside = false;

function isInsideArea(pos, area) {
    return (
        pos.x >= area.x &&
        pos.x <= area.x + area.width &&
        pos.y >= area.y &&
        pos.y <= area.y + area.height
    );
}

async function sendEvent(eventType, zoneName) {
    const player = WA.player;

    const payload = {
        userId: player.id,
        userName: player.name,
        eventType,
        zone: zoneName,
        eventTime: new Date().toISOString(),
        source: "WorkAdventure"
    };

    await fetch(POWER_AUTOMATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

WA.onInit().then(() => {

    const ZONE_NAME = "TRABALHO"; // aqui é o NAME, não ID

    WA.onEnterZone(ZONE_NAME, () => {
        console.log("ENTER ZONE:", ZONE_NAME);
        sendEvent("ENTER", ZONE_NAME);
    });

    WA.onLeaveZone(ZONE_NAME, () => {
        console.log("LEAVE ZONE:", ZONE_NAME);
        sendEvent("LEAVE", ZONE_NAME);
    });
});

