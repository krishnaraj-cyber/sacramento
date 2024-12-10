USE sacra_mento;
CREATE TABLE sacra_sponsor(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Category VARCHAR(100),
    Image TEXT,
    URL TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);