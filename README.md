**Project Overview**

**Gym Class Scheduling and Membership Management System**

This system is designed to streamline gym operations by managing class
schedules, trainer assignments, and trainee bookings. It employs a
role-based access control system with three distinct roles:

**Roles and Permissions:**

-   **Admin:** Responsible for creating and managing trainers,
    scheduling classes, and assigning trainers to classes. They cannot
    create or manage trainee profiles.

-   **Trainer:** Can view their assigned class schedules but cannot
    create new schedules or manage trainee profiles.

-   **Trainee:** Can create and manage their own profiles and book class
    schedules, subject to availability.

**Key Features:**

-   **Class Scheduling:**

    -   Admins can create up to 5 class schedules per day.

    -   Each class lasts for 2 hours.

    -   Each class can accommodate a maximum of 10 trainees.

-   **User Management:**

    -   Admins can create and manage trainer profiles.

    -   Trainees can create and manage their own profiles.

-   **Authentication and Authorization:**

    -   JWT-based authentication is used to secure access to the system.

    -   Roles and permissions are enforced to restrict access to
        specific functionalities.

-   **Error Handling:**

    -   The system implements robust error handling to handle
        unauthorized access, validation errors, and booking limit
        violations.

**Benefits:**

-   **Efficient Class Management:** Streamlines the process of creating
    and managing class schedules.

-   **Improved User Experience:** Provides a user-friendly interface for
    trainers and trainees to manage their schedules and bookings.

-   **Enhanced Security:** Ensures data privacy and security through
    JWT-based authentication and authorization.

-   **Scalability:** Can be easily scaled to accommodate a growing gym
    membership.

-   **Flexibility:** Offers customization options to adapt to specific
    gym requirements.

By implementing this system, gyms can optimize their operations, improve
customer satisfaction, and increase overall efficiency.

**Relation Diagram**
![image](https://github.com/user-attachments/assets/ef56618d-64ac-4580-aa42-ef21bc3d0c8c)
-   **Technology Stack:**

1.  Express.js,

2.  Mongoose,

3.  MongoDB

4.  JWT.

-   **API Endpoints:**

{{BASE}} = <http://localhost:5000/>

{{VERSELBASE}} = <https://bd-calling-it-task.vercel.app/>

**Auth**

POST {{VERSELBASE}}api/auth/register

![](./image1.png){width="6.5in" height="2.2368055555555557in"}

POST {{VERSELBASE}}api/auth/login

![](./image2.png){width="6.5in" height="2.295138888888889in"}

**Admin**

POST {{VERSELBASE}}/api/auth /api/admin/schedule

![](./image3.png){width="6.5in" height="1.961111111111111in"}

POST {{VERSELBASE}}api/admin/create-trainer

![](./image4.png){width="6.5in" height="2.0944444444444446in"}

PUT {{VERSELBASE}}api/admin/findby-trainer-id/:id

![](./image5.png){width="6.5in" height="2.0875in"}

GET {{VERSELBASE}}api/admin/find-all-trainer

![](./image6.png){width="5.917492344706911in"
height="5.677876202974629in"}

DEL {{VERSELBASE}}api/admin/remove-trainer-by-id/:id

![](./image7.png){width="6.5in" height="6.131944444444445in"}

**Trainee**

POST {{VERSELBASE}}api/trainee/book-class/:Id

![](./image8.png){width="6.7104155730533686in"
height="2.240631014873141in"}

POST {{VERSELBASE}}api/trainee/profile

![](./image9.png){width="6.5in" height="1.9694444444444446in"}

**Trainer**

GET {{VERSELBASE}}api/trainer/schedules

![](./image10.png){width="6.480686789151356in"
height="3.5008213035870517in"}

**Database Schema**

**User**

const mongoose = require(\"mongoose\");

const bcrypt = require(\"bcryptjs\");

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: { type: String, default: \"trainee\", enum: \[\"admin\",
\"trainer\", \"trainee\"\], required: true },

});

userSchema.pre(\"save\", async function (next) {

  if (!this.isModified(\"password\")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();

});

module.exports = mongoose.model(\"Users\", userSchema);

**ClassSchedule:**

const mongoose = require(\"mongoose\");

const classScheduleSchema = new mongoose.Schema({

  date: { type: Date, required: true },

  startTime: { type: String, required: true },

  endTime: { type: String, required: true },

  trainer: {

    type: mongoose.Schema.Types.ObjectId,

    ref: \"Users\",

    required: true,

  },

  trainees: \[{ type: mongoose.Schema.Types.ObjectId, ref: \"Users\"
}\],

});

classScheduleSchema.path(\'startTime\').get(function(value) {

  return moment(value, \'HH:mm:ss\').toDate();

});

module.exports = mongoose.model(\"ClassSchedules\",
classScheduleSchema);

**All Credentials:**

**Admin:**

Gmail: <mehedi1122@gmail.com>

Pass: 112233

**Trainer:**

Gmail: mehedi12@gmail.com

Pass: 112233

**Trainee:**

Gmail: mehedi1234@gmail.com

Pass: 112233

-   **Instructions to Run Locally**

1.  Clone the Repository:

> git clone <https://github.com/mehedi8552/bdCalling-IT-Task.git>

2.  Navigate to the Project Directory:

cd bdCalling-IT-Task

3.  Install Dependencies:

npm install

4.  Start the Development Server:

npm start

Additional Tips:

5.  Create a .env file and past it on there

**MONGO_URI**=mongodb+srv://\<username\>:\<password\>@cluster0.derptwk.mongodb.net/yourDBName

**JWT_SECRET**= mdmehedi#123

**PORT** = 5000

-   **Live Hosting Link:**

> Host Link: <https://bd-calling-it-task.vercel.app/>
>
> Host Dashboard:
> <https://vercel.com/mehedi8552s-projects/file-upload-and-read-project/FaKCZCEAxycFEJevr5P9DQ37aNd6>
>
> **4. Testing Instructions:**

1.  **Admin Credentials**

Gmail: <mehedi1122@gmail.com>

Pass: 112233

2.  **Explain of All features**

> **Admin:**

A.  **Create schedule:** Provide date, start time, and trainer id. Now
    hit the API.

B.  **Create trainer:** Provide Name, Email, and Password. Now hit the
    API.

C.  **Find All trainer:** hit API you can see all trainer

D.  **Find trainer by id:** add a trainer id end of the parameter. Now
    hit the API.

E.  **Remove trainer:** add a trainer id end of the parameter. Now hit
    the API.

> **Auth:**

A.  **User Registration:** Provide name, email, and password. Now hit
    the API.

B.  **User Login:** Provide email, and password. Now hit the API.

> **Trainer:**

A.  **View schedules:** Login and Hit the API

> **Trainee:**

A.  **Book Class:** add a Class id end of the parameter. Now hit the
    API.

B.  **Profile:** Hit API For view Profile.
