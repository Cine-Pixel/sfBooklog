<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/comments', name: 'api-comments-')]
class CommentController extends AbstractController{
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /**
     * @var CommentRepository
     */
    private $commentRepository;

    public function __construct(EntityManagerInterface $entityManagerInterface, CommentRepository $commentRepository) {
        $this->em = $entityManagerInterface;
        $this->commentRepository = $commentRepository;
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function createAction(Request $request): Response {
        $params = $request->request;
        $content = $params->get('content', default: null);
        $postID = $params->get('postID', default: -1);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => "Comment Created"
        ];

        $post = $this->em->getRepository(Post::class)->find($postID);

        if(!$post) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Post was not found";

            return $this->json($response, status: Response::HTTP_NOT_FOUND);
        }
        if(!$content) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NO_CONTENT;
            $response['message'] = "Post not found";

            return $this->json($response, status: Response::HTTP_NO_CONTENT);
        }

        $comment = new Comment();
        $comment->setContent($content);
        $comment->setFkUser($this->getUser());
        $post->addComment($comment);

        $this->em->persist($comment);
        $this->em->persist($post);
        $this->em->flush();

        return $this->json($response, status: Response::HTTP_CREATED);
    }

    #[Route('/list/{postID}', name: 'list', methods: ['GET'])]
    public function listAction(Request $request, int $postID): Response {
        $comments = $this->commentRepository->findAllByPostId($postID);

        return $this->json($comments , status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'content', 'fkPost' => ['id']],
        ]);
    }

    #[Route('/remove', name: 'remove', methods: ['POST'])]
    public function removeAction(Request $request): Response {
        $id = $request->request->get('commentId');
        $comment = $this->em->getRepository(Comment::class)->find($id);

        $response = [
            "success" => true,
            "status" => Response::HTTP_OK,
            "message" => "Comment Created"
        ];

        if(!$comment) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Comment not found";

            return $this->json($response, status: Response::HTTP_NOT_FOUND);
        }

        $this->em->remove($comment);
        $this->em->flush();

        return $this->json($response, status: Response::HTTP_OK);
    }
}
