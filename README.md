# **CE-Boostup9 Grader - Backend**
## **Endpoints**
 - `auth`
    - **@POST** `/register`
    - **@POST** `/login`
 - `about users`
    - **@PUT** `/user/:id`
    - **@GET** `/user`
    - **@GET** `/all-user`
    - **@PUT** `/profile-upload`
    - **@PUT** `/update-group`
    - **@DELETE** `/del-user`
    - **@GET** `/score-board/user`
 - `questions`
    - **@POST** `/add-question`
    - **@PUT** `/update-question/:id`
    - **@GET** `/question-id/:userId/:questionId`
    - **@GET** `/all-qusetions`
    - **@DELETE** `/del-question/:id`
    - **@GET** `/grader-question/:id`
 - `submission`
    - **@GET** `/sub-code`
    - **@GET** `/finish-sub`
    - **@GET** `/submission`

------------------------------
[Front end URL](https://github.com/zantaclaus/Grader-Frontend/tree/master/src)
