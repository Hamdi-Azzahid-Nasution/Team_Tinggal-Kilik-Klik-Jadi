import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import logo from '../../assets/images/logoutama_lengkap2.png';


export default function LoginScreen() {
  return (
    <LinearGradient
      colors={['#EEEFB3', '#C8EFD4']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Logo Section */}
      <View style={styles.heroSection}>
        <Image
          source={logo} // ← ganti nama filenya
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Section - Welcome + Buttons */}
      <View style={styles.bottomSection}>
        <Text style={styles.welcomeTitle}>Selamat Datang!</Text>
        <Text style={styles.welcomeSubtitle}>Langkah Kecil, Cerita Besar</Text>

        <TouchableOpacity
          style={styles.btnMasuk}
          onPress={() => router.push('/(auth)/masuk')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnMasukText}>MASUK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnDaftar}
          onPress={() => router.push('/(auth)/daftar')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnDaftarText}>BUAT AKUN</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <Text style={styles.socialLabel}>Masuk dengan :</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <FontAwesome5 name="google" size={22} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <FontAwesome5 name="facebook" size={22} color="#1877F2" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 48,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',  // center vertikal
    alignItems: 'center',  
  },
  logo: {
    width: 220,
    height: 220,
  },
  appTitle: {
    fontSize: 64,
    fontWeight: '900',
    color: '#1A1A1A',
    lineHeight: 68,
    letterSpacing: -1,
  },
  appSubtitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#1A1A1A',
    letterSpacing: 4,
    marginTop: 4,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 28,
  },
  btnMasuk: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  btnMasukText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#888888',
    letterSpacing: 2,
  },
  btnDaftar: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  btnDaftarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#888888',
    letterSpacing: 2,
  },
  socialLabel: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});