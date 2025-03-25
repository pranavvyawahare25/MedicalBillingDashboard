export interface SearchResult {
  medicines: any[];
  customers: any[];
  doctors: any[];
}

export function startVoiceSearch(onResult: (transcript: string) => void): void {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  } else {
    throw new Error('Speech recognition not supported in this browser');
  }
} 