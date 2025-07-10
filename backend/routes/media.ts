import express, { Request } from "express";
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import { db } from "../drizzle/db";
import { media } from "../drizzle/schema";

interface MulterRequest extends Request {
  file?: Express.Multer.File
}

const router = express.Router();

// Multer konfigurasjon for midlertidig lagring
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Tillat kun bilde-filer
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Kun bilde-filer er tillatt'));
    }
  },
});

// Azure Blob Storage konfigurasjon
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "aino-media";

if (!connectionString) {
  console.error("❌ AZURE_STORAGE_CONNECTION_STRING er ikke satt");
}

const blobServiceClient = connectionString 
  ? BlobServiceClient.fromConnectionString(connectionString)
  : null;

// GET /api/media - Hent alle media-filer
router.get("/", async (req, res) => {
  try {
    console.log("✅ Backend: GET /api/media - fetching media items...");
    
    const mediaItems = await db.select().from(media).orderBy(media.createdAt);
    
    console.log(`✅ Found media items: ${mediaItems.length}`);
    res.json(mediaItems);
  } catch (error) {
    console.error("🔥 Backend ERROR GET /api/media:", error);
    res.status(500).json({ error: "Kunne ikke hente media-filer" });
  }
});

// POST /api/media/upload - Last opp bilde
router.post("/upload", upload.single("file"), async (req: MulterRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Ingen fil ble sendt" });
    }

    if (!blobServiceClient) {
      return res.status(500).json({ error: "Azure Blob Storage er ikke konfigurert" });
    }

    console.log("✅ Backend: POST /api/media/upload - uploading file:", req.file.originalname);

    // Generer unikt filnavn
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Last opp til Azure Blob Storage
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    
    await blockBlobClient.upload(req.file.buffer, req.file.size, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype,
      },
    });

    // Generer URL
    const imageUrl = `https://ainomedia.blob.core.windows.net/${containerName}/${fileName}`;

    // Lagre i database
    const [newMedia] = await db.insert(media).values({
      filename: req.file.originalname,
      url: imageUrl,
      type: req.file.mimetype,
      tags: req.body.tags || null,
    }).returning();

    console.log("✅ File uploaded successfully:", imageUrl);
    res.json({
      success: true,
      media: newMedia,
      url: imageUrl,
    });

  } catch (error) {
    console.error("🔥 Backend ERROR POST /api/media/upload:", error);
    res.status(500).json({ error: "Kunne ikke laste opp filen" });
  }
});

// DELETE /api/media/:id - Slett media-fil
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("✅ Backend: DELETE /api/media/:id - deleting media:", id);

    // Hent media fra database
    const mediaItem = await db.select().from(media).where(media.id.equals(parseInt(id))).limit(1);
    
    if (mediaItem.length === 0) {
      return res.status(404).json({ error: "Media-fil ikke funnet" });
    }

    // Slett fra Azure Blob Storage
    if (blobServiceClient) {
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const fileName = mediaItem[0].url.split('/').pop();
      if (fileName) {
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.deleteIfExists();
      }
    }

    // Slett fra database
    await db.delete(media).where(media.id.equals(parseInt(id)));

    console.log("✅ Media deleted successfully");
    res.json({ success: true });

  } catch (error) {
    console.error("🔥 Backend ERROR DELETE /api/media/:id:", error);
    res.status(500).json({ error: "Kunne ikke slette media-filen" });
  }
});

export default router; 