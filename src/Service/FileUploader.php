<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class FileUploader {
    private $targetDirectory;
    private $userPhotoDirectory;
    private $slugger;

    public function __construct($targetDirectory, $userPhotoDirectory, SluggerInterface $slugger)
    {
        $this->targetDirectory = $targetDirectory;
        $this->slugger = $slugger;
    }

    public function upload(UploadedFile $file, string $where) {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

        try {
            if($where === "user") {
                $file->move($this->getUserTargetDirectory(), $fileName);
            } else {
                $file->move($this->getTargetDirectory(), $fileName);
            }
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
            return "error";
        }

        return "/uploads/posts/".$fileName;
    }

    public function getTargetDirectory() {
        return $this->targetDirectory;
    }
    public function getUserTargetDirectory() {
        return $this->userPhotoDirectory;
    }
}
