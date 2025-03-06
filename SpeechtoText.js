function startConverting() {
    // Check if the browser supports Speech Recognition API
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    console.log("Initializing Speech Recognition...");

    // Request microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            console.log("Microphone access granted.");

            // Initialize speech recognition after permission is granted
            recognition = new webkitSpeechRecognition();
            setupRecognition(recognition);

            try {
                recognition.start();
                console.log("Speech recognition started...");
            } catch (error) {
                console.error("Error starting recognition:", error);
            }
        })
        .catch(function (error) {
            console.error("Microphone access denied or failed:", error);
            alert("Error accessing the microphone. Please grant permission.");
        });
}
