// Utiliser Express
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json()) 
const port = 3001
const hostname = '127.0.0.1';

// connexion base de donnee
const mysql = require("mysql")
const connexion = mysql.createConnection({
  host : '127.0.0.1',
  user : "cedric",
  password : "azerty",
  database : 'dashboard_nuxt',
})

connexion.connect((err) => {
  if (err) {
    console.error("Erreur de connexion : "+err.stack);
     return;
  }
  console.log("Connexion établie avec la base de donnée");
});

app.use(cors())

//liste des plats
// const plats = [
//     {id: 1, nomPlat: 'Burger Classique', prixMenu: '8000', stockRestant: 15, disponibilite: true },
//     {id: 2, nomPlat: 'Pizza Margherita', prixMenu: '10000', stockRestant: 7, disponibilite: true},
//     {id: 3, nomPlat: 'Salade César', prixMenu: '6000', stockRestant: 20, disponibilite: false},
//     {id: 4, nomPlat: 'Pâtes Carbonaras', prixMenu: '9000', stockRestant: 0, disponibilite: false },
//     {id: 5, nomPlat: 'Tiramisu', prixMenu: '5000', stockRestant: 5, disponibilite: true},
// ]

// envoyer en BD 
// plats.forEach((plat) => {
//   const sql = 'INSERT INTO plats (id, nomPlat, prixMenu, stockRestant, disponibilite) VALUES (?, ?, ?, ?, ?)';
//   const values = [plat.id, plat.nomPlat, plat.prixMenu, plat.stockRestant, plat.disponibilite];

//   connexion.query(sql, values, (err, result) => {
//     if (err) throw err;
//     console.log(`✅ Plat inséré : ${plat.nomPlat}`);
//   });
// });

// endpoint get
app.get('/', (req, res) => {
  res.send('<h1>Express</h1>')
})

app.get('/plat', (req, res) => {
  const getName = req.query.nomPlat;
  const prixMax = parseInt(req.query.prixMax);
  let sql = "SELECT * FROM plats WHERE 1=1";
  let params = [];

  if (getName) {
    params.push("%" + getName + "%");

    sql += " AND nomPlat LIKE ?";
  }
  if (prixMax) {
    params.push( prixMax);
    sql += " AND prixMenu <= ?";
  }


  console.log(sql,params);
  
  
  connexion.query(sql,params, (err,results) => {

    if (err) {
      console.log("Erreur serveur",err)
      return res.status(500).send("Erreur serveur");
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Aucun plat trouvé" });
    }

    res.json({
      message: getName ? `Résultat pour ${getName}` : "Liste complète des plats",
      plats: results
    });
  })
  // connexion.query("SELECT * FROM plats", (err, results) => {
  //   if (err) {
  //     return res.status(500).send("Erreur");
  //   }
  //         res.json({
  //           message : 'Liste complète des plats',
  //           plats : results
  //       })
  //        console.log("plats", results);
  // })
//   res.send('Hello World!')
})

// app.get('/getName',(req,res)=> {
//   const getName = req.query.nomPlat;
//    console.log("======== name",getName);    
//    connexion.query("SELECT * FROM plats WHERE nomPlat LIKE ?", ["%"+getName+"%"], (err, results) => {
//     if (err) {
//        console.log("======== error",err); 
//       return res.status(500).json({ message: 'Erreur serveur.' });
//     }

//     console.log("======== Ici");    

//     if (results.length === 0) {
//        console.log("======== result length 0"); 
//       return res.status(404).json({ message: `Aucun plat trouvé avec le nom ${getName}` });
//     }

//     console.log("======== enfin");    
//     res.json(results);
//     console.log("======== apres");    
//   }); 
// })

// endpoint post
app.post('/plat', async (req, res) => {
    const {nomPlat, prixMenu, stockRestant, disponibilite} = req.body;
    // const nomPlat = req.body.nomPlat;
     console.log("plat ajouté",req.body);
     await connexion.query('INSERT INTO plats (nomPlat, prixMenu, stockRestant, disponibilite) VALUES (?, ?, ?, ?)', [nomPlat, prixMenu, stockRestant, disponibilite], (err,res) =>{
      if (err) {
        console.error('Erreur dans l\'insertion :',err);
        return;
      }
      console.log('Plat ajouté !!');
      
     })
    // newPlat.id = plats.length + 1;
      // plats.push(newPlat);
    res.send('Plat ajouté avec succès',)
})

