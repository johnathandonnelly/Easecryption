let pyodide;

async function init() {
    pyodide = await loadPyodide();
    const response = await fetch("caesar-decrypt.py");
    const code = await response.text();
    await pyodide.runPythonAsync(code);
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById("decrypt-btn").addEventListener("click", async () => {
        const text = document.getElementById("ciphertext").value;
        const shift = parseInt(document.getElementById("shift").value);

        pyodide.globals.set("ciphertext", text);
        pyodide.globals.set("shift", shift);

        const result = await pyodide.runPythonAsync(`decrypt(ciphertext, shift)`);
        document.getElementById("output").textContent = result;
    });
});