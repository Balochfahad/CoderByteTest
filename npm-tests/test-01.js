//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 * 
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import {fastify } from "fastify";

const data = { error : false, users : ["John Doe","Lucita Esau", "Thomas Friedman", "Norma Helms", "Amy Manning"]  };

// write the json saving code here
fs.writeFile('data.json', JSON.stringify(data), function (err) {
    if (err) return console.log(err);
    console.log('file created');
});

const app = fastify({
    ignoreTrailingSlash : true,
    keepAliveTimeout : 65 * 1000
});

app.get('/',(request,reply)=>{

    reply.header('Content-Type', 'text/html; charset=utf-8');
    // read the json here and insert the list names into the html
        try {
            if (fs.existsSync("./data.json")) {
                fs.readFile("./data.json", "utf8", (err, jsonData) => {
                    if (err) {
                      console.log("File read failed:", err);
                      return;
                    }
                    let json = JSON.parse(jsonData);
                    const page = 
                        `<html>
                            <head>
                                <title>Wallethub Test</title>
                            </head>
                            <body>
                            <p>${json.users.map(item => 
                                `<p>${item}<p>`
                            )}</p>
                            </body>
                        </html>`;
        
                    reply.send(page);
    

                  });
            }else{
                console.log('No File exists')
            }
        } catch(err) {
            console.error(err)
        }    
});

// server start
app.listen(8080).then((address)=>{
    console.log(`Server started at ${address}`);
});