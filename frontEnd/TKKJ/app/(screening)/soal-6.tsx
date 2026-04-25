import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// 1. Tambahkan useLocalSearchParams
import { useLocalSearchParams, router } from 'expo-router';
import { Audio } from 'expo-av';

export default function Soal6Screen() {
  // 2. Ambil skor akumulasi dari soal 1-5
  const { score } = useLocalSearchParams();
  
  const [jawabanTerpilih, setJawabanTerpilih] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const audioFiles = [
    require('../../assets/audio/daku.mpeg'),
    require('../../assets/audio/paku.mpeg'),
  ];

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  async function playSound(index: number) {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setPlayingIndex(null);
      if (playingIndex === index) return;
    }

    try {
      setPlayingIndex(index);
      const { sound: newSound } = await Audio.Sound.createAsync(audioFiles[index]);
      setSound(newSound);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingIndex(null);
        }
      });
    } catch (error) {
      console.log("Gagal memutar audio", error);
    }
  }

  // 3. Buat fungsi handleLanjut untuk hitung skor akhir
  const handleLanjut = () => {
    // Benar jika memilih "tidak"
    const isCorrect = jawabanTerpilih === 'tidak';
    
    // Hitung total skor akhir
    const currentScore = parseInt(score as string || '0');
    const finalScore = isCorrect ? currentScore + 1 : currentScore;

    // Kirim ke halaman selesai menggunakan parameter 'skor' (sesuai soal-selesai.tsx)
    router.push({
      pathname: '/(screening)/soal-selesai',
      params: { skor: finalScore }
    });
  };

  return (
    <LinearGradient colors={['#FDFDE1', '#F4FBE4']} style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <Text style={styles.progressLabel}>6/6</Text>
      </View>

      <Text style={styles.judul}>Dengarkan dua kata berikut!</Text>

      <View style={styles.karakterContainer}>
        <Image
          source={require('../../assets/images/obeng.png')} 
          style={styles.karakterImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.audioSection}>
        {audioFiles.map((_, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.waveCard,
              playingIndex === index && styles.waveCardActive
            ]}
            onPress={() => playSound(index)}
          >
            <Ionicons 
              name={playingIndex === index ? "pause" : "volume-high"} 
              size={28} 
              color={playingIndex === index ? "#FFF" : "#82D4F0"} 
            />
            <View style={styles.wavePlaceholder}>
               <Ionicons name="stats-chart" size={24} color={playingIndex === index ? "#FFF" : "#82D4F0"} />
               <Ionicons name="stats-chart" size={24} color={playingIndex === index ? "#FFF" : "#82D4F0"} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.pertanyaan}>Apakah kedua kata tersebut sama?</Text>

      <View style={styles.rowTombol}>
        <TouchableOpacity
          style={[styles.btnOpsi, styles.btnYa, jawabanTerpilih === 'ya' && styles.selectedYa]}
          onPress={() => setJawabanTerpilih('ya')}
        >
          <Text style={styles.textOpsi}>Ya</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnOpsi, styles.btnTidak, jawabanTerpilih === 'tidak' && styles.selectedTidak]}
          onPress={() => setJawabanTerpilih('tidak')}
        >
          <Text style={styles.textOpsi}>Tidak</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

      {/* 4. Panggil handleLanjut */}
      <TouchableOpacity
        style={[styles.btnNext, !jawabanTerpilih && styles.btnDisabled]}
        onPress={handleLanjut}
        disabled={!jawabanTerpilih}
      >
        <Text style={styles.btnNextText}>Selesai</Text>
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
  judul: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 30 },
  karakterContainer: { alignItems: 'center', marginBottom: 30 },
  karakterImg: { width: 100, height: 150 },
  speechBubble: {
    position: 'absolute',
    right: '15%',
    top: 20,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FEE',
  },
  bubbleLine: { width: 40, height: 2, backgroundColor: '#DDD', marginHorizontal: 10, marginTop: 10 },
  tandaTanya: { fontSize: 22, fontWeight: '900' },
  audioSection: { gap: 15, marginBottom: 35 },
  waveCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FEE',
  },
  waveCardActive: { backgroundColor: '#82D4F0' },
  wavePlaceholder: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 2, marginLeft: 15 },
  pertanyaan: { textAlign: 'center', fontSize: 18, fontWeight: '700', marginBottom: 20 },
  rowTombol: { flexDirection: 'row', justifyContent: 'space-between' },
  btnOpsi: { width: '47%', paddingVertical: 18, borderRadius: 15, alignItems: 'center', elevation: 3 },
  btnYa: { backgroundColor: '#4CAF50' },
  btnTidak: { backgroundColor: '#F44336' },
  selectedYa: { borderWidth: 4, borderColor: '#1B5E20' },
  selectedTidak: { borderWidth: 4, borderColor: '#B71C1C' },
  textOpsi: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  btnNext: { backgroundColor: '#82D4F0', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#BDE8F6' },
  btnNextText: { fontSize: 18, fontWeight: '800', color: '#FFF' },
});