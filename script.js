// Paleta de colores para los bloques extraída de la imagen
const blockColors = [
    { bg: '#1abc9c', border: '#16a085' }, // Teal
    { bg: '#a259ff', border: '#8b4ce0' }, // Morado
    { bg: '#5c6bc0', border: '#3f51b5' }, // Indigo
    { bg: '#ec407a', border: '#d81b60' }, // Rosa
    { bg: '#3b82f6', border: '#2563eb' }, // Azul
    { bg: '#ff9800', border: '#f57c00' }, // Naranja
    { bg: '#ef5350', border: '#e53935' }  // Rojo
];

const questions = [
    // --- 8 Preguntas teóricas (Requieren 1 bloque, se genera 1 drop-zone) ---
    {
        text: "¿Qué significa que el polimorfismo sea 'dinámico'?",
        options: [
            "Se resuelve durante la ejecución del programa.",
            "El código cambia antes de compilarse.",
            "Obliga a usar sobrecarga estática.",
            "Son decisiones previas a la ejecución."
        ],
        correctAnswers: [0]
    },
    {
        text: "¿Qué mecanismo permite a una clase hija redefinir un método de su clase padre?",
        options: [
            "Sobrecarga de métodos.",
            "Duck Typing.",
            "Sobrescritura de métodos.",
            "Encapsulamiento dinámico."
        ],
        correctAnswers: [2]
    },
    {
        text: 'En el Duck Typing: "Si camina como un pato..." ¿Qué exige Python?',
        options: [
            "Que herede obligatoriamente de Pato.",
            "Que el objeto tenga los métodos necesarios.",
            "Que compartan los mismos atributos.",
            "Tipado estricto antes de compilar."
        ],
        correctAnswers: [1]
    },
    {
        text: "¿Cuál es una ventaja directa del polimorfismo dinámico?",
        options: [
            "Acelera el tiempo del procesador.",
            "Evita usar demasiados condicionales (if/elif).",
            "Elimina el uso de funciones.",
            "Garantiza cero errores en tiempo de ejecución."
        ],
        correctAnswers: [1]
    },
    {
        text: "A diferencia de C++, ¿Qué característica NO tiene Python tradicionalmente?",
        options: [
            "Sobrecarga tradicional de métodos.",
            "Herencia múltiple.",
            "Sobrescritura de métodos.",
            "Tipado dinámico."
        ],
        correctAnswers: [0]
    },
    {
        text: "¿Cuál es una desventaja del polimorfismo dinámico al ejecutar un programa?",
        options: [
            "Todo el código debe ir en un archivo.",
            "Consume mucha más memoria RAM.",
            "No permite usar ciclos for.",
            "Fallo en ejecución si el objeto no tiene el método."
        ],
        correctAnswers: [3]
    },
    {
        text: "Si iteramos una lista `[Auto(), Barco()]` y llamamos a `vehiculo.avanzar()`, ¿Qué hace Python?",
        options: [
            "Ejecuta solo el primer objeto.",
            "Identifica el objeto y ejecuta su método dinámicamente.",
            "Genera un error por mezclar clases.",
            "Pide un 'if' para verificar la clase."
        ],
        correctAnswers: [1]
    },
    {
        text: "¿Qué sucede si una clase hija NO sobrescribe un método?",
        options: [
            "Lanza un error de sintaxis.",
            "Se crea un método vacío automáticamente.",
            "Utiliza el método heredado de su clase padre.",
            "Pierde acceso a sus atributos de clase."
        ],
        correctAnswers: [2]
    },
    // --- 2 Preguntas de Código (Requieren 2 bloques embebidos en el código) ---
    {
        text: "Completa el código para usar Polimorfismo SIN herencia (Duck Typing).",
        // Aquí estructuramos el HTML interno para que se vea idéntico a la imagen
        htmlCode: `
            <span class="kw">class</span> Triangulo:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<div class="drop-zone" data-index="0">Soltar aquí</div><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print( <span class="str">"Tengo 3 lados"</span> )<br><br>
            
            <span class="kw">class</span> Cuadrado:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">def</span> lados(self):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print( <span class="str">"Tengo 4 lados"</span> )<br><br>

            <span class="kw">def</span> imprimir_lados(figura):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<div class="drop-zone" data-index="1">Soltar aquí</div>
        `,
        options: [
            "def hablar(self):",
            "figura.lados()",
            "Triangulo()",
            "def lados(self):"
        ],
        correctAnswers: [3, 1] // [def lados(self):, figura.lados()]
    },
    {
        text: "Completa el código para usar Polimorfismo CON herencia (Sobrescritura).",
        htmlCode: `
            <span class="kw">class</span> Animal:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">def</span> hablar(self):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">pass</span><br><br>
            
            <div class="drop-zone" data-index="0" style="margin-left: 0;">Soltar aquí</div>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">def</span> hablar(self):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="drop-zone" data-index="1">Soltar aquí</div><br><br>

            Animales = [Pato(), Perro(), Gato()]<br>
            <span class="kw">for</span> animal <span class="kw">in</span> Animales:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;animal.hablar()
        `,
        options: [
            "class Pato(Animal)",
            "print(\"Miau\")",
            "print(\"Cuac\")",
            "animal.hablar()"
        ],
        correctAnswers: [0, 2] // [class Pato(Animal), print("Cuac")]
    }
];

