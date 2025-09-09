const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

//données fictives
const plats = [
    {id: 1, nomPlat: 'Burger Classique', prixMenu: '8€', stockRestant: 15, disponibilite: true },
    {id: 2, nomPlat: 'Pizza Margherita', prixMenu: '10€', stockRestant: 7, disponibilite: true},
    {id: 3, nomPlat: 'Salade César', prixMenu: '6€', stockRestant: 20, disponibilite: false},
    {id: 4, nomPlat: 'Pâtes Carbonara', prixMenu: '9€', stockRestant: 0, disponibilite: false },
    {id: 5, nomPlat: 'Tiramisu', prixMenu: '5€', stockRestant: 5, disponibilite: true},
]

http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorisation de n'importe quel site à accéder à l'API
    res.setHeader('Content-Type', 'application/json');
    if (req.url === "/plats" && req.method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(plats));
    }  else if (req.url === '/addplats' && req.method === 'POST') {
    let body = '';

    //  Lire les données envoyées
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const newPlat = JSON.parse(body);

        // On ajoute un ID auto
        newPlat.id = plats.length + 1;

        //  On pousse dans le tableau
        plats.push(newPlat);
        // plats.push(req.newPlat);

        // 5. On renvoie la réponse
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Plat ajouté avec succès', plat: newPlat }));
      } catch (error) {
        res.statusCode = 400; // Bad request
        res.end(JSON.stringify({ message: 'Données invalides' }));
      } 
    });
  }
}).listen((hostname, port), ()=>{
     console.log(`Server running at http://${hostname}:${port}/`);
}) 