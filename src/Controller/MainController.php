<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route(
        '/{reactRouting}', 
        name: 'main', 
        methods: ['GET'], 
        defaults: ['reactRouting' => null], 
        requirements: ['reactRouting' => '^(?!api|uploads).+']
    )]
    public function index(): Response
    {
        return $this->render('main/index.html.twig');
    }
}
