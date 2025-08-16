// index.ts

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import users from './routes/users';
import companies from './routes/companies';
import complaints from './routes/complaints';
import auth from './routes/auth';
import adminRoutes from './routes/admins';
import claudeRoutes from './routes/claude';
import documents from './routes/documents';
import companySearch from './routes/company-search';

// Load env from default .env first
dotenv.config();
// Additionally try to load from common monorepo locations (.env.local)
// These calls are safe if the files don't exist
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/companies', companies);
app.use('/api/company-search', companySearch);
app.use('/api/complaints', complaints);
app.use('/api/admin', adminRoutes);
app.use('/api/claude', claudeRoutes);
app.use('/api/documents', documents);


app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
