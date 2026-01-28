/// <reference types="@workadventure/iframe-api-typings" />

const POWER_AUTOMATE_URL = "https://prod-19.northcentralus.logic.azure.com:443/workflows/fd3d8b7f682e425681c1d5e14b2529fb/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=Xs6Glt1hNgQ8G_6JQLPXO3cHF53Kopp-rgPQqhwcyJ8";

console.log("presence.js carregado");

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

    const LAYER_NAME = "start"; // aqui é o NAME, não ID

    const myLayerSubscriber = WA.room.onEnterLayer(LAYER_NAME).subscribe(() => {
      //sendEvent("ENTER", LAYER_NAME);
    });
    
    WA.room.onLeaveLayer(LAYER_NAME).subscribe(() => {
      sendEvent("ENTER", LAYER_NAME);
      myLayerSubscriber.unsubscribe();
    });
});

