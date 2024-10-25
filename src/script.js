const inpText = document.getElementById ('inpText');
const inpLetra = document.getElementById ('inpLetra');
const btnDefinir = document.getElementById ('btnDefinir');
const btnAdivinhar = document.getElementById ('btnAdivinhar');
const mostraPalavra = document.getElementById ('mostraPalavra');
const tentativas = document.getElementById ('tentativas');
const header = document.getElementById ('header');
const btnRenicar = document.getElementById ('btnRenicar');
const adivinhar = document.getElementById ('adivinhar')

//Logica

let palavra;
let palavraEscolhida;
let numTentativa = 6;
let palavraTraco;

//Iniciar o jogo

function iniciarJogo(){
    palavra = inpText.value;

    if (!palavra.match(/[a-zà-ùç]/i)) {
        Swal.fire({
            text: "Por favor, insira uma palavra válida.",
            background: "#9b9a9a",
            color: "white"
          });
        return;
    } 

    inpLetra.style.marginTop = '20px'
    header.style.display = 'none'   
    adivinhar.style.display = 'flex'

    palavraEscolhida = palavra.split('')
    palavraTraco = Array(inpText.value.length).fill('_')
        
    exibirPalavra()

}

btnDefinir.onclick = () => {
    iniciarJogo();
}

inpText.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        iniciarJogo();
      }
});

btnAdivinhar.onclick = () =>{
    letraChutada();
    exibirPalavra();
    inpLetra.value = "";
}

inpLetra.addEventListener('keypress', function (event){
    if (event.key === 'Enter'){
        letraChutada();
        exibirPalavra();
        inpLetra.value = "";
    }
});


btnRenicar.onclick = () => {
    header.style.display = 'block'   
    adivinhar.style.display = 'none'
    numTentativa = 6

    inpText.value = "";
}

function exibirPalavra(){
    mostraPalavra.innerText = palavraTraco.join('  ')
    tentativas.innerHTML = 'Tentativas restantes => ' + numTentativa;
    
    encerrarJogo ()
}

function letraChutada(){
    const letra = inpLetra.value.toLowerCase();
    // console.log(letra);

    if (!letra.match(/[a-zà-ùç]/i)) {
        Swal.fire({
            text: "Por favor, insira uma letra válida.",
            background: "#9b9a9a",
            color: "white"
          });
        return;
    }

    if (palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                palavraTraco[i] = letra;
                console.log(i);
                
            }
        } 
    } else{
        numTentativa--;
    }
}

function encerrarJogo() {
    if(numTentativa == 0) {
        setTimeout(function() {
            Swal.fire({
                title: "Não foi dessa vez...",
                text: "Você Perdeu!",
                icon: "error",
                background: "#9b9a9a",
                color: "white"
              });
          }, 500);

        setTimeout(function() {
            header.style.display = 'block'   
            adivinhar.style.display = 'none'
        },2000);

        numTentativa = 6;

    } else {
        if (!palavraTraco.includes('_')) {
            setTimeout(function() {
                Swal.fire({
                    title: "Parabéns!",
                    text: "Você venceu!",
                    icon: "success",
                    background: "#9b9a9a",
                    color: "white"
                  });
              }, 500);

            setTimeout(function() {
                header.style.display = 'block'   
                adivinhar.style.display = 'none'
                inpText.value = "";
            },2000);

              numTentativa = 6;
        }
    }
    
}