<?php
require "cors.php";
require 'config.php';
require "vendor/autoload.php";
require SYSTEM . 'Startup.php';
require SERVICES . 'Services.php';
use Router\Router;
$request = new Http\Request();
$response = new Http\Response();
$response->setHeader('Access-Control-Allow-Origin: *');
$response->setHeader("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
$response->setHeader('Content-Type: application/json; charset=UTF-8');
$router = new Router($request->getUrl(), $request->getMethod());
require 'Router/Router.php';
$router->run();
$response->render();