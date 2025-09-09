 const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          output.innerHTML = ""; // reset affichage

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
            });

            output.appendChild(operatorDiv);
          }
        } catch (err) {
          output.textContent = "❌ Erreur : JSON invalid";
        }
      };
    
      reader.readAsText(file);
    });