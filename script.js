const numInput = document.getElementById("numInput");
const resultOutput = document.getElementById("result");

let currentInput = "";

// Cek apakah karakter terakhir adalah operator
function endsWithOperator() {
  return /[+\-*/%]$/.test(currentInput);
}

// Fungsi kalkulasi live
function liveCalculate() {
  try {
    if (currentInput === "" || endsWithOperator()) {
      resultOutput.textContent = "";
      return;
    }

    const safeInput = currentInput.replace(/X/g, "*").replace(/Mod/g, "%");
    const result = eval(safeInput);
    resultOutput.textContent = "= " + result;
    resultOutput.style.color = "gray"; // hasil live: abu-abu
  } catch {
    resultOutput.textContent = "";
  }
}

document.querySelectorAll(".btn").forEach((button) => {
  const val = button.getAttribute("value") || button.innerText;

  if (button.id === "results") {
    button.addEventListener("click", () => {
      try {
        if (currentInput === "" || endsWithOperator()) {
          resultOutput.textContent = "Input tidak valid.";
          resultOutput.style.color = "red";
          return;
        }

        const safeInput = currentInput.replace(/X/g, "*").replace(/Mod/g, "%");
        const result = eval(safeInput);
        resultOutput.textContent = result;
        resultOutput.style.color = "#efbf04"; // hasil final: kuning
        resultOutput.style.fontSize = "4em";
        currentInput = ""; // Reset input setelah hasil
        numInput.textContent = "";
      } catch {
        resultOutput.textContent = "Perhitungan error.";
        resultOutput.style.color = "red";
        currentInput = "";
        numInput.textContent = "";
      }
    });
  } else if (button.id === "allClear") {
    button.addEventListener("click", () => {
      currentInput = "";
      numInput.textContent = "";
      resultOutput.textContent = "";
    });
  } else if (button.id === "clear") {
    button.addEventListener("click", () => {
      currentInput = currentInput.slice(0, -1);
      numInput.textContent = currentInput;
      liveCalculate();
    });
  } else {
    button.addEventListener("click", () => {
      const isOperator = /^[+\-*/%]$/.test(val) || val === "Mod";

      if (currentInput === "" && isOperator) {
        resultOutput.textContent = "Masukkan angka dulu.";
        resultOutput.style.color = "red";
        return;
      }

      resultOutput.textContent = "";
      resultOutput.style.color = "gray";

      currentInput += val === "Mod" ? "Mod" : val;
      numInput.textContent = currentInput;

      liveCalculate();
    });
  }
});
