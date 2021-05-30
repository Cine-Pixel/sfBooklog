<?php

namespace App\Controller;

use App\Entity\Book;
use App\Repository\BookRepository;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/books', name: 'api-books-')]
class BookController extends AbstractController {

    /**
     * @var BookRepository
     */
    private $bookRepository;

    /**
     * @var PostRepository 
     */
    private $postRepository;

    public function __construct(BookRepository $bookRepository, PostRepository $postRepository) {
        $this->bookRepository = $bookRepository;
        $this->postRepository = $postRepository;
    }

    #[Route('/list', name: 'list', methods: ['GET'])]
    public function listAction(Request $request): Response {
        $books = $this->bookRepository->findAll();

        // return $this->json($books, status: Response::HTTP_OK, headers: [], context: []);
        return $this->json($books, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'title', 'description', 
                'posts' => ['id', 'fkUser' => ['email']],
                'fkGenre' => ['id', 'title'],
                'fkAuthor' => ['id', 'fullname']
            ],
        ]);
    }

    #[Route('/featured', name: 'featured', methods: ['GET'])]
    public function featuredAction(Request $request): Response {
        $books = $this->bookRepository->getFeaturedBooks();

        return $this->json($books, status: Response::HTTP_OK, headers: [], context: []);
    }

    #[Route('/show/{id}', name: 'show', methods: ['GET'])]
    public function showAction(Request $request, int $id): Response {
        $book = $this->getDoctrine()->getRepository(Book::class)->find($id);

        return $this->json($book, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'title', 'description', 
                'posts' => ['id', 'fkUser' => ['email']],
                'fkGenre' => ['id', 'title'],
                'fkAuthor' => ['id', 'fullname']
            ],
        ]);
    }

    #[Route('/search/{title}', name: 'search', methods: ['GET'])]
    public function searchAction(Request $request, string $title): Response {
        $book = $this->getDoctrine()->getRepository(Book::class)->findOneBy(['title' => $title]);

        return $this->json($book, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'title', 'description', 
                'posts' => ['id', 'fkUser' => ['email']],
                'fkGenre' => ['id', 'title'],
                'fkAuthor' => ['id', 'fullname']
            ],
        ]);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function createAction(Request $request, SerializerInterface $serializer): Response {
        $params = $request->request->all();

        $book = new Book();
        $book->setTitle($params['title']);
        $book->setDescription($params['description']);

        $em = $this->getDoctrine()->getManager();
        $em->persist($book);
        $em->flush();

        $response = [
            "status" => Response::HTTP_CREATED
        ];

        return new Response(json_encode($response), Response::HTTP_CREATED, ['Content-type' => "application/json"]);
    }
}
