// initialer referens 
const startBtn = document.getElementById("start-btn")
const start = document.getElementById("start")
const letterContainer = document.getElementById("letter-container");
const optionContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const resultText = document.getElementById("result-text");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");


// Start knappen
function startGame(){
    start.className = "container"
    startBtn.className = "hide"
    hang.className = "hide"
}

// alternativ variabel för knappar
let options = {
    fruits: [
        "Banana",
        "Blueberry",
        "Rasberry",
    ],
    car:[
        "Toyota",
        "Nissan",
        "Samara"
    ],
    countries: [
        "Angola",
        "Gambia",
        "Monaco",
    ]
};

//count
let winCount = 0;
let count = 0;
let chosenWord ="";
//Visa alternativ knappar
const displayOptions =() => {
    optionContainer.innerHTML += `<h3>Välj ett alternativ</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options){
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionContainer.appendChild(buttonCon);
};
// blockera knapp
const blocker =() => {
    let optionsButton = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //göm alternativ
    optionsButton.forEach((button) => {
        button.disabled.true;
    });

    // göm bokstäver
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};
// mening generator 
const generateWord = (optionValue) => {
    let optionsButton = document.querySelectorAll(".options");
    
    optionsButton.forEach((button) => {
        if (button.innerText.toLowerCase () === optionValue){
            button.classList.add("active");
        }
        button.disabled = true;
    });

    // göm bokstäver, töm tidigare mening
    letterContainer.classList.remove("hide");
    userInputSection.innerText ="";
    canvas.classList.remove("hide");

    let optionArray = options [optionValue];
    // slumpmässig mening 
    chosenWord = optionArray[Math.floor(Math.random () * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);

    // ersätt bokstav med span 
    let displayItem = chosenWord.replace(/./g, '<span class="dashes"> _ </span>');
     
    // visa element som span 
    userInputSection.innerHTML = displayItem;
 
};
// initial funktion ( kallad när sidan laddar eller tycker nytt spel)
const initializer = () => {
    winCount = 0;
    count = 0;
    userInputSection.innerHTML = "";
    optionContainer.innerHTML ="";
    letterContainer.classList.add ("hide");
    newGameContainer.classList.add ("hide");
    letterContainer.innerHTML ="";

    // skapa bokstav knappar 
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //A-Z
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click",()=>{
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName ("dashes");

            if(charArray.includes(button.innerText)){
                charArray.forEach((char, index) => {
                    if(char === button.innerText){
                        dashes [index].innerText = char;
                        winCount += 1;
                        if(winCount === charArray.length){
                            newGameContainer.className = "new-game-popup"
                            resultText.innerHTML = `<h2 class='win-msg'>Du vann!!</h2><p> ordet var <span>${chosenWord}</span></p>`; 
                            
                       }
                    }
                });
            } else {
                // förlora 
                count += 1;

                drawMan(count);
                //count ==6 eftersom huvud, kropp,höger arm,vänster arm, höger ben, vänster ben
                
                if (count == 6) {
                 newGameContainer.className = "new-game-popup"
                 resultText.innerHTML = `<h2 class='lose-msg'>Du förlorade !!</h2><p> ordet var <span>${chosenWord}</span></p>`; 
                 
                }
            }
            // gömma tryckt knapp
            button.disabled = true;
        });
        letterContainer.append(button);

    }
    displayOptions();
    //kalla till canvaskreatör (för städa tidigare canvas och skapa initial canvas)
    let { initialDrawing } = canvasCreator ();
    // initialDrawing ska rita frame;
    initialDrawing();
};
//canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    // rita linjer
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70,30,10,0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70,40,70,80);
    };

    const leftArm = () => {
        drawLine(70,50,50,70);
    };

    const rightArm = () => {
        drawLine(70,50,90,70);
    };

    const leftleg = () => {
        drawLine(70,80,50,110);
    };

    const rightleg= () => {
        drawLine(70,80,90,110);
    };

    // initial frame
    const initialDrawing = () => {
    //töm canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //nedre linje
        drawLine(10,130,130,130);
    // vänster linje
        drawLine(10,10,10,131);
    // översta linje
        drawLine(10,10,70,10);
    // smal övre linje
        drawLine(70,10,70,20);
    };

    return {initialDrawing, head, body, leftArm, rightArm, leftleg, rightleg}; 

};

//rita gubben
const drawMan = (count) => {
    let {head, body, leftArm, rightArm, leftleg, rightleg } = canvasCreator();
    switch (count){
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftleg();
            break;
        case 6:
            rightleg();
            break;
        default:
            break;
    }
};


//nytt spel
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
