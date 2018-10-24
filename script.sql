CREATE USER 'k1ng'@'localhost' IDENTIFIED BY 'kyrgios';

GRANT ALL PRIVILEGES ON * . * TO 'k1ng'@'localhost';


CREATE DATABASE fantasyone;

use fantasyone;

CREATE TABLE users (username varchar(15) PRIMARY KEY,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) DEFAULT NULL, 
    email_id varchar(30), 
    password varchar(255) NOT NULL,
    dob date,
    UNIQUE(email_id),
    team1 int,
    team2 int,
    team3 int,EXIT
    FOREIGN KEY t1 (team1) REFERENCES Teams(TeamID) ON DELETE SET NULL, 
    FOREIGN KEY t2 (team2) REFERENCES Teams(TeamID) ON DELETE SET NULL,
    FOREIGN KEY t3 (team3) REFERENCES Teams(TeamID) ON DELETE SET NULL,
    CONSTRAINT check_userid CHECK ( userid like '%[^0-9]%' ),
    CONSTRAINT check_email CHECK (email_id like '%_@__%.__%'),
    CONSTRAINT check_age CHECK (((YEAR(CURRENT_DATE) - YEAR(dob) = 16) AND (MONTH(CURRENT_DATE)  >= MONTH(dob)) AND (DAY(CURRENT_DATE) >= DAY(dob))) OR (YEAR(CURRENT_DATE) - YEAR(dob) > 16)));


CREATE TABLE Drivers( DriverID int AUTO_INCREMENT PRIMARY KEY, 
	Name varchar(20),
	Tot_Points int(3),
	Cost decimal,
	CONSTRAINT check_cost CHECK (Cost BETWEEN 0 AND 30));

ALTER TABLE Drivers
ADD Week_Points int(3) DEFAULT 0;

ALTER TABLE Drivers
MODIFY Cost float;

New way of creating teams:
CREATE TABLE Teams (TeamID int AUTO_INCREMENT PRIMARY KEY, 
        total_points int DEFAULT 0, 
        weekly_score int DEFAULT 0,
        team_value int DEFAULT 0,
        team_name varchar(20));

CREATE TABLE Leagues (LeagueID int AUTO_INCREMENT PRIMARY KEY,
        Type boolean DEFAULT NULL);

Creating table that links teams and drivers:
CREATE TABLE Team_Driver_Link (team_id int,
        driver_id int,
        FOREIGN KEY driver (driver_id) REFERENCES Drivers(DriverID) ON DELETE SET NULL,
        FOREIGN KEY team (team_id) REFERENCES Teams(TeamID) ON DELETE SET NULL);

Creating table that links teams and leagues:
CREATE TABLE Team_League_Link (team_id int,
        league_id int,
        FOREIGN KEY league (league_id) REFERENCES Leagues(LeagueID) ON DELETE SET NULL,
        FOREIGN KEY team (team_id) REFERENCES Teams(TeamID) ON DELETE SET NULL);


DELIMITER $$
CREATE TRIGGER test_cost_insert BEFORE INSERT ON Drivers
FOR EACH ROW
BEGIN
    IF NEW.Cost NOT BETWEEN 0 AND 30 THEN
        SIGNAL SQLSTATE '12345'
        SET MESSAGE_TEXT = 'Driver Cost must be between 0 and 30.';
        END IF;
END$$

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

UPDATE Drivers
SET Week_Points = 35 where DriverID = 1;
UPDATE Drivers
SET Week_Points = 17 where DriverID = 2;
UPDATE Drivers
SET Week_Points = 23 where DriverID = 3;
UPDATE Drivers
SET Week_Points = 33 where DriverID = 4;
UPDATE Drivers
SET Week_Points = 28 where DriverID = 5;
UPDATE Drivers
SET Week_Points = 10 where DriverID = 6;
UPDATE Drivers
SET Week_Points = 13 where DriverID = 7;
UPDATE Drivers
SET Week_Points = 18 where DriverID = 8;
UPDATE Drivers
SET Week_Points = 22 where DriverID = 9;
UPDATE Drivers
SET Week_Points = 37 where DriverID = 10;
UPDATE Drivers
SET Week_Points = 30 where DriverID = 11;
UPDATE Drivers
SET Week_Points = 12 where DriverID = 12;
UPDATE Drivers
SET Week_Points = -2 where DriverID = 13;
UPDATE Drivers
SET Week_Points = 9 where DriverID = 14;
UPDATE Drivers
SET Week_Points = -6 where DriverID = 15;
UPDATE Drivers
SET Week_Points = 14 where DriverID = 16;
UPDATE Drivers
SET Week_Points = 26 where DriverID = 17;
UPDATE Drivers
SET Week_Points = 26 where DriverID = 18;
UPDATE Drivers
SET Week_Points = 22 where DriverID = 19;
UPDATE Drivers
SET Week_Points = 13 where DriverID = 20;







inserting into Teams:
insert into Teams (driver1, driver2, driver3, driver4, driver5) VALUES(1,2,3,4,5);

inserting into Leagues:
insert into Leagues (Type) VALUES(1);
1 - Classic
0 - H2H

OLD - 
****
Displaying the total particpants in a league for a given league ID:
select COUNT(*) from Teams where league_id1 = OR league_id2 = OR league_id3 = ;

Command for calculating the weekly points of each team 
select SUM(b.Tot_points) as Sum, a.TeamID from Teams a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) GROUP BY a.TeamID;

select SUM(b.Week_Points) as Team_Weekly_Score, a.TeamID from Teams a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) GROUP BY a.TeamID;

select SUM(b.Week_Points) as Team_Weekly_Score into tmp_score from Teams a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) GROUP BY a.TeamID;

UPDATE  Teams set weekly_score = (select SUM(b.Week_Points) as Team_Weekly_Score from (select * from Teams) as a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) AND a.TeamID = Teams.TeamID);
****
NEW
UPDATING TEAM WEEKLY POINTS
select a.team_id, sum(b.Week_Points) as Team_Weekly_Score from Team_Driver_Link a, Drivers b WHERE (a.driver_id = b.DriverID) GROUP BY a.team_id;
UPDATE  Teams set weekly_score = (select SUM(b.Week_Points) as Team_Weekly_Score from Team_Driver_Link a, Drivers b WHERE (a.driver_id= b.DriverID) AND a.team_id = Teams.TeamID);

UPDATING TEAM VAL
UPDATE  Teams set team_value = (select SUM(b.Cost) as Team_Weekly_Score from Team_Driver_Link a, Drivers b WHERE (a.driver= b.DriverID) AND a.TeamID = Teams.TeamID);

To insert a team into a league or a driver into a team, update the Team_League_Link or Team_Driver_Link table






Command for Updating the value a team on a weekly basis
UPDATE  Teams set Team_Value = (select SUM(b.Cost) as Team_Weekly_Score from (select * from Teams) as a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) AND a.TeamID = Teams.TeamID);


select * from Teams into tmp_score WHERE 1=0;

Command for calculating the team value:
select SUM(b.Cost) as Sum, a.TeamID from Teams a, Drivers b WHERE (a.driver1 = b.DriverID OR a.driver2 = b.DriverID OR a.driver3 = b.DriverID or a.driver4 = b.DriverID or a.driver5 = b.DriverID) GROUP BY a.TeamID;

Leader board for a league:
select a.TeamID, a.total_points, a.weekly_score, b.LeagueID from Teams a, Leagues b where a.league_id1 = b.LeagueID order by a.total_points desc;

Calculating the number of teams in a league:
OLD:
select COUNT(a.TeamID) as League_Count, b.LeagueID from Teams a, Leagues b where a.league_id1 = b.LeagueID GROUP BY LeagueID;

NEW:
select COUNT(a.team_id) as league_count , b.LeagueID from Team_League_Link a, Leagues b where a.league_id = b.LeagueID GROUP BY LeagueID;


Leader board for a league:
OLD:
select a.TeamID, a.total_points, a.weekly_score, b.LeagueID from Teams a, Leagues b where a.league_id1 = b.LeagueID order by a.total_points desc;
NEW:
select a.TeamID, a.weekly_score from Teams a, Team_League_Link b where b.league_id = 1 order by a.weekly_score desc;

Ranking all the leagues:
OLD
select SUM(a.total_points) as Sum, b.LeagueID from Teams a, Leagues b where a.league_id1 = b.LeagueID AND b.Type = 1 GROUP BY b.LeagueID ;
(only for Classic Leagues)

NEW:
select SUM(a.total_points) as Sum, b.LeagueID from (select a.TeamID, a.total_points, b.league_id from Teams a, Team_League_Link b where a.TeamID = b.team_id) as a, Leagues b where a.league_id = b.LeagueID and b.Type = 1 GROUP BY b.LeagueID;e

Ordering drivers by their Cost:
select * from Drivers
ORDER BY Cost DESC;

Ordering drivers by their First Name:
select * from Drivers
ORDER BY first_name;

Ordering drivers by Last Name:
select * from Drivers
ORDER BY last_name;

Viewing drivers in a certain price range(Below 10 for example):
select * from Drivers
where Cost < 10;

Updating Driver Total Points after Admin has Updated Weekly Points:
UPDATE Drivers 
SET Tot_Points = Tot_Points + Week_Points;

Admin command for updating Driver Weekly weekly_score(35 is the score for example):
UPDATE Drivers
SET Week_Points = 35 where DriverID = 1;


Updating Team Total Points after Admin has Updated Weekly Points:
UPDATE Teams 
SET total_points = total_points + weekly_score;


Viewing the top 100 teams:

select * from Teams
ORDER BY total_points DESC
LIMIT 1, 100;

Creating admin TABLE
CREATE TABLE administrator (username varchar(20), pass varchar(100));

create table criteria
 ( 
  week_no int,
  driverid int, 
  race_points int,
  quali_points int,
  overtakes int, 
  beat_team_race tinyint,
  beat_team_quali tinyint,
  week_points int,
  FOREIGN KEY driver_criteria(driverid) REFERENCES Drivers(DriverID)
  );


alter table Drivers drop column Week_Points;

alter table Drivers alter Tot_Points set default 0;

