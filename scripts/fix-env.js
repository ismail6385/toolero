const fs = require('fs');
const path = require('path');

const content = `NEXT_PUBLIC_SUPABASE_URL=https://fjicwadndsnfqqgddpwh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWN3YWRuZHNuZnFxZ2RkcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjI2NDgsImV4cCI6MjA4MjEzODY0OH0.1kBAARvH6pe1jdBOUUVMjtOW6uz5OksRqKFMPxzAVZQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWN3YWRuZHNuZnFxZ2RkcHdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjU2MjY0OCwiZXhwIjoyMDgyMTM4NjQ4fQ.aPQ2P2BZl6kEDlLjwsPUVBoAgxLVAllGElFiSiqsqNs
ADMIN_EMAIL=a87667330@gmail.com`;

const filePath = path.join(__dirname, '..', '.env.local');

try {
    fs.writeFileSync(filePath, content.trim(), 'utf8');
    console.log('Successfully updated .env.local with ADMIN_EMAIL');
} catch (e) {
    console.error('Error writing .env.local:', e);
    process.exit(1);
}
