USE sacra_mento;

CREATE TABLE sacra_register (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Reg_No TEXT,
    First_Name TEXT DEFAULT NULL,
    Last_Name TEXT DEFAULT NULL,
    Email TEXT DEFAULT NULL,
    Phone_Number TEXT DEFAULT NULL,
    Entry_Fees TEXT DEFAULT NULL,
    Willingness TEXT DEFAULT NULL,
    Number_Guests TEXT DEFAULT NULL,
    Adults TEXT DEFAULT NULL,
    Kids TEXT DEFAULT NULL,
    Babes TEXT DEFAULT NULL,
    Event TEXT DEFAULT NULL,
    Team_Name TEXT DEFAULT NULL,
    Eventname TEXT DEFAULT NULL,
    Date TEXT DEFAULT NULL,
    Registered_Year TEXT DEFAULT NULL,
    Poster_Type TEXT DEFAULT NULL,
    Team_Members_Count TEXT DEFAULT NULL,
    Disclaimer_Acceptance TEXT DEFAULT NULL,
    payment_intent_id TEXT DEFAULT NULL,
    payment_status TEXT DEFAULT NULL,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);



-- Supporting Table 1
CREATE TABLE sacra_register_participants (
    id INT,
    Participant_Name TEXT,
    Selected_Event TEXT,
    Team_Members_Count TEXT,
    Age TEXT,
    FOREIGN KEY (id) REFERENCES sacra_register(id)
);