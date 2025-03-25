import { db } from '../db';
import { medicines, customers, doctors } from '@shared/schema';
import { ilike, or } from 'drizzle-orm';

export interface SearchResult {
  medicines: any[];
  customers: any[];
  doctors: any[];
}

export async function search(query: string): Promise<SearchResult> {
  const searchPattern = `%${query}%`;
  
  const [medicinesResults, customersResults, doctorsResults] = await Promise.all([
    // Search medicines
    db.select()
      .from(medicines)
      .where(
        or(
          ilike(medicines.name, searchPattern),
          ilike(medicines.description, searchPattern)
        )
      ),
    
    // Search customers
    db.select()
      .from(customers)
      .where(
        or(
          ilike(customers.name, searchPattern),
          ilike(customers.phone, searchPattern),
          ilike(customers.email, searchPattern)
        )
      ),
    
    // Search doctors
    db.select()
      .from(doctors)
      .where(
        or(
          ilike(doctors.name, searchPattern),
          ilike(doctors.specialization, searchPattern),
          ilike(doctors.phone, searchPattern)
        )
      )
  ]);

  return {
    medicines: medicinesResults,
    customers: customersResults,
    doctors: doctorsResults
  };
}

// Voice search using Web Speech API
export function startVoiceSearch(onResult: (query: string) => void): void {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const query = event.results[0][0].transcript;
      onResult(query);
    };

    recognition.start();
  } else {
    throw new Error('Speech recognition not supported in this browser');
  }
} 