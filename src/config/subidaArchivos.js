import path from 'node:path';
import multer from 'multer';
import { generarId } from './token.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'src', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, generarId() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
