<?php

namespace App\Controller;

use App\Entity\Note;
use App\Entity\User;
use App\Form\NoteType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public function index(Request $request): Response
    {
        $note = new Note('', '', '');
        $form = $this->createForm(NoteType::class, $note);
        $form2 = $this->createForm(NoteType::class, $note);
        $session = $request->getSession();

        $user_repo = $this->em->getRepository(User::class)->findOneBy(['email' => $session->get('registro')]);
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){

            $note->setCreationDate(new \DateTimeImmutable());
            $note->setModificationDate(new \DateTimeImmutable());
            $note->setIdUser($user_repo);

            $this->em->persist($note);
            $this->em->flush();
            return $this->redirectToRoute('app_note');
        }


        $note = $user_repo->getNotes();
        foreach ($note as $n){
            $textColor = $this->isColorDark($n->getColor())? 'white' : 'black';
            $n->setTextColor($textColor);
        }
        return $this->render('note/index.html.twig', [
            'notes' => $note,
            'form' => $form,
            'form2' => $form2
        ]);
    }

    //Funcion relacionada con el color del texto (white / black)
    private function isColorDark($hexColor) {
        $hexColor = ltrim($hexColor, '#');
        $r = hexdec(substr($hexColor, 0, 2));
        $g = hexdec(substr($hexColor, 2, 2));
        $b = hexdec(substr($hexColor, 4, 2));
        $luminosity = (0.299 * $r + 0.587 * $g + 0.114 * $b) / 255;
        return $luminosity < 0.5; // Umbral de luminosidad
    }

    #[Route('/note/delete', name: 'app_note_close')]
    public function DeleteNote($idNota): Response
    {
        $nota = $this->em->getRepository(Note::class)->find($idNota);
        $this->em->remove($nota);
        $this->em->flush();
        return $this->redirectToRoute('app_note');
    }

    #[Route('/note/modification', name: 'app_note_modification')]
    public function modification(Request $request): JsonResponse
    {
        // Obtener los datos enviados desde la solicitud AJAX
        $data = json_decode($request->getContent(), true);

        //return $this->redirectToRoute('app_note', ['mensaje' => '¡La modificación fue exitosa!']);
        return new JsonResponse(['message' => 'Datos recibidos correctamente', 'data' => $data]);

    }
}
