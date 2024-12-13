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
![](./src/image/ERD.png)
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

![](./src/image/image1.png)

POST {{VERSELBASE}}api/auth/login

![](./src/image/image2.png)

**Admin**

POST {{VERSELBASE}}/api/auth /api/admin/schedule

![](./src/image/image3.png)

POST {{VERSELBASE}}api/admin/create-trainer

![](./src/image/image4.png)

PUT {{VERSELBASE}}api/admin/findby-trainer-id/:id

![](./src/image/image5.png)

GET {{VERSELBASE}}api/admin/find-all-trainer

![](./src/image/image6.png)

DEL {{VERSELBASE}}api/admin/remove-trainer-by-id/:id

![](./src/image/image7.png)

**Trainee**

POST {{VERSELBASE}}api/trainee/book-class/:Id

![](./src/image/image8.png)
POST {{VERSELBASE}}api/trainee/profile

![](./src/image/image9.png)

**Trainer**

GET {{VERSELBASE}}api/trainer/schedules

![](./image10.png)

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

**MONGO_URI**=mongodb+srv://user8552:user8552@cluster0.derptwk.mongodb.net/Gym-Management

**JWT_SECRET**= mdmehedi#123

**PORT** = 5000

-   **Live Hosting Link:**

> Host Link: <https://bd-calling-it-task.vercel.app/>
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
