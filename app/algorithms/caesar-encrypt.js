let pyodide;

async function init() {
    pyodide = await loadPyodide();
    const response = await fetch("caesar-encrypt.py");
    const code = await response.text();
    await pyodide.runPythonAsync(code);
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById("encrypt-btn").addEventListener("click", async () => {
        const text = document.getElementById("plaintext").value;
        const shift = parseInt(document.getElementById("shift").value);

        pyodide.globals.set("plaintext", text);
        pyodide.globals.set("shift", shift);

        const result = await pyodide.runPythonAsync(`encrypt(plaintext, shift)`);
        document.getElementById("output").textContent = result;
    });
});