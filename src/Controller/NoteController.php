<?php

namespace App\Controller;

use App\Entity\Note;
use App\Entity\User;
use App\Form\NoteType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NoteController extends AbstractController
{
    private EntityManagerInterface $em ;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    #[Route('/note', name: 'app_note')]
    public function index(Request $request, $idUser = null): Response
    {
        $note = new Note('', '', '');
        $form = $this->createForm(NoteType::class, $note);
        $session = $request->getSession();

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $note->setCreationDate(new \DateTimeImmutable());
            $note->setModificationDate(new \DateTimeImmutable());

            $this->em->persist($note);
            $this->em->flush();
            return $this->redirectToRoute('app_note');
        }

        $user_repo = $this->em->getRepository(User::class)->findOneBy(['email' => $session->get('registro')]);
        $note = $user_repo->getNotes();
        return $this->render('note/index.html.twig', [
            'notes' => $note,
            'form' => $form
        ]);
    }


}
