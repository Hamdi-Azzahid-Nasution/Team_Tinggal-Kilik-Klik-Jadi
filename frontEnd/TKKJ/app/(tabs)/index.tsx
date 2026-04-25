import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const LESSONS = [
  { id: 1, hari: 'HARI 1', deskripsi: 'Audio Duel (Menebak suara hewan/benda vs gambar).', done: true,
    foto: require('@/assets/images/music1.jpg') },
  { id: 2, hari: 'HARI 2', deskripsi: 'Syllable Break-up', done: false,
    foto: require('@/assets/images/list2.jpg') },
  { id: 3, hari: 'HARI 3', deskripsi: 'Membaca 1 kata dengan Line Spacing lebar', done: false,
    foto: require('@/assets/images/hari3.png') },
  { id: 4, hari: 'HARI 4', deskripsi: 'Menjiplak huruf vokal', done: false,
    foto: require('@/assets/images/hari4.png') },
];

const CharacterAvatar = ({ size = 52, foto }: { size?: number; foto: ImageSourcePropType }) => (
  <View style={[styles.avatarWrapper, { width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }]}>
    {/* Foto */}
    <Image
      source={foto}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      resizeMode="cover"
    />
    {/* Efek vignette pinggir */}
    <LinearGradient
      colors={[
        'rgba(0,0,0,0.45)', // pinggir gelap
        'rgba(0,0,0,0)',    // tengah transparan
        'rgba(0,0,0,0)',    // tengah transparan
        'rgba(0,0,0,0.45)', // pinggir gelap
      ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={StyleSheet.absoluteFillObject}
    />
  </View>
);

const DayCard = ({ item }: { item: typeof LESSONS[0] }) => (
  <TouchableOpacity style={styles.dayCard} activeOpacity={0.85}>
    <CharacterAvatar size={52} foto={item.foto} />
    <View style={styles.dayCardText}>
      <Text style={styles.dayTitle}>{item.hari}</Text>
      <Text style={styles.dayDesc}>{item.deskripsi}</Text>
    </View>
    {item.done && (
      <View style={styles.doneBadge}>
        <Text style={styles.doneBadgeText}>✓</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  return (
    // edges={['top']} → hanya handle safe area atas
    // bawah dihandle otomatis oleh tab bar Expo Router
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0C8" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Pagi, Arya</Text>
          <Text style={styles.subGreeting}>
            Siap untuk pembelajaran hari ini?{' '}
            <Text style={styles.sessionText}>Kamu sudah belajar satu sesi</Text>
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="search"
            placeholderTextColor="#AAAAAA"
            value={search}
            onChangeText={setSearch}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>SELAMAT DATANG DI{'\n'}LEKA LEKA</Text>
            <Text style={styles.bannerSub}>tempat belajar yang ceria</Text>
          </View>
          <View style={styles.bannerIllustration}>
            <Text style={{ fontSize: 60 }}>📖</Text>
          </View>
        </View>

        {/* Progres */}
        <Text style={styles.sectionTitle}>progres pembelajaran</Text>
        <View style={styles.lessonList}>
          {LESSONS.filter(
            (l) =>
              search === '' ||
              l.hari.toLowerCase().includes(search.toLowerCase()) ||
              l.deskripsi.toLowerCase().includes(search.toLowerCase()),
          ).map((item) => (
            <DayCard key={item.id} item={item} />
          ))}
        </View>

        {/* Padding bawah agar tidak ketutup tab bar */}
        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const YELLOW_BG = '#F5F0C8';
const BLUE_CARD = '#A8D8EA';
const DARK_TEXT = '#1A1A2E';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: YELLOW_BG },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  header: { marginBottom: 16 },
  greeting: { fontSize: 30, fontWeight: '800', color: DARK_TEXT, letterSpacing: -0.5 },
  subGreeting: { fontSize: 14, color: '#555', marginTop: 4 },
  sessionText: { fontWeight: '700', color: DARK_TEXT },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 18,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: { flex: 1, fontSize: 15, color: DARK_TEXT },
  searchIcon: { fontSize: 18, marginLeft: 6 },

  banner: {
    borderRadius: 18, overflow: 'hidden', backgroundColor: '#BFD7ED',
    height: 160, marginBottom: 22, flexDirection: 'row', alignItems: 'flex-end',
  },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(100,140,180,0.2)' },
  bannerContent: { flex: 1, padding: 18, justifyContent: 'flex-end' },
  bannerTitle: {
    fontSize: 18, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.4,
    textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },
  bannerSub: { fontSize: 13, color: '#EEF5FF', marginTop: 4, fontStyle: 'italic' },
  bannerIllustration: { width: 110, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: DARK_TEXT, marginBottom: 12 },
  lessonList: { gap: 10 },

  dayCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: BLUE_CARD,
    borderRadius: 18, paddingVertical: 14, paddingHorizontal: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  dayCardText: { flex: 1, marginLeft: 14 },
  dayTitle: { fontSize: 15, fontWeight: '800', color: DARK_TEXT },
  dayDesc: { fontSize: 12, color: '#3A3A5C', marginTop: 2 },
  doneBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  doneBadgeText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  avatarWrapper: { backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});