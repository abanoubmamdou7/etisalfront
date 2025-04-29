import { mssqlClient } from '@/lib/sqlClient';
import { StoreSetup } from '@/lib/setup-types';

export const fetchStoreSetups = async (): Promise<StoreSetup[]> => {
  try {
    const result = await mssqlClient
      .from('store_setup')
      .select('*')
      .order('store_code')
      .get();

    return result.map(store => ({
      id: store.id,
      storeCode: store.store_code,
      storeEngName: store.store_eng_name,
      storeArName: store.store_ar_name,
      createdAt: store.created_at
    }));
  } catch (error) {
    console.error('Error fetching store setups:', error);
    throw error;
  }
};

export const addStoreSetup = async (store: Omit<StoreSetup, 'id' | 'createdAt'>): Promise<StoreSetup> => {
  try {
    const [inserted] = await mssqlClient
      .from('store_setup')
      .insert({
        store_code: store.storeCode,
        store_eng_name: store.storeEngName,
        store_ar_name: store.storeArName
      })
      .returning('*');

    return {
      id: inserted.id,
      storeCode: inserted.store_code,
      storeEngName: inserted.store_eng_name,
      storeArName: inserted.store_ar_name,
      createdAt: inserted.created_at
    };
  } catch (error) {
    console.error('Error adding store setup:', error);
    throw error;
  }
};

export const updateStoreSetup = async (store: StoreSetup): Promise<StoreSetup> => {
  try {
    const [updated] = await mssqlClient
      .from('store_setup')
      .where('id', store.id)
      .update({
        store_code: store.storeCode,
        store_eng_name: store.storeEngName,
        store_ar_name: store.storeArName
      })
      .returning('*');

    return {
      id: updated.id,
      storeCode: updated.store_code,
      storeEngName: updated.store_eng_name,
      storeArName: updated.store_ar_name,
      createdAt: updated.created_at
    };
  } catch (error) {
    console.error('Error updating store setup:', error);
    throw error;
  }
};

export const deleteStoreSetup = async (id: string): Promise<void> => {
  try {
    await mssqlClient
      .from('store_setup')
      .where('id', id)
      .delete();
  } catch (error) {
    console.error('Error deleting store setup:', error);
    throw error;
  }
};
