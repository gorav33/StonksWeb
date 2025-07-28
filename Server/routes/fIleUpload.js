export const FileUpload = (req,res) => {
    const { imageBase64, filename } = req.body;
  if (!imageBase64 || !filename) {
    return res.status(400).json({ error: 'Missing image or filename' });
  }

  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const filePath = path.join(__dirname, 'uploads', filename);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) return res.status(500).json({ error: 'Failed to save image' });
    res.json({ message: 'Image saved successfully', path: `/uploads/${filename}` });
  });
}