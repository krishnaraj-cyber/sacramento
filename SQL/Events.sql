USE sacra_mento;
CREATE TABLE sacra_Events(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Eventname TEXT,
    Image TEXT,
    Date TEXT,
    Event_Time TEXT,
    Reg_Deadline TEXT DEFAULT NULL,
    Activities TEXT DEFAULT NULL,
    Poster_Type VARCHAR(50) DEFAULT NULL,
    Payment TEXT,
    Guest_Count TEXT,
    Entry_Fees TEXT,
    Fees_Adults TEXT,
    Fees_Kids TEXT,
    Fees_Under5 TEXT,
    Disclaimer TEXT DEFAULT NULL,
    Description TEXT DEFAULT NULL,
    URL TEXT DEFAULT NULL,
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
    Under5_Fees TEXT,
    Kids_Fees TEXT,
    Adult_Fees TEXT,
    Fixed_Team_Count TEXT,
    FOREIGN KEY (id) REFERENCES sacra_Events(id)
);