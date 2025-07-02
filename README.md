# 🎵 Musync - Modern Music Streaming Platform

**A full-stack music streaming web application built with React.js, Node.js, Tailwind,Firebase and MongoDB**

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎧 Core Music Features
- **Trending Music**: Browse and stream trending songs from Spotify
- **Audio Streaming**: High-quality 30-second preview playback
- **Recently Played**: Track and display user's listening history
- **Custom Playlists**: Create and manage personal playlists
- **Liked Songs**: Save favorite tracks for quick access

### 👤 User Management
- **Firebase Authentication**: Secure login with email/password and Google OAuth
- **User Profiles**: Personalized user accounts with profile pictures
- **Account Types**: Basic and Premium account tiers
- **Persistent Sessions**: Automatic login state management

### 🎨 User Interface
- **Modern Design**: Sleek dark theme with gradient backgrounds
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Interactive Components**: Smooth animations and transitions
- **Music Player**: Full-featured playbar with controls
- **Navigation**: Intuitive sidebar and navbar navigation

### 🔧 Technical Features
- **Real-time Updates**: Live music data from Spotify API
- **Swiper Integration**: Touch-friendly carousels for music browsing
- **State Management**: Efficient React state handling
- **RESTful API**: Clean backend architecture
- **Database Integration**: MongoDB for user data persistence

## 🛠 Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **React Router 7.6.2** - Client-side routing
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Axios 1.10.0** - HTTP client for API requests
- **Swiper 11.2.8** - Touch-enabled sliders
- **React Icons 5.5.0** - Icon library
- **Vite 6.3.5** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.0** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt 6.0.0** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

### Authentication & External Services
- **Firebase Auth 11.9.1** - User authentication
- **Spotify Web API** - Music data and streaming
- **NoCodeAPI** - Spotify API wrapper

### Development Tools
- **ESLint** - Code linting
- **dotenv** - Environment variables
- **Git** - Version control

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   External      │
│   (React)       │◄──►│   (Express)     │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • User Auth     │    │ • REST API      │    │ • Spotify API   │
│ • Music Player  │    │ • User Mgmt     │    │ • Firebase Auth │
│ • UI Components │    │ • Music Data    │    │ • MongoDB Atlas │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm
- MongoDB database
- Firebase project
- Spotify API access (via NoCodeAPI)

### Clone Repository
```bash
git clone https://github.com/puneetkr-06/musync.git
cd musync
```

### Backend Setup
```bash
cd Backend
npm install
```

### Frontend Setup
```bash
cd Frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the Backend directory:

```env
# Database
DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/musync

# Server
PORT=4000

# Spotify API (via NoCodeAPI)
SPOTIFY_API_KEY=your_nocode_api_key
```

### Frontend Firebase Configuration
Update `src/firebase/firebase.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 🎯 Usage

### Development Mode

1. **Start Backend Server**
```bash
cd Backend
npm start
# Server runs on http://localhost:4000
```

2. **Start Frontend Development Server**
```bash
cd Frontend
npm run dev
# Application runs on http://localhost:5173
```

### User Journey

1. **Authentication**: Sign up or login with email/password or Google
2. **Explore Music**: Browse trending songs on the home page
3. **Play Music**: Click "Listen Now" to stream 30-second previews
4. **Track History**: Recently played songs are automatically saved
5. **Manage Account**: View profile and account settings

## 📡 API Documentation

### Base URL
```
http://localhost:4000
```

### Authentication Endpoints

#### Register User
```http
POST /user/register
Content-Type: application/json

{
  "firebaseUid": "string",
  "name": "string",
  "email": "string",
  "photoURL": "string"
}
```

#### Login User
```http
POST /user/login
Content-Type: application/json

{
  "firebaseUid": "string"
}
```

### Music Endpoints

#### Get Trending Songs
```http
GET /musync/trending
```

Response:
```json
{
  "trending": [
    {
      "id": "string",
      "name": "string",
      "image": "string",
      "artists": "string",
      "preview_url": "string"
    }
  ]
}
```

### User Data Endpoints

#### Add to Recently Played
```http
POST /user/recent
Content-Type: application/json

{
  "userId": "string",
  "song": {
    "name": "string",
    "artists": "string",
    "image": "string",
    "preview_url": "string"
  }
}
```

#### Get Recently Played
```http
GET /user/recent/:userId
```

## 📁 Project Structure

```
Musync/
├── Backend/                     # Node.js backend application
│   ├── controllers/            # Business logic controllers
│   │   ├── user_controller.js
│   │   ├── trending_controller.js
│   │   ├── recentlyPlayed_controller.js
│   │   └── categories_controller.js
│   ├── models/                 # Database models
│   │   └── user.js
│   ├── routes/                 # API route definitions
│   │   ├── user_route.js
│   │   └── spotify_auth_route.js
│   ├── middlewares/           # Custom middleware
│   │   └── user_auth.js
│   ├── db/                    # Database configuration
│   │   └── db.js
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   └── package.json
│
├── Frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Banner/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   ├── Playbar/
│   │   │   ├── RecentlyPlayed/
│   │   │   ├── TopCharts/
│   │   │   ├── BiggestHits/
│   │   │   ├── TopStreamedArtists/
│   │   │   └── SongSlider/
│   │   ├── pages/             # Page components
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   └── Signup/
│   │   ├── utils/             # Utility functions
│   │   │   ├── audioPlayer.js
│   │   │   └── updateRecentlyPlayed.js
│   │   ├── firebase/          # Firebase configuration
│   │   │   └── firebase.js
│   │   ├── assets/            # Static assets
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── public/                # Public assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── README.md                  # Project documentation
└── .gitignore                # Git ignore rules
```

## 🔮 Future Enhancements

### Planned Features
- **Full Song Streaming**: Complete track playback (requires premium Spotify API)
- **Social Features**: Friend system and shared playlists
- **Advanced Search**: Search by artist, album, genre
- **Offline Mode**: Download and cache songs for offline listening
- **Music Recommendations**: AI-powered song suggestions
- **Lyrics Integration**: Real-time lyrics display
- **Mobile App**: React Native mobile application

### Technical Improvements
- **Performance**: Implement lazy loading and code splitting
- **Testing**: Add comprehensive unit and integration tests
- **Caching**: Implement Redis for improved performance
- **Deployment**: Docker containerization and CI/CD pipelines
- **Analytics**: User behavior tracking and insights

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Update documentation for new features
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Puneet Kumar
- **Contact**: puneetkr.06@gmai.com
- **GitHub**: [https://github.com/puneetkr-06]

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [NoCodeAPI](https://nocodeapi.com/) for simplified API access
- [Firebase](https://firebase.google.com/) for authentication services
- [Tailwind CSS](https://tailwindcss.com/) for styling framework
- [React](https://reactjs.org/) team for the amazing library

---

**Happy Streaming! 🎵**

*Built with ❤️ and lots of ☕*

