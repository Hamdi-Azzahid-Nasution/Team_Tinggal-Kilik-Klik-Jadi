import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Audio } from 'expo-av';

export default function Soal3Screen() {
  const [jawaban, setJawaban] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Daftar file audio untuk 4 speaker (sesuaikan path-nya)
  const audioFiles = [
    require('../../assets/audio/opsi_1.mp3'), // misal: "api"
    require('../../assets/audio/opsi_2.mp3'), // misal: "opi" (Benar)
    require('../../assets/audio/opsi_3.mp3'), // misal: "upi"
    require('../../assets/audio/opsi_4.mp3'), // misal: "epo"
  ];

  // Membersihkan sound saat pindah halaman
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  async function playSound(index: number) {
    // 1. Berhentikan suara yang sedang berbunyi jika ada
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    setPlayingIndex(index);

    // 2. Load dan putar suara baru
    const { sound: newSound } = await Audio.Sound.createAsync(audioFiles[index]);
    setSound(newSound);

    await newSound.playAsync();

    // Reset icon saat suara selesai
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setPlayingIndex(null);
      }
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#FDFDE1', '#F4FBE4']} style={styles.container}>
        
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#555" />
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressLabel}>3/6</Text>
        </View>

        <Text style={styles.judul}>Pilih jawaban yang benar</Text>

        {/* ── Area Karakter & Bubble Jawaban ── */}
        <View style={styles.mainSection}>
          <Image
            source={require('../../assets/images/fibicupi2.png')}
            style={styles.karakterImg}
            resizeMode="contain"
          />

          {/* Bubble Chat untuk Isi Jawaban */}
          <View style={styles.speechBubble}>
            <Text style={styles.bubbleText}>Ini adalah</Text>
            <TextInput
              style={styles.inputField}
              placeholder="..."
              value={jawaban}
              onChangeText={setJawaban}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Ekor Bubble */}
            <View style={styles.bubbleTail} />
          </View>
        </View>

        {/* ── Kotak Putih dengan 4 Speaker ── */}
        <View style={styles.speakerCard}>
          <View style={styles.speakerRow}>
            {audioFiles.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.speakerBtn,
                  playingIndex === index && styles.speakerBtnActive
                ]}
                onPress={() => playSound(index)}
              >
                <Ionicons 
                  name={playingIndex === index ? "pause" : "volume-high"} 
                  size={32} 
                  color={playingIndex === index ? "#FFF" : "#82D4F0"} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* ── Tombol Lanjut ── */}
        <TouchableOpacity
          style={[styles.btnNext, !jawaban.trim() && styles.btnDisabled]}
          onPress={() => {
            if (jawaban.toLowerCase().trim() === 'opi') {
              router.push('/(screening)/soal-4');
            } else {
              alert('Jawaban kurang tepat, coba lagi ya!');
            }
          }}
          disabled={!jawaban.trim()}
        >
          <Text style={styles.btnNextText}>Lanjut</Text>
        </TouchableOpacity>

      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 50, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  progressTrack: { flex: 1, height: 12, backgroundColor: '#E0E0E0', borderRadius: 6, marginHorizontal: 15, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#82D4F0' },
  progressLabel: { fontWeight: '800', color: '#555' },
  judul: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 30 },
  
  /* Layout Karakter & Bubble */
  mainSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  karakterImg: { width: 100, height: 130 },
  speechBubble: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    position: 'relative',
  },
  bubbleTail: {
    position: 'absolute',
    left: -10,
    top: 20,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: '#FFF',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
  },
  bubbleText: { fontSize: 16, fontWeight: '700', color: '#444', marginRight: 8 },
  inputField: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#82D4F0',
    borderBottomWidth: 2,
    borderBottomColor: '#EEE',
    paddingBottom: 2,
  },

  /* Speaker Card */
  speakerCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 3,
  },
  speakerRow: { flexDirection: 'row', justifyContent: 'space-around' },
  speakerBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0FBFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0F4F9',
  },
  speakerBtnActive: {
    backgroundColor: '#82D4F0',
  },

  /* Button */
  btnNext: { backgroundColor: '#82D4F0', paddingVertical: 18, borderRadius: 16, alignItems: 'center', elevation: 3 },
  btnDisabled: { backgroundColor: '#BDE8F6', elevation: 0 },
  btnNextText: { fontSize: 18, fontWeight: '800', color: '#FFF' },
});