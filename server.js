const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let sql;



const cTable = require('console.table')


// Connect to database
const db = mysql.createConnection(
  {
    // host: '127.0.0.1',
    host: 'localhost',
    port: 3306,
   
    // MySQL username,
    user: 'root',
    password: 'Squeak37?!',
    database: 'emptracker_db'
  },
  console.log(`Connected to the movies_db database.`)
);

// // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port http://127.0.0.1:${PORT}`);
});

//list of scripts
const secondPrompt = async () =>{
  let status ='';
  do{
    let temp = [];
  
    //Main Prompt to navigate tables
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

   
  }while(status != false);
  } ;
  

//handle Navigation Choice
async function switchCheck(casePass) {
  switch(casePass){
    case 'View All Employees':
      console.log("View All Employees")
        
            sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.dept_id = department.id`;
          
          db.query(sql, (err, res) => {
                if (err) {
                  res.status(500).json({ error: err.message });
                  return;
                }
                console.log("\n")
                console.table(res)
              
              });  

      return true
    break;

    case 'Add Employee':
      console.log("Add Employee")
      let tempemp = await newemp();
      
      console.log(tempemp)
      sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${tempemp.firstName}', '${tempemp.lastName}', ${tempemp.role_ID},${tempemp.man_ID})`;
 
      console.log(sql)

      db.query(sql, (err, res) => {
        console.log("in query")
           if (err) {
    
            console.log('Error', err)
           } 

       });
         console.log("Employee added")
      console.log("byeeeeee")
  
      return true

    break;

//Not working -------------------------------
    case 'Update Employee Role':
      console.log("Update Employee Role")
   
      let changeroll = await updateroll();
      
      console.log(changeroll)
      sql = `UPDATE employee SET role_id = ${changeroll.role_ID} WHERE id = ${changeroll.emp_ID}`;
   
      console.log(sql)

      db.query(sql, (err, res) => {
        console.log("in query")
           if (err) {
        
            console.log('Error', err)
           } 

       });
    
      return true

    break;

    case 'View All Roles':
      console.log("View All Roles")
      
      sql = `SELECT roles.title , roles.id, department.dept_name , roles.salary FROM roles LEFT JOIN department ON roles.dept_id = department.id`;
   
     db.query(sql, (err, res) => {
          if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
          console.log("\n")
          console.table(res)
         
        });        
     
      return true
    break;

    case 'Add Role':
      console.log("Add Role")
   
      let temproll = await newroll();
      
      console.log(temproll)
      sql = `INSERT INTO roles (title, salary, dept_id) VALUES ('${temproll.title}', ${temproll.salary}, ${temproll.dept_ID})`;
     
      console.log(sql)
    
      db.query(sql, (err, res) => {
        console.log("in query")
           if (err) {
        
            console.log('Error', err)
           } 

       });
 
        
    break;

    case 'View All Departments':
      console.log("View All Departments")
        sql = `SELECT * FROM department`;
      
         db.query(sql, (err, res) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            console.log("\n")
            console.table(res)
          
          }); 


      return true

    break;

    case 'Add Department':
      console.log("Add Department")
        
      let tempdept = await newdept();
      
      console.log(tempdept)
      sql = `INSERT INTO department (dept_name) VALUES ('${tempdept.title}' )`;

      db.query(sql, (err, res) => {
        console.log("in query")
           if (err) {
           
            console.log('Error', err)
           } 
           
       });
   
   
      return true

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

//Start
secondPrompt();

//Makes a new role
async function newroll(){
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Add name of new roll:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter salary of new roll:',
    },
    {
      type: 'input',
      name: 'dept_ID',
      message: 'Enter deptartment ID:',
    }
  ]);
};

//Updates role
async function updateroll(){
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'emp_ID',
      message: 'Enter Employee ID whose roll you want to update:',
    },
    {
      type: 'input',
      name: 'role_ID',
      message: 'Enter new roll ID:',
    }
  
  ]);
};

//Makes a new Department
async function newdept(){
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Add name of new department:',
    },
   
  ]);
};

//Makes a new employee
async function newemp(){
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter First Name:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter Last Name:',
    },
    {
      type: 'input',
      name: 'role_ID',
      message: 'Enter Role ID:',
    },
    {
      type: 'input',
      name: 'man_ID',
      message: 'Enter Manager ID:',
    }
  ]);
};


