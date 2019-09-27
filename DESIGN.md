# Team Bot Design

## Problem Statement

In today’s world of software engineering, we need a huge amount of teamwork. Team members collaborate to various different extents: sometimes the collaboration is extremely effective: high-performing teams usually include active and responsible team members, who kept committing codes, helping other team members, and pay attention to what’s going on in the entire team. While each member completes separated and related goals; they share responsibility between different members of the team. On the other hand, ineffective or low-performing team collaboration usually entails one team member taking over the entire team project, or the team members all focus on his or her own codes, without maintaining the updates within the entire team. Or that the team doesn’t start working until the last minute Teamwork is usually managed by having a project manager observing, supervising and helping the entire team. However, subtle changes are neglectable(For example, less and less commits along the time the project goes), but might still be chronically detrimental to the entire team’s performance and dynamics. 

We believe this phenomenon can be attributed to the isolation between the “workflow management” and “coding” part of the teamwork - while team members focusing on their local part of the project, it is easy to neglect the social and collaborative part of the teamwork, as well as a global viewpoint of the team, causing inconvenience and inefficiency in teams. 

## Bot Description

Our bot is a TeamBot that serves as a mediator between the workflow management, the coding updates; and the communication and information sharing of the entire team. It is a good solution to our problem because it adds a global viewpoint to the team: it presents its automatic detection of the teams’ changes and status, as well as different team members’ performances. This bot performs three kinds of different actions: 
1. Detect an unproductive or dangerous action of team members and raise it to the team member or the manager: for example, when the team has a very little amount of commits during the week; or a few team members were not committing actively; or one of the team members has been constantly force push his or her commits. 
2. TeamBot detects problematic team dynamics: For example, one team member doing all the work; or the team doesn’t do any work until the deadline. 
3. It provides weekly summaries. The weekly summaries would include time-wise data comparison, in terms of the current team performance as a comparison to its previous performances - number of commits, lines of code, etc.

We present TeamBot as a kind of Chat-Dev Bot. While it is not categorized as either “code drone” or “documentation bot”, we design the bot to not only include various kinds of actions, but also delivers the most “human” information to the team members. The Teambot acts as the mediator that facilitates the team members to overlook the entire dynamic of the team. It posts team updates through MatterMost through its own channel, so the programmers can easily track and review the history of the code updates. We would tagline our bot as “Friendly and Convenient Chat-Dev Bot that manages the dynamics of the team”.

## Use Cases

## Design Sketches

### Wireframe Mockup

1.  Team manager create github monitor on Mattermost

![Mockup1](https://media.github.ncsu.edu/user/10692/files/b35a4800-e137-11e9-95d2-713f93d59b55)

2.  Team manager set up Github organization on set up page

![Mockup2](https://media.github.ncsu.edu/user/10692/files/b35a4800-e137-11e9-8943-4c95023f0aa3)

3.  TeamBot send weekly report to good performance team member

![Mockup3](https://media.github.ncsu.edu/user/10692/files/b35a4800-e137-11e9-8b40-33cd9a34e420)

4.  Detailed weekly report for good performance team member

![Mockup4](https://media.github.ncsu.edu/user/10692/files/b35a4800-e137-11e9-8ca1-0a2a062e670e)

5.  TeamBot send weekly report to bad performance team member

![Mockup5](https://media.github.ncsu.edu/user/10692/files/b35a4800-e137-11e9-98e2-5871ea1468dd)

6.  Detailed weekly report for bad performance team member

![Mockup6](https://media.github.ncsu.edu/user/10692/files/b3f2de80-e137-11e9-99be-1285fc53723d)

7.  TeamBot send team weekly report to team manager

![Mockup7](https://media.github.ncsu.edu/user/10692/files/b3f2de80-e137-11e9-8756-3c6cd5c7f21d)

8.  Detailed team weekly report for team manager

![Mockup8](https://media.github.ncsu.edu/user/10692/files/b3f2de80-e137-11e9-9ff6-6307eebd90a3)

## Architecture Design

### Architecture Components
The Team Bot is composed of five entities. The bot architecture is as follow:

![TeamBot_Arch](https://media.github.ncsu.edu/user/10593/files/cd514780-e0b1-11e9-86b4-87f5b7e5aa90)

The front-end has two parts: a chat bot in mattermost and a website. Users can interactive with the bot through mattermost to initialize the bot and check users' status and reports. Besides summary messages are shown on mattermost, a link will be attached in the mattermost message for reports' details. Users can visit the link to check complete reports and do some settings.

The back-end also has two parts: the bot process and a database. The bot process is the core part of this application. It will handle all requests from front-end and control the data flows from github and database. It has three main modules: the first one is to process all requests and requires as a web server, the second is to catch demanded data and store them to database, and the third is some cron jobs to generate reports, including text and charts. Another part in the back-end is database. It's for saving all data so that we can compare the progress of two weeks or even longer. Also, the authorization for github should be storaged in the database.

The back-end are based on NodeJS and MySQL and deployed on a Linux server.

Github as third service is necessary for team bot. It's the data source and github APIs are required. A github account and organization are necessary for using team bot.

The following sequence diagram simply dipicts interaction between the objects mentioned above in a sequential order.

![TeamBot_Sequence](https://media.github.ncsu.edu/user/10593/files/cde9de00-e0b1-11e9-8c02-96c9c0383149)

As we know the different objects and services should have different lifelines in the software. In the team bot, when a bot is initialized, each part should be actived so that it can run successfully. That's why all parts start at the same time.

### Contraints  
1. 	The bot should provide proper messages to users when errors occur. E.g. When the monitored repo is deleted, the bot should notify the user.
2. 	The bot should include role control: only the manager could get access to report of the whole team, other employees can only see his/her own report.
3. 	All data used to generate weekly reports should only be obtained from database, in order to decouple git and website.
4. 	The URL provide to user should be use REST API

### Guidelines  

1. 	The bot should decouple website end, git end and user end. In order to easily adapt when requirements change, or new features are needed.
2. 	The whole project is based on Node.js, using MySQL as a persistence layer to store GitHub repository data. Use REST API to communicate inside the bot and provide information to users.

### Design Patterns  

1. 	Singleton Pattern, 
For one GitHub organization, there should be only one manager. Using singleton pattern could make sure at any time, there is only one manager in any particular GitHub organization.
![](https://media.github.ncsu.edu/user/10626/files/e78d2480-e0b5-11e9-8d3d-e1bd2a0b213d)
2. 	Factory Pattern，
The report for manager, well performed and poor performed employee should be similar, so the report could generate from a template. By using factory pattern, the backend of TeamBot doesn’t need to care about the logic of creating the report, just provide the information needed, and the report can generated from it. 
![](https://media.github.ncsu.edu/user/10626/files/e78d2480-e0b5-11e9-9109-6e7dc6d9af3f)
3. 	MVC Pattern
The development follows MVC architecture to provide testability, maintainability and scalability to the project.
By decoupling frontend, backend and model, it’s easy to change any part of the project, and allowing for code reuse and parallel development.
![](https://media.github.ncsu.edu/user/10626/files/e78d2480-e0b5-11e9-8a2a-3aea056d6428)
