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