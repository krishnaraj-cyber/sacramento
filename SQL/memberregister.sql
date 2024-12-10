USE sacra_mento;
CREATE TABLE sacra_memberregister(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    First_Name TEXT,
    Last_Name TEXT,
    Email TEXT,
    Phone_Number TEXT,
    Location TEXT,
    Notify_stm TEXT,
    Contact_for_stm TEXT,
    Register_spouse TEXT,
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);