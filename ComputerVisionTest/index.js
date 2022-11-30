'use strict';

const request = require('request');

let subscriptionKey = process.env.CPsubscriptionKey;
let endpoint = process.env.CPendpoint;

var uriBase = endpoint + 'vision/v3.1/analyze';

//microsoft
//const imageUrl = 'https://japan.zdnet.com/storage/2018/09/07/b619f22cdbdaf421b89c9a700802e8ce/t/584/438/d/microsofts-logo-gets-a-makeover_1200x900.png';

//many brands
//const imageUrl = 'https://blog.btrax.com/jp/files/2021/06/logos-us2.png';
//const imageUrl = 'https://blog.btrax.com/jp/files/2021/06/country-logos-main4.png';

//apple
//const imageUrl = 'https://i0.wp.com/goworkship.com/magazine/wp-content/uploads/2020/03/image5-600x352.jpg?resize=600%2C352&ssl=1';

//Brand
const params = {
    'visualFeatures': 'Categories,Description,Brands',
    'maxCandidates':'1',
    'details': '',
    'language': 'en'
};

//azure storage
//const imageUrl = "https://halgroupa.blob.core.windows.net/nasubi/apple.png"

//f1 race
const imageUrl = 'https://cdn-image.as-web.jp/2018/04/03071730/18R01Aus-start-SUT1-765x510.jpg';

//complete sentence
// const params = {
//     'visualFeatures': 'Description',
//     'maxCandidates':'1',
//     'language':'ja'
// }

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});