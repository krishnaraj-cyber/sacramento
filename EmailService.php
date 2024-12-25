<?php
 require 'cors.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// use Dotenv\Dotenv;

class EmailService {

function sendRegistrationEmail($reqdata) {
    require_once realpath(__DIR__ . "/vendor/autoload.php");

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom( 'projecttdevelopmentt@gmail.com', 'Sacramento Tamil Mandrum');
        $mail->addAddress($reqdata['Email']);

        // Content
        $mail->isHTML(true);
        $mail->Subject = ($reqdata['Poster_Type'] == "Donation") ? 'Donation Confirmation':'Registration Confirmation';
       if ($reqdata['Poster_Type'] == "Donation") { 
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; color: #555;'>
            <h1 style='color: #4CAF50;'>Thank you for your Donation to Sacramento Tamil Mandrum!</h1>

            <p style='font-size: 18px;'>Dear " . htmlspecialchars($reqdata['First_Name']) . ",</p>

            <p style='font-size: 16px;'>We are truly grateful for your generous donation to " . (htmlspecialchars($reqdata['Eventname'] == "Donation") ? "us" : "<strong> ".($reqdata['Eventname'])."</strong>" ). ". Here are the donation details:</p>

            <div style='border-left: 5px solid #4CAF50; padding-left: 20px; margin-bottom: 20px;'>  
                <p><strong>Donation Amount:</strong> $" . htmlspecialchars($reqdata['Entry_Fees']) . "</p>
                <p><strong>Payment Status:</strong> Succeeded</p>
            </div>

            <p>Thank you once again for your kind contribution. Your support means a lot to us!</p>

            <div>
                <p>If you have any questions, please reach out to us:</p>
                <ul>
                    <li>Email: <a href='mailto:" . htmlspecialchars($_ENV['SMTP_USERNAME']) . "'>" . htmlspecialchars($_ENV['SMTP_USERNAME']) . "</a></li>
                    <li>Phone: <a href='tel:+919876543210'>+91 9876543210</a></li>
                </ul>
            </div>

            <p>With gratitude,</p>
            <a href='" . htmlspecialchars($_ENV['BASE_URL']) . "'><img src='https://previewportal.site/assets/images/Logo/logoo.png' alt='' width='250px' /></a>
        </div>
    ";
} else {
    $isVolunteer = ($reqdata['Poster_Type'] == "Volunteer");
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; color: #555;'>
            <h1 style='color: #4CAF50;'>Thank you for Registering " . ($isVolunteer ? "as Volunteer" : "") . " into Sacramento Tamil Mandrum!</h1>

            <p style='font-size: 18px;'>Dear " . htmlspecialchars($reqdata['First_Name']) . ",</p>

            <p style='font-size: 16px;'>We are thrilled to confirm your registration for <strong>" . htmlspecialchars($reqdata['Eventname']) . "</strong>!</p>

            <div style='border-left: 5px solid #4CAF50; padding-left: 20px; margin-bottom: 20px;'>
                <p><strong>Event Name:</strong> " . htmlspecialchars($reqdata['Eventname']) . "</p>
                <p><strong>Event Date:</strong> " . htmlspecialchars($reqdata['Date']) . "</p>
                " . (!$isVolunteer ? "
                <p><strong>Amount:</strong> $" . htmlspecialchars($reqdata['Entry_Fees']) . "</p>
                " : "") . "
            </div>

            <p>We look forward to having you at the event. Please keep this confirmation email for your records.</p>

            <div>
                <p>If you have any questions, please reach out to us:</p>
                <ul>
                    <li>Email: <a href='mailto:" . htmlspecialchars($_ENV['SMTP_USERNAME']) . "'>" . htmlspecialchars($_ENV['SMTP_USERNAME']) . "</a></li>
                    <li>Phone: <a href='tel:+919876543210'>+91 9876543210</a></li>
                </ul>
            </div>

            <p>Best regards,</p>
            <a href='" . htmlspecialchars($_ENV['BASE_URL']) . "'><img src='https://previewportal.site/assets/images/Logo/logoo.png' alt='' width='250px' /></a>
        </div>
    ";
}

        $mail->send();
    } catch (Exception $e) {
        error_log("Email could not be sent. Error: {$mail->ErrorInfo}");
    }
}

