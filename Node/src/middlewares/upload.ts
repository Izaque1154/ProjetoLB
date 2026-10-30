import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {

        if (!file.mimetype.startsWith("image/")) {
            callback(new Error("Apenas arquivos de imagem são permitidos!"));
            return;
        }

        callback(null, true);
    }
});

export default upload;

