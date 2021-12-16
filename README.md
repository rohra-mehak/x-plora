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

See the main page, 3 steps of data analysis, options to login and register and contact page. In case of any problems, contact our team using this phone number or email.

If you aren’t registered yet but you want to create a problem, you need to create an account and then log in. After that, you will be able to create a problem by entering title and description. For example:

Title:

GitHub languages analysis.

Description:

The idea is to analyze the most frequent languages/technologies on github.com. The analysis should be performed based on Github repos of 4 different famous companies (Amazon, IBM, Facebook, and Google), the most active users and the most popular languages from the analysis and statistics made by Github team itself. 
Use Google Colab for results. Use two datasets with statistics from those sources: https://madnight.github.io/githut/#/pushes/2021/3 and https://gist.github.com/paulmillr/2657075. 

See the information about stages, colours meaning and an important note regarding problems and solutions.
Remember, only one problem can be in progress by one user.

Each problem stage results’ proposition will be linked, so that after each stage you will be able to see the results and either approve them or reject. Remember, once you confirm results of the stage, you can’t return back to them. Once the stage is completed and approved, your problem’s solution is moving to next stage.

In case of any questions, comments or propositions contact our team. We will be glad to hear from you!
