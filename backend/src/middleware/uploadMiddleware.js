import multer from 'multer';

// Configura o multer para armazenar o arquivo em memória como um buffer
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB por arquivo
  },
  fileFilter: (req, file, cb) => {
    // Filtra para aceitar apenas imagens
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo inválido. Apenas imagens são permitidas.'), false);
    }
  }
});

// Exporta o middleware configurado para um único arquivo com o nome image
export const uploadSingleImage = upload.single('image');