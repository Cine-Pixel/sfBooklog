<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/user', name: 'api-user')]
class UserController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $entityManagerInterface) {
        $this->em = $entityManagerInterface;
    }

    #[Route('/get-current', name: 'get-current', methods: ['GET'])]
    public function getAction(): Response
    {
        $user = $this->getUser();
        if(!$user) {
            return $this->json([
                "success" => false, 
                "message" => "User not found", 
                "status" => Response::HTTP_NOT_FOUND
            ], status: Response::HTTP_NOT_FOUND, headers: [], context: []);
        }

        return $this->json($user, status: Response::HTTP_OK, headers: [], context:[
            ObjectNormalizer::ATTRIBUTES => ["id", "email"]
        ]);
    }

    #[Route('/current', name: 'current')]
    public function showAction(): Response
    {
        $user = $this->getUser();
        if(!$user) {
            return $this->json([
                "success" => false, 
                "message" => "User not found", 
                "status" => Response::HTTP_NOT_FOUND
            ], status: Response::HTTP_NOT_FOUND, headers: [], context: []);
        }

        return $this->json($user, status: Response::HTTP_OK, headers: [], context:[
            ObjectNormalizer::ATTRIBUTES => ["id", "email", "firstname", "lastname", "picture", "location"]
        ]);
    }

    #[Route('/current-full', name: 'current-full')]
    public function showFullAction(): Response
    {
        $user = $this->getUser();
        if(!$user) {
            return $this->json([
                "success" => false, 
                "message" => "User not found", 
                "status" => Response::HTTP_NOT_FOUND
            ], status: Response::HTTP_NOT_FOUND, headers: [], context: []);
        }

        return $this->json($user, status: Response::HTTP_OK, headers: [], context:[
            ObjectNormalizer::ATTRIBUTES => [
                "id", "email", "firstname", 
                "lastname", "picture", "location",
                "posts" => ["id", "title", "createdAt", "imageUrl"]
            ]
        ]);
    }

    #[Route('/update', name: 'update', methods: ['POST'])]
    public function index(Request $request): Response {
        $params = $request->request;
        $firstname = $params->get("firstname", default: null);
        $lastname = $params->get("lastname", default: null);
        $email = $params->get("email", default: null);
        $location = $params->get("location", default: null);

        if(empty($email) || empty($firstname) || empty($lastname)) {
            return $this->json(["success" => false,"message" => "Fields can not be empty", "status" => Response::HTTP_NOT_ACCEPTABLE]);
        }

        $user = $this->getUser();
        $user->setEmail($email);
        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $user->setLocation($location);
        $user->setRoles(["ROLE_USER"]);
        
        $this->em->persist($user);
        $this->em->flush();

        return $this->json(['success' => true, 'status' => Response::HTTP_CREATED,'message' => 'User updated']);
    }
}
