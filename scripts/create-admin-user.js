const { createClient } = require('@supabase/supabase-js');

// Credenciales directas para asegurar que funcione sin depender del entorno local por ahora
const supabaseUrl = 'https://fjicwadndsnfqqgddpwh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWN3YWRuZHNuZnFxZ2RkcHdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjU2MjY0OCwiZXhwIjoyMDgyMTM4NjQ4fQ.aPQ2P2BZl6kEDlLjwsPUVBoAgxLVAllGElFiSiqsqNs';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createAdmin() {
    const email = 'a87667330@gmail.com';
    const password = 'TooleroAdmin2025!'; // ¡Guarda esta contraseña!

    console.log(`Intentando crear/verificar usuario admin: ${email}...`);

    // 1. Intentar crear usuario
    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true // Auto-confirmar email
    });

    if (error) {
        console.log('Nota:', error.message);
        if (error.message.includes('already been registered')) {
            console.log('✅ El usuario YA existe. Si no recuerdas la contraseña, cámbiala en el Dashboard de Supabase o pide un reset.');

            // Opcional: Intentar updatear password si ya existe (requiere ID, más complejo buscarlo primero).
            // Vamos a buscar el usuario para confirmar.
            const { data: listData } = await supabase.auth.admin.listUsers();
            const existingUser = listData.users.find(u => u.email === email);
            if (existingUser) {
                const { error: updateError } = await supabase.auth.admin.updateUserById(
                    existingUser.id,
                    { password: password }
                );
                if (!updateError) {
                    console.log('✅ Contraseña actualizada a: ' + password);
                } else {
                    console.error('Error actualizando contraseña:', updateError.message);
                }
            }
        }
    } else {
        console.log('✅ Usuario creado EXITOSAMENTE.');
        console.log('Email:', email);
        console.log('Password:', password);
    }
}

createAdmin();
