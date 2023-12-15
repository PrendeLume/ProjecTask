<?php

namespace App\Controller;

use App\Entity\Note;
use App\Entity\Tag;
use App\Entity\User;
use App\Form\NoteType;
use App\Form\TagsType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
        $tag = new Tag();
        $form = $this->createForm(NoteType::class, $note);
        $form2 = $this->createForm(NoteType::class, $note);
        $tagForm = $this->createForm(TagsType::class, $tag);
        $session = $request->getSession();

        $user_repo = $this->em->getRepository(User::class)->findOneBy(['email' => $session->get('registro')]);
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){

            $note->setCreationDate(new \DateTimeImmutable());
            $note->setModificationDate(new \DateTime());
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
            'form2' => $form2,
            'tagForm' => $tagForm
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
    public function DeleteNote(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // Verificar si se recibió el ID de la nota
        if (!isset($data['id'])) {
            return new JsonResponse(['message' => 'Falta el parámetro ID en la solicitud'], 400);
        }

        // Obtener el ID de la nota a eliminar
        $noteId = $data['id'];

        $note = $this->em->getRepository(Note::class)->find($noteId);
        // Verificar si la nota existe
        if (!$note) {
            return new JsonResponse(['message' => 'La nota no existe'], 404);
        }

        $this->em->remove($note);
        $this->em->flush();
        return new JsonResponse(['message' => 'Nota eliminada correctamente']);
    }

    #[Route('/note/modification', name: 'app_note_modification')]
    public function modification(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true)['data'];
        // Verificar si se recibió el ID de la nota
        if (!isset($data['id'])) {
            return new JsonResponse(['message' => 'Falta el parámetro ID en la solicitud'], 400);
        }
        if (!isset($data['title'])) {
            return new JsonResponse(['message' => 'Falta el parámetro Titulo en la solicitud'], 400);
        }
        if (!isset($data['content'])) {
            return new JsonResponse(['message' => 'Falta el parámetro de Contenido en la solicitud'], 400);
        }
        if (!isset($data['color'])) {
            return new JsonResponse(['message' => 'Falta el parámetro de Color en la solicitud'], 400);
        }
        // Obtener el ID de la nota a eliminar
        $noteId = $data['id'];

        $note = $this->em->getRepository(Note::class)->find($noteId);
        // Verificar si la nota existe
        if (!$note) {
            return new JsonResponse(['message' => 'La nota no existe'], 404);
        }
        $note->setTitle($data['title']);
        $note->setContent($data['content']);
        $note->setColor($data['color']);
        $note->setModificationDate(new \DateTime());

        $this->em->flush();
        return new JsonResponse(['message' => 'Nota modificada correctamente']);
    }
    #[Route('/note/all', name: 'app_note_all')]
    public function misNotas(Request $request, SerializerInterface $serializer): JsonResponse
    {
        $session = $request->getSession();

        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $session->get('registro')]);
        if (!$user) {
            return new JsonResponse(['message' => 'Usuario no encontrado'], 404);
        }
        $notes = $user->getNotes();
        $formattedNotes = [];

        foreach ($notes as $note) {
            $formattedNotes[] = [
                'id' => $note->getId(),
                'title' => $note->getTitle(),
                'content' => $note->getContent(),
                'color' => $note->getColor(),
                //'text-color' => $note->getTextColor(),
                'modification' => $note->getModificationDate()
                // Agrega aquí otras propiedades necesarias de la nota
            ];
        }
        return new JsonResponse(['message' => 'Todos recogidos', 'data' => $formattedNotes]);
    }

}
