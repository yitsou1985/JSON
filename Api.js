 const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");
const searchInput = document.getElementById("searchInput");
    let allCommands = [];


 document.getElementById("clearBtn").addEventListener("click", function () {
      document.getElementById("searchInput").value = "";
    });
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          output.innerHTML = ""; // reset affichage
          allCommands = []; // reset

          for (const sectionName in json) {
            const sectionData = json[sectionName];

            const operatorDiv = document.createElement("div");
            operatorDiv.className = "operator";

            const h2 = document.createElement("h2");
            h2.textContent = sectionName;
            operatorDiv.appendChild(h2);

            sectionData.forEach(item => {
              const commandDiv = document.createElement("div");
              commandDiv.className = "command";
              commandDiv.textContent = item.command;

              // Ajouter un bouton "Copier"
              const btn = document.createElement("button");
              btn.textContent = "Copied";
              btn.addEventListener("click", () => {
                navigator.clipboard.writeText(item.command);
                btn.textContent = "Copié !";
                setTimeout(() => btn.textContent = "Copied", 1000);
              });

              commandDiv.appendChild(btn);
              operatorDiv.appendChild(commandDiv);
                // Sauvegarde pour filtrage
          allCommands.push({ element: commandDiv, text: item.command.toLowerCase() });
            });

            output.appendChild(operatorDiv);
          }
        } catch (err) {
          output.textContent = "❌ Error : JSON invalid";
        }
      };
    
      reader.readAsText(file);
    });
    // 🎯 Ajout du filtre
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  allCommands.forEach(cmd => {
    if (cmd.text.includes(filter)) {
      cmd.element.style.display = "";
    } else {
      cmd.element.style.display = "none";
    }
  });
});
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  allCommands.forEach(cmd => cmd.element.style.display = "");
});
