

var listaAtendidos = [];
var arrayDeFilas = [];
var paraAddCliente;
var paraExibirFila;
var paraContagem;
var count = 1;
var stop = false;
var atendentes = [0, 1, 2, 3, 4];
var dataInicial;
var contador = 0;
var quantidadeAtendidosAtual = 0;
//document.getElementById("mostrafila3").style.display="none";
//document.getElementById("mostrafila4").style.display="none";
//document.getElementById("mostrafila5").style.display="none";

function contagem() {
    cronometro = document.getElementById('cronometro');
    cronometro.innerText = contador;
    contador = contador + 1;

    if(stop == false){
        paraContagem = setTimeout('contagem();', 1000);
    }
}

function salvarHoraInicial() {
    dataInicial = new Date();
    mediaTotalSistema();
}
async function mediaTotalSistema() {
    var horaAtual = new Date();
    var numeroTotalClientes = 0;
    for (i = 0; i < arrayDeFilas.length; i++) {
        numeroTotalClientes = numeroTotalClientes + arrayDeFilas[i].length;
    }
    console.log(numeroTotalClientes);
    console.log(quantidadeAtendidosAtual);
    z = numeroTotalClientes;
    numeroTotalClientes = Math.floor(numeroTotalClientes / ((horaAtual - dataInicial) / 1000 / 60));
    MediaDeClientesFila = document.getElementById('MediaDeClientesFila');
    MediaDeClientesFila.innerText = z;
    console.log(numeroTotalClientes);
    console.log(quantidadeAtendidosAtual);
    numeroTotalClientes = Math.floor((numeroTotalClientes + quantidadeAtendidosAtual) / ((horaAtual - dataInicial) / 1000 / 60));
    tempoTotalSistema = document.getElementById('tempoTotalSistema');
    tempoTotalSistema.innerText = numeroTotalClientes;
    quantidadeAtendidosAtual = 0;
    if(stop == false){
        setTimeout('mediaTotalSistema()', 60000);
    }
    console.log(numeroTotalClientes);
    dataInicial = horaAtual;



}

function sleep(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, x);
    });
}

function calculaMediaAtendimento() {
    mediaAtendimento = 0
    numClientes = 0
    for (var i = 0; i < listaAtendidos.length; i++) {
        mediaAtendimento = mediaAtendimento + listaAtendidos[i].tempoAtendimento;
        numClientes++;
    }
    if (mediaAtendimento != 0) {
        mediaAtendimento = mediaAtendimento / numClientes;
        tempoMedioAtendimento.innerText = Math.round(mediaAtendimento / 1000);
    }
    paraCalcaMediaAtendimento = setTimeout('calculaMediaAtendimento();', 100);
}

function calculaMediaSistema() {
    mediaSistema = 0
    numClientes = 0
    for (var i = 0; i < listaAtendidos.length; i++) {
        mediaSistema = mediaSistema + listaAtendidos[i].tempoSistema;
        numClientes++;
    }
    if (mediaSistema != 0) {
        mediaSistema = mediaSistema / numClientes;
        tempoMedioSistema.innerText = Math.round(mediaSistema / 1000);
    }
    paraCalcMediaSistema = setTimeout('calculaMediaSistema();', 100);
}

function calculaMediaFila() {
    mediaFila = 0;
    numClientes = 0
    for (var i = 0; i < listaAtendidos.length; i++) {
        mediaFila = mediaFila + listaAtendidos[i].tempoFila;
        numClientes++;
    }
    if (mediaFila != 0) {
        mediaFila = mediaFila / numClientes;
        tempoMedioFila.innerText = Math.round(mediaFila / 1000);
    }
    paraCalcMediaFila = setTimeout('calculaMediaFila();', 100);
}

function Cliente(nome, prioridade, chance, tempoAtendimento, tempoChegada, tempoSistema, tempoFila, tempoChegadaFila, tempoExatoAtendimento) {
    this.nome = nome;
    this.prioridade = prioridade;
    this.chance = chance;
    this.tempoAtendimento = tempoAtendimento;
    this.tempoChegada = tempoChegada;
    this.tempoSistema = tempoSistema;
    this.tempoFila = tempoFila;
    this.tempoChegadaFila = tempoChegadaFila;
    this.tempoExatoAtendimento = tempoExatoAtendimento;
}

function exibeAtendidos() {
    document.getElementById('mostraAtendidos').innerHTML = null;
    for (var i = 0; i < listaAtendidos.length; i++) {
        teste = document.getElementById('mostraAtendidos');
        text = document.createTextNode(listaAtendidos[i].nome + " ");
        teste.appendChild(text);
    }
    paraRemovidos = setTimeout('exibeAtendidos()', 1000);
}

async function addCliente() {
    var nome = 'C' + count;
    /*criação da variável para o tempo de atendimento do cliente de forma randômica entre 1 e 10.*/
    var tempoAtendimento = Math.floor(Math.random() * 1000) + 1;
    var tempoChegada = Math.round((Math.random() + 1) * 500);
    var tempoFila = null;
    //Pega o tempo que entrou na fila
    var tempoChegadaFila = null;
    var tempoExatoAtendimento = null;
    var tempoSistema = 0;

    var cliente = new Cliente(nome, tempoAtendimento, tempoChegada, tempoSistema, tempoFila, tempoChegadaFila, tempoExatoAtendimento);
    var data = new Date();
    cliente.tempoChegadaFila = data;
    cliente.tempoSistema = cliente.tempoAtendimento + cliente.tempoFila;

    //lista.push(cliente);
    tempo = cliente.tempoChegada;
    var x = await sleep(tempoChegada);
    count++;
    aux = Math.floor(Math.random() * arrayDeFilas.length);
    arrayDeFilas[aux].push(cliente);
    if (stop == false) {
        paraAddCliente = setTimeout('addCliente();', 10);
    }
}

function exibeFila() {
    var teste;
    var text;
    document.getElementById('mostraFila1').innerHTML = null;
    document.getElementById('mostraFila2').innerHTML = null;
    document.getElementById('mostraFila3').innerHTML = null;
    document.getElementById('mostraFila4').innerHTML = null;
    document.getElementById('mostraFila5').innerHTML = null;
    for (var i = 0; i < arrayDeFilas.length; i++) {
        for (var j = 0; j < arrayDeFilas[i].length; j++) {
            teste = document.getElementById('mostraFila' + (i + 1));
            try {
                text = document.createTextNode(arrayDeFilas[i][j].nome + " ");
                teste.appendChild(text);
            } catch (TypeError) { }
        }
    }
    if (stop == false) {
        paraExibirFila = setTimeout('exibeFila();', 10);
    }
}

async function criaFila() {
    aux = 0;
    if (numero.value >= 2 && numero.value <= 5) {
        numeroFilasAtual = arrayDeFilas.length;
        if (numero.value != numeroFilasAtual) {
            if (numero.value > numeroFilasAtual) {
                while (numeroFilasAtual < numero.value) {
                    var fila = [];
                    arrayDeFilas.push(fila);
                    numeroFilasAtual++;
                    setTimeout('atendimento()', 10);
                    await sleep(1000);
                    console.log("Fila criada")
                }
            } else if (numero.value < numeroFilasAtual) {
                numeroFilasAtual = numero.value;
                mudarClienteDeFila(numeroFilasAtual);
            }
            console.log("total de filas ativas: " + arrayDeFilas.length);
        }
    }
}

function mudarClienteDeFila(numero) {
    var listaLocal = [];
    for (var i = arrayDeFilas.length; i > numero; i--) {
        atendentes.push(i);
        for (var j = 0; j < arrayDeFilas[i - 1].length; j++) {
            listaLocal.push(arrayDeFilas[i - 1][j]);
        }
    }
    atendentes.sort();
    while (numero < arrayDeFilas.length) {
        arrayDeFilas.pop();
    }
    listaLocal.sort();
    for (var i = 0; i < listaLocal.length; i++) {
        aux = Math.floor(Math.random() * arrayDeFilas.length);
        arrayDeFilas[aux].push(listaLocal[i]);
    }
}

function stopAll() {
    stop = true;
}
function reiniciar() {
    stop = false;
}

async function atendimento() {
    var x = atendentes.shift();
    while (stop == false) {
        var clienteLocal = null;
        var aux = false;
        try {
            if (aux == false && arrayDeFilas[x].length > 0) {
                clienteLocal = arrayDeFilas[x].shift();
            }
        } catch (TypeError) {
            console.log(x);
        }
        if (clienteLocal == null) {
            await sleep(100);
        } else if (clienteLocal != null) {
            var data = new Date();
            clienteLocal.tempoExatoAtendimento = data;
            clienteLocal.tempoFila = clienteLocal.tempoExatoAtendimento - clienteLocal.tempoChegadaFila;
            clienteLocal.tempoAtendimento = Math.floor((Math.random() * 10000) + 1);
            clienteLocal.tempoSistema = clienteLocal.tempoFila + clienteLocal.tempoAtendimento;
            console.log(clienteLocal.tempoSistema);
            var tempo_local = clienteLocal.tempoAtendimento;
            var z = x + 1;
            var clienteAtual = document.getElementById('clienteAtual' + z);
            clienteAtual.innerText = clienteLocal.nome;
            var tempoFila = document.getElementById('tempoFila' + z);
            tempoFila.innerText = parseInt((Math.round(clienteLocal.tempoFila / 1000)));
            var tempoAtendimento = document.getElementById('tempoAtendimento' + z);
            tempoAtendimento.innerText = parseInt(Math.round(clienteLocal.tempoAtendimento / 1000));
            quantidadeAtendidosAtual++;
            while (tempo_local - 1000 >= 0) {
                tempoFilaCliente = document.getElementById('tempoFilaCliente' + z);
                tempoFilaCliente.innerText = parseInt(Math.round(tempo_local / 1000));
                await sleep(1000);
                tempo_local = tempo_local - 1000;
            }
            tempoFilaCliente = document.getElementById('tempoFilaCliente' + z);
            tempoFilaCliente.innerText = parseInt(Math.round(tempo_local / 1000));
            await sleep(tempo_local);
            listaAtendidos.push(clienteLocal);
        }
    }
}

