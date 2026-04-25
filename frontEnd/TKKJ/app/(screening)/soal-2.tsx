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
import { router } from 'expo-router';

export default function Soal2Screen() {
  const [jawabanTerpilih, setJawabanTerpilih] = useState<string | null>(null);

  const JAWABAN_BENAR = 'opi';
  const PILIHAN_JAWABAN = ['api', 'opi', 'upi', 'epo'];

  const handleLanjut = () => {
    if (jawabanTerpilih === JAWABAN_BENAR) {
      router.push('/(screening)/soal-3');
    } else {
      Alert.alert('Coba Lagi!', 'Pilihanmu belum tepat, ayo coba lengkapi katanya!');
    }
  };

  return (
    <LinearGradient
      colors={['#FDFDE1', '#F4FBE4']} // Warna background krem ke hijau pucat sesuai gambar
      style={styles.container}
    >
      {/* ── Header & Progress ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '33.3%' }]} />
        </View>
        <Text style={styles.progressLabel}>2/6</Text>
      </View>

      {/* ── Judul Instruksi ── */}
      <Text style={styles.judul}>Pilih jawaban yang benar</Text>

      {/* ── Area Karakter ── */}
      <View style={styles.karakterContainer}>
        <Image
          source={require('../../assets/images/uia.png')}
          style={styles.karakterImg}
          resizeMode="contain"
        />
      </View>

      {/* ── Kartu Soal (Yang ada di bawah karakter) ── */}
      <View style={styles.soalCard}>
        <Text style={styles.soalText}>Jika kata “TOPI” huruf T-nya dihilangkan, jadi kata apa?</Text>
      </View>

      {/* ── Grid 4 Tombol Pilihan Jawaban ── */}
      <View style={styles.gridJawaban}>
        {PILIHAN_JAWABAN.map((opsi, index) => {
          const isSelected = jawabanTerpilih === opsi;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.opsiBtn,
                isSelected && styles.opsiBtnSelected
              ]}
              onPress={() => setJawabanTerpilih(opsi)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.opsiText,
                isSelected && styles.opsiTextSelected
              ]}>
                {opsi}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ flex: 1 }} />

      {/* ── Tombol Lanjut ── */}
      <TouchableOpacity
        style={[styles.btnNext, !jawabanTerpilih && styles.btnDisabled]}
        onPress={handleLanjut}
        disabled={!jawabanTerpilih}
      >
        <Text style={styles.btnNextText}>Lanjut</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  closeBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#82D4F0',
  },
  progressLabel: {
    fontWeight: '800',
    color: '#555',
    fontSize: 14,
  },
  judul: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  karakterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  karakterImg: {
    width: 140,
    height: 160,
  },
  soalCard: {
    
   
    paddingVertical: 12,
    paddingHorizontal: 35,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 40,

  },
  soalText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 2,
  },
  gridJawaban: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  opsiBtn: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  opsiBtnSelected: {
    borderColor: '#82D4F0',
    backgroundColor: '#F0FBFF',
  },
  opsiText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
  },
  opsiTextSelected: {
    color: '#82D4F0',
  },
  btnNext: {
    backgroundColor: '#82D4F0',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },
  btnDisabled: {
    backgroundColor: '#BDE8F6',
    elevation: 0,
  },
  btnNextText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});