Dog-Diabetes
============

##Group Members:

* Elizabeth Britton
* Vincent Do
* Robert Glynn
* Jared Rodman
*Tobi Idowu

## Build Instruction

Make sure you have nodejs installed. In the main directory run this command

~~~
npm install
~~~~

This should install all of the dependencies required for you to run the app.

## Installing Heroku

Make sure you have contributor access to the heroku project. 

Refer [to this site](https://toolbelt.heroku.com/) for instruction to
install heroku toolbelt for your specific operating system.

After installing heroku run this command:

~~~
heroku login
~~~

This should prompt you to set up a ssh public key. Proceed with the instruction.

After that, add the remote heroku repository

~~~
git remote add heroku git@heroku.com:dog-diabetes.git
~~~

From now on, for your changes to reflect on the development site. You must commit and push your changes to heroku.

~~~
git push heroku master
~~~

Don't forget to also push your code to the github repository

~~~
git push origin master
~~~

