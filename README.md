# README

Clone the repository:
git clone https://github.com/your-username/back-end-test-vista.git
cd back-end-test-vista

Install dependencies:
npm install
Create .env file based on .env.example:

env
PORT=4000
DATABASE_URL="mysql://root@localhost:3306/vista_test"
Run database migrations (if applicable):
npx sequelize-cli db:migrate

Running the Project
npm run dev   # Development
npm start     # Production
