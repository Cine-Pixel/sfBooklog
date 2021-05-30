<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210527183206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment ADD fk_post_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CBBA63E00 FOREIGN KEY (fk_post_id) REFERENCES post (id)');
        $this->addSql('CREATE INDEX IDX_9474526CBBA63E00 ON comment (fk_post_id)');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8D807B780');
        $this->addSql('DROP INDEX IDX_5A8A6C8D807B780 ON post');
        $this->addSql('ALTER TABLE post DROP fk_comment_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CBBA63E00');
        $this->addSql('DROP INDEX IDX_9474526CBBA63E00 ON comment');
        $this->addSql('ALTER TABLE comment DROP fk_post_id');
        $this->addSql('ALTER TABLE post ADD fk_comment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D807B780 FOREIGN KEY (fk_comment_id) REFERENCES comment (id)');
        $this->addSql('CREATE INDEX IDX_5A8A6C8D807B780 ON post (fk_comment_id)');
    }
}
