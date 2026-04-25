import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SelesaiScreen() {
  const { skor } = useLocalSearchParams();
  const totalSoal = 6;
  const nilaiBenar = parseInt(skor as string) || 0;

  // Logika penentuan status (contoh: jika benar < 4, indikasi risiko tinggi)
  const isBeresiko = nilaiBenar < 4;

  return (
    <LinearGradient colors={['#FDFDE1', '#F4FBE4']} style={styles.container}>
      <View style={styles.card}>
        <Ionicons 
          name={isBeresiko ? "alert-circle" : "checkmark-circle"} 
          size={80} 
          color={isBeresiko ? "#F44336" : "#4CAF50"} 
        />
        
        <Text style={styles.statusTitle}>
          {isBeresiko ? "Perlu Perhatian Khusus" : "Luar Biasa!"}
        </Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Skor Kamu:</Text>
          <Text style={styles.scoreValue}>{nilaiBenar} / {totalSoal}</Text>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {isBeresiko 
              ? "Berdasarkan hasil screening, terdapat indikasi kesulitan dalam pengolahan fonologis atau visual. Kami menyarankan untuk melakukan konsultasi lebih lanjut dengan ahli."
              : "Hasil screening menunjukkan kemampuan yang baik dalam pengolahan kata dan suara. Tetap semangat belajar ya!"}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.btnHome} 
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.btnText}>Kembali ke Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnUlang} 
          onPress={() => router.replace('/(screening)/soal-1')}
        >
          <Text style={styles.btnUlangText}>Ulangi Screening</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
  },
  scoreContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#82D4F0',
  },
  resultBox: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 30,
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    textAlign: 'center',
  },
  btnHome: {
    backgroundColor: '#82D4F0',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  btnUlang: {
    paddingVertical: 10,
  },
  btnUlangText: {
    color: '#82D4F0',
    fontWeight: '700',
    fontSize: 14,
  }
});