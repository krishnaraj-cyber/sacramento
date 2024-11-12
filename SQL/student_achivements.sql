USE sacra_mento;
CREATE TABLE sacra_student_achivements(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Studentname TEXT,
    Achivement TEXT,
    Description TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);