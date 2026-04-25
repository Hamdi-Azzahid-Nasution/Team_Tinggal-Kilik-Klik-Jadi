import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function KonfirmasiScreen() {
  const handleIya = () => {
    // TODO: arahkan ke halaman test disleksia
    router.replace('/(screening)/soal-1'); // ganti dengan route test disleksia nanti
  };

  const handleTidak = () => {
    router.replace('/(auth)/login');
  };

  return (
    <LinearGradient
      colors={['#EEEFB3', '#C8EFD4']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Tombol silang pojok kanan atas */}
      <TouchableOpacity style={styles.closeBtn} onPress={handleTidak} activeOpacity={0.7}>
        <Ionicons name="close" size={22} color="#555555" />
      </TouchableOpacity>

      {/* Konten tengah */}
      <View style={styles.content}>
        {/* Ikon ilustrasi */}
        <View style={styles.iconCircle}>
          <Ionicons name="document-text-outline" size={48} color="#2B7FD4" />
        </View>

        {/* Teks */}
        <Text style={styles.title}>Akun Berhasil Dibuat!</Text>
        <Text style={styles.subtitle}>
          Apakah kamu ingin mengikuti{'\n'}
          <Text style={styles.highlight}>Tes Disleksia</Text> sekarang?
        </Text>
        <Text style={styles.desc}>
          Tes ini membantu kami memahami kebutuhan belajarmu
          agar pengalaman lebih personal dan optimal.
        </Text>

        {/* Tombol */}
        <TouchableOpacity style={styles.btnIya} onPress={handleIya} activeOpacity={0.85}>
          <Text style={styles.btnIyaText}>IYA, MULAI TES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnTidak} onPress={handleTidak} activeOpacity={0.85}>
          <Text style={styles.btnTidakText}>Nanti saja</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 56,
    paddingBottom: 48,
  },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#2B7FD4',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444444',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  highlight: {
    fontWeight: '700',
    color: '#2B7FD4',
  },
  desc: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  btnIya: {
    width: width - 56,
    backgroundColor: '#82D4F0',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#82D4F0',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  btnIyaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3A3A3A',
    letterSpacing: 2,
  },
  btnTidak: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnTidakText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
});