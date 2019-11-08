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
- Yanchen: Looked at the code and thought about how to refactor the credentials management part.
- Werngran:
- Xiaohan: Researched how the interaction with teambot can be further improved.

#### Oct 30
- Hao: Tables are created as the schemas describe. Several records are inserted for tests. I will focus on optimizing the interaction with mattermost next.
- Cheng:
- Yanchen: Finished refactoring the credentials management part and create a json file to store credentials.
- Wengran:
- Xiaohan: Set up slash commands on mattermost to enable more features. I will attach interactive messaging buttons to optimize the interaction so that users don't have to post anything in public channel. 

### Iteration Review
  Most work on databases are done. Both teambot and mattermost servers are deployed on Heroku so that it can be tested easily for all members and be demoed to others. Optimization on configuration and interaction with mattermost are finished.

  Fetching data from github and pretty the front-end are incomplete because some functions of teambot can't find corresponding APIs on github, we are still doing research to see how to implement these features.

The Kanban board status is as follow:
![image](https://media.github.ncsu.edu/user/10593/files/caedd300-ff24-11e9-82c1-618640e0ff0c)


## Second Iteration
### Story Creation and Assignment
![image](https://media.github.ncsu.edu/user/14814/files/2aa1f200-0235-11ea-8977-b2a708f55499)
![image](https://media.github.ncsu.edu/user/14814/files/2d044c00-0235-11ea-9a74-6c27ad265bbf)
![image](https://media.github.ncsu.edu/user/14814/files/2e357900-0235-11ea-839d-bb80d83ad762)


### Scrum Meeting Notes
![Screen Shot 2019-11-08 at 11 02 39 AM](https://media.github.ncsu.edu/user/9463/files/8fe7ea00-0219-11ea-9cbb-2bd50633d117)
![Screen Shot 2019-11-08 at 11 02 50 AM](https://media.github.ncsu.edu/user/9463/files/8fe7ea00-0219-11ea-9bcc-b4192d2ad5b9)
![Screen Shot 2019-11-08 at 11 02 55 AM](https://media.github.ncsu.edu/user/9463/files/8fe7ea00-0219-11ea-9f68-2ad9d51bb6a9)
![Screen Shot 2019-11-08 at 11 03 04 AM](https://media.github.ncsu.edu/user/9463/files/8fe7ea00-0219-11ea-8a9f-05c112601ec1)
![Screen Shot 2019-11-08 at 11 03 23 AM](https://media.github.ncsu.edu/user/9463/files/90808080-0219-11ea-868b-dacba8ca6a51)
![Screen Shot 2019-11-08 at 11 03 29 AM](https://media.github.ncsu.edu/user/9463/files/91191700-0219-11ea-9f51-72db309b01be)

#### Nov 3
- Hao: 
- Cheng:
- Yanchen: Learnt how to use node.js mysql library, thought about and wrote down some design ideas for my task. 
- Werngran:
- Xiaohan: Accessed data from the front end and saved them to the database.
#### Nov 7
- Hao: 
- Cheng:
- Yanchen: Finished writing and testing my task (Get/process statics from Github and store them into DB).
- Werngran:
- Xiaohan: Wrote up functions to fetch github info of users (membership, role, etc.) so that the teambot can access to the real data.

### Iteration Review
  In this iteration, we were focusing on fetching data from github, processing the data to get information we are interested in, and building up our database. Using the past 2 months' data of the team, we have demonstrated a bunch of github statistics on the front-end, including the number of commits, the number of pull requests, the number of addtions and deletions of code, and etc.. 
  
  
  We are not only interested in the presentation of the teams' dynamics, but also how such presentation might impact the teams' future actions, so we have also added red flags and other concerning information to the team front-end.

Our Kanban board at this point:
![image](https://media.github.ncsu.edu/user/14814/files/9e43ff00-0235-11ea-98b6-7cf11efaf6d4)
