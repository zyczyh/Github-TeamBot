## First Iteration
### Story Creation and Assignment
![image](https://media.github.ncsu.edu/user/10593/files/6b7fcb00-ff04-11e9-832d-648322b2337c)
![image](https://media.github.ncsu.edu/user/10593/files/789cba00-ff04-11e9-89c0-6ddd0e756ce9)
![image](https://media.github.ncsu.edu/user/10593/files/82beb880-ff04-11e9-8a57-59d21fff554f)
![image](https://media.github.ncsu.edu/user/10593/files/894d3000-ff04-11e9-95c7-f854b396a0fa)

### Scrum Meeting Notes
#### Oct 25
- Discuss tasks and setup kanban board

  The main task now is some modules related to databases, including to design database schemas, create databases and connect to database from the teambot server.

  We need to put all configuration fields to a conifg file so that it's easy to change and deploy, like mattermost inhook link, some tokens and hostname. Next we should deploy both mattermost server and teambot to Heroku for testing.

  We are starting to develop some modules to fetch data from github by API, then process the data and store them into database. In the first iteration, we could implement some functions to call API.

  The report pages are simple. We need to add more contents to enrich it.

- Assign tasks to members

  Details in [github Kanban board](https://github.ncsu.edu/csc510-fall2019/CSC510-19/projects/1).

#### Oct 26
Hold a meeting to discuss database schemas and reports details.
![273778736](https://media.github.ncsu.edu/user/10593/files/9842db00-ff22-11e9-92f8-b972e58e2d23)

#### Oct 28
- Hao: The teambot is deployed on Heroku and the database is setup. Next I will create tables and make some fake data for tests.
- Cheng:
- Yanchen:
- Werngran:
- Xiaohan: 

#### Oct 30
- Hao: Tables are created as the schemas describe. Several records are inserted for tests. I will focus on optimizing the interaction with mattermost next.
- Cheng:
- Yanchen:
- Werngran:
- Xiaohan: 

### Iteration Review
  Most work on databases are done. Both teambot and mattermost servers are deployed on Heroku so that it can be tested easily for all members and be demoed to others. Optimization on configuration and interaction with mattermost are finished.

  Fetching data from github and pretty the front-end are incomplete because some functions of teambot can't find corresponding APIs on github, we are still doing research to see how to implement these features.

The Kanban board status is as follow:
![image](https://media.github.ncsu.edu/user/10593/files/caedd300-ff24-11e9-82c1-618640e0ff0c)


## Second Iteration
### Story Creation and Assignment



### Scrum Meeting Notes



### Iteration Review
