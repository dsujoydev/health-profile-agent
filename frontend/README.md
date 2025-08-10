# Health & Fitness Assessment Frontend

This is the frontend application for the Health & Fitness Assessment system.

## Features

- Multi-step health assessment form
- Real-time form validation
- AI-powered personalized recommendations
- React Query for state management
- TypeScript for type safety
- Tailwind CSS for styling

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:
   Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

## Backend Setup

Make sure the backend server is running:

1. Navigate to the server directory:

```bash
cd ../server
```

2. Install dependencies:

```bash
pip install -r requirements.txt
# or
uv sync
```

3. Start the server:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Troubleshooting

### API Connection Issues

If you're getting API connection errors:

1. Make sure the backend server is running on port 8000
2. Check that the `VITE_API_URL` environment variable is set correctly
3. Verify the server is accessible at `http://localhost:8000/health`

### Form Validation Issues

If the form is not submitting:

1. Check the browser console for validation errors
2. Make sure all required fields are filled
3. Verify that the form data matches the expected schema

### Assessment Submission Issues

If the assessment is not being submitted:

1. Check the browser console for API call logs
2. Verify the request payload in the Network tab
3. Check the server logs for any errors

## API Endpoints

The frontend communicates with these backend endpoints:

- `POST /api/health/profile/intelligent-assessment` - Submit assessment data
- `POST /api/health/profile/dynamic-greeting` - Get personalized greeting
- `POST /api/health/profile/adaptive-program` - Get program suggestions
- `POST /api/health/profile/progress-guidance` - Get progress guidance

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── modules/
│   └── assesment/      # Assessment module
├── services/           # API service layer
└── lib/               # Utility functions
```

### Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query** - Server state management
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
