# DocuMind AI - Document Management System

A modern document management and AI-powered document processing application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 📊 Real-time Dashboard
- **Live Statistics**: View real-time document processing statistics
- **Recent Activity**: See recent uploads, queries, and processing activities
- **Processing Status**: Monitor document processing progress
- **Upload Queue**: Manage document upload queue with real-time updates

### 📁 Document Upload & Storage
- **Drag & Drop Upload**: Easy file upload with drag and drop support
- **Multiple File Types**: Support for PDF, PNG, JPG, TIFF, DOCX files
- **Local Storage**: Documents are stored in browser localStorage for persistence
- **Progress Tracking**: Real-time upload progress with visual indicators
- **File Management**: Remove, retry, and manage uploaded documents

### 🔍 Document Processing
- **OCR Processing**: Simulated OCR processing with confidence scores
- **Status Tracking**: Track processing status (uploading, processing, completed, error)
- **Queue Management**: View and manage processing queue
- **Error Handling**: Retry failed uploads and processing

### 📈 Analytics & Insights
- **Storage Usage**: Track total storage used by uploaded documents
- **Processing Time**: Monitor average processing times
- **Activity History**: View detailed activity logs
- **Document Statistics**: Real-time document count and processing metrics

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with localStorage persistence
- **TypeScript**: Full type safety throughout the application
- **Icons**: Lucide React icons

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Usage

### Uploading Documents
1. Navigate to the "Upload" section in the sidebar
2. Drag and drop files or click "Choose Files"
3. Monitor upload progress in real-time
4. View uploaded documents in the processing queue

### Dashboard Features
- **Dashboard Stats**: View real-time statistics about your documents
- **Recent Activity**: See latest uploads and processing activities
- **Processing Status**: Monitor document processing progress
- **Upload Queue**: Manage and track document uploads

### Document Management
- **Remove Documents**: Click the trash icon to remove documents
- **Retry Failed Uploads**: Click the retry icon for failed uploads
- **View Processing Status**: See real-time processing progress
- **Download Completed Documents**: Access processed documents

## Data Persistence

All document data is stored in browser localStorage, including:
- Document metadata (name, size, type, status)
- Processing progress and status
- Activity history
- Dashboard statistics

## File Support

Supported file types:
- **PDF**: `.pdf`
- **Images**: `.png`, `.jpg`, `.jpeg`, `.tiff`
- **Documents**: `.docx`

Maximum file size: 50MB per file

## Development

### Project Structure
```
my-app/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and storage
└── public/              # Static assets
```

### Key Components
- `DashboardStats`: Real-time statistics display
- `RecentActivity`: Activity feed with real-time updates
- `ProcessingStatus`: Document processing status
- `UploadQueue`: Document queue management
- `DocumentUpload`: File upload interface

### Storage System
- `lib/storage.ts`: localStorage management with TypeScript interfaces
- `hooks/use-documents.ts`: Real-time document state management
- Automatic data persistence and real-time updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
