<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

#[Route('/api', name: 'api-')]
class RegistrationController extends AbstractController {
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(UserRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager) {
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $entityManager;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function index(Request $request): Response {
        $params = $request->request;
        $email = $params->get("email");
        $password = $params->get("password");

        $user = $this->userRepository->findOneBy([
            'email' => $email,
        ]);

        if (!is_null($user)) {
            return $this->json(['success' => false, 'status' => Response::HTTP_CONFLICT,'message' => 'User already exists']);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->passwordEncoder->encodePassword($user, $password));
        $user->setRoles(["ROLE_USER"]);
        
        $this->em->persist($user);
        $this->em->flush();

        return $this->json(['success' => true, 'status' => Response::HTTP_CREATED,'message' => 'User created']);
    }
}
