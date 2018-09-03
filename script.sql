CREATE DATABASE fantasyone;

use fantasyone;

CREATE TABLE users (userid varchar(15) PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30), 
    email_id varchar(30), 
    dob date, 
    CONSTRAINT check_userid CHECK ( userid like '%[^0-9]%' ),
    CONSTRAINT check_email CHECK (email_id like '%_@__%.__%'),
    CONSTRAINT check_age CHECK (((YEAR(CURRENT_DATE) - YEAR(dob) = 16) AND (MONTH(CURRENT_DATE)  >= MONTH(dob)) AND (DAY(CURRENT_DATE) >= DAY(dob))) OR (YEAR(CURRENT_DATE) - YEAR(dob) > 16)));

DELIMITER $$

CREATE TRIGGER test_email_before_insert BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.email_id NOT like '%_@__%.__%' THEN
        SIGNAL SQLSTATE '12345'
        SET MESSAGE_TEXT = 'Invalid email address entered';
    END IF;
END$$

CREATE TRIGGER test_userid_before_insert BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.userid NOT like '%[0-9]%' THEN
        SIGNAL SQLSTATE '12345'
        SET MESSAGE_TEXT = 'Username must have at least one numeric character';
    END IF;
END$$

CREATE TRIGGER test_dob_before_insert BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NOT ((YEAR(CURRENT_DATE) - YEAR(NEW.dob) > 16) OR ((YEAR(CURRENT_DATE) - YEAR(NEW.dob)) = 16 AND ((MONTH(CURRENT_DATE) > MONTH(NEW.dob)) OR ((MONTH(CURRENT_DATE) = MONTH(NEW.dob)) AND (DAY(CURRENT_DATE) >= DAY(NEW.dob) ))))) THEN
        SIGNAL SQLSTATE '12345'
        SET MESSAGE_TEXT = 'The minimum age to participate is 16 years';
    END IF;
END$$

DELIMITER ;

CREATE TABLE Drivers( DriverID int AUTO_INCREMENT PRIMARY KEY, 
	Name varchar(20),
	Tot_Points int(3),
	Cost decimal,
	CONSTRAINT check_cost CHECK (Cost BETWEEN 0 AND 20));

ALTER TABLE Drivers
ADD Week_Points int(3) DEFAULT 0;

ALTER TABLE Drivers
MODIFY Cost float;

DELIMITER $$
CREATE TRIGGER test_cost_insert BEFORE INSERT ON Drivers
FOR EACH ROW
BEGIN
	IF NEW.Cost NOT BETWEEN 0 AND 20 THEN
		SIGNAL SQLSTATE '12345'
		SET MESSAGE_TEXT = 'Driver Cost must be between 0 and 20.';
	END IF;
END$$
DELIMITER ;

INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Lewis Hamilton",314,30.6);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Sebastian Vettel",285,28.7);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Kimi Raikkonen",252,19.3);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Daniel Ricciardo",207,26.0);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Valtteri Bottas",186,26.3);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Max Verstappen",153,21.9); 
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Fernando Alonso",107,14.1);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Stoffel Vandoorne",40,6.6);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Nico Hulkenburg",84,12.5);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Carlos Sainz",111,12.1);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Esteban Ocon",96,10.8);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Sergio Perez",64,9.9);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Kevin Magnussen",100,7.5);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Romain Grosjean",34,5.8);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Charles LeClerc",77,6.2);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Marcus Ericsson",26,5.5);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Pierre Gasly",48,7.0);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Brendon Hartley",39,6.1);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Sergey Sirotkin",21,5.1);
INSERT INTO Drivers (Name,Tot_Points,Cost) VALUES("Lance Stroll",30,5.3);



CREATE TABLE Teams (TeamID int AUTO_INCREMENT PRIMARY KEY, 
        total_points int, 
        weekly_score int,
        driver1 int,
        driver2 int, 
        driver3 int,
        driver4 int,
        driver5 int,
        league_id1 int DEFAULT NULL,
        league_id2 int DEFAULT NULL,
        league_id3 int DEFAULT NULL, 
        FOREIGN KEY d1 (driver1) REFERENCES Drivers(DriverID),
        FOREIGN KEY d2 (driver2) REFERENCES Drivers(DriverID),
        FOREIGN KEY d3 (driver3) REFERENCES Drivers(DriverID),
        FOREIGN KEY d4 (driver4) REFERENCES Drivers(DriverID),
        FOREIGN KEY d5 (driver5) REFERENCES Drivers(DriverID),
        FOREIGN KEY l1 (league_id1) REFERENCES Leagues(LeagueID),
        FOREIGN KEY l2 (league_id2) REFERENCES Leagues(LeagueID),
        FOREIGN KEY l3 (league_id3) REFERENCES Leagues(LeagueID));

CREATE TABLE Leagues (LeagueID int AUTO_INCREMENT PRIMARY KEY,
        Type boolean);


Command for calculating the weely points of each team 
select SUM(b.Tot_points) as Sum, a.TeamID from Teams a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) GROUP BY a.TeamID;
