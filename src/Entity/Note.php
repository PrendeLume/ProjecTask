<?php

namespace App\Entity;

use App\Repository\NoteRepository;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NoteRepository::class)]
#[ORM\Table(name: 'notes')]
class Note
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\Column(length: 20)]
    private ?string $color = null;

    #[ORM\Column]
    private ?DateTimeImmutable $creation_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?DateTimeInterface $modification_date = null;

    #[ORM\ManyToOne(inversedBy: 'notes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $id_user;

    private string $text_color;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'notes')]
    private Collection $tags;

    public function getTextColor(): string{
        return $this->text_color;
    }
    public function setTextColor(?string $color): static
    {
        $this->text_color = $color;

        return $this;
    }

    /**
     * @param string|null $title
     * @param string|null $content
     * @param string|null $color
     */
    public function __construct(?string $title, ?string $content, ?string $color)
    {
        $this->title = $title;
        $this->content = $content;
        $this->color = $color;
        $this->tags = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getCreationDate(): ?DateTimeImmutable
    {
        return $this->creation_date;
    }

    public function setCreationDate(DateTimeImmutable $creation_date): static
    {
        $this->creation_date = $creation_date;

        return $this;
    }

    public function getModificationDate(): ?DateTimeInterface
    {
        return $this->modification_date;
    }

    public function setModificationDate(DateTimeInterface $modification_date): static
    {
        $this->modification_date = $modification_date;

        return $this;
    }

    public function getIdUser(): ?user
    {
        return $this->id_user;
    }

    public function setIdUser(?user $id_user): static
    {
        $this->id_user = $id_user;

        return $this;
    }

    /**
     * @return Collection<int, tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
