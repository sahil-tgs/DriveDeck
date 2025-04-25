# DriveDeck

A multi-tenant platform for colleges to manage their Training and Placement (T&P) cell activities, inspired by Moodle's architecture.

## Overview

DriveDeck provides a centralized platform where T&P cells can:
- Manage placement drives
- Track company recruitment processes
- Allow students to view and apply for opportunities
- Replace Excel-based management with a proper dashboard

## Tech Stack

- **Frontend**: React.js
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Deployment**: Docker (optional)

## Architecture

Multi-tenant architecture where each college gets its own isolated instance with:
- Dedicated subdomain or URL path
- Separate data isolation
- Customizable branding

## Features

- Multi-tenant support for colleges
- Company management dashboard
- Student portal for applications
- Placement drive tracking
- Analytics and reporting
- Role-based access control

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- WSL/Ubuntu (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sahil-tgs/DriveDeck.git
cd DriveDeck
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Configure environment variables:
- Copy `.env.example` to `.env` in both frontend and backend directories
- Update the values according to your setup

5. Run migrations:
```bash
cd backend
python manage.py migrate
```

6. Start the development servers:

Backend:
```bash
cd backend
python manage.py runserver
```

Frontend:
```bash
cd frontend
npm start
```

## Project Structure

```
DriveDeck/
├── backend/
│   ├── core/           # Core Django app
│   ├── tenants/        # Multi-tenancy logic
│   ├── placements/     # Placement management
│   ├── users/          # User management
│   └── companies/      # Company management
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── public/
└── docs/               # Documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.