<?php

	$errors = array();
	require '../vendor/autoload.php';

	$apiKeyPublic = getenv('MJ_APIKEY_PUBLIC');
	$apiKeyPrivate = getenv('MJ_APIKEY_PRIVATE');

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$from = $email;
	$recipientEmail = 'a.c.anirudh74@gmail.com';  // please change this email id
	$subject = 'Contact Form : New Mail contact request';

	$body = "From: $name\n E-Mail: $email\n Message:\n $message";

	$headers = "From: ".$from;
	$response = 'Started';
	if(sendMailjetEmail($apiKeyPublic, $apiKeyPrivate, $recipientEmail,$name,$email,$message)) {
		/*
		This call sends a message to the given recipient with vars and custom vars.
		*/
		use MailjetResources;
		$mj = new MailjetClient($apiKeyPublic, $apiKeyPrivate, true, ['version' => 'v3.1']);
		$body = [
			'Messages' => [
				[
					'From' => [
						'Email' => "hello@hirewithcss.com",
						'Name' => "hirewithcss"
					],
					'To' => [
						[
							'Email' => "hello@hirewithcss.com",
							'Name' => "New contact"
						]
					],
					'TemplateID' => 4978135,
					'TemplateLanguage' => true,
					'Subject' => "New Contact Us Inquiry",
					'Variables' => json_decode('{
					  "username":' $name',
					  "usermail":' $email',
					  "message":' $message'
					}', true)
				]
			]
		];
		$response = $mj->post(Resources::$Email, ['body' => $body]);	
	}
	echo $response;
