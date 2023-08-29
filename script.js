const input = document.querySelector(".input")
const button = document.querySelector(".button")
const download = document.querySelector(".download")

const arrayNumber = []
const correctionDDD = []
const arrayNotPoint = []
const arrayNotTra = []
const correctionTeen = []

let indentication = ""

function arrayToCSV(array) {
    if (array.length === 0) {
        return '';
    }
    
    const headers = ['Telefone'];
    
    const csvContent = [headers.join(',')];
    
    for (const item of array) {
        const values = [item];
        csvContent.push(values.join(','));
    }
    
    return csvContent.join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.style.display = 'none';
    download.appendChild(link);
    link.click();
    download.removeChild(link);
    URL.revokeObjectURL(url);
    location.reload(true);
}

function handleClick(){
    const arrayItem = input.value.split(' ')

    input.value = ""

    arrayItem.forEach( (item, index) => {
        if(item.length == 2){
            indentication += item
        }else{
            arrayItem[index] = indentication + item
            indentication = ""
        }
    })

    arrayItem.forEach( item => {
        if(item.length > 2){
            correctionDDD.push(item)
        }
    })


    correctionDDD.forEach( item => {
       const separationNumber = item.split("\n")
       separationNumber.forEach( number =>{
        if(number !== ""){
            arrayNumber.push(number)
        }
       })
    });

    arrayNumber.forEach(item => {
        if(item.split(".").length !== 2){
            arrayNotPoint.push(item)
        }
    })

    arrayNotPoint.forEach(item => {
        if(item.split("-").length !== 2){
            arrayNotTra.push(item)
        }
    })

    arrayNotTra.forEach( (item, index) => {
        arrayNotTra[index] =  item.replace(/\$/g, '5')
    })


    correctionNumber()
}

function correctionNumber(){
    arrayNotTra.forEach( item => {
        if(item.length === 10){
            const dd = item.substring(0, 2)
            const number = item.substring(2, item.length)
            const numberCorrection = `55${dd}9${number}`
            correctionTeen.push(numberCorrection)
        }else if(item.length === 12){
            const info = item.substring(0, 4)
            const number = item.substring(4, item.length)
            const numberCorrection = `${info}9${number}`
            correctionTeen.push(numberCorrection)
        }else if(item.length > 10){
            correctionTeen.push(item)
        }
    })

    download.innerHTML = "Baixe Aqui em csv a lista completa!"
    const csv = arrayToCSV(correctionTeen);
    downloadCSV(csv, 'dados.csv');
}

button.addEventListener("click", handleClick)


//VALIDAÇÕES NECESSARIAS:
//DDD E INDENTIFICADOR DE PAIS SEPARADOS = OK
//NUMEROS QUE TEM PONTO NO MEIO = OK (MENTIRA EU SO TIREI KKKKKKKKKKKKKKKKK)
//NUMEROS QUE TEM CIFRÂO = OK
//NUMEROS QUE TEM BARRAS = OK
//COLOCA DDD CORRETO E INDENTIFICADOR DE PAIS = 


//55 DD 9 99999999