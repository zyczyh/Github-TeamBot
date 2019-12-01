# DEPLOY

## Deployment scripts and screencast (25%)

We use ansible script to deploy the app. The [script](./deploy/deploy.yml) is in deploy folder.

Screencast:
https://drive.google.com/file/d/1jBiNAFFLwdkrFCLvEJcPAbH-U8dfz00H/view?usp=sharing

## Acceptance testing (40%)
Login credentials:

## Exploratory Testing and Code Inspection (30%)

## Bonus: Continuous Integration Service (20%)
We setup the jenkins server on the virtual machine and setup a build process. The [build log](./deploy/jenkins.log) is in deploy folder. Other helper scripts are also in the folder.

We don't add a trigger for the project when a commit is pushed because our jenkins server is on viertual machine and it doesn't have a public ip or url so that github can use it as callback url.