# RoomChats - A Room-Based Chat Application

RoomChats is a real-time, room-based chat application that allows users to engage in room conversations. Built with Firebase and React.js, RoomChats provides a seamless, user-friendly experience with authentication via Google Firebase and a UI styled using Tailwind CSS.

## Features

- **Google Firebase Authentication**: Secure sign-in via Google, powered by Firebase Authentication.
- **Room-Based Chats**: Users can join specific chat rooms for messaging.
- **Real-Time Messaging**: Messages are updated instantly, stored in Firebase Cloud Firestore.
- **Responsive Design**: The app is fully responsive and optimized for all device sizes with Tailwind CSS.

## Live Preview

You can view the live preview [here](https://roomchats.netlify.app).

## Technologies Used

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: For handling client-side routing.
- **React Icons**: Icon library used for enhancing UI design.

### Backend
- **Firebase Authentication**: Used for Google authentication and managing user sessions.
- **Firebase Cloud Firestore**: Real-time NoSQL database for storing chat messages and room data.

### Additional Packages
- **universal-cookie**: For managing authentication tokens and cookies.
- **Firebase SDK**: For integrating Firebase services including Authentication and Firestore.

## How to Run the Project Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/roomchats.git
    ```

2. Navigate to the project directory:
    ```bash
    cd roomchats
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up Firebase:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project.
    - Enable Firebase Authentication and Cloud Firestore.

5. Add your Firebase configuration to a `.env` file:
    ```bash
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

6. Run the application:
    ```bash
    npm run dev
    ```