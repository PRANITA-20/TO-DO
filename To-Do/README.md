# TO-DO
Project Description: The To-Do Application is a task management tool designed to help users organize their daily activities efficiently. Built with Angular and Angular Material, this responsive web app allows users to add, delete, and mark tasks as completed while filtering tasks based on their status. The application also includes pagination for handling large task lists. It also has a login and logout functionality. On successful login, it gets redirected to the dashboard component which has the To-do component embedded inside it.

FEATURES:
Login - On entering valid username and password, the user can log in to the application.
Logout- On clicking the logout button, the user can successfully log out of the application.
Add Tasks – Users can enter tasks, which are dynamically added to the task list.
Mark as Completed – Each task has a checkbox to mark it as "Completed".
Delete Tasks – Users can remove unwanted tasks from the list.
Filter Tasks – A dropdown filter allows users to view All, Pending, or Completed tasks.
Pagination – If tasks exceed 4 items, pagination controls appear.
Responsive UI – Uses CSS Media Queries and Flexbox for mobile, tablet, and desktop views.

TECNHOLOGIES USED:
Frontend: Angular 16, TypeScript, CSS, HTML, RxJS, Jasmine and Karma for Testing
UI Library: Angular Material
Server: json-server
Git for version control

INSTRUCTIONS ON HOW TO RUN THE APPLICATION LOCALLY:
1. Clone the project from Git: https://github.com/PRANITA-20/TO-DO.git
   Steps to clone: run command 'git clone https://github.com/PRANITA-20/TO-DO.git' in the command prompt in a folder
2. Open the project in VSCode and run the command 'npm install' to install node modules and relevant packages.
3. Steps to install and start a local json server: In a different VSCode terminal run 'npm install -g json-server' to install the json server.
                                                    Run command 'json-server --watch db.json --port 3000' to start the server
4. The local server will start and http://localhost:3000/users is the endpoint.
5. Run the front end application in another VSCode terminal: 'ng serve'. This will successfully start the application. Open http://localhost:4200/login in the browser.
6. In order to login use any of these username and password combination:  "users": [
        { "id": 1, "username": "user1", "password": "123456" },
        { "id": 2, "username": "user2", "password": "78910" },
        { "id": 3, "username": "user3", "password": "111234" },
        { "id": 4, "username": "user4", "password": "15161718" }
    ]
7. For testing: Run command 'ng test'. If you want to test login component, run command: ng test --include=src/app/components/login/login.component.spec.ts.
                                       If you want to test dashboard component, run command: ng test --include=src/app/components/dashboard/dashboard.component.spec.ts
                                       If you want to test to-do component, run command: ng test --include=src/app/components/to-do/to-do.component.spec.ts
                                       If you want to test the authentication service, run command: ng test --include=src/app/services/authentication.service.spec.ts




   -----------------------------------------------------------------------The end -----------------------------------------------------------------------