alter table Drivers add column img varchar(30);

 update Drivers set img = "/driver-img/hamilton.jpg" where DriverID =1;

 update Drivers set img = "/driver-img/vettel.jpg" where DriverID =2;

 update Drivers set img = "/driver-img/vettel.jpg" where DriverID =2;

 update Drivers set img = "/driver-img/kimi.jpg" whereDriverID =3;

 update Drivers set img = "/driver-img/ricciardo.jpCREATE TABLE Teamsg" where DriverID =4;
CREATE TABLE Teams
CREATE TABLE Teams
 update Drivers set img = "/driver-img/bottas.jpg" CREATE TABLE Teamswhere DriverID =5;
CREATE TABLE Teams
CREATE TABLE Teams
 update Drivers set img = "/driver-img/verstappen.jCREATE TABLE Teamspg"where DriverID =5;
CREATE TABLE Teams
CREATE TABLE Teams
 update Drivers set img = "/driver-img/verstappen.jCREATE TABLE Teamspg"where DriverID =6;
CREATE TABLE Teams
CREATE TABLE Teams
 update Drivers set img = "/driver-img/bottas.jpg" CREATE TABLE Teamswhere DriverID =5;
CREATE TABLE Teams


 update Drivers set img = "/driver-img/alonso.jpg" where DriverID =7;


 update Drivers set img = "/driver-img/vandoorne.jpg" where DriverID =8;


 update Drivers set img = "/driver-img/hulkenburg.jpg"where DriverID =9;


 update Drivers set img = "/driver-img/carlos-sainz.jpg" where DriverID =10;



update Drivers set img = "/driver-img/ocon.jpg" where DriverID =11;



 update Drivers set img = "/driver-img/perez.jpg" where DriverID =12;



 update Drivers set img = "/driver-img/magnussen.jpg" where DriverID =13;


 update Drivers set img = "/driver-img/grosjean.jpg" where DriverID =14;

 update Drivers set img = "/driver-img/leclerc.jpg" where DriverID =15;


 update Drivers set img = "/driver-img/gasly.jpg" where DriverID =16;


 update Drivers set img = "/driver-img/ericsson.jpg" where DriverID =16;


 update Drivers set img = "/driver-img/gasly.jpg" where DriverID =17;


 update Drivers set img = "/driver-img/hartley.jpg" where DriverID =18;


 update Drivers set img = "/driver-img/sirotkin.jpg" where DriverID =19;


 update Drivers set img = "/driver-img/stroll.jpg" where DriverID =20;


alter table Teams add unique(team_name);


alter table Teams add column user_name varchar(30);

alter table Drivers add column constructor varchar(30);

update Drivers set constructor = "Petronas Mercedes-AMG" where Name = "Valtteri Bottas";

update Drivers set constructor = "Petronas Mercedes-AMG" where Name = "Lewis Hamilton";

update Drivers set constructor = "Scuderia Ferrari" where Name = "Kimi Raikkonen";


update Drivers set constructor = "Scuderia Ferrari" where Name = "Sebastian Vettel";

update Drivers set constructor = "Aston Martin Red Bull Racing" where Name = "Max Verstappen";


update Drivers set constructor = "Aston Martin Red Bull Racing" where Name = "Daniel Ricciardo";

update Drivers set constructor = "Racing Point Force India" where Name = "Sergio Perez";


update Drivers set constructor = "Racing Point Force India" where Name = "Esteban Ocon";


update Drivers set constructor = "Renault F1 Racing" where Name = "Carlos Sainz";


update Drivers set constructor = "Renault F1 Racing" where Name = "Nico Hulkenburg";


update Drivers set constructor = "Haas F1 Racing" where Name = "Kevin Magnussen";



update Drivers set constructor = "McLaren Renault" where Name = "Stoffel Vandoorne";


update Drivers set constructor = "McLaren Renault" where Name = "Fernando Alonso";


update Drivers set constructor = "Scuderia Toro Rosso" where Name = "Fernando Alonso";

update Drivers set constructor = "McLaren Renault" where Name = "Fernando Alonso";


update Drivers set constructor = "Scuderia Toro Rosso" where Name = "Brendon Hartley";


update Drivers set constructor = "Scuderia Toro Rosso" where Name = "Pierre Gasly";


update Drivers set constructor = "Sauber" where Name = "Marcus Ericsson";


update Drivers set constructor = "Sauber" where Name = "Charles LeClerc";


update Drivers set constructor = "Williams" where Name = "Sergey Sirotkin";


update Drivers set constructor = "Williams" where Name = "Lance Stroll";

update Drivers set constructor = "Haas F1 Racing" where Name = "Romain Grosjean";

create table Team_Weekly_Points(WeekNo int,  TeamID int, WeeklyPoints int, FOREIGN KEY (TeamID) REFERENCES Teams.TeamID);

Getting a teams weekly score given teamID and week number:
select SUM(week_points) as team_weekly_score from Team_Driver_Link a, criteria b where a.team_id = 34 AND a.driver_id  = b.driverid and b.week_no =1;

Ensuring there is only 1 criteria table entry per week for each driver
alter table criteria add constraint UNIQUE(week_no,driverid);