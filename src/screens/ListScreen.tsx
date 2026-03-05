import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,FlatList,TouchableOpacity,Linking,StatusBar,SafeAreaView,Alert,ActivityIndicator,} from "react-native";
import {collection,getDocs,addDoc,serverTimestamp,} from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const CONTACT_NUMBER = "905521707381";

export default function ListScreen({ navigation }: any) {
  const [egitimler, setEgitimler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEgitimler = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "egitimler"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEgitimler(data);
    } catch (error) {
      console.error("Data fetch error:", error);
      Alert.alert("Hata", "Eğitim listesi şu an yüklenemiyor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEgitimler();
  }, []);

  const saveInteraction = async (
    courseName: string,
    actionType: "whatsapp" | "call"
  ) => {
    try {
      await addDoc(collection(db, "talepler"), {
        courseName,
        actionType,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.log("Log error:", e);
    }
  };

  const handleWhatsApp = async (courseName: string) => {
    await saveInteraction(courseName, "whatsapp");
    const message = `${courseName} eğitimi hakkında bilgi alabilir miyim?`;
    const url = `whatsapp://send?phone=${CONTACT_NUMBER}&text=${encodeURIComponent(
      message
    )}`;

    try {
      const isSupported = await Linking.canOpenURL(url);
      if (isSupported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Hata", "Cihazınızda WhatsApp yüklü değil.");
      }
    } catch (error) {
      Alert.alert("Hata", "Bağlantı açılamadı.");
    }
  };

  const handleCall = async (courseName: string) => {
    await saveInteraction(courseName, "call");
    Linking.openURL(`tel:${CONTACT_NUMBER}`);
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

      <FlatList
        data={egitimler}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseName}>{item.ad}</Text>
            <Text style={styles.courseDetails}>
              📅 {item.tarih} | {item.tip}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(item.ad)}
              >
                <Text style={styles.buttonText}>📞 Hemen Ara</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.wpButton}
                onPress={() => handleWhatsApp(item.ad)}
              >
                <Text style={styles.buttonText}>💬 WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  card: {
    backgroundColor: "#111c2e",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  courseDetails: {
    fontSize: 13,
    color: "#cbd5e0",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  callButton: {
    backgroundColor: "transparent",
    width: "48%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  wpButton: {
    backgroundColor: "#25D366",
    width: "48%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
