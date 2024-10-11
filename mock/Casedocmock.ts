import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


const uploadedFilesDataSource = [
  {
    id: 1,
    fileName: "incident_report.pdf",
    fileDescription: "Incident report for case #12345",
    uploadDate: "2024-01-15",
    uploader: "Officer John Doe",
    referenceType: "ORDINARY_FILE",
    referenceId: "case_12345",
    filePath: "https://nationalpolice.go.ke/sites/default/files/2024-08/Form1.pdf", 
  },
  {
    id: 2,
    fileName: "evidence_photo.jpg",
    fileDescription: "Photo of the crime scene at location XYZ",
    uploadDate: "2024-02-10",
    uploader: "Officer Jane Smith",
    referenceType: "EVIDENCE_FILE",
    referenceId: "case_12346",
    filePath: "https://nationalpolice.go.ke/sites/default/files/2024-08/P3%20%281%29.pdf",
  },
  {
    id: 3,
    fileName: "suspect_statement.pdf",
    fileDescription: "Signed statement from suspect",
    uploadDate: "2024-03-05",
    uploader: "Officer Alan Brown",
    referenceType: "STATEMENT_FILE",
    referenceId: "case_12347",
    filePath: "https://nationalpolice.go.ke/sites/default/files/2024-08/Accident%20Abstract.pdf", 
  },
  {
    id: 4,
    fileName: "vehicle_inspection_report.pdf",
    fileDescription: "Vehicle inspection report for case #12348",
    uploadDate: "2024-04-12",
    uploader: "Officer Mike Johnson",
    referenceType: "INSPECTION_FILE",
    referenceId: "case_12348",
    filePath: "https://nationalpolice.go.ke/sites/default/files/2024-08/abstract%20form%20%281%29.pdf", // Simulated file path
  },
  {
    id: 5,
    fileName: "witness_testimony_audio.mp3",
    fileDescription: "Audio testimony from witness",
    uploadDate: "2024-05-20",
    uploader: "Officer Sarah Lee",
    referenceType: "TESTIMONY_FILE",
    referenceId: "case_12349",
    filePath: "https://nationalpolice.go.ke/sites/default/files/2024-08/FORM%20PC1.pdf", 
  },
];

// Function to get the list of uploaded files
function getUploadedFiles(req: Request, res: Response) {
  return res.json({
    data: uploadedFilesDataSource,
    success: true,
    total: uploadedFilesDataSource.length,
  });
}

// Function to download or view a file
function downloadFile(req: Request, res: Response) {
  const fileId = parseInt(req.params.id);
  const file = uploadedFilesDataSource.find((file) => file.id === fileId);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  const fileLocation = path.join(__dirname, file.filePath); // Path to the file in the server

  // Check if file exists
  if (fs.existsSync(fileLocation)) {
    res.sendFile(fileLocation); // Send the file to the client
  } else {
    return res.status(404).json({ message: "File not found on server" });
  }
}

// Function to post a new uploaded file (without file handling logic)
function postUploadedFile(req: Request, res: Response) {
  const newFile = {
    id: uploadedFilesDataSource.length + 1, // Increment id based on length
    ...req.body,
    uploadDate: new Date().toISOString().split('T')[0],
    filePath: `/files/${req.body.fileName}`, // Assuming the file gets saved here
  };

  uploadedFilesDataSource.push(newFile);
  return res.json({
    success: true,
    data: newFile,
  });
}

export default {
  'GET /api/uploadedFiles': getUploadedFiles,
  'GET /api/uploadedFiles/download/:id': downloadFile, // Route to download/view file
  'POST /api/uploadedFiles': postUploadedFile,
};
