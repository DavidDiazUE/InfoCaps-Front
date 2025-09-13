(() => {
    const btnAumentar = document.querySelector("#aumentarFuente");
    const btnDisminuir = document.querySelector("#disminuirFuente");
    const btnContraste = document.querySelector("#contraste");
   

    let tamañoFuente = 16; // Tamaño base de la fuente
    let contrasteActivo = false;

    if (btnAumentar && btnDisminuir && btnContraste) {
        btnAumentar.addEventListener("click", () => {
            if ( tamañoFuente <24)
            tamañoFuente += 1;
            document.body.style.fontSize = `${tamañoFuente}px`;
            document.querySelectorAll("label").forEach(label => {
                let fontSize = parseFloat(window.getComputedStyle(label).fontSize); 
                if (fontSize <=24){
                    label.style.fontSize = (fontSize + 1) + "px"; 
                }
               
            });

        });

        btnDisminuir.addEventListener("click", () => {
            if (tamañoFuente >= 12) { // Evita que la fuente sea demasiado pequeña
                tamañoFuente -= 1;
                document.body.style.fontSize = `${tamañoFuente}px`;
                document.querySelectorAll("label").forEach(label => {
                    let fontSize = parseFloat(window.getComputedStyle(label).fontSize); 
                    if (fontSize >=12){
                    label.style.fontSize = (fontSize - 1) + "px";
                    }
                });
            }
        });

        btnContraste.addEventListener("click", () => {
            contrasteActivo = !contrasteActivo;
            document.body.classList.toggle("modo-contraste", contrasteActivo);
        });
    }
    
    
})();
