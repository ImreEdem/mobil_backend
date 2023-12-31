const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express()
const port = 3000



app.use(cors())
app.use(express.json())
app.use(express.static('kepek'))
app.use(bodyParser.json());

var connection
function kapcsolat()
{
   connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sziavangazdadia'
  })
  
  connection.connect()
  
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './kepek');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

//INSERT INTO menhelyek VALUES (NULL, 'alma', 'alma@gmail.com', '0620474747', 'valami', 7 , '1.jpg', '');

/*app.post('/felvitelmenhely', (req, res) => {
  kapcsolat()
    
    connection.query(`INSERT INTO menhelyek VALUES (NULL, 'alma', 'alma@gmail.com', '0620474747', 'valami', 7 , '1.jpg', 1)`, (err, rows, fields) => {
    if (err){
      console.log("Hiba")
      res.send("Hiba")
    }
    else{
      console.log("Sikeres felvitel")
      res.send("Sikeres felvitel")
    }
  })
  connection.end() 
  })
*/

const upload = multer({ storage });

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  
  console.log('file', req.files);
  console.log('body', req.body);

  //------------adatb-be valo felvitel----------

  kapcsolat()
    
    connection.query(`INSERT INTO menhelyek VALUES (NULL, '${req.body.bevitel1}', '${req.body.bevitel2}', '${req.body.bevitel3}', '${req.body.bevitel4}', ${req.body.selectedTelepules} , '${req.files[0].filename}', 1)`, (err, rows, fields) => {
    if (err){
      console.log("Hiba")
      res.send("Hiba")
    }
    else{
      console.log("Sikeres felvitel")
      res.send("Sikeres felvitel")
    }
  })
  connection.end() 

  //---------------------------------------------
  
});

app.get('/menhelyekkiiras', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sziavangazdadia'
})

connection.connect()


connection.query('SELECT * FROM menhelyek inner join telepulesek on menhelyek.menehelyek_telepules = telepulesek.telepules_id order by menhelyek.menhelyek_id', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})
connection.end()
  })

  

app.get('/lenyilolista', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sziavangazdadia'
})

connection.connect()


connection.query('SELECT * FROM telepulesek', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})
connection.end()
  })



  app.get('/orokbefogadas', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sziavangazdadia'
  })
  
  connection.connect()
  
  
  connection.query('SELECT * FROM felhasznalok inner join orokbefogadas on felhasznalok.felhasznalok_id = orokbefogadas.orokbefogad_felid where orokbefogadas.orokbefogad_felid = felhasznalok.felhasznalok_id and felhasznalok.felhasznalok_id = orokbefogadas.orokbeadas_felid', (err, rows, fields) => {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  connection.end()
    })


    app.get('/orokbefogad', (req, res) => {
      const mysql = require('mysql')
      const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'sziavangazdadia'
    })
    
    connection.connect()
    
    
    connection.query('select felhasznalok.felhasznalok_id, felhasznalok.felhasznalo_teljesnev,orokbefogadas.orokbefogado ,orokbefogadas.orokbeado from felhasznalok inner join orokbefogadas on felhasznalok.felhasznalok_id = orokbefogadas.ofelhasznalo_id', (err, rows, fields) => {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    connection.end()
      })


      app.post('/telepulesenkent', (req, res) => {
        kapcsolat().then(connection => {
          connection.query(`select * from menhelyek inner join telepulesek on menehelyek_telepules = telepules_id WHERE menehelyek_telepules = ${req.body.atkuld1} `, (err, rows, fields) => {
            if (err) {
              console.log("Hiba", err);
              res.status(500).send("Hiba");
            } else {
              console.log(rows);
              res.send(rows);
            }
            // Kapcsolat felszabadítása
            connection.release();
          });
        }).catch(error => {
          console.error("Kapcsolat hiba", error);
          res.status(500).send("Kapcsolat hiba");
        });
      });

      app.post('/keresvaros', (req, res) => {
        kapcsolat()
        
        connection.query(`select * from menhelyek inner join telepulesek on menehelyek_telepules = telepules_id WHERE menehelyek_telepules = ${req.body.atkuld1};`, (err, rows, fields) => {
        if (err) {
          console.log("Hiba")
        }
        else{
          console.log(rows)
          res.send(rows)
        }
        
        })
        connection.end() 
        })
      
        app.post('/keresfelhasznalo', (req, res) => {
        kapcsolat()
        
        connection.query(`select * from felhasznalok inner join orokbefogadas on felhasznalok.felhasznalok_id = orokbefogadas.ofelhasznalo_id WHERE felhasznalok.felhasznalok_id = ${req.body.atkuld11};`, (err, rows, fields) => {
        if (err) {
          console.log("Hiba")
        }
        else{
          console.log(rows)
          res.send(rows)
        }
        
        })
        connection.end() 
        })

        app.get('/lenyilolista2', (req, res) => {
          const mysql = require('mysql')
          const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'sziavangazdadia'
        })
        
        connection.connect()
        
        
        connection.query('SELECT * FROM felhasznalok', (err, rows, fields) => {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        connection.end()
          })
      


  

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
}) 