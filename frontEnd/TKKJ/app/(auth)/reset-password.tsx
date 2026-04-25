import { router } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function ResetPasswordScreen() {
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const handleSimpan = () => {
    if (!passwordBaru || !konfirmasi) return;
    if (passwordBaru !== konfirmasi) {
      Alert.alert('Password tidak cocok', 'Pastikan kedua password sama.');
      return;
    }
    Keyboard.dismiss();
    // TODO: kirim reset password ke server
    Alert.alert('Berhasil!', 'Password berhasil diubah.', [
      { text: 'Masuk', onPress: () => router.replace('/(auth)/masuk') },
    ]);
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
              <Text style={styles.headerTitle}>Atur Ulang Password</Text>
              <Text style={styles.headerSubtitle}>
                Password baru harus berbeda dari{'\n'}password yang digunakan sebelumnya
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Password Baru */}
            <Text style={styles.label}>Password Baru</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#AAAAAA" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="*******"
                placeholderTextColor="#BBBBBB"
                value={passwordBaru}
                onChangeText={setPasswordBaru}
                secureTextEntry={!showPasswordBaru}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TouchableOpacity onPress={() => setShowPasswordBaru(!showPasswordBaru)} style={styles.eyeBtn}>
                <Ionicons
                  name={showPasswordBaru ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#AAAAAA"
                />
              </TouchableOpacity>
            </View>

            {/* Konfirmasi Password */}
            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#AAAAAA" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="*******"
                placeholderTextColor="#BBBBBB"
                value={konfirmasi}
                onChangeText={setKonfirmasi}
                secureTextEntry={!showKonfirmasi}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
              <TouchableOpacity onPress={() => setShowKonfirmasi(!showKonfirmasi)} style={styles.eyeBtn}>
                <Ionicons
                  name={showKonfirmasi ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#AAAAAA"
                />
              </TouchableOpacity>
            </View>

            {/* Lupa Password link */}
            <TouchableOpacity style={styles.lupaBtn}>
              <Text style={styles.lupaText}>Lupa Password?</Text>
            </TouchableOpacity>

            {/* Simpan */}
            <TouchableOpacity
              style={[styles.btn, (!passwordBaru || !konfirmasi) && styles.btnDisabled]}
              onPress={handleSimpan}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>SIMPAN</Text>
            </TouchableOpacity>
          </View>
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
  form: { width: '100%' },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputIcon: { marginRight: 10 },
  inputField: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 15,
    color: '#1A1A1A',
  },
  eyeBtn: { padding: 4 },
  lupaBtn: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  lupaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555555',
  },
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
    letterSpacing: 2,
  },
});