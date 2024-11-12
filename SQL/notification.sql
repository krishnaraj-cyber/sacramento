USE sacra_mento;
CREATE TABLE sacra_notification(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Name TEXT,
    Notification TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);