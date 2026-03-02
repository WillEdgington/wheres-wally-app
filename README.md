# Where’s Wally (Photo Tagging App)

A **full-stack photo tagging application** inspired by ***"Where's Wally?"***.
Players must locate hidden characters within large illustrated scenes as quickly as possible. The application **tracks completion time**, **validates click coordinates securely** via a **Rails API**, and maintains a **leaderboard of top scores**.

## Live Demo
[![Demo](https://img.youtube.com/vi/wI-aF3a7mzQ/0.jpg)](https://www.youtube.com/watch?v=wI-aF3a7mzQ)

## Features

- **Multiple illustrated scenes** to choose from
- **Graphical character selection UI** to identify which character you're seaching for
- **Live timer** to track completion speed
- **Leaderboard** displaying top scores across all players for a selected scene
- **Secure character coordinate validation** (hidden character positions are never exposed to the frontend)
- Game session lifecycle managed entirely on the backend

## Tech stack
### Frontend
- React
- Vite
- CSS

### Backend
- Ruby on Rails (API mode)
- PostgreSQL

## Structure

This project is split into two separate applications:
- ``/wheres-wally-frontend`` - React (Vite) frontend
- ``/wheres-wally-api`` - Ruby on Rails API backend

## Design Decisions
- **Decoupled architecture:** Frontend and backend are separate applications, enforcing a clean separation of responsibilities and keeping the project scalable.
- **Cheat-resistant validation:** Character coordinates are stored exclusively in the database and validated server-side, ensuring the client has no influence over game outcomes.
- **Bespoke CSS:** All styling is custom-written with no external UI libraries, prioritising a clean and simple user experience.

## Future Improvements

- Local storage persistence (e.g. preserving scene progress or recent scores)
Client-side routing (splitting the app across dedicated routes such as ``/game`` and ``/leaderboard``)
- User accounts and authenticated leaderboards
- Improved responsiveness across mobile and smaller viewports
- A "relaxed" mode that has no leaderboard or timer so the user can enjoy the application without any competition pressure 

## Contact
Created by [**WillEdgington**](https://github.com/WillEdgington) for a project in the React module of the [**Odin Project**](https://www.theodinproject.com/lessons/react-new-where-s-waldo-a-photo-tagging-app) course.

📧 **willedge037@gmail.com**

🔗 [**LinkedIn**](https://www.linkedin.com/in/williamedgington/)