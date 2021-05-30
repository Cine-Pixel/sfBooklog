<?php

namespace App\Controller;

use App\Entity\Author;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/author', name: 'api-author-')]
class AuthorController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $entityManagerInterface) {
        $this->em = $entityManagerInterface;
    }

    #[Route('/list', name: 'list')]
    public function listAction(): Response {
        $authors = $this->getDoctrine()->getRepository(Author::class)->findAll();

        return $this->json($authors, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['posts', 'fkGenre', 'fkAuthor'],
            ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function createAction(Request $request): Response {
        $params = $request->request;
        $fullname = $params->get('fullname', default: null);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => "Author created"
        ];

        if(!$fullname) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NO_CONTENT;
            $response['message'] = "Post not found";

            return $this->json($response, status: Response::HTTP_NO_CONTENT);
        }

        $author = new Author();
        $author->setFullname($fullname);

        $this->em->persist($author);
        $this->em->flush();

        return $this->json($response, status: Response::HTTP_CREATED);
    }


    #[Route('/show/{id}', name: 'show')]
    public function showAction(Request $request, int $id): Response {
        $author = $this->getDoctrine()->getRepository(Author::class)->find($id);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => ""
        ];

        if(!$author) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Author not found";

            return $this->json($response, status: Response::HTTP_NOT_FOUND);
        }

        return $this->json($author, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['posts', 'fkGenre', 'fkAuthor'],
        ]);
    }

    #[Route('/search/{name}', name: 'search', methods: ['GET'])]
    public function searchAction(Request $request, string $name): Response {
        $author = $this->getDoctrine()->getRepository(Author::class)->findOneBy(['fullname' => $name]);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => ""
        ];

        if(!$author) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Author not found";

            return $this->json($response, status: Response::HTTP_NOT_FOUND);
        }

        return $this->json($author, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['posts', 'fkGenre', 'fkAuthor'],
        ]);
    }
}
