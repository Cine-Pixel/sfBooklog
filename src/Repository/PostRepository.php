<?php

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function getPostWithEsentials(int $id) {
        $qb = $this->createQueryBuilder('p')
            ->select('p.id, u.email, u.id')
            ->innerJoin('App\Entity\User', 'u', Expr\Join::WITH, 'p.fk_user = u.id')
            ->where('p.fk_book = :id')
            ->setParameter('id', $id);
        
        $query = $qb->getQuery();

        return $query->execute();
    }

}
