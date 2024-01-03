
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import S3 from "aws-sdk/clients/s3";
import { DeleteObjectsCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/signPrivateFilePutURL', async (req: Request, res: Response) => {

  const client_s3 = new S3({
    region: process.env.S3_BUCKET_REGION,
    accessKeyId: process.env.S3_BUCKET_KEY,
    secretAccessKey: process.env.S3_BUCKET_SECRET,
    signatureVersion: "v4",
  });

  const fileParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.body.file_key,
    Expires: 600,
    ContentType: req.body.type,
  };

  const url = await client_s3.getSignedUrlPromise(
    "putObject",
    fileParams
  );

  res.status(200).json({url});
});

app.post('/signPrivateFileGetURL', async (req: Request, res: Response) => {

  try{
    const s3Client = new S3Client({
      region: process.env.S3_BUCKET_REGION as string,
      credentials: {
          accessKeyId: process.env.S3_BUCKET_KEY as string,
          secretAccessKey: process.env.S3_BUCKET_SECRET as string,
      },
    });
    
    const command = new GetObjectCommand({ Bucket: process.env.S3_BUCKET_NAME, Key: req.body.file_key });

    return res.status(200).json({url:await getSignedUrl(s3Client, command, { expiresIn: 60 })})
    
  }catch(err){
      console.log(err)
      return res.status(400)
    }
});

app.post('/deleteFileFromAWS', async (req: Request, res: Response) => {

  try {
    const s3Client = new S3Client({
      region: process.env.S3_BUCKET_REGION as string,
      credentials: {
          accessKeyId: process.env.S3_BUCKET_KEY as string,
          secretAccessKey: process.env.S3_BUCKET_SECRET as string,
      },
    });
      
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: {
          Objects: [{ Key: req.body.file_key}]
        } 
      }

      await s3Client.send(new DeleteObjectsCommand(params));

    return res.status(200).json({ success: true});
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
