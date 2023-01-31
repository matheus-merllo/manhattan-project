
const startButton = document.getElementById('start-button');
const dialogue = document.querySelector('.dialogue');
const features = document.querySelector('.features');
const character = document.querySelector('.characteristics');
const missile = document.getElementById('img-missile');

const text = document.querySelectorAll('.text');
const textOne = document.querySelector('[data-text-one]');
const textTwo = document.querySelector('[data-text-two]');

const glass = document.querySelector('.glass');
const launcherTest = document.querySelector('.launcher-button__test');
const launcherButton = document.querySelector('.launcher-button');

const buttons = document.querySelectorAll('[data-piece]');
const characteristics = document.querySelectorAll('[data-characteristic]');

var radiation = document.getElementById('radiation');
var energy = document.getElementById('energy');
var speed = document.getElementById('speed');
var range = document.getElementById('range');

const pieces = {
    "uranium": {
        'radiation': 0.9,
        'energy': 1.2,
        'speed': -0.2,
        'range': 0,
    },

    "isotope": {
        'radiation': 0.2,
        'energy': 0.7,
        'speed': 0,
        'range': 0,
    },

    "explosive": {
        'radiation': 0,
        'energy': 0.3,
        'speed': -0.7,
        'range': 0,
    },

    "fuel": {
        'radiation': 0,
        'energy': 0.3,
        'speed': -1.6,
        'range': 3.5,
    }
}

startButton.onclick = goToBuild; 

launcherTest.addEventListener('click', () => {
    code = '';
    goToDialogue();
    checkValues(radiation, energy, speed, range);
})

glass.onclick = () => {
    glass.style.transform = 'translateX(-110px)'
    glass.style.transition = '1s'
}

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        dataHandle(event.target.dataset.operation, event.target.parentNode);
        updateCharacteristics(event.target.dataset.piece, event.target.dataset.operation);
    });
});

function dataHandle(operation, piece){
    const counter = piece.querySelector('[data-counter]')
    if(operation === '+'){
        counter.value = parseInt(counter.value) + 1;
    } else {
        counter.value = parseInt(counter.value) - 1;
    }
}

function updateCharacteristics(piece, operation){  
    characteristics.forEach((characteristic) => {
        if (operation === '+'){
            let newValue = Number.parseFloat(characteristic.innerHTML) + pieces[piece][characteristic.dataset.characteristic];
            characteristic.innerHTML = newValue.toFixed(1);
        } else {
            let newValue = Number.parseFloat(characteristic.innerHTML) - pieces[piece][characteristic.dataset.characteristic];
            characteristic.innerHTML = newValue.toFixed(1);
        }
    })    
}

function goToBuild(){
    character.style.filter = 'blur(0px)';
    features.style.filter = 'blur(0px)';
    missile.style.filter = 'blur(0px)';
    dialogue.style.display = 'none';
}

function goToDialogue(){
    character.style.filter = 'blur(100px)';
    features.style.filter = 'blur(100px)';
    missile.style.filter = 'blur(100px)';
    dialogue.style.display = 'block';
}

//variável usada para verificar condicionais
var code = '';
function checkValues(radiation, energy, speed, range){

    text.forEach((txt) => {
        txt.innerHTML = '';
    })

    if (radiation.textContent < 6){
        textOne.textContent =  textOne.textContent + ("Essa quantidade de radiação não será um problema, desaparecerá em algumas semanas. ");
        code = code + '1';
    } else if (radiation.textContent > 6 && radiation.textContent <= 29){
        textOne.textContent =  textOne.textContent + ("Essa quantidade de radiação será um problema. ")
    } else {
        textOne.textContent =  textOne.textContent + ("Está ficando louco? Com toda essa radiação, teriamos um inverno nuclear.")
    }

    if(energy.textContent >= 4 && energy.textContent <= 6){
        textOne.textContent =  textOne.textContent + ("Com esssa quantidade de energia passaremos nossa mensagem. ");
        code = code + '1';
    }else if(energy.textContent < 4){
        textOne.textContent =  textOne.textContent + ("Precisamos liberar mais energia na explosão. ");
    } else {
        textOne.textContent =  textOne.textContent + ("A energia liberada será muito alta, perderemos muito território. ");
    }

    if(speed.textContent < 1235){
        textOne.textContent =  textOne.textContent + ("Em uma velocidade subsônica, um iron dome poderia interceptar nosso míssil. ");
    } else {
        textOne.textContent =  textOne.textContent + ("O míssil será rápido o suficiente. ");
        code = code + '1';
    }

    if(range.textContent < 1600){
        textOne.textContent =  textOne.textContent + ("Precisamos de mais alcance! Nosso alvo está a mais de 1.600 quilometros. "); 
    } else {
        textOne.textContent =  textOne.textContent + ("O alcance está ótimo.");
        code = code + '1';
    }

    if(code === '1111'){
        final();
    }
}

function final(){
    textTwo.textContent =  textTwo.textContent + "Está perfeito... ";
    startButton.style.display = 'none';
    glass.style.display = 'block';
    launcherButton.style.display = 'block';
    glass.addEventListener('click', () => {
        const glassAudio = document.getElementById('glass-audio');
        glassAudio.play();
    })
    launcherButton.addEventListener('click', () => {
        const launchAudio = document.getElementById('launch-audio');
        launchAudio.volume = '0.05';
        launchAudio.play();
        goodbye();
        setTimeout(playVideo, 5000);
    })
}

function playVideo(){
    const video = document.getElementById('video');
    video.volume = '1';
    video.style.display = 'block';
    glass.style.display = 'none';
    video.play();
}

function goodbye(){
    const main = document.getElementById('main');
    main.style.opacity = '0';
    main.style.transition = '3s';
    setTimeout(()=>{
        playAgain();
    }, 8500);
}

function playAgain(){
    const main = document.getElementById('main');
    main.style.opacity = '1';
    main.style.transition = '1s';

    text.forEach((txt) => {
        txt.innerHTML = '';
    })
    textOne.innerHTML = 'A missão foi um sucesso!';
    textTwo.innerHTML = 'Em poucas semanas, nossas tropas recuperarão o território invadido. Esperamos, para o bem de todos, que não seja necessário o uso de outra dessas bombas.';

    launcherButton.style.display = 'none';
    startButton.style.display = 'block';
    startButton.innerHTML = 'Jogar novamente';

    startButton.addEventListener('click', () => {
        window.location.reload(true);
    })

}
