# DEPLOY

## Deployment scripts and screencast (25%)

We use ansible script to deploy the app. The [script](./deploy/deploy.yml) is in deploy folder.

Screencast:
https://drive.google.com/file/d/1jBiNAFFLwdkrFCLvEJcPAbH-U8dfz00H/view?usp=sharing

## Acceptance testing (40%)

### TA Account Credentials:
login: **mngr1**  
password: **1234qwer**  
Organization: **510-test**  
Token: **64c541d6d9a692b126ecb75067ee8d29258a6c86**  

### Deploy Milestone Acceptance Test Instructions for TAs
**Note: Please always mention the teambot first when you interact with it. Also, please always send your message in the public channel.**  

#### Use Case 1: Creating a Monitor
1. In the public channel Town Square, send a message to the teambot to initialize a monitor. Please mention the teambot first and include key words such as “create”, “set up”, “monitor”, “github”.  
> Example command: @teambot create  

2. The teambot then will reply to confirm your request to create the monitor. Simply type “yes”.  
> Example command: @teambot yes  

3. You should receive a direct message from the teambot now with an authentication link. Click the link and fill out the organization name and token. Go ahead and submit it.  
In order to verify your identify, the teambot will send you another message asking for your github username. Reply with your username beginning with a “@” in the public Town Square. The teambot will respond to indicate whether the username you provided is valid.  
> Example command: @teambot @your_github_username  

#### Use Case 2: Getting Weekly Report As Manager
1. The weekly report has been scheduled to be sent out on a weekly basis(Every Friday ). For test purpose, we have set up a simulator that triggers the task of sending reports to all members upon clicking the “submit” button. Go to 
“https://csc510-19.herokuapp.com/test/mission-trigger” to trigger the bot sends weekly reports to all users.
  
2. Back to Mattermost. You will receive a direct message. The message include what we called ‘baby report’, which show a glance of your report of this week, and a link to a more detailed and interactable weekly report.
  
3. For managers, your report shows not only the progress of the whole team, but you can also take a look into each team members and track their progress.
  
4. You can @teambot and ask for the information you need(statistics about commits/lines of code/PR), if teambot can't understand your query, he will send you a specific query format, just follow it and you can get what you need from teambot's response. 
If you are not team manager, you can't query other team members statistics(managers have different query format with other members).
If you can't get what you want, you can @teambot and say "Send me my report", then you can get your report link and look up the information you need.

#### Use Case 3: Getting Weekly Report As User
Since team member’s Mattermost message is basically the same as managers, we will simply provide you a link to checkout user reports: [click_here](https://csc510-mattermost-19.herokuapp.com/user-report/cyuan7/2019-10-22), so you don’t have to log out and relog in as a team member.  
As normal team members, we care about yours and others' privacy, so you can only check out your own information in your report.


## Exploratory Testing and Code Inspection (30%)  
Nothing to submit here.  
  
## Bonus: Continuous Integration Service (20%)
We setup the jenkins server on the virtual machine and setup a build process. The [build log](./deploy/jenkins.log) is in deploy folder. Other helper scripts are also in the folder.

We don't add a trigger for the project when a commit is pushed because our jenkins server is on viertual machine and it doesn't have a public ip or url so that github can use it as callback url.
