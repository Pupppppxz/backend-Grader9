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
 - `submission`
    - **@POST** `/submit`
    - **@GET** `/sub-code`
    - **@GET** `/finish-sub`
    - **@GET** `/submission`

------------------------------
## **Auth**
#### **@POST** `/sign-up`
 - Return true with http status code 201 if email was successfully sent.
#### **Parameters**
|Field|Data Type|Description|
|-----|---------|-----------|
|email|string|Email that used in sign up and it will be use to sign in.
|firstName|string|First name of a register person.
|lastName|string|Last name of a register person.
|password|string|Password of an account. A password need to be at least 8 characters long and maximun 20 characters long and it has to have at least 1 upper case character, 1 lower case character and 1 number or 1 special symbol.
#### **@POST** `/sign-up/verify`
 - Return true with http status code 201 if account was successfully created.
#### **Parameters**
|Field|Data Type|Description|
|-----|---------|-----------|
|token|string|JSON web token string that contain information in sign up form.
#### **@POST** `/sign-in`
 - Return object of accessToken if successfully signed in.
#### **Parameters**
|Field|Data Type|Description|
|-----|---------|-----------|
|email|string|Email that used in sign up.
|password|string|Password of an account. A password need to be at least 8 characters long and maximun 20 characters long and it has to have at least 1 upper case character, 1 lower case character and 1 number or 1 special symbol.
|remember|boolean|If value is true then return accessToken will be expired in 30 days else if false then the token will be expired in 5 hours.
#### **@POST** `/change-password`
 - Return true if confirmation email was successfully sent.
#### **Parameters**
|Field|Data Type|Description|
|-----|---------|-----------|
|email|string|Email that used in sign in.
#### **@PATCH** `/change-password/verify`
 - Return true if password was successfully changed.
#### **Parameters**
|Field|Data Type|Description|
|-----|---------|-----------|
|token|string|JSON web token contain data that will be use to change password.
|password|string|A new password for the account.
#### **@POST** `/verify-email`
 - Return true if email that come with this http request is in database.
#### **Parameters**
|Field|Data Type|Description|
|-----|---------|-----------|
|email|string|Email that want to check if it is database or not.

--------------------------
## **User**
#### **@GET** `/profile`
- Return user profile.
#### **@PATCH** `/profile`
 - Return updated user profile if updating was successful.
#### **Parameters**
|Field|Data Type|Required/Optional|Description|
|----|---------|-----------------|-----------|
|firstName|string|Optional|First name of a person.
|lastName|string|Optional|Last name of a person.
|role|string\<UserRole\>|Optional|Role of a user.
|productID|Array of ProductDto|Optional|An array of productID that have deviceID and deviceName that are both string.
|lineToken|string|Optional|An line token of line account that will be sent notification.

#### **@GET** `/profile/product-id`
 - Return an array of productDto.
#### **@PUT** `/profile/product-id`
 - Return an updated array of productDto if updating was successful.
#### **Parameters**
|Field|Data Type|Required/Optional|Description|
|----|---------|-----------------|-----------|
|updateData|ArrayProductDto |Required|ProductDto is a javascript object with deviceID field and deviceName that are both string.

-------------------------
## **Temperature**
#### **@GET** `/`
 - Return array of object that have deviceName and data (*limit* temperatures before current time) if *limit* is not specify then *limit* is automatically set to 1.

#### **Query parameters**
|Query|Data Type|Required/Optional|Description|
|----|---------|-----------------|-----------|
|limit|number|Optional|amount of temperature data.

#### **@GET** `/:deviceID`
- Return array of temperature 1 day before current date and time if *non of optional* query parameters are specify.
 - Return array of temperature from startDate and startTime to endDate and endTime (inclusive) if *all of optional* query parameters are specify.
 - Return array of temperature 1 day before endDate and endTime
if *only endDate and endTime* are specify.
 - Return array of temperature of from startDate and startTime to present if *only startDate and startTime* are spceify.
#### **Dynamics endpoints**
|Endpoint|Description|
|----|---------------|
|deviceID|Device id of product that we want to query temperature from.
#### **Query parameters**
|Query|Data Type|Required/Optional|Description|
|----|---------|-----------------|-----------|
|startDate|string|Optional|Start date of temperature that we want to query. In YYYY-MM-DD format.
|startTime|string|Optional|Start Time of temperature that we want to query. In hh:mm:ss format.
|endDate|string|Optional|End date of temperature that we want to query. In YYYY-MM-DD format.
|endTime|string|Optional|End Time of temperature that we want to query. In hh:mm:ss format.
#### **@GET** `/time`
- Return array of temperature record nearest to the given time.

#### **Query parameters**
|Query|Data Type|Required/Optional|Description|
|----|---------|-----------------|-----------|
|deviceID|string|required|Device id of product that we want to query temperature from.
|date|string|required|Date of temperature that we want to query. In YYYY-MM-DD format.
|time|string|required|Time of temperature that we want to query. In hh:mm:ss format.

#### **@POST** `/update`
- Push temperature data that is post to this web socket from MQTT to client with the specific deviceId by Socket.io .

-----------------------------
## **Command Line**
Start a server with hot reloading.
```
npm run start:dev
```
Start a server with code optimization.
```
npm run start:prod
```
 
