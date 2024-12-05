USE sacra_mento;
CREATE TABLE sacra_whatwedo(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Title TEXT,
    Content JSON,
    Status Text,
    created_date timestamp default now()
);