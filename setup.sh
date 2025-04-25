#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}DriveDeck Setup Script${NC}"
echo "========================="

# Check if running in project root
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Setup backend
echo -e "\n${YELLOW}Setting up backend...${NC}"
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}Virtual environment created${NC}"
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
echo -e "${GREEN}Backend dependencies installed${NC}"

# Copy environment file
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}Please update backend/.env with your configuration${NC}"
fi

# Setup frontend
echo -e "\n${YELLOW}Setting up frontend...${NC}"
cd ../frontend

# Install dependencies
npm install
echo -e "${GREEN}Frontend dependencies installed${NC}"

# Copy environment file
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}Please update frontend/.env with your configuration${NC}"
fi

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "\nNext steps:"
echo -e "1. Update backend/.env and frontend/.env with your configuration"
echo -e "2. Create PostgreSQL database: ${YELLOW}createdb drivedeck_db${NC}"
echo -e "3. Run migrations: ${YELLOW}cd backend && python manage.py migrate${NC}"
echo -e "4. Create superuser: ${YELLOW}python manage.py createsuperuser${NC}"
echo -e "5. Start backend: ${YELLOW}python manage.py runserver${NC}"
echo -e "6. Start frontend: ${YELLOW}cd ../frontend && npm run dev${NC}"