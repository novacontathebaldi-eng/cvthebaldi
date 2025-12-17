
import { createClient } from '@supabase/supabase-js';

// Load env vars manually since we are running this as a standalone script
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'YOUR_SUPABASE_URL') {
    console.error('Error: Environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

async function testConnection() {
    console.log('Testing Supabase Connection...');
    console.log(`Target ID: ${SETTINGS_ID}`);

    // 1. Try to READ
    console.log('\n--- ATTEMPTING READ ---');
    const { data: readData, error: readError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', SETTINGS_ID);

    if (readError) {
        console.error('READ FAILED:', readError);
    } else {
        console.log('READ SUCCESS:', readData);
        if (readData.length === 0) {
            console.warn('WARNING: Row not found. This might be why it is not loading.');
        }
    }

    // 2. Try to WRITE (Upsert)
    console.log('\n--- ATTEMPTING WRITE (UPSERT) ---');
    const payload = {
        id: SETTINGS_ID,
        office: { test_write: new Date().toISOString() }
    };

    const { data: writeData, error: writeError } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'id' })
        .select();

    if (writeError) {
        console.error('WRITE FAILED:', writeError);
        console.error('Possible Causes: RLS Policies, Table does not exist, Invalid permissions.');
    } else {
        console.log('WRITE SUCCESS:', writeData);
    }
}

testConnection();