app.put('/plat/:id', (req, res) => {
   const id = req.params.id;
   const nomPlat = req.body.nomPlat;
   const prix = req.body.prixMenu;
   const stock = req.body.stockRestant;
   const disponibilite = req.body.disponibilite;
  
   connexion.query("UPDATE plats  SET nomPlat = ?, prixMenu = ?, stockRestant = ?, disponibilite = ? WHERE id = ? ", [nomPlat,prix,stock,disponibilite,id], (err) => {
    if (err) {
      return res.status(500).send('plat non trouvé')
    }
    res.json({
      message: 'Plat modifié avec succès',
    })
   })

})
  //   const id = parseInt(req.params.id); 
  // const plat = plats.find(p => p.id === id); 

  // if (!plat) {
  //   return res.status(404).send(`Plat avec l'id ${id} non trouvé`);
  // }

  // Object.assign(plat, req.body);
  
  // res.json({
  //   message: 'Plat modifié avec succès',
  //   plat
  // });
    // res.send('Got a PUT request at /user',)
// })

// retrouver un plat en rentrant son nom
// app.get('/plat/:name', (req,res) => {
//   const name = req.params.name;
//   const n = plats.filter(n => n.nomPlat.toLowerCase().includes(name));
//   if (n.length === 0) {
//      return res.status(404).send(`Plat avec le nom ${name} non trouvé`);
//   }
//   res.json(n);
//   res.send('plat trouvé')
// })

// supprimer un plat
app.delete('/plat/:id', (req, res) => {
  const id = req.params.id;
 connexion.query("DELETE FROM plats WHERE id = ?", [id], (err,results) =>{
    if (err) {
      return res.status(500).send(`Plat avec l'id ${id} non trouvé`);
    }
    res.json({
    message: 'Plat supprimé avec succès',
    id : id ,
  });  
  })
    // const id = parseInt(req.params.id); 
    // const index = plats.findIndex(p => p.id === id); 
  //   if (index === -1) {
  //   return res.status(404).send(`Plat avec l'id ${id} non trouvé`);
  // }

  // // supprimer le plat du tableau
  // const deletedPlat = plats.splice(index, 1);t

  // res.json({
  //   message: 'Plat supprimé avec succès',
  //   plat: deletedPlat[0]
  // });
//   res.send('Got a DELETE request at /user')
})

app.listen((hostname, port), () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})





// const http = require('http');
// const { json } = require('stream/consumers');

// const hostname = '127.0.0.1';
// const port = 3000;

// http.createServer((req, res)=>{
//     console.log(req.url)
//     // res.writeHead(200, {"content-type":"text/html"});
//     // res.write("<h1>Bonjour Ici</h1>");
//     // res.end();

//     //ajout de route
//     const url = req.url;
//     if (url === "/profile") {
//         res.write("showGridlines");
//         res.end();
//     } 
//     else if(url === "/livraison"){
//        //renvoyer une réponse json
//        const payload = {
//        address : {
//        street : "123 amazing street",
//        city : "fun city",
//        }
//        };
//        res.writeHead(200, {"content-type" : "application/json"});
//        res.write(JSON.stringify(payload));
//        res.end();
//     } 
//     else {
//         res.write("<h1>Bonjour Ici</h1>");
//         res.end();
//     }

//     // switch(url)
//     // {
//     //     case "/" :
//     //         res.write("<h1>Bienvenue sur kq pqge d4qccueul </h1>");
//     //         res.end();
//     //     break;

//     //     case "/profile" :
//     //          res.write("<h1>Bonjour Ici</h1>");
//     //          res.end();
//     //     break

//     //     default :
//     //         res.write("<h1>Bonjour Ici</h1>");
//     //         res.end();
//     // }
// }).listen((hostname, port), ()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// })
 