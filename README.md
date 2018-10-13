# Image Sharing App NodeJs

This is a sample back end application which allows which saves and serves image and image data. This project was made using NodeJs version 8. The purpose of this program was to refine my understanding of authorization, and to learn how to make scalable web applications which serve static files to a front end web application.

### Features

* Authorization using JSON web Token
* Serves images from mongo database
* Organizes images into pages using mongoose-paginator
* Features an endpoint which will serve one random image saved on the server
* Saves image to mongo database along with a name and description of the picture\*
* Delete uploaded images\*
* Save comments to a single particular image\*
* Can serve a single image with added details like description and comments
* Images can be saved to a list of favorites which is saved as an Object reference ID to the User model\*
* Making a GET request to the favorites endpoint will populate the data contained in the User model\*

\* requires authorization

### Download and Deploy this project

1.  Download and extract the zip file for this project or download using git clone
2.  Install dependencies using `npm install`
3.  Create config folder and configure environment variables (PORT, MONGODB_URI, JWT_EXP, JWT_SECRET)
4.  configure jwtHelper and passport-local strategy in config folder
5.  Run the application using `npm run start`
