import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function ListScreen({ navigation }: any) {
  const [egitimler, setEgitimler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("Hepsi");

  const fetchEgitimler = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "egitimler"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // tekrar eden eğitimleri kaldır
      const uniqueData = data.filter(
        (item: any, index: number, self: any[]) =>
          index ===
          self.findIndex(
            (x: any) =>
              x.ad === item.ad &&
              x.tarih === item.tarih &&
              x.tip === item.tip
          )
      );

      // tarihe göre sırala (yakın → uzak)
      const sortedData = uniqueData.sort((a: any, b: any) => {
        const dateA = new Date(String(a.tarih)).getTime();
        const dateB = new Date(String(b.tarih)).getTime();
        return dateA - dateB;
      });

      setEgitimler(sortedData);
    } catch (error) {
      console.error("Data fetch error:", error);
      Alert.alert("Hata", "Eğitim listesi yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEgitimler();
  }, []);

  const filters = ["Hepsi", "Online", "Hybrid", "Yüz Yüze"];

  const filteredEgitimler =
    selectedFilter === "Hepsi"
      ? egitimler
      : egitimler.filter(
          (item: any) =>
            String(item.tip || "").toLowerCase() ===
            selectedFilter.toLowerCase()
        );

  const getTypeBadgeStyle = (tip?: string) => {
    const lowerTip = String(tip || "").toLowerCase();

    if (lowerTip === "online") return styles.badgeOnline;
    if (lowerTip === "hybrid") return styles.badgeHybrid;
    return styles.badgeFaceToFace;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Geri</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Eğitim Takvimi</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;

          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                isActive && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.activeFilterButtonText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {filteredEgitimler.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bu filtrede eğitim bulunamadı.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEgitimler}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Detail", { egitim: item })}
              activeOpacity={0.8}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.courseName}>{item.ad}</Text>

                <View style={[styles.badge, getTypeBadgeStyle(item.tip)]}>
                  <Text style={styles.badgeText}>{item.tip}</Text>
                </View>
              </View>

              <Text style={styles.courseDetails}>📅 {item.tarih}</Text>

              <Text style={styles.detayText}>Detayı görmek için dokunun</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a111f",
  },

  header: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#111c2e",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  backButton: {
    color: "#3498db",
    fontSize: 16,
    fontWeight: "600",
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    paddingTop: 15,
    gap: 8,
  },

  filterButton: {
    backgroundColor: "#111c2e",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#22314d",
  },

  activeFilterButton: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },

  filterButtonText: {
    color: "#cbd5e0",
    fontSize: 13,
    fontWeight: "600",
  },

  activeFilterButtonText: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#111c2e",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },

  courseName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  courseDetails: {
    fontSize: 13,
    color: "#cbd5e0",
    marginTop: 8,
  },

  detayText: {
    marginTop: 10,
    color: "#3498db",
    fontSize: 12,
  },

  badge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  badgeOnline: {
    backgroundColor: "#1f8b4c",
  },

  badgeHybrid: {
    backgroundColor: "#9b59b6",
  },

  badgeFaceToFace: {
    backgroundColor: "#e67e22",
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyText: {
    color: "#cbd5e0",
    fontSize: 15,
    textAlign: "center",
  },
});