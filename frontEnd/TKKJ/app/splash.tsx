import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  // Phase 1 — Logo kecil (splash1)
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale  = useRef(new Animated.Value(0.5)).current;

  // Phase 2 — Teks LEKALEKA (splash2)
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale  = useRef(new Animated.Value(0.85)).current;

  // Gradient fade bersama
  const gradientOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Background fade in
      Animated.timing(gradientOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // Logo muncul pelan (splash1)
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // Tahan sebentar
      Animated.delay(700),

      // Logo mengecil & menghilang
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1.4,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Teks LEKALEKA muncul (splash2)
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(textScale, {
          toValue: 1,
          tension: 50,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),

      // Tahan
      Animated.delay(1200),

      // Semua fade out
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(gradientOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      router.replace('/(auth)/login');
    });
  }, []);

  return (
    <Animated.View style={[styles.flex, { opacity: gradientOpacity }]}>
      <LinearGradient
        // Aproximasi gradient mesh dari mockup: biru atas-kiri, kuning tengah, mint bawah-kanan
        colors={['#A8D8EA', '#EEEFB3', '#EEEFB3', '#B8EFD8']}
        locations={[0, 0.35, 0.65, 1]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* ── Phase 1: Logo icon kecil ── */}
        <Animated.View
          style={[
            styles.center,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            // @ts-ignore
            source={require('../assets/images/logokecil1.png')}
            style={styles.logoSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* ── Phase 2: Teks LEKALEKA ── */}
        <Animated.View
          style={[
            styles.center,
            styles.absolute,
            {
              opacity: textOpacity,
              transform: [{ scale: textScale }],
            },
          ]}
        >
          <Text style={styles.brandText}>LEKALEKA</Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },

  /* Logo kecil — phase 1 */
  logoSmall: {
    width: width * 0.28,
    height: width * 0.28,
  },

  /* Teks LEKALEKA — phase 2 */
  brandText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#2B7FD4',
    letterSpacing: 4,
    textShadowColor: 'rgba(43, 127, 212, 0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});