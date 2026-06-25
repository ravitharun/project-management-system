const multer = require("multer");

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// Image filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};
// Upload Custom Backgrounf Image 
const BackgroundfileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};
// Upload Custom workspace Icon Image 
const WorkspaceIconfileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

// PDF filter
const PdffileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};
// Task PDF Upload Filter
const TaskPdfUploadFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};
// CustomWallpaper Upload Filter
const CustomWallpaperFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};


// Upload instances
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

const Pdfupload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: PdffileFilter
});
const uploadWorkspaceWallpaper = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: BackgroundfileFilter
});
const uploadWorkspaceIcon = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: WorkspaceIconfileFilter
});
const uploadTaskPdfUploadFilter = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: TaskPdfUploadFilter
});
const uploadCustomWallpaperTaskFilter = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: CustomWallpaperFilter
});




module.exports = { upload, Pdfupload, uploadWorkspaceWallpaper, uploadWorkspaceIcon, uploadTaskPdfUploadFilter,uploadCustomWallpaperTaskFilter };