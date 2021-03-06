const publicVapidKey =
  "BGe2j8lMgWh8pK3i4MkWV1tthPzzBNTDHGDBxRxqSInsnkYMC9TtHmZRkO0XSamn9D53s3PVuVECgNAi23iB2v4";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("worker.js", {
    scope: "/node_msg/client/"
  });
  


  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  console.log(JSON.stringify(subscription));
  

  // await fetch("https://crmovil.motion-server.com/nodejs_msg/node_push_notifications-master:5000/subscribe", {
  await fetch("https://nodepusnotifications.herokuapp.com/subscribe", {
    method: "POST",mode: 'no-cors',
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
