<?php

namespace App\Controller;

use App\Entity\Note;
use App\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TagController extends AbstractController
{
    private EntityManagerInterface $em ;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    #[Route('/tag/create', name: 'app_tag' )]
    public function newTag(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'])) {
            return new JsonResponse(['message' => 'Falta el parámetro Nombre en la solicitud'], 400);
        }
        if (!isset($data['select'])) {
            return new JsonResponse(['message' => 'Falta el parámetro select en la solicitud'], 400);
        }
        $tag = new Tag();
        $tag->setNombre($data['name']);
        $this->em->persist($tag);
        $this->em->flush();
        foreach ($data['select'] as $idNote){
            $note_repo = $this->em->getRepository(Note::class)->find($idNote);
            if($note_repo){
                $note_repo->addTag($tag);
                $this->em->persist($note_repo);
            }
        }
        $this->em->flush();

        return new JsonResponse(['message' => 'Etiqueta creada']);
    }
//Paso 1
    #[Route('/tag/list', name: 'app_list_tag' )]
    public function listTag(Request $request): JsonResponse
    {
        $tag_repo = $this->em->getRepository(Tag::class)->findAll();

        $tagNames = [];

        foreach ($tag_repo as $tag){
            $tagNames[] = $tag->getNombre();
        }
        return new JsonResponse(['message' => 'Etiqueta recogida', 'etiquetas' => $tagNames]);
    }

    #[Route('/note/tag/delete', name: 'app_delete_tag' )]
    public function deleteTag(Request $request): JsonResponse
    {

        $data = json_decode($request->getContent(), true);
        if (!isset($data['data'])) {
            return new JsonResponse(['message' => 'Falta el parámetro a borrar en la solicitud'], 400);
        }
        $tag_repo = $this->em->getRepository(Tag::class);
        $probando = [];
        foreach ($data['data'] as $tagName){
            $tag = $tag_repo->findOneBy(['nombre' => $tagName]);

            if (!$tag) {
                return new JsonResponse(['message' => 'La etiqueta no existe'], 404);
            }
            $probando[] = $tagName;
            $this->em->remove($tag);
        }

        $this->em->flush();
        return new JsonResponse([
            'message' => 'Etiqueta eliminada correctamente',
            'probando' => $probando
        ]);


    }

    #[Route('/note/tag/add', name: 'app_add_tag' )]
    public function addTag(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['data'])) {
            return new JsonResponse(['message' => 'Falta el parámetro a borrar en la solicitud'], 400);
        }
        $tag_repo = $this->em->getRepository(Tag::class);
        $note_repo = $this->em->getRepository(Note::class);
        $probando = [];
        foreach ($data['data'] as $tagName){
            $tag = $tag_repo->findOneBy(['nombre' => $tagName]);

            if (!$tag) {
                return new JsonResponse(['message' => 'La etiqueta no existe'], 404);
            }

            $probando[] = $tagName;
        }

        $this->em->flush();
        return new JsonResponse([
            'message' => 'Etiqueta añadida',
            'probando' => $probando
        ]);
    }
}
