"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var storage_blob_1 = require("@azure/storage-blob");
var uuid_1 = require("uuid");
var drizzle_orm_1 = require("drizzle-orm");
var db_1 = require("../drizzle/db");
var schema_1 = require("../drizzle/schema");
var router = express_1.default.Router();
// Multer konfigurasjon for midlertidig lagring
var upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Tillat kun bilde-filer
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Kun bilde-filer er tillatt'));
        }
    },
});
// Azure Blob Storage konfigurasjon
var connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
var containerName = "aino-media";
if (!connectionString) {
    console.error("❌ AZURE_STORAGE_CONNECTION_STRING er ikke satt");
}
var blobServiceClient = connectionString
    ? storage_blob_1.BlobServiceClient.fromConnectionString(connectionString)
    : null;
// GET /api/media - Hent alle media-filer
router.get("/", async (req, res) => {
    try {
        console.log("✅ Backend: GET /api/media - fetching media items...");
        var mediaItems = await db_1.db.select().from(schema_1.media).orderBy(schema_1.media.createdAt);
        console.log(`✅ Found media items: ${mediaItems.length}`);
        res.json(mediaItems);
    }
    catch (error) {
        console.error("🔥 Backend ERROR GET /api/media:", error);
        res.status(500).json({ error: "Kunne ikke hente media-filer" });
    }
});
// POST /api/media/upload - Last opp bilde
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Ingen fil ble sendt" });
        }
        if (!blobServiceClient) {
            return res.status(500).json({ error: "Azure Blob Storage er ikke konfigurert" });
        }
        console.log("✅ Backend: POST /api/media/upload - uploading file:", req.file.originalname);
        // Generer unikt filnavn
        var fileExtension = req.file.originalname.split('.').pop();
        var fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        // Last opp til Azure Blob Storage
        var containerClient = blobServiceClient.getContainerClient(containerName);
        var blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.upload(req.file.buffer, req.file.size, {
            blobHTTPHeaders: {
                blobContentType: req.file.mimetype,
            },
        });
        // Generer URL
        var imageUrl = `https://ainomedia.blob.core.windows.net/${containerName}/${fileName}`;
        // Lagre i database
        var [newMedia] = await db_1.db.insert(schema_1.media).values({
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
    }
    catch (error) {
        console.error("🔥 Backend ERROR POST /api/media/upload:", error);
        res.status(500).json({ error: "Kunne ikke laste opp filen" });
    }
});
// DELETE /api/media/:id - Slett media-fil
router.delete("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        console.log("✅ Backend: DELETE /api/media/:id - deleting media:", id);
        // Hent media fra database
        var mediaItem = await db_1.db.select().from(schema_1.media).where((0, drizzle_orm_1.eq)(schema_1.media.id, parseInt(id))).limit(1);
        if (mediaItem.length === 0) {
            return res.status(404).json({ error: "Media-fil ikke funnet" });
        }
        // Slett fra Azure Blob Storage
        if (blobServiceClient) {
            var containerClient = blobServiceClient.getContainerClient(containerName);
            var fileName = mediaItem[0].url.split('/').pop();
            if (fileName) {
                var blockBlobClient = containerClient.getBlockBlobClient(fileName);
                await blockBlobClient.deleteIfExists();
            }
        }
        // Slett fra database
        await db_1.db.delete(schema_1.media).where((0, drizzle_orm_1.eq)(schema_1.media.id, parseInt(id)));
        console.log("✅ Media deleted successfully");
        res.json({ success: true });
    }
    catch (error) {
        console.error("🔥 Backend ERROR DELETE /api/media/:id:", error);
        res.status(500).json({ error: "Kunne ikke slette media-filen" });
    }
});
exports.default = router;
