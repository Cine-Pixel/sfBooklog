<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=BookRepository::class)
 */
class Book
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"show_book"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("show_book")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=400, nullable=true)
     * @Groups("show_book")
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="fk_book")
     */
    private $posts;

    /**
     * @ORM\ManyToOne(targetEntity=Genre::class, inversedBy="books")
     */
    private $fk_genre;

    /**
     * @ORM\ManyToOne(targetEntity=Author::class, inversedBy="books")
     */
    private $fk_author;

    /**
     * @ORM\Column(type="string", length=300, nullable=true)
     */
    private $imageUrl;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setFkBook($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getFkBook() === $this) {
                $post->setFkBook(null);
            }
        }

        return $this;
    }

    public function getFkGenre(): ?Genre
    {
        return $this->fk_genre;
    }

    public function setFkGenre(?Genre $fk_genre): self
    {
        $this->fk_genre = $fk_genre;

        return $this;
    }

    public function getFkAuthor(): ?Author
    {
        return $this->fk_author;
    }

    public function setFkAuthor(?Author $fk_author): self
    {
        $this->fk_author = $fk_author;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }
}
