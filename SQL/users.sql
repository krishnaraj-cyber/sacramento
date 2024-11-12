USE sacra_mento;
CREATE TABLE sacra_users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Username VARCHAR(100),
    Password VARCHAR(100),
    Role VARCHAR(50) DEFAULT 'User',
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);