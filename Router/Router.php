<?php
require './API/Controllers/APILogin.php';
require './API/Controllers/ApiCurrentAffairs.php';
require './API/Controllers/ApiCourse.php';
require './API/Controllers/ApiGallery.php';
require './API/Controllers/ApiSponsor.php';
require './API/Controllers/ApiStudentachivements.php';
require './API/Controllers/ApiNotification.php';
require './API/Controllers/ApiTestimonial.php';
require './API/Controllers/ApiMentors.php';
require './API/Controllers/ApiBoardmembers.php';

use Controller\APILoginController;
//login or authentication
$router->post('/sacra_mento/api/login', function(){(new APILoginController)->AdminLogin();});
// currentaffairs
$router->get('/sacra_mento/api/getallcurrentaffairs', function(){(new ControllersCurrentAffairs)->getallcurrentaffairs();});
$router->post('/sacra_mento/api/getallcurrentaffairsbydate', function(){(new ControllersCurrentAffairs)->getcurrentaffairsbydate();});
$router->post('/sacra_mento/api/getallcurrentaffairsbyyear', function(){(new ControllersCurrentAffairs)->getcurrentaffairsbyyear();});
$router->post('/sacra_mento/api/upload', function(){(new ControllersCurrentAffairs)->savecurrentaffairs();});
$router->post('/sacra_mento/api/updatecurrentaffairs', function(){(new ControllersCurrentAffairs)->updatecurrentaffairs();});
$router->post('/sacra_mento/api/delete',function(){(new ControllersCurrentAffairs)->deletecurrentaffairs();});
//Course
$router->post('/sacra_mento/api/uploadcourse', function(){(new ControllersCourse)->saveCourse();});
$router->get('/sacra_mento/api/getallcourse', function(){(new ControllersCourse)->getallCourse();});
$router->post('/sacra_mento/api/getbycourse', function(){(new ControllersCourse)->getCourseByCourse();});
$router->post('/sacra_mento/api/getcoursebyid', function(){(new ControllersCourse)->getCoursebyid();});
$router->post('/sacra_mento/api/updatecourse', function(){(new ControllersCourse)->updateCourse();});
$router->post('/sacra_mento/api/deletecourse', function(){(new ControllersCourse)->deletecourse();});
//Gallery
$router->post('/sacra_mento/api/getgallerybyid', function(){(new ControllersGallery)->getGallerybyid();});
$router->get('/sacra_mento/api/getallgallery', function(){(new ControllersGallery)->getallGallery();});
$router->post('/sacra_mento/api/uploadgallry', function(){(new ControllersGallery)->saveGallery();});
$router->post('/sacra_mento/api/updategallery', function(){(new ControllersGallery)->updateGallery();});
$router->post('/sacra_mento/api/deletegallery', function(){(new ControllersGallery)->deleteGallery();});
//student
$router->post('/sacra_mento/api/getstudentbyid', function(){(new Controllersstudentachivement)->getStudentachivementbyid();});
$router->get('/sacra_mento/api/getallstudents', function(){(new Controllersstudentachivement)->getallStudentachivement();});
$router->post('/sacra_mento/api/uploadstudent', function(){(new Controllersstudentachivement)->saveStudentachivement();});
$router->post('/sacra_mento/api/editstudent', function(){(new Controllersstudentachivement)->updateStudentachivement();});
$router->post('/sacra_mento/api/deletestudent', function(){(new Controllersstudentachivement)->deleteStudentachivement();});

//sponsor
$router->get('/sacra_mento/api/getsponsorbyid', function(){(new ControllersSponsor)->getSponsorbyid();});
$router->get('/sacra_mento/api/getallsponsors', function(){(new ControllersSponsor)->getallsponsor();});
$router->post('/sacra_mento/api/uploadsponsor', function(){(new ControllersSponsor)->savesponsor();});
$router->put('/sacra_mento/api/editsponsor', function(){(new ControllersSponsor)->updatesponsor();});
$router->delete('/sacra_mento/api/deletesponsor', function(){(new ControllersSponsor)->deletesponsor();});

//student
$router->post('/sacra_mento/api/gettestimonialbyid', function(){(new Controllerstestimonial)->gettesTimonialbyid();});
$router->get('/sacra_mento/api/getalltestimonials', function(){(new Controllerstestimonial)->getallTestimonial();});
$router->post('/sacra_mento/api/uploadtestimonial', function(){(new Controllerstestimonial)->saveTestimonial();});
$router->post('/sacra_mento/api/edittestimonial', function(){(new Controllerstestimonial)->updaTetestimonial();});
$router->post('/sacra_mento/api/deletetestimonial', function(){(new Controllerstestimonial)->deleteTestimonial();});


//student
$router->post('/sacra_mento/api/getnotificationsbyid', function(){(new Controllersnotification)->getNotificationbyid();});
$router->get('/sacra_mento/api/getallnotifications', function(){(new Controllersnotification)->getallNotification();});
$router->post('/sacra_mento/api/uploadnotification', function(){(new Controllersnotification)->saveNotification();});
$router->post('/sacra_mento/api/editnotification', function(){(new Controllersnotification)->updateNotification();});
$router->post('/sacra_mento/api/deletenotification', function(){(new Controllersnotification)->deleteNotification();});

//mentors
$router->post('/sacra_mento/api/getentorsbyid', function(){(new Controllersmentors)->getMentorsbyid();});
$router->get('/sacra_mento/api/getallentors', function(){(new Controllersmentors)->getallMentors();});
$router->post('/sacra_mento/api/uploadentors', function(){(new Controllersmentors)->saveMentors();});
$router->post('/sacra_mento/api/editentors', function(){(new Controllersmentors)->updateMentors();});
$router->post('/sacra_mento/api/deleteentors', function(){(new Controllersmentors)->deleteMentors();});

//boardmembers
$router->get('/sacra_mento/api/getBoardmembersbyid', function(){(new Controllersboardmembers)->getBoardmembersbyid();});
$router->get('/sacra_mento/api/getallBoardmembers', function(){(new Controllersboardmembers)->getallBoardmembers();});
$router->post('/sacra_mento/api/uploadBoardmembers', function(){(new Controllersboardmembers)->saveBoardmembers();});
$router->put('/sacra_mento/api/editBoardmembers', function(){(new Controllersboardmembers)->updateBoardmembers();});
$router->delete('/sacra_mento/api/deleteBoardmembers', function(){(new Controllersboardmembers)->deleteBoardmembers();});






?>