<?php

namespace App\Controller;

use App\Entity\Genre;
use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/genre', name: 'api-genre-')]
class GenreController extends AbstractController
{
    /**
     * @var GenreRepository
     */
    private $genreRepository;

    public function __construct(GenreRepository $genreRepository) {
        $this->genreRepository = $genreRepository;
    }
    #[Route('/list', name: 'list', methods: ['GET'])]
    public function listAction(Request $request): Response {
        $genres = $this->getDoctrine()->getRepository(Genre::class)->findAll();

        return $this->json($genres, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'title', 'books' => ['id', 'title']],
        ]);
    }

    #[Route('/show/{id}', name: 'show', methods: ['GET'])]
    public function showAction(Request $request, int $id): Response {
        $genre = $this->genreRepository->findOneWithBooks($id);

        $response = [
            "success" => true,
            "status" => Response::HTTP_CREATED,
            "message" => ""
        ];

        if(!$genre) {
            $response['success'] = false;
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = "Post not found";

            return $this->json($response, status: Response::HTTP_NOT_FOUND);
        }

        return $this->json($genre, status: Response::HTTP_OK, headers: [], context: [
            ObjectNormalizer::ATTRIBUTES => ['id', 'title', 'books' => ['id', 'title']],
        ]);
    }
}
