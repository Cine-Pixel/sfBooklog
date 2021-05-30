<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210527174351 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book ADD fk_genre_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A33170BE90C1 FOREIGN KEY (fk_genre_id) REFERENCES genre (id)');
        $this->addSql('CREATE INDEX IDX_CBE5A33170BE90C1 ON book (fk_genre_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book DROP FOREIGN KEY FK_CBE5A33170BE90C1');
        $this->addSql('DROP INDEX IDX_CBE5A33170BE90C1 ON book');
        $this->addSql('ALTER TABLE book DROP fk_genre_id');
    }
}
