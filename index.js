//Importa libs
const axios = require("axios");
require("dotenv").config();

//Pega o a variavel do .env
const appid = process.env.appid;

//Criação das constantes para formação da url final
const q = "Itu";
const units = "metric";
const lang = "pt_BR";
const cnt = "10";
const base_url = 'https://api.openweathermap.org/data/2.5/forecast';

//url final
const url = `${base_url}?q=${q}&units=${units}&lang=${lang}&cnt=${cnt}&appid=${appid}`;

//Faz a requisição
axios
    .get(url)
    .then((res) =>{
        //mostra o resultado e devolve somente a parte de interesse
        console.log("Resultado e devolve os dados: ",res);
        return res.data;
    })
    .then((res) => {
        //mostra o total e devolve o resultado
        console.log("Total e Resultado: ", res.cnt);
        return res;
    })
    .then((res) => {
        //Devolve somente a lista de previsões
        console.log("Aqui", res);
        return res['list'];
    })
    .then((res) => {
        for(let previsao of res){
            console.log(`
                ${new Date(previsao.dt * 1000).toLocaleString()},
                ${'Min: ' + previsao.main.temp_min}\u00B0C,
                ${'Max: ' + previsao.main.temp_max}\u00B0C,
                ${'Umd: ' + previsao.main.humidity}%,
                ${previsao.weather[0].description}
            `)
        }
    })