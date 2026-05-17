const cloudName = 'dorpdfe8d';
const unsignedUploadPreset = 'anger_mgmt_preset';

/**
 * Standardized upload function for Cloudinary
 * Handles Images, Audio, and Video via the /auto/ endpoint.
 */
async function uploadImage(file, publicId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedUploadPreset);
    formData.append('public_id', publicId);

    // Using /auto/ allows Cloudinary to detect if it's an image or audio automatically
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        // This will pass the specific Cloudinary error message to your HTML catch block
        throw new Error(data.error ? data.error.message : 'Unknown Upload Error');
    }

    console.log(`Success! URL: ${data.secure_url}`);
    return data.secure_url;
}