USE sacra_mento;
CREATE TABLE sacra_current_affairs(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Cadate VARCHAR(100),
    Month VARCHAR(100),
    Year VARCHAR(100),
    Contents TEXT,
    Status VARCHAR(50) DEFAULT 'Inactive',
    created_date timestamp default now(), 
    updated_date timestamp default now() on update now() 
);