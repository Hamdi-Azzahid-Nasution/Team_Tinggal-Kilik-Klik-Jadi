import { Stack } from 'expo-router';

export default function ScreeningLayout() {
  return (
    <Stack
      screenOptions={{
        // Kita sembunyikan header bawaan karena kamu sudah membuat 
        // header custom (progress bar) di dalam masing-masing file soal.
        headerShown: false,
        
        // Opsional: Memberikan animasi geser saat pindah soal agar lebih smooth
        animation: 'slide_from_right',
      }}
    >
      {/* Daftarkan nama file soal yang kamu miliki. 
          Pastikan "name" sesuai dengan nama file .tsx kamu.
      */}
      <Stack.Screen name="soal-1" />
      <Stack.Screen name="soal-2" />
      <Stack.Screen name="soal-3" />
      <Stack.Screen name="soal-4" />
      <Stack.Screen name="soal-5" />
      <Stack.Screen name="soal-6" />
    </Stack>
  );
}