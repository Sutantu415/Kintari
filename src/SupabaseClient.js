import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const getStories = async (term) => {
    try {
        let query = supabase
            .from('Stories')
            .select(`
                id,
                name,
                image,
                color,
                Countries (
                    name
                ),
                Themes (
                    name
                )
            `)
        
        if (term) {
            query = query.ilike('name', `%${term}%`);
        }

        const { data, error } = await query;
            
        if (error) {
            throw error;
        }
        
        return data || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
}