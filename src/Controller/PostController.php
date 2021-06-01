<?php

namespace App\Controller;

use App\Entity\Book;
use App\Entity\Post;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/post', name: 'api-post-')]
class PostController extends AbstractController
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
        $posts = $this->getDoctrine()->getRepository(Post::class)->findAll();

        return $this->json($posts, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'content', 'createdAt', 'imageUrl', 'title', 
                'fkBook' => ['id', 'title'],
                'fkUser' => ['id', 'username']
            ],
        ]);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function createAction(Request $request, FileUploader $fileUploader): Response {
        $params = $request->request;
        $photo = $request->files->get('photo', default: null);
        $content = $params->get('content', default: null);
        $title = $params->get('title', default: null);
        $bookID = $params->get('bookID', default: '-1');
        $bookID = str_replace("\"", "", $bookID)+0;
        
        if($photo) {
            $photoName = $fileUploader->upload($photo);
        } else {
            $photoName = '/uploads/default.png';
        }

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => "Post created"
        ];

        if(!$content) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NO_CONTENT;
            $response['message'] = "Content can't be empty";

            return $this->json($response, status: Response::HTTP_NO_CONTENT);
        }

        $book = $this->em->getRepository(Book::class)->find($bookID);
        if(!$book) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Book doesn't exist please create one";

            return $this->json($response, status: Response::HTTP_NO_CONTENT, headers: [], context: []);
        }

        $post = new Post();
        $post->setTitle($title);
        $post->setContent($content);
        $post->setImageUrl($photoName);
        $post->setFkBook($book);
        $post->setFkUser($this->getUser());

        $this->em->persist($post);
        $this->em->flush();

        return $this->json($response, status: Response::HTTP_CREATED, headers: [], context: []);
    }

    #[Route('/show/{id}', name: 'show', methods: ['GET'])]
    public function showAction(Request $request, int $id): Response {
        $post = $this->em->getRepository(Post::class)->find($id);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => ""
        ];

        if(!$post) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Post was not found";

            return $this->json($response, status: Response::HTTP_NOT_FOUND);
        }

        return $this->json($post, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'content', 'createdAt', 'title', 'imageUrl', 
                'comments' => ['id', 'content', 'fkUser' => ['id', 'username']],
                'fkBook' => ['id', 'title'],
                'fkUser' => ['id', 'username']
            ],
        ]);
    }

    #[Route('/update', name: 'update', methods: ['POST'])]
    public function updateAction(Request $request): Response {
        $params = $request->request;
        $postID = $params->get('postID', default: -1);
        $content = $params->get('content', default: null);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => "Post updated"
        ];

        if(!$content) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NO_CONTENT;
            $response['message'] = "Content can't be empty";

            return $this->json($response, status: Response::HTTP_NO_CONTENT);
        }

        $post = $this->em->getRepository(Post::class)->find($postID);
        if(!$post) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Post was not found";

            return $this->json($response, status: Response::HTTP_NO_CONTENT);
        }

        $post->setContent($content);
        $this->em->flush();
        $response['message'] = $post;

        return $this->json($response, status: Response::HTTP_CREATED);
    }
}
