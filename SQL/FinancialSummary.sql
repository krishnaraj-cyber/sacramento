USE sacra_mento;
CREATE TABLE sacra_FinancialSummary(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    EventName TEXT,
    Expenses TEXT,
    Income TEXT,
    Year TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);