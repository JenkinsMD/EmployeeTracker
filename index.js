//Team profile generator
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const cTable = require('console.table')


//duplicates---------------
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');


const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//duplicates---------------

// create writeFile function using promises instead of a callback function
// const writeFileAsync = util.promisify(fs.writeFile);



//Second set of questions for Engineer and Intern
const secondPrompt = async (midString) =>{
  let status ='';
  do{
    let temp = [];
    // var cardHolder = document.querySelector(".cardHolder");
    temp = await inquirer.prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
      },
  
      
     
    ]);
    console.log(temp)
    status = await switchCheck(temp.options)
    if (status===false) {
      // return midString;
    } else {
      // let ogVal =midString
      // let holder = status;
      // midString = ogVal.concat(holder);
      // console.log("in Do:"+ midString)
    }
    // return false;
    // return false;
  }while(status != false);
  } ;
  



//Check what other roles to add
async function switchCheck(casePass) {
  switch(casePass){
    case 'View All Employees':
      console.log("View All Employees")
          app.get('/api/employees', (req, res) => {
            const sql = `SELECT id, movie_name AS title FROM movies`;
          
            db.query(sql, (err, rows) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              res.json({
                message: 'success',
                data: rows
              });
            });
          });
      
      return true
    break;

    case 'Add Employee':
      console.log("Add Employee")
   
      
      return true

    break;


    case 'Update Employee Role':
      console.log("Update Employee Role")
   
      return true

    break;

    case 'View All Roles':
      console.log("View All Roles")
      app.get('/api/roles', (req, res) => {
        const sql = `SELECT title, salary FROM roles`;
      
       let temp = await db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
          res.json({
            message: 'success',
            data: rows
          });
        });

        console.log(temp);
        cTable(temp.data);
      });
      return true
    break;

    case 'Add Role':
      console.log("Add Role")
   
    
      return tempInt

    break;

    case 'View All Departments':
      console.log("View All Departments")
   
     
      return tempInt

    break;

    case 'Add Department':
      console.log("Add Department")
   
   
      return tempInt

    break;

    case 'Quit':
      console.log("Quit")
   
      
      return false

    break;


    default:
      console.log("nah")
      return false
  }


}

module.exports = { secondPrompt, switchCheck,  };