

USE sacra_mento;

CREATE TABLE sacra_boardmembers(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Name TEXT,
    Image TEXT,
    Designation TEXT,
    Year TEXT,
    Priority TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);