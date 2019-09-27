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

### Guidelines

### Design Patterns