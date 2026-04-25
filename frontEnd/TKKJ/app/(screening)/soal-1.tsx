import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Konfigurasi soal ─────────────────────────────────────────────────────────
const SOAL = {
  nomor: 1,
  total: 6,
  judul: 'Dengarkan kata berikut ini',
  audioUri: require('../../assets/audio/soal_1.mp3'), // ← sesuaikan path audio
};
// ─────────────────────────────────────────────────────────────────────────────

/** Animasi gelombang suara */
function WaveformBars({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 28 });
  const anims = useRef(bars.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (isPlaying) {
      const animations = anims.map((anim) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.3 + Math.random() * 0.7,
              duration: 200 + Math.random() * 300,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 200 + Math.random() * 300,
              useNativeDriver: true,
            }),
          ])
        )
      );
      Animated.parallel(animations).start();
      return () => animations.forEach((a) => a.stop());
    } else {
      anims.forEach((anim) =>
        Animated.timing(anim, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }).start()
      );
    }
  }, [isPlaying]);

  return (
    <View style={waveStyles.row}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[waveStyles.bar, { transform: [{ scaleY: anim }] }]}
        />
      ))}
    </View>
  );
}

const waveStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    height: 40,
  },
  bar: {
    width: 3,
    height: 28,
    borderRadius: 2,
    backgroundColor: '#82D4F0',
  },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ScreeningDengarkanKataScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sudahDengar, setSudahDengar] = useState(false);
  const [jawaban, setJawaban] = useState('');

  useEffect(() => {
    return () => { sound?.unloadAsync(); };
  }, [sound]);

  const handlePlay = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound: newSound } = await Audio.Sound.createAsync(
        SOAL.audioUri,
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setSudahDengar(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  };

  const handleLanjut = () => {
    sound?.unloadAsync();
    router.push('/(screening)/soal-2'); // ganti route sesuai soal berikutnya
  };

  const handleClose = () => {
    sound?.unloadAsync();
    router.replace('/(auth)/login');
  };

  const bisaLanjut = sudahDengar && jawaban.trim().length > 0;
  const progressWidth = `${(SOAL.nomor / SOAL.total) * 100}%`;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#F5F5C8', '#F0F8D0']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose} activeOpacity={0.7}>
            <Ionicons name="close" size={20} color="#555" />
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: progressWidth as any }]} />
          </View>
          <Text style={styles.progressLabel}>{SOAL.nomor}/{SOAL.total}</Text>
        </View>

        {/* ── Judul ── */}
        <Text style={styles.judul}>{SOAL.judul}</Text>

        {/* ── Karakter + Input Jawaban ── */}
        <View style={styles.karakterSection}>
          {/* Gambar karakter phibicupi1.png */}
          <Image
            source={require('../../assets/images/fibicupi2.png')}
            style={styles.karakterImg}
            resizeMode="contain"
          />

          {/* Input jawaban di samping karakter */}
          <View style={styles.inputBubble}>
            <Ionicons
              name="volume-medium-outline"
              size={16}
              color="#82D4F0"
              style={{ marginBottom: 6 }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Tulis jawabanmu..."
              placeholderTextColor="#BBBBBB"
              value={jawaban}
              onChangeText={setJawaban}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>

        {/* ── Audio Player ── */}
        <TouchableOpacity
          style={[styles.playerCard, isPlaying && styles.playerCardActive]}
          onPress={handlePlay}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isPlaying ? 'pause-circle' : 'volume-high-outline'}
            size={26}
            color="#82D4F0"
            style={{ marginRight: 8 }}
          />
          <WaveformBars isPlaying={isPlaying} />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        {/* ── Tombol Lanjut ── */}
        <TouchableOpacity
          style={[styles.lanjutBtn, !bisaLanjut && styles.lanjutBtnDisabled]}
          onPress={handleLanjut}
          activeOpacity={0.85}
          disabled={!bisaLanjut}
        >
          <Text style={styles.lanjutText}>Lanjut</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 40,
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#82D4F0',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555555',
    minWidth: 32,
    textAlign: 'right',
  },

  /* Judul */
  judul: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 30,
    marginBottom: 28,
  },

  /* Karakter + Input */
  karakterSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 28,
    gap: 14,
  },
  karakterImg: {
    width: 100,
    height: 120,
  },
  inputBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputField: {
    fontSize: 15,
    color: '#1A1A1A',
    borderBottomWidth: 1.5,
    borderBottomColor: '#82D4F0',
    paddingVertical: 4,
  },

  /* Audio Player */
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    height: 64,
  },
  playerCardActive: {
    borderWidth: 1.5,
    borderColor: '#82D4F0',
  },

  /* Lanjut */
  lanjutBtn: {
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
  lanjutBtnDisabled: {
    backgroundColor: '#C8ECEE',
    shadowOpacity: 0,
    elevation: 0,
  },
  lanjutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3A3A3A',
  },
});