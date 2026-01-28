# Firebase Setup Guide for MediQueue

This guide will help you set up Firebase and run the project in VS Code.

## Step 1: Download the Code

1. Click the **three dots (...)** in the top right corner of the code block
2. Select **"Download ZIP"** to download all project files
3. Extract the ZIP file to a folder on your computer

## Step 2: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter a project name (e.g., "MediQueue")
4. Disable Google Analytics (optional) and click **Create Project**

## Step 3: Enable Authentication

1. In your Firebase project, go to **Build > Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable" and save
4. Enable **Google** authentication:
   - Click on "Google"
   - Toggle "Enable"
   - Add your project support email
   - Save

## Step 4: Create Firestore Database

1. Go to **Build > Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location closest to your users
5. Click **Done**

## Step 5: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"**
3. Click the **Web icon (</>)** to add a web app
4. Enter app nickname (e.g., "MediQueue Web")
5. Click **Register app**
6. Copy the Firebase configuration values

## Step 6: Set Up VS Code

1. Open VS Code
2. Open the extracted project folder: **File > Open Folder**
3. Open the terminal: **Terminal > New Terminal**
4. Install dependencies:

```bash
npm install
```

## Step 7: Create Environment Variables

1. Create a new file called `.env.local` in the project root
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration from Step 5.

## Step 8: Run the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 9: Set Up Firestore Security Rules (Production)

When moving to production, update your Firestore rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Appointments - patients can read their own, doctors can read assigned
    match /appointments/{appointmentId} {
      allow read: if request.auth != null && 
        (resource.data.patientId == request.auth.uid || 
         resource.data.doctorId == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.patientId == request.auth.uid || 
         resource.data.doctorId == request.auth.uid);
    }
    
    // Queue - doctors can manage, patients can read their position
    match /queue/{queueId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Patient history - patients read own, doctors read assigned patients
    match /patientHistory/{historyId} {
      allow read: if request.auth != null && 
        (resource.data.patientId == request.auth.uid || 
         resource.data.doctorId == request.auth.uid);
      allow create: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Make sure your `.env.local` file has the correct API key
- Restart the development server after changing environment variables

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add `localhost` to the list

### Google Sign-in Not Working
- Make sure Google provider is enabled in Firebase Authentication
- Check that your OAuth consent screen is configured in Google Cloud Console

## Project Structure

```
mediqueue/
├── app/                    # Next.js pages
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── book/              # Appointment booking
│   ├── queue/             # Queue status
│   ├── doctor/            # Doctor dashboard
│   └── patient/           # Patient dashboard
├── components/            # Reusable components
├── lib/
│   ├── firebase.ts        # Firebase configuration
│   ├── auth-context.tsx   # Authentication context
│   ├── firestore.ts       # Database operations
│   └── mock-data.ts       # Sample data
└── .env.local             # Environment variables (create this)
```

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
