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



-- Supporting Table 1
CREATE TABLE sacra_Events_Game (
    id INT,
    Game_Title TEXT,
    Participant_Type TEXT,
    Payment TEXT,
    Payment_Type TEXT,
    Entry_Fees TEXT,
    FOREIGN KEY (id) REFERENCES sacra_Events(id)
);