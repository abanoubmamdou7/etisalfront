
import { supabase } from "@/integrations/supabase/client";
import { Store } from "@/lib/types";

export const fetchStores = async (): Promise<Store[]> => {
  const { data, error } = await supabase
    .from('stores')
    .select('*');
  
  if (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
  
  return data as Store[];
};

export const findStoreById = async (id: string): Promise<Store | null> => {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    if (error.code === 'PGRST116') { // not found error
      return null;
    }
    console.error('Error finding store by id:', error);
    throw error;
  }
  
  return data as Store;
};
