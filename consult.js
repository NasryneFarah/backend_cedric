const http = require('http');

const hostname = '127.0.0.1';
const port = 3002;

//données fictives
const plats = [
    {id: 1, nomPlat: 'Burger Classique', prixMenu: '8€', stockRestant: 15, disponibilite: true },
    {id: 2, nomPlat: 'Pizza Margherita', prixMenu: '10€', stockRestant: 7, disponibilite: true},
    {id: 3, nomPlat: 'Salade César', prixMenu: '6€', stockRestant: 20, disponibilite: false},
    {id: 4, nomPlat: 'Pâtes Carbonaras', prixMenu: '9€', stockRestant: 0, disponibilite: false },
    {id: 5, nomPlat: 'Tiramisu', prixMenu: '5€', stockRestant: 5, disponibilite: true},
]

http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorisation de n'importe quel site à accéder à l'API
    res.setHeader('Content-Type', 'application/json');
    if (req.url === "/plats" && req.method === "GET") {
        res.statusCode = 200;
        res.write(JSON.stringify(plats));
        res.end();
    }
}).listen((hostname, port), ()=>{
     console.log(`Server running at http://${hostname}:${port}/`);
}) 