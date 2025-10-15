import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configura o Cloudinary com as credenciais do .env
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadImage = async (req, res) => {
  // O middleware 'multer' já deixou o arquivo disponível em req.file
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  try {
    // Converte o buffer do arquivo para um stream legível
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    // Usa um Promise para lidar com o upload em stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'buscar_patas', // Nome da pasta no Cloudinary
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      readableStream.pipe(uploadStream);
    });

    // Retorna a URL segura da imagem para o frontend
    res.status(200).json({ url: result.secure_url });

  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error);
    res.status(500).json({ error: 'Falha ao fazer o upload da imagem.' });
  }
};