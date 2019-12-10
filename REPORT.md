## Presentation for Team 19: Teambot
Please find our video presentation here: https://drive.google.com/file/d/1EDWxmlpDgtYRJe9xjdpucEQtzsAT0UT1/view?usp=sharing

## Report
### The problem our bot solved
Our Teambot is a group progress tracker that monitors group members' activities on Github and presents the statistics on a weekly basis. By simply interacting with Teambot on Mattermost, we can create the tracker and receive weekly updates reporting our pull requests, number of commits, change of lines of code, and etc. Teambot is definitely beneficial for group communication and management as it saves us time from organizing meetings to report progress individually and it motivates group members to participate more actively as well.
### Primary features and screenshots
#### Monitor initialization
In the public channel Town Square, post a message that includes a keyword such as "create", "monitor", etc.  
  
![create](https://media.github.ncsu.edu/user/14814/files/48b17b00-1a9d-11ea-8a80-a2095c32c75d)  
  
Getting a link that asks for basic info:  
  
![authen](https://media.github.ncsu.edu/user/14814/files/d9895600-1a9f-11ea-9a9b-ccf76dd4673b)  
  
Verifying your identity by providing your Github username:  
  
![id](https://media.github.ncsu.edu/user/14814/files/bd39e900-1aa0-11ea-81f9-1c37092496b2)  
  
Response for invalid username:  
  
![invalid](https://media.github.ncsu.edu/user/14814/files/a3000b00-1aa0-11ea-8eb4-cd49b5118b21)  
  
If successfully verified:  
  
![valid](https://media.github.ncsu.edu/user/14814/files/a6939200-1aa0-11ea-9e4e-5c0b765839db)  
  
#### Sending out weekly reports 

Every Friday, you'll get a direct message summarizing your activities of the week from Teambot:  
  
![report](https://media.github.ncsu.edu/user/14814/files/59fc8680-1aa1-11ea-9da2-60e2da222779)  
  
Clicking the link gets you the full report. The group manager gets a reoprt of the whole group.  
  
Whoever has made zero progress last week will show up in the Red Flag section:  
  
![charts](https://media.github.ncsu.edu/user/14814/files/16efe280-1aa4-11ea-834c-a536fd3886a5)  
  
<img src="https://media.github.ncsu.edu/user/14814/files/430b6380-1aa4-11ea-9021-6c6448072096">
  
<img src="https://media.github.ncsu.edu/user/14814/files/c760e500-1aaa-11ea-8916-b2a79db581d3" width="450">  
  
  
There's a section where the manager can click on a group member's username and view his or her individual report:  
  
<img src="https://media.github.ncsu.edu/user/14814/files/64bc1900-1aab-11ea-9fad-b64b0ec820e6" width="450">  
  
A group member's report looks similar to a manager's, but it doens't show up any information of others, as we did take privacy into consideration.  
  
![individual](https://media.github.ncsu.edu/user/14814/files/bc0abb00-1aa4-11ea-9a01-cab622d50314)  
  

#### Short answers for your query

Teambot can answer your questions with respect to your Github activities directly so that you don't have to look up a piece of information from the complete report.  
  
There's no need to remember the exact query format because Teambot will remind you of that.  
  
![query](https://media.github.ncsu.edu/user/14814/files/bb732400-1aa6-11ea-858f-73d2f5a5a6ce)  
  
The example query below asks for the number of commits of the user @mngr1 within the period 11/01/2019 - 12/03/2019.  
  
![commit](https://media.github.ncsu.edu/user/14814/files/db571780-1aa7-11ea-88cf-46005934cf04)  
  
Then you get a brief answer:  
  
![commit](https://media.github.ncsu.edu/user/14814/files/b662a480-1aa7-11ea-99f8-ee77de056532)  
  

### Our reflection on the development process and project  

It would be better if we spent more time discussing how we'd like the fundamental structure to be implemented in the first place. We had one group member wrote up the skeleton of our express app without talking about how exactly this should be like. It worked without any problem at first, but we realized what went wrong later on while doing the integration test. It turns out the person who wrote up the skeleton prefers a different coding convention which indeed brought up some issues. Although the issues were relatively minor, it did cost us some time to detect and fix them since it is hard to trace back to the root issue as everything else was built on top of it.  
  
We should've also let someone who didn't participate in this project to try it on. We could ask opinions from both our peers in this class and someone who doesn't know software engineering at all. Developers and users can have very different perspective. They might notice something that we couldn't realize for the first time they try our application. Had we ever did this, we'd totally do a better job on handling corner cases and thus improving user experience.  

### Limitations and future work  

As Dr. Parnin suggested, although we took privacy into consideration and provides different links to each group member's report page, what we neglected is that the link URL is easy to guess. If someone can substitute his or her usernmae by others' in the URL and get to view the page, then it is pointless to have this feature. What we could do to avoid this problem is to make the link auto-generated and only effective for 24 hours. There are plenty of one-time URL generator out there and we definitely can grab one and integrate it into our software.  

Another thing we can work on in the future is to further optimize the Mattermost interaction. We would like to get rid of some inconvience in the current interaction. It is not very intuitive that users have to post requesting messages in the public channel while receving messages privately. We thought about setting up slash commands to solve this problem but it turns out we didn't have time to do this. We absolutely want to finish this off as slash commands work so well in both public and private channels. Besides, we are going to add a few more interactive components as well. Having interactive button or drop-down list in the dialogue can certainly make our interface more organized and user-friendly.    

## Peer Evaluation
The 360 peer evaluation form has been submitted individually. We appreciate everyone's hard work throughout the semester.