function sendFeedbacktoAdmin($reqdata) {
    require_once realpath(__DIR__ . "/vendor/autoload.php");

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($reqdata['Email']);
        $mail->addAddress($_ENV['SMTP_USERNAME']);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Feedback Received from '  . htmlspecialchars($reqdata['Name'])  ;

        $mail->Body = "
            <div style='font-family: Arial, sans-serif; color: #555;'>
                <h1 style='color: #4CAF50;'>New Feedback Received!</h1>
        
                <p style='font-size: 18px;'>Dear Admin,</p>
        
                <p style='font-size: 16px;'>You have received feedback from a user regarding the event <strong>" . htmlspecialchars($reqdata['Event_Name']) . "</strong>. Here are the details:</p>
        
                <div style='border-left: 5px solid #4CAF50; padding-left: 20px; margin-bottom: 20px;'>  
                    <p><strong>Name:</strong> " . htmlspecialchars($reqdata['Name']) . "</p>
                    <p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($reqdata['Email']) . "' style='color:rgb(43, 46, 216);'>" . htmlspecialchars($reqdata['Email']) . "</a></p>
                    <p><strong>Event Name:</strong> " . htmlspecialchars($reqdata['Event_Name']) . "</p>
                    <p><strong>Feedback:</strong> " . nl2br(htmlspecialchars($reqdata['Feedback'])) . "</p>
                </div>
        
                <p style='font-size: 16px;'>Please review this feedback and take any necessary actions.</p>
        
                <div style='margin-top: 20px; font-size: 16px;'>
                    <p>If you need further details, feel free to contact the user directly via email.</p>
                </div>
        
                <div style='border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;'>
                    <p style='font-size: 16px; color: #555;'><strong>Best regards,</strong></p>
                    <a href='" . htmlspecialchars($_ENV['BASE_URL']) . "'><img src='https://previewportal.site/assets/images/Logo/logoo.png' alt='' width='250px' /></a>
                </div>
        
                <div style='font-size: 14px; color: #aaa; margin-top: 30px;'>
                    <p>This email was generated to notify you of new feedback received from a user.</p>
                </div>
            </div>
        "; 
        $mail->send();
    } catch (Exception $e) {
        error_log("Email could not be sent. Error: {$mail->ErrorInfo}");
    }
}

function sendFeedbackResponseToUser($reqdata) {
    require_once realpath(__DIR__ . "/vendor/autoload.php");

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($_ENV['SMTP_USERNAME'], 'Sacramento Tamil Mandrum');
        $mail->addAddress($reqdata['Email']); // Send to user's email

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Thank You for Your Feedback!';

        $mail->Body = "
            <div style='font-family: Arial, sans-serif; color: #555;'>
                <h1 style='color: #4CAF50;'>Thank You for Your Feedback!</h1>
        
                <p style='font-size: 18px;'>Dear " . htmlspecialchars($reqdata['Name']) . ",</p>
        
                <p style='font-size: 16px;'>We have received your feedback regarding the event <strong>" . htmlspecialchars($reqdata['Event_Name']) . "</strong>. Your input is very valuable to us.</p>
        
                <div style='border-left: 5px solid #4CAF50; padding-left: 20px; margin-bottom: 20px;'>  
                    <p><strong>Event Name:</strong> " . htmlspecialchars($reqdata['Event_Name']) . "</p>
                    <p><strong>Feedback:</strong> " . nl2br(htmlspecialchars($reqdata['Feedback'])) . "</p>
                </div>
        
                <p style='font-size: 16px;'>We truly appreciate you taking the time to share your thoughts. If you have any further comments, please don't hesitate to reach out to us.</p>
        
                <div style='margin-top: 20px; font-size: 16px;'>
                    <p>Warm regards,</p> 
                    <a href='" . htmlspecialchars($_ENV['BASE_URL']) . "'><img src='https://previewportal.site/assets/images/Logo/logoo.png' alt='' width='250px' /></a>
                </div>
        
                <div style='font-size: 14px; color: #aaa; margin-top: 30px;'>
                    <p>This email is to confirm that we have successfully received your feedback.</p>
                </div>
            </div>
        "; 
        
        $mail->send();
    } catch (Exception $e) {
        error_log("Response email could not be sent to user. Error: {$mail->ErrorInfo}");
    }
}


}

?>
