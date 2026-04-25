/**
 * LekaLekaHome.jsx
 * React Native - Beranda Leka Leka
 *
 * Cara pakai:
 * 1. Copy file ini ke project React Native kamu
 * 2. Install dependensi: npm install @expo/vector-icons (jika pakai Expo)
 *    atau react-native-vector-icons (jika bare RN)
 * 3. Import & render <LekaLekaHome /> di App.js
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
} from 'react-native';

// ── Data ──────────────────────────────────────────────────────────────────────

const LESSONS = [
  {
    id: 1,
    hari: 'HARI 1',
    deskripsi: 'Audio Duel (Menebak suara hewan/benda vs gambar).',
    done: true,
  },
  { id: 2, hari: 'HARI 2', deskripsi: 'Syllable Break-up', done: false },
  {
    id: 3,
    hari: 'HARI 3',
    deskripsi: 'Membaca 1 kata dengan Line Spacing lebar',
    done: false,
  },
  { id: 4, hari: 'HARI 4', deskripsi: 'Menjiplak huruf vokal', done: false },
];

// ── Komponen Avatar Karakter ──────────────────────────────────────────────────

const CharacterAvatar = ({ size = 52 }) => (
  <View
    style={[
      styles.avatarWrapper,
      { width: size, height: size, borderRadius: size / 2 },
    ]}
  >
    {/* Wajah sederhana pakai View — ganti dengan <Image> jika punya aset */}
    <View style={styles.avatarFace}>
      <Text style={{ fontSize: size * 0.45 }}>🧒</Text>
    </View>
  </View>
);

// ── Komponen Kartu Hari ───────────────────────────────────────────────────────

const DayCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.dayCard}
    onPress={() => onPress(item)}
    activeOpacity={0.85}
  >
    <CharacterAvatar size={52} />
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

// ── Tab Bar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: 'home', icon: '🏠', label: 'Beranda' },
  { key: 'notes', icon: '📄', label: 'Catatan' },
  { key: 'trophy', icon: '🏆', label: 'Prestasi' },
  { key: 'profile', icon: '👤', label: 'Profil' },
];

const BottomNav = ({ active, onPress }) => (
  <View style={styles.bottomNav}>
    {NAV_ITEMS.map((item) => (
      <TouchableOpacity
        key={item.key}
        style={styles.navItem}
        onPress={() => onPress(item.key)}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, active === item.key && styles.navIconActive]}>
          {item.icon}
        </Text>
        <Text
          style={[styles.navLabel, active === item.key && styles.navLabelActive]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

// ── Layar Utama ───────────────────────────────────────────────────────────────

export default function LekaLekaHome() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0C8" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Pagi, Arya</Text>
          <Text style={styles.subGreeting}>
            Siap untuk pembelajaran hari ini?{' '}
            <Text style={styles.sessionText}>Kamu sudah belajar satu sesi</Text>
          </Text>
        </View>

        {/* ── Search ── */}
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

        {/* ── Banner ── */}
        <View style={styles.banner}>
          {/* Background pattern sederhana */}
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>SELAMAT DATANG DI{'\n'}LEKA LEKA</Text>
            <Text style={styles.bannerSub}>tempat belajar yang ceria</Text>
          </View>
          {/* Ilustrasi kanan — ganti dengan <Image> jika punya aset foto */}
          <View style={styles.bannerIllustration}>
            <Text style={{ fontSize: 64 }}>📖</Text>
          </View>
        </View>

        {/* ── Progres ── */}
        <Text style={styles.sectionTitle}>progres pembelajaran</Text>

        <View style={styles.lessonList}>
          {LESSONS.filter(
            (l) =>
              search === '' ||
              l.hari.toLowerCase().includes(search.toLowerCase()) ||
              l.deskripsi.toLowerCase().includes(search.toLowerCase()),
          ).map((item) => (
            <DayCard
              key={item.id}
              item={item}
              onPress={(l) => console.log('Buka pelajaran:', l.hari)}
            />
          ))}
        </View>

        {/* Ruang ekstra agar konten tidak tertutup tab bar */}
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <BottomNav active={activeTab} onPress={setActiveTab} />
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const YELLOW_BG = '#F5F0C8';
const BLUE_CARD = '#A8D8EA';
const DARK_TEXT = '#1A1A2E';
const ORANGE = '#F4913D';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: YELLOW_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Header
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '800',
    color: DARK_TEXT,
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  sessionText: {
    fontWeight: '600',
    color: DARK_TEXT,
  },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: DARK_TEXT,
  },
  searchIcon: {
    fontSize: 18,
    marginLeft: 6,
  },

  // Banner
  banner: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#BFD7ED',
    height: 160,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(100,140,180,0.25)',
  },
  bannerContent: {
    flex: 1,
    padding: 18,
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bannerSub: {
    fontSize: 13,
    color: '#EEF5FF',
    marginTop: 4,
    fontStyle: 'italic',
  },
  bannerIllustration: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },

  // Section
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK_TEXT,
    marginBottom: 12,
  },

  // Lesson list
  lessonList: {
    gap: 10,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE_CARD,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dayCardText: {
    flex: 1,
    marginLeft: 14,
  },
  dayTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: DARK_TEXT,
  },
  dayDesc: {
    fontSize: 12,
    color: '#3A3A5C',
    marginTop: 2,
  },
  doneBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBadgeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },

  // Avatar
  avatarWrapper: {
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarFace: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 22,
    opacity: 0.45,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 10,
    color: '#AAAAAA',
    marginTop: 3,
  },
  navLabelActive: {
    color: ORANGE,
    fontWeight: '700',
  },
});