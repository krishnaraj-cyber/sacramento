<?php
require './API/Controllers/APILogin.php';
require './API/Controllers/ApiCurrentAffairs.php';
require './API/Controllers/ApiCourse.php';
require './API/Controllers/ApiGallery.php';
require './API/Controllers/ApiSponsor.php';
require './API/Controllers/ApiEvents.php';
require './API/Controllers/ApiFinancialSummary.php';
require './API/Controllers/ApiTestimonial.php';
require './API/Controllers/ApiMentors.php';
require './API/Controllers/ApiBoardmembers.php';
require './API/Controllers/ApiYouthForum.php';
require './API/Controllers/ApiRegister.php';
require './API/Controllers/ApiVolunteer.php';
require './API/Controllers/ApiDonation.php';
require './API/Controllers/ApiMemberReegister.php';
require './API/Controllers/Home/ApiWhatwedo.php';

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


//student
$router->post('/sacra_mento/api/gettestimonialbyid', function(){(new Controllerstestimonial)->gettesTimonialbyid();});
$router->get('/sacra_mento/api/getalltestimonials', function(){(new Controllerstestimonial)->getallTestimonial();});
$router->post('/sacra_mento/api/uploadtestimonial', function(){(new Controllerstestimonial)->saveTestimonial();});
$router->post('/sacra_mento/api/edittestimonial', function(){(new Controllerstestimonial)->updaTetestimonial();});
$router->post('/sacra_mento/api/deletetestimonial', function(){(new Controllerstestimonial)->deleteTestimonial();});



//mentors
$router->post('/sacra_mento/api/getentorsbyid', function(){(new Controllersmentors)->getMentorsbyid();});
$router->get('/sacra_mento/api/getallentors', function(){(new Controllersmentors)->getallMentors();});
$router->post('/sacra_mento/api/uploadentors', function(){(new Controllersmentors)->saveMentors();});
$router->post('/sacra_mento/api/editentors', function(){(new Controllersmentors)->updateMentors();});
$router->post('/sacra_mento/api/deleteentors', function(){(new Controllersmentors)->deleteMentors();});

//boardmembers
$router->get('/sacra_mento/api/getBoardmembersbyid', function(){(new Controllersboardmembers)->getBoardmembersbyid();});
$router->get('/sacra_mento/api/getallBoardmembers', function(){(new Controllersboardmembers)->getallBoardmembers();});
$router->get('/sacra_mento/api/getboardmembystatus', function(){(new Controllersboardmembers)->getBoardmemByStatus();});
$router->post('/sacra_mento/api/getfilterboard', function(){(new Controllersboardmembers)->getFilterBoard();});
$router->get('/sacra_mento/api/getuniqueyear', function(){(new Controllersboardmembers)->fetchUniqueYears();});
$router->post('/sacra_mento/api/uploadBoardmembers', function(){(new Controllersboardmembers)->saveBoardmembers();});
$router->post('/sacra_mento/api/editBoardmembers', function(){(new Controllersboardmembers)->updateBoardmembers();});
$router->delete('/sacra_mento/api/deleteBoardmembers', function(){(new Controllersboardmembers)->deleteBoardmembers();});

//sponsor
$router->get('/sacra_mento/api/getsponsorbyid', function(){(new ControllersSponsor)->getSponsorbyid();});
$router->get('/sacra_mento/api/getallsponsors', function(){(new ControllersSponsor)->getallsponsor();});
$router->get('/sacra_mento/api/getsponsorbystatus', function(){(new ControllersSponsor)->getSponsorByStatus();});
$router->post('/sacra_mento/api/getallfiltersponsors', function(){(new ControllersSponsor)->getFilterSponsor();});
$router->post('/sacra_mento/api/uploadsponsor', function(){(new ControllersSponsor)->savesponsor();});
$router->post('/sacra_mento/api/editsponsor', function(){(new ControllersSponsor)->updatesponsor();});
$router->delete('/sacra_mento/api/deletesponsor', function(){(new ControllersSponsor)->deletesponsor();});

//Events
$router->get('/sacra_mento/api/geteventbyid', function(){(new ControllersEvents)->getEventsbyid();});
$router->get('/sacra_mento/api/getallevents', function(){(new ControllersEvents)->getallEvents();});
$router->get('/sacra_mento/api/geteventbystatus', function(){(new ControllersEvents)->getEventByStatus();});
$router->post('/sacra_mento/api/getallfilterevents', function(){(new ControllersEvents)->getFilterEvents();});
$router->post('/sacra_mento/api/uploadevent', function(){(new ControllersEvents)->saveEvents();});
$router->post('/sacra_mento/api/editevent', function(){(new ControllersEvents)->updateEvents();});
$router->delete('/sacra_mento/api/deleteevent', function(){(new ControllersEvents)->deleteEvents();});

//Financial summary
$router->get('/sacra_mento/api/getfinancialsbyid', function(){(new ControllersFinancialSummary)->getFinancialSummarybyid();});
$router->get('/sacra_mento/api/getallfinancials', function(){(new ControllersFinancialSummary)->getallFinancialSummary();});
$router->get('/sacra_mento/api/getfinancialbystatus', function(){(new ControllersFinancialSummary)->getFinancialByStatus();});
$router->post('/sacra_mento/api/getallfiltersummary', function(){(new ControllersFinancialSummary)->getFilterSummary();});
$router->post('/sacra_mento/api/uploadfinancial', function(){(new ControllersFinancialSummary)->saveFinancialSummary();});
$router->post('/sacra_mento/api/editfinancial', function(){(new ControllersFinancialSummary)->updateFinancialSummary();});
$router->delete('/sacra_mento/api/deletefinancial', function(){(new ControllersFinancialSummary)->deleteFinancialSummary();});

