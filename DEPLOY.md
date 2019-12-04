# DEPLOY

## Deployment scripts and screencast (25%)

We use ansible script to deploy the app. The [script](./deploy/deploy.yml) is in deploy folder.

Screencast:
https://drive.google.com/file/d/1jBiNAFFLwdkrFCLvEJcPAbH-U8dfz00H/view?usp=sharing

## Acceptance testing (40%)

### TA Account Credentials:
login: **mngr1**  
password: **1234qwer**  
Token: **64c541d6d9a692b126ecb75067ee8d29258a6c86**  
Organization: **510-test**  


### Deploy Milestone Acceptance Test Instructions for TAs
**Note: Please always mention the teambot first when you interact with it. Also, please always send your message in the public channel.**  

#### Use Case 1: Creating a Monitor
0. Open Mattermost [here](https://csc510-mattermost-19.herokuapp.com/
)

1. In the public channel Town Square, send a message to the teambot to initialize a monitor. Please mention the teambot first and include key words such as “create”, “set up”, “monitor”, “github”.  
> Example command: @teambot create  

2. The teambot then will reply to confirm your request to create the monitor. Simply type “yes”.  
> Example command: @teambot yes  

3. You should receive a direct message from the teambot now with an authentication link. Click the link and fill out the organization name and token. Go ahead and submit it.(Notice: token first!)  
In order to verify your identify, the teambot will send you another message asking for your github username. Reply with your username beginning with a “@” in the public Town Square. The teambot will respond to indicate whether the username you provided is valid.  
> Example command: @teambot @cyuan7 

#### Use Case 2: Getting Weekly Report As Manager
1. The weekly report has been scheduled to be sent out on a weekly basis(Every Friday ). For test purpose, we have set up a simulator that triggers the task of sending reports to all members upon clicking the "submit" button. Go to 
https://csc510-19.herokuapp.com/test/mission-trigger to trigger the bot to send weekly reports to all users.
  
2. Back to Mattermost. You will receive a direct message. The message includes a 'baby report', which gives a glance of your report of the current week and a **link** to a more detailed and interactable weekly report.
  
3. For managers, your report shows not only the progress of the whole team but also how each team member is doing so that you can track their progress.
  
4. You can @teambot and ask for the information you need (statistics of commits/lines of code/pull requests). If teambot can't understand your query, he will responds you a specific query format guiding you to correctly interact with him and get the information you need.  
If you are not the team manager, you can't query other team members' statistics (managers have different query format with other members).
To get the full report that covers everything, simply @teambot and say "Send me my report".

> Example command:@teambot {"type": "pull request", "from": "2019-11-01T10:26:00.996Z", "to": "2019-12-03T10:26:00.996Z", "username":  "mngr1"}
> Example command: @teambot {"type": "commit", "from": "2019-11-01T10:26:00.996Z", "to": "2019-12-03T10:26:00.996Z", "username":  "mngr1"}
> Example command: @teambot {"type": "lines of code", "from": "2019-11-01T10:26:00.996Z", "to": "2019-12-03T10:26:00.996Z", "username":  "mngr1"}

#### Use Case 3: Getting Weekly Report As User
Since team member’s Mattermost message is basically the same as managers, we will simply provide you a link to checkout user reports: [click_here](https://csc510-19.herokuapp.com/user-report/xliu74/2019-10-22) so that you don’t have to log out and relog in as a team member. 
Because we care about your privacy, only you and your manager are able to view your report. That being said, you cannot request to see others' report either.


## Exploratory Testing and Code Inspection (30%)  
Nothing to submit here.  
  
## Bonus: Continuous Integration Service (20%)
We set up the Jenkins server on the virtual machine and set up a build process. The [build log](./deploy/jenkins.log) is in deploy folder. Other helper scripts are also in the folder.

We don't add a trigger for the project when a commit is pushed because our Jenkins server is on virtual machine and it doesn't have a public ip or url that github can use as a callback url.
