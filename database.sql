drop table users;

create table users(
	userID int identity primary key,
	username varchar(30),
	password varchar(30),
);

create table sprint(
	sprintID int identity primary key,
	sprintName varchar(30),
);

create table project(
	projectID int identity primary key,
	sprintID int references sprint(sprintID),
);

create table comments(
	commentID int identity primary key,
	comment varchar(30),
);

create table status(
	statusID int identity primary key,
	statusName varchar(30),
);

create table issue(
	issueID int identity primary key,
	issueType varchar(30),
	issueName varchar(30),
	issueDescription varchar(30),
	updatedAt datetime,
	createdAt datetime,
	statusID int references status(statusID),
	sprintID int references sprint(sprintID),
	createdBy int references users(userID),
	assignee int references users(userID),
	tasks int references issue(issueID),
	comments int references comments(commentID),
);


insert into users(username, password) values('akos','admin');


insert into status(statusName) values('New');
insert into status(statusName) values('In Progress');
insert into status(statusName) values('Feedback');
insert into status(statusName) values('Rework');
insert into status(statusName) values('Resolved');
insert into status(statusName) values('Ready for Testing');

