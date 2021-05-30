<?php

namespace App\Repository;

use App\Entity\Genre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Genre|null find($id, $lockMode = null, $lockVersion = null)
 * @method Genre|null findOneBy(array $criteria, array $orderBy = null)
 * @method Genre[]    findAll()
 * @method Genre[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GenreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Genre::class);
    }

    public function findOneWithBooks(int $id) {

        $qb = $this->createQueryBuilder('g')
            ->innerJoin('App\Entity\Book', 'b', Expr\Join::WITH, 'g.id = b.fk_genre')
            ->where('g.id =  :id')
            ->setParameter('id', $id);
        
        $query = $qb->getQuery();

        return $query->execute();
    }

}
