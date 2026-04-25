import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

export default function Soal5Screen() {
  // 1. Ambil skor dari soal sebelumnya
  const { score } = useLocalSearchParams();
  
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const pilihan = ['DUKU', 'BUKU', 'BUKU', 'bUkU'];
  const TARGET_JUMLAH = 3;

  const togglePilihan = (index: number) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter((i) => i !== index));
    } else {
      setSelectedOptions([...selectedOptions, index]);
    }
  };

  // 2. Buat fungsi handleLanjut untuk validasi dan hitung skor
  const handleLanjut = () => {
    if (selectedOptions.length === TARGET_JUMLAH) {
      // Benar jika pilihan yang diambil TIDAK mengandung index 0 ("DUKU")
      const isCorrect = !selectedOptions.includes(0);
      
      // Akumulasi skor
      const currentScore = parseInt(score as string || '0');
      const newScore = isCorrect ? currentScore + 1 : currentScore;

      router.push({
        pathname: '/(screening)/soal-6',
        params: { score: newScore }
      });
    } else {
      Alert.alert(
        'Pilih 3 Jawaban',
        `Kamu harus memilih tepat ${TARGET_JUMLAH} kata untuk melanjutkan.`
      );
    }
  };

  return (
    <LinearGradient colors={['#FDFDE1', '#F4FBE4']} style={styles.container}>
      
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '83.3%' }]} />
        </View>
        <Text style={styles.progressLabel}>5/6</Text>
      </View>

      <Text style={styles.judul}>Pilih jawaban yang benar</Text>

      <View style={styles.karakterContainer}>
        <Image
          source={require('../../assets/images/brain.png')} 
          style={styles.karakterImg}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.instruksi}>Pilih kata yang sama dengan “BUKU”</Text>

      <View style={styles.pilihanWrapper}>
        <View style={styles.row}>
          {pilihan.slice(0, 3).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cardOpsi,
                selectedOptions.includes(index) && styles.cardSelected
              ]}
              onPress={() => togglePilihan(index)}
            >
              <Text style={styles.wordText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={[styles.row, { justifyContent: 'center', marginTop: 15 }]}>
          <TouchableOpacity
            style={[
              styles.cardOpsi,
              selectedOptions.includes(3) && styles.cardSelected
            ]}
            onPress={() => togglePilihan(3)}
          >
            <Text style={styles.wordText}>{pilihan[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* 3. Gunakan handleLanjut pada tombol */}
      <TouchableOpacity
        style={[
          styles.btnNext, 
          selectedOptions.length !== TARGET_JUMLAH && styles.btnDisabled
        ]}
        onPress={handleLanjut}
      >
        <Text style={styles.btnNextText}>Lanjut</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 50, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  progressTrack: { flex: 1, height: 12, backgroundColor: '#E0E0E0', borderRadius: 6, marginHorizontal: 15, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#82D4F0' },
  progressLabel: { fontWeight: '800', color: '#555' },
  judul: { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  karakterContainer: { alignItems: 'center', marginBottom: 20 },
  karakterImg: { width: 180, height: 180 },
  instruksi: { textAlign: 'center', fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 30 },
  pilihanWrapper: { width: '100%' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  cardOpsi: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#82D4F0',
    backgroundColor: '#F0FBFF',
  },
  wordText: { fontSize: 22, fontWeight: '900', color: '#000' },
  btnNext: { backgroundColor: '#82D4F0', paddingVertical: 18, borderRadius: 16, alignItems: 'center', elevation: 3 },
  btnDisabled: { backgroundColor: '#BDE8F6', elevation: 0 },
  btnNextText: { fontSize: 18, fontWeight: '800', color: '#FFF' },
});