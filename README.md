To use X-PLORA web application, first, you have to copy it to your computer. 

Please note that our repository is private, so to clone the project you need to have access to it and log in.
You can download an application as a .zip file (from branch_007) or run:

$ git clone https://github.com/rohra-mehak/x-plora.git

Please switch to branch_007 by running:

$ git checkout branch_007

And then pull changes:

$ git pull

Now you should see the full application in your IDE.
Before running, you have to be sure everything (all libraries/extensions) is installed on your computer. You should enter the frontend folder:

$ cd project_xplora/frontend

And install everything by running the following command:

$ npm install

You will probably get 13 warnings but that’s not an error, so go to next step.

When everything is cloned and installed, we are ready to run the app.
Open a new tab or terminal window and enter project_xplora folder (there you have a manager.py file) and type:

$ python manage.py rumserver

Now the backend is already running and to run frontend run the following command (from frontend folder you have opened in another tab/window):

$ npm run start

If you got some errors, you will probably have to install some libraries. Install them and run app again.
Now you can see the fancy main page of our application. 
