INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Marketing"),
       ("Legal");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Sales Person", 20000,1),
       ("Engineer", 30000,2),    
       ("SFA", 40000,3),    
       ("Marketer", 50000,4),
       ("Lawyer", 60000,5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Demamp", 101, 500),
       ("Ders", "Holmvic", 102, 501),
       ("Blake", "Henderson", 103, 502),
       ("Alice", "Boss", 104, 503);