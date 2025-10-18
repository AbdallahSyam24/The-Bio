import fs from "fs";
import path from "path";
import * as faceapi from "@vladmandic/face-api";
import { Canvas, Image, ImageData } from "canvas";
import mongoose from "mongoose";
require('../../services/face.model');

const Face = mongoose.model("face_embedded_data");

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });


const classifyFolderImages = async () => {

    await faceapi.nets.tinyFaceDetector.loadFromDisk("./models");
    await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");
    await faceapi.nets.faceRecognitionNet.loadFromDisk("./models");

    // 3️⃣ Fetch known embeddings
    const known = await Face.find();
    const knownEmbeddings = known.map(f => ({
        name: f.name,
        descriptor: new Float32Array(f.embedding)
    }));
    console.log(`📦 Loaded ${knownEmbeddings.length} known faces`);

    // 4️⃣ Loop through all images
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    const results = [];

    for (const file of files) {
        const fullPath = path.join(folderPath, file);
        try {
            const buffer = fs.readFileSync(fullPath);
            const img = await bufferToImage(buffer);

            const detection = await faceapi
                .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection || !detection.descriptor) {
                results.push({ file, match: "No face detected" });
                console.log(`⚠️ No face detected in ${file}`);
                continue;
            }

            const descriptor = detection.descriptor;
            const match = findBestMatch(descriptor, knownEmbeddings);
            results.push({ file, match: match.name, distance: match.distance });
            console.log(`✅ ${file} → ${match.name} (${match.distance.toFixed(3)})`);
        } catch (err) {
            console.error(`❌ Error with ${file}:`, err.message);
        }
    }

    return results;
}

// 🧩 Helper: load image from buffer
async function bufferToImage(buffer) {
    const img = new Image();
    img.src = buffer;
    return img;
}

// 🧮 Helper: compare embeddings
function findBestMatch(descriptor, knownEmbeddings) {
    let best = { name: "Unknown", distance: Infinity };

    for (const k of knownEmbeddings) {
        const dist = faceapi.euclideanDistance(descriptor, k.descriptor);
        if (dist < best.distance) best = { name: k.name, distance: dist };
    }

    // Use 0.6 as threshold (tweak for your dataset)
    if (best.distance > 0.6) best.name = "Unknown";
    return best;
}

export { classifyFolderImages };