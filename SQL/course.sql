USE sacra_mento;
CREATE TABLE sacra_course(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Course VARCHAR(100),
    Fee VARCHAR(100),
    Startdate VARCHAR(100),
    Duration TEXT,
    Description TEXT,
    Discount TEXT,
    Contents TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);