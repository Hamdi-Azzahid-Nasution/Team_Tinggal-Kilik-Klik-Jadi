import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function VerifEmailScreen() {
  const [kode, setKode] = useState(['', '', '', '']);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newKode = [...kode];
    newKode[index] = digit;
    setKode(newKode);

    // Auto focus next
    if (digit && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    // Auto dismiss keyboard saat digit terakhir diisi
    if (digit && index === 3) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !kode[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isComplete = kode.every((k) => k !== '');

  const handleVerifikasi = () => {
    if (!isComplete) return;
    Keyboard.dismiss();
    // TODO: verifikasi kode OTP ke server
    router.push('/(auth)/reset-password');
  };

  const handleKirimUlang = () => {
    setKode(['', '', '', '']);
    inputs.current[0]?.focus();
    // TODO: kirim ulang kode OTP
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#EEEFB3', '#C8EFD4']}
        style={styles.flex}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Verifikasi Email</Text>
              <Text style={styles.headerSubtitle}>
                Masukkan 4 digit kode yang dikirimkan{'\n'}ke email Anda
              </Text>
            </View>
          </View>

          {/* OTP Input */}
          <View style={styles.otpRow}>
            {kode.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { if (ref) inputs.current[index] = ref; }}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor="#82D4F0"
                returnKeyType="done"
              />
            ))}
          </View>

          {/* Kirim ulang */}
          <View style={styles.kirimUlangRow}>
            <Text style={styles.kirimUlangText}>Jika belum menerima kode ! </Text>
            <TouchableOpacity onPress={handleKirimUlang}>
              <Text style={styles.kirimUlangLink}>Kirim ulang</Text>
            </TouchableOpacity>
          </View>

          {/* Tombol Verifikasi */}
          <TouchableOpacity
            style={[styles.btn, !isComplete && styles.btnDisabled]}
            onPress={handleVerifikasi}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>VERIFIKASI DAN PROSES</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 56,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  backArrow: {
    fontSize: 26,
    color: '#1A1A1A',
    lineHeight: 30,
    marginLeft: -2,
  },
  headerText: { flex: 1 },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },

  /* OTP */
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  otpBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  otpBoxFilled: {
    borderWidth: 2,
    borderColor: '#82D4F0',
  },

  /* Kirim ulang */
  kirimUlangRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  kirimUlangText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  kirimUlangLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F472B6',
  },

  /* Button */
  btn: {
    width: '100%',
    backgroundColor: '#82D4F0',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#82D4F0',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  btnDisabled: {
    backgroundColor: '#B0E4F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3A3A3A',
    letterSpacing: 1.5,
  },
});