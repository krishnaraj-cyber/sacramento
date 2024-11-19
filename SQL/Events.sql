USE sacra_mento;
CREATE TABLE sacra_Events(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Eventname TEXT,
    Image TEXT,
    Date TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);