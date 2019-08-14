var GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util')
const credentials = require('./credentials.json')
const spreedsheetId = '1crH8vAK_E8wK7Vt8IDy8xN772HENebuXZoBicwmT_ew';
const doc = new GoogleSpreadsheet(spreedsheetId);
const colunaNome = 'C2';
const colunaIdade = 'C3';

var google = function(){
    
}

const acessarPlanilha = async() => {
    try
    {
        const doc =  new GoogleSpreadsheet(spreedsheetId);
        await promisify(doc.useServiceAccountAuth)(credentials);
        return  await promisify(doc.getInfo)();
            
    }
    catch(err){
        console.log("nok")
        console.log(err);
    }
   
}

var getLinhas = async (id, nome, idade) => {
    const info = await acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const linhas = await promisify(folhaDeDados.getCells)({
       
    })

    let filterId = (celula) => {
        return celula.value == id
    }

    let celulaId = linhas.filter(filterId)[0];
    let linhaEncontrada = celulaId.batchId.substring(0,2)
    nomeBatchId = linhaEncontrada + colunaNome;
    idadeBatchId = linhaEncontrada + colunaIdade;

    let filterNome = (celula) => {
        return celula.batchId == nomeBatchId;
    }

    let filterIdade = (celula) => {
        return celula.batchId == idadeBatchId;
    }

    let celulaNome = linhas.filter(filterNome)[0]
    let celulaIdade = linhas.filter(filterIdade)[0]
    

    if(nome){
        celulaNome.value = nome;
        celulaNome.save();

    if(idade){
        celulaIdade.value = idade;
        celulaIdade.save();
    }


    folhaDeDados.bulkUpdateCells(linhas);

    }
}

getLinhas(5, 'paula', 25)

