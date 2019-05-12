const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
let site = "https://slackjeff.com.br/artigos/"


let body = ( async () => {
   let response = await axios(site);
   let data = await response.data;
   let $ = await cheerio.load(data);
   let links = $('tr a');
   links = await links.map((index, elem) => {
        return $(elem).attr('href');
   });
   for(let i = 0; i < links.length; i++){
        let artigo = await axios(site + links[i]);
        artigo = artigo.data;
        fs.writeFileSync(links[i], artigo ,'utf-8');
   }
//    console.log(links);
})();
