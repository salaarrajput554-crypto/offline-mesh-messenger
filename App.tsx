import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Mode = 'Overview' | 'Messages' | 'Relay' | 'SOS';

type Chat = {
  id: string;
  name: string;
  status: string;
  time: string;
  preview: string;
  unread: number;
  accent: string;
};

type Peer = {
  id: string;
  name: string;
  distance: string;
  signal: string;
  type: 'Bluetooth' | 'Mesh' | 'Satellite';
};

const chats: Chat[] = [
  {
    id: '1',
    name: 'Aisha',
    status: 'Online nearby',
    time: '2 min ago',
    preview: 'Route is clear. I can relay to the next village.',
    unread: 2,
    accent: '#22c55e',
  },
  {
    id: '2',
    name: 'Field Team',
    status: 'Mesh signal stable',
    time: '12 min ago',
    preview: 'We are 3 nodes away from the camp. Moving east.',
    unread: 5,
    accent: '#3b82f6',
  },
  {
    id: '3',
    name: 'Emergency Relay',
    status: 'Satellite standby',
    time: 'Now',
    preview: 'Short-range signal lost. Emergency route active.',
    unread: 1,
    accent: '#f59e0b',
  },
];

const peers: Peer[] = [
  { id: 'p1', name: 'Aisha', distance: '18 m', signal: 'Strong', type: 'Bluetooth' },
  { id: 'p2', name: 'Rural Node', distance: '440 m', signal: 'Medium', type: 'Mesh' },
  { id: 'p3', name: 'North Beacon', distance: '18 km', signal: 'Low', type: 'Satellite' },
];

const tabLabels: Mode[] = ['Overview', 'Messages', 'Relay', 'SOS'];

export default function App() {
  const [activeTab, setActiveTab] = useState<Mode>('Overview');
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [satelliteMode, setSatelliteMode] = useState(false);

  const metrics = useMemo(
    () => [
      { label: 'Network', value: 'Offline mesh', tone: '#22c55e' },
      { label: 'Latency', value: '42 ms', tone: '#60a5fa' },
      { label: 'Status', value: 'Connected', tone: '#34d399' },
      { label: 'Relay', value: '3 nodes', tone: '#fbbf24' },
    ],
    []
  );

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity key={item.id} style={styles.chatCard} activeOpacity={0.8}>
      <View style={[styles.avatar, { backgroundColor: item.accent }]}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeaderRow}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>

        <Text style={styles.chatStatus}>{item.status}</Text>
        <Text style={styles.chatPreview} numberOfLines={2}>{item.preview}</Text>
      </View>

      {item.unread > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{item.unread}</Text></View>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.topbar}>
          <View>
            <Text style={styles.appLabel}>Offline Mesh</Text>
            <Text style={styles.headerTitle}>Signal Link</Text>
          </View>
          <TouchableOpacity style={styles.sosButton}>
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabRow}>
          {tabLabels.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'Overview' && (
            <>
              <View style={styles.heroCard}>
                <Text style={styles.heroBadge}>No internet required</Text>
                <Text style={styles.heroTitle}>Bluetooth + satellite backup communication</Text>
                <Text style={styles.heroText}>
                  Send secure messages across local mesh networks and switch to satellite when mobile coverage is unavailable.
                </Text>
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Open Messenger</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Scan Network</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.grid}>
                {metrics.map((m) => (
                  <View key={m.label} style={styles.metricCard}>
                    <Text style={[styles.metricDot, { backgroundColor: m.tone }]} />
                    <Text style={styles.metricValue}>{m.value}</Text>
                    <Text style={styles.metricLabel}>{m.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.panel}>
                <Text style={styles.panelTitle}>Connection controls</Text>

                <View style={styles.toggleRow}>
                  <View>
                    <Text style={styles.toggleLabel}>Bluetooth relay</Text>
                    <Text style={styles.toggleCaption}>Nearby device discovery</Text>
                  </View>
                  <Switch value={bluetoothEnabled} onValueChange={setBluetoothEnabled} />
                </View>

                <View style={styles.toggleRow}>
                  <View>
                    <Text style={styles.toggleLabel}>Satellite fallback</Text>
                    <Text style={styles.toggleCaption}>Emergency messaging mode</Text>
                  </View>
                  <Switch value={satelliteMode} onValueChange={setSatelliteMode} />
                </View>
              </View>
            </>
          )}

          {activeTab === 'Messages' && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Recent conversations</Text>
              <FlatList
                data={chats}
                scrollEnabled={false}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 12 }}
              />
            </View>
          )}

          {activeTab === 'Relay' && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Mesh network</Text>
              {peers.map((peer) => (
                <View key={peer.id} style={styles.peerRow}>
                  <View style={styles.peerInfo}>
                    <View style={styles.peerAvatar}>
                      <Text style={styles.peerAvatarText}>{peer.name.charAt(0)}</Text>
                    </View>
                    <View>
                      <Text style={styles.peerName}>{peer.name}</Text>
                      <Text style={styles.peerMeta}>{peer.distance} • {peer.signal}</Text>
                    </View>
                  </View>
                  <View style={styles.peerBadge}>
                    <Text style={styles.peerBadgeText}>{peer.type}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'SOS' && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Emergency mode</Text>
              <View style={styles.sosPanel}>
                <Text style={styles.sosTitle}>Send emergency alert</Text>
                <Text style={styles.sosText}>
                  Share last GPS location, short status message, and request relay through the nearest available network node.
                </Text>
                <TouchableOpacity style={styles.sosPrimaryButton}>
                  <Text style={styles.sosPrimaryButtonText}>Activate emergency relay</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#08111f',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: '#08111f',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 14,
  },
  appLabel: {
    color: '#8ab4ff',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
  },
  sosButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  sosButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#1d4ed8',
  },
  tabText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#f8fafc',
  },
  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  heroBadge: {
    color: '#86efac',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    marginBottom: 8,
  },
  heroText: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flex: 1,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flex: 1,
  },
  secondaryButtonText: {
    color: '#bfdbfe',
    fontWeight: '700',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  metricDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  metricValue: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  panel: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  panelTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  toggleLabel: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleCaption: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  chatContent: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
  chatTime: {
    color: '#94a3b8',
    fontSize: 11,
  },
  chatStatus: {
    color: '#86efac',
    fontSize: 11,
    marginBottom: 4,
  },
  chatPreview: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  peerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  peerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  peerAvatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  peerName: {
    color: '#f8fafc',
    fontWeight: '700',
    marginBottom: 2,
  },
  peerMeta: {
    color: '#94a3b8',
    fontSize: 12,
  },
  peerBadge: {
    borderRadius: 999,
    backgroundColor: '#0f766e',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  peerBadgeText: {
    color: '#ccfbf1',
    fontSize: 11,
    fontWeight: '700',
  },
  sosPanel: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  sosTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  sosText: {
    color: '#cbd5e1',
    lineHeight: 22,
    marginBottom: 20,
  },
  sosPrimaryButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 14,
  },
  sosPrimaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
