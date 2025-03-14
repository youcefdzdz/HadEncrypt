document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const modeSwitch = document.querySelector(".arrow");
    const encryptRadio = document.querySelector("input[value='encrypt']");
    const decryptRadio = document.querySelector("input[value='decrypt']");
    const inputText = document.getElementById("inputText");
    const resultText = document.getElementById("resultText");
    const keyInput = document.getElementById("keyInput");
    const processButton = document.getElementById("processButton");
    const copyButton = document.getElementById("copyButton");

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        darkModeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Toggle Encryption/Decryption Mode
    modeSwitch.addEventListener("click", function () {
        if (encryptRadio.checked) {
            decryptRadio.checked = true;
        } else {
            encryptRadio.checked = true;
        }
    });

    // Process Text (Encryption/Decryption)
    function processText() {
        let key = keyInput.value.trim();
        let text = inputText.value;
        let result = "";

        if (!/^[0-9]{4}$/.test(key)) {
            alert("الرجاء إدخال مفتاح مكون من 4 أرقام فقط.");
            return;
        }

        key = parseInt(key);

        if (encryptRadio.checked) {
            result = encrypt(text, key);
        } else {
            result = decrypt(text, key);
        }

        resultText.value = result;
    }

    function encrypt(text, key) {
        return text.split('').map(char => String.fromCharCode(char.charCodeAt(0) + key)).join('');
    }

    function decrypt(text, key) {
        return text.split('').map(char => String.fromCharCode(char.charCodeAt(0) - key)).join('');
    }

    processButton.addEventListener("click", processText);

    // Copy to Clipboard Feature
    copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(resultText.value).then(() => {
            alert("تم نسخ النص إلى الحافظة!");
        });
    });
});