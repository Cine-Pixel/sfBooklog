<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    public function getFeaturedBooks() {
        $qb = $this->createQueryBuilder('b')
            ->select('b.id, b.title, b.imageUrl, a.fullname')
            ->innerJoin('App\Entity\Author', 'a', Expr\Join::WITH, 'b.fk_author = a.id')
            ->setMaxResults(4);
        
        $query = $qb->getQuery();

        return $query->execute();
    }
}