let currentQuestion = 0;
let score = 0;
let currentPlacements = [];

// Elementos DOM
const questionNumberEl = document.getElementById("question-number");
const scoreValueEl = document.getElementById("score-value");
const questionTextEl = document.getElementById("question-text");
const codeCardEl = document.getElementById("code-card");
const optionsContainerEl = document.getElementById("options-container");
const verifyBtn = document.getElementById("verify-btn");
const feedbackModal = document.getElementById("feedback-modal");

function loadQuestion() {
    feedbackModal.classList.add("hidden");
    verifyBtn.classList.add("hidden");
    optionsContainerEl.innerHTML = "";
    codeCardEl.innerHTML = "";
    currentPlacements = [];
    
    const q = questions[currentQuestion];
    questionNumberEl.innerText = currentQuestion + 1;
    questionTextEl.innerText = q.text;

    // Si es pregunta de código, inyectamos el HTML; si es teórica, generamos una caja genérica
    if (q.htmlCode) {
        codeCardEl.classList.remove("hidden");
        codeCardEl.innerHTML = q.htmlCode;
        
        // Inicializar arreglos de respuestas
        q.correctAnswers.forEach(() => currentPlacements.push(null));
    } else {
        codeCardEl.classList.remove("hidden");
        codeCardEl.innerHTML = `<div style="text-align: center; padding: 2rem 0;"><div class="drop-zone" data-index="0" style="min-width: 250px;">Soltar respuesta aquí</div></div>`;
        currentPlacements.push(null);
    }

    // Configurar Drop Zones recién inyectadas
    const zones = document.querySelectorAll(".drop-zone");
    zones.forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("dragleave", dragLeave);
        zone.addEventListener("drop", drop);
    });

    // Generar bloques arrastrables
    q.options.forEach((opt, index) => {
        const block = document.createElement("div");
        block.innerText = opt;
        block.classList.add("block");
        
        // Asignar colores de la paleta dinámicamente
        const color = blockColors[index % blockColors.length];
        block.style.backgroundColor = color.bg;
        block.style.borderBottom = `4px solid ${color.border}`;
        
        block.setAttribute("draggable", "true");
        block.id = `block-${index}`;
        block.setAttribute("data-value", index);
        
        block.addEventListener("dragstart", dragStart);
        optionsContainerEl.appendChild(block);
    });
}

// --- Lógica Drag & Drop ---
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => e.target.style.opacity = "0.5", 0);
}

function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
}

function dragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
}

function drop(e) {
    e.preventDefault();
    const zone = e.currentTarget;
    zone.classList.remove("drag-over");
    
    const blockId = e.dataTransfer.getData("text/plain");
    const block = document.getElementById(blockId);
    
    if (block) {
        block.style.opacity = "1";
        
        // Si ya hay un bloque en la zona, regresarlo al menú
        if (zone.children.length > 0) {
            const oldBlock = zone.children[0];
            oldBlock.style.fontSize = "1.2rem";
            oldBlock.style.padding = "12px 18px";
            optionsContainerEl.appendChild(oldBlock);
        }
        
        // Ajustar visualmente el bloque para que quepa en el hueco
        zone.innerText = ""; 
        block.style.fontSize = "1rem";
        block.style.padding = "5px 10px";
        zone.appendChild(block);
        
        const zoneIndex = zone.getAttribute("data-index");
        const blockValue = parseInt(block.getAttribute("data-value"));
        currentPlacements[zoneIndex] = blockValue;
        
        checkReadyToVerify();
    }
}

function checkReadyToVerify() {
    if (!currentPlacements.includes(null)) {
        verifyBtn.classList.remove("hidden");
    } else {
        verifyBtn.classList.add("hidden");
    }
}

function verifyAnswer() {
    const q = questions[currentQuestion];
    let isCorrect = true;
    
    for (let i = 0; i < q.correctAnswers.length; i++) {
        if (currentPlacements[i] !== q.correctAnswers[i]) {
            isCorrect = false;
            break;
        }
    }
    
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackMessage = document.getElementById("feedback-message");

    if (isCorrect) {
        score++;
        scoreValueEl.innerText = score;
        feedbackTitle.innerText = "¡Excelente!";
        feedbackTitle.className = "correct-text";
        feedbackMessage.innerText = "Respuesta correcta.";
    } else {
        feedbackTitle.innerText = "¡Ups, revisa el código!";
        feedbackTitle.className = "error-text";
        const correctStrings = q.correctAnswers.map(idx => q.options[idx]).join("  |  ");
        feedbackMessage.innerText = `La respuesta correcta era:\n\n${correctStrings}`;
    }

    feedbackModal.classList.remove("hidden");
    document.getElementById("next-btn").onclick = () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showEndScreen();
        }
    };
}

function showEndScreen() {
    feedbackModal.classList.add("hidden");
    document.querySelector(".question-container").classList.add("hidden");
    document.querySelector(".blocks-area").classList.add("hidden");
    
    const endScreen = document.getElementById("end-screen");
    endScreen.classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
}

window.onload = loadQuestion;