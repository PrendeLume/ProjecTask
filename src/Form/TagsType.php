<?php

namespace App\Form;

use App\Entity\Note;
use App\Entity\Tag;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TagsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nombre', TextType::class, [
                'attr' => [
                    'class' => 'form-control'
                ],
                'label' => 'Nombre etiqueta'
            ])
            ->add('notes', EntityType::class, [
                'attr' => [
                    'class' => 'form-select'
                ],
                'class' => Note::class,
                'choice_label' => 'title',
                'multiple' => true,
            ])
            /*->add('submit', SubmitType::class, [
                'label' => 'Crear',
                'attr' => [
                    'class' => 'btn btn-success'
                ]
            ])*/
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Tag::class,
        ]);
    }
}