//Member Registration
$router->get('/sacra_mento/api/getregmembyid', function(){(new ControllersMemberRegister)->getMemberRegisterbyid();});
$router->get('/sacra_mento/api/getallregmems', function(){(new ControllersMemberRegister)->getallMemberRegister();});
$router->get('/sacra_mento/api/getregmembystatus', function(){(new ControllersMemberRegister)->getMemberRegisterByStatus();});
$router->post('/sacra_mento/api/getallfilterregmem', function(){(new ControllersMemberRegister)->getFilterMemberRegister();});
$router->post('/sacra_mento/api/uploadregmem', function(){(new ControllersMemberRegister)->saveMemberRegister();});
$router->post('/sacra_mento/api/editregmem', function(){(new ControllersMemberRegister)->updateMemberRegister();});
$router->delete('/sacra_mento/api/deleteregmem', function(){(new ControllersMemberRegister)->deleteMemberRegister();});

//Youth forum
$router->get('/sacra_mento/api/getyouthforumbyid', function(){(new ControllersYouthForum)->getYouthForumbyid();});
$router->get('/sacra_mento/api/getallyouthforums', function(){(new ControllersYouthForum)->getallYouthForum();});
$router->get('/sacra_mento/api/getyouthbystatus', function(){(new ControllersYouthForum)->getYouthByStatus();});
$router->post('/sacra_mento/api/getallfilteryouthforums', function(){(new ControllersYouthForum)->getFilterYouth();});
$router->post('/sacra_mento/api/uploadyouthforum', function(){(new ControllersYouthForum)->saveYouthForum();});
$router->post('/sacra_mento/api/edityouthforum', function(){(new ControllersYouthForum)->updateYouthForum();});
$router->delete('/sacra_mento/api/deleteyouthforum', function(){(new ControllersYouthForum)->deleteYouthForum();});

//Gallery
$router->get('/sacra_mento/api/getgallerybyid', function(){(new ControllersGallery)->getGallerybyid();});
$router->get('/sacra_mento/api/getgallerybyyear', function(){(new ControllersGallery)->getGallerybyYear();});
$router->get('/sacra_mento/api/getallgallery', function(){(new ControllersGallery)->getallGallery();});
$router->get('/sacra_mento/api/getgallerybystatus', function(){(new ControllersGallery)->getGalleryByStatus();});
$router->post('/sacra_mento/api/getallfiltergallery', function(){(new ControllersGallery)->getFilterGallery();});
$router->post('/sacra_mento/api/uploadgallery', function(){(new ControllersGallery)->saveGallery();});
$router->post('/sacra_mento/api/updategallery', function(){(new ControllersGallery)->updateGallery();});
$router->delete('/sacra_mento/api/deletegallery', function(){(new ControllersGallery)->deleteGallery();});

//Event_Register
$router->get('/sacra_mento/api/getregisterbyid', function(){(new ControllersRegister)->getRegisterbyid();});
$router->get('/sacra_mento/api/getallregisters', function(){(new ControllersRegister)->getallRegister();});
$router->post('/sacra_mento/api/getallfilterregisters', function(){(new ControllersRegister)->getAllFilterRegister();});
$router->get('/sacra_mento/api/getfilterregister', function(){(new ControllersRegister)->getFilteredbyPoster();});
$router->post('/sacra_mento/api/uploadregister', function(){(new ControllersRegister)->saveRegister();});
$router->post('/sacra_mento/api/editregister', function(){(new ControllersRegister)->updateRegister();});
$router->delete('/sacra_mento/api/deleteregister', function(){(new ControllersRegister)->deleteRegister();});

//Event_Volunteer
$router->post('/sacra_mento/api/getallfiltervolunteers', function(){(new ControllersVolunteer)->getAllFilterVolunteer();}); //dashboard filter
$router->get('/sacra_mento/api/getfiltervolunteer', function(){(new ControllersVolunteer)->getFilteredVolunteer();});
$router->delete('/sacra_mento/api/deletevolunteer', function(){(new ControllersVolunteer)->deleteVolunteer();});

//Event_Donation
$router->post('/sacra_mento/api/getallfilterdonations', function(){(new ControllersDonation)->getAllFilterDonation();}); //dashboard filter
$router->get('/sacra_mento/api/getfilterdonation', function(){(new ControllersDonation)->getFilteredDonation();});
$router->delete('/sacra_mento/api/deletedonation', function(){(new ControllersDonation)->deleteDonation();});

//Home > What we do
$router->get('/sacra_mento/api/getwhatwedosbyid', function(){(new ControllersWhatwedo)->getWhatwedobyid();});
$router->get('/sacra_mento/api/getallwhatwedos', function(){(new ControllersWhatwedo)->getallWhatwedo();});
$router->get('/sacra_mento/api/getwhatwedobystatus', function(){(new ControllersWhatwedo)->getWhatwedoByStatus();});
$router->post('/sacra_mento/api/getallfilterwhatwedo', function(){(new ControllersWhatwedo)->getFilterSummary();});
$router->post('/sacra_mento/api/savewhatwedo', function(){(new ControllersWhatwedo)->saveWhatwedo();});
$router->post('/sacra_mento/api/editwhatwedo', function(){(new ControllersWhatwedo)->updateWhatwedo();});
$router->delete('/sacra_mento/api/deletewhatwedo', function(){(new ControllersWhatwedo)->deleteWhatwedo();});

?>