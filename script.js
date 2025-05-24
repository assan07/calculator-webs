const numInput = document.getElementById("numInput");
const resultOutput = document.getElementById("result");

let currentInput = "";

// Fungsi cek apakah karakter terakhir adalah operator
function endsWithOperator() {
  return /[+\-*/%]$/.test(currentInput);
}

// Tombol angka & operator
document.querySelectorAll(".btn").forEach(button => {
  const val = button.getAttribute("value") || button.innerText;

  // Tombol hasil (=)
  if (button.id === "results") {
    button.addEventListener("click", () => {
      try {
        if (currentInput === "" || endsWithOperator()) {
          resultOutput.textContent = "Input tidak valid.";
          return;
        }
        // Ganti X jadi * (perkalian), Mod jadi %
        const safeInput = currentInput.replace(/X/g, "*").replace(/Mod/g, "%");
        const result = eval(safeInput);
        resultOutput.textContent = "= " + result;
        currentInput = result.toString();
        numInput.textContent = currentInput;
      } catch (e) {
        resultOutput.textContent = "Perhitungan error.";
        currentInput = "";
        numInput.textContent = "";
      }
    });
  }

  // All Clear (AC)
  else if (button.id === "allClear") {
    button.addEventListener("click", () => {
      currentInput = "";
      numInput.textContent = "";
      resultOutput.textContent = "";
    });
  }

  // Clear terakhir (C)
  else if (button.id === "clear") {
    button.addEventListener("click", () => {
      currentInput = currentInput.slice(0, -1);
      numInput.textContent = currentInput;
    });
  }

  // Tombol lainnya (angka/operator)
  else {
    button.addEventListener("click", () => {
      // Kalau operator diklik duluan, tampilkan pesan error
      const isOperator = /^[+\-*/%]$/.test(val) || val === "Mod";
      if (currentInput === "" && isOperator) {
        resultOutput.textContent = "Masukkan angka dulu.";
        return;
      }

      resultOutput.textContent = ""; // bersihkan pesan error/hitung sebelumnya
      currentInput += val === "Mod" ? "Mod" : val;
      numInput.textContent = currentInput;
    });
  }
});
