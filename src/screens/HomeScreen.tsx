import React from "react";
import {StyleSheet,Text,View,TouchableOpacity,StatusBar,SafeAreaView,ScrollView,Image,} from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.girisKonterner}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.logoDaire}>
            <Image
              source={require("../../assets/arilogo.png")}
              style={styles.logoGorsel}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.anaBaslik}>Arı Bilgi</Text>
          <Text style={styles.altSlogan}>Bilişim Teknolojileri Akademisi</Text>
        </View>

        <View style={styles.contentPadding}>
          <View style={styles.cardSection}>
            <Text style={styles.sectionBaslik}>Biz Kimiz?</Text>
            <Text style={styles.paragraf}>
              Arı Bilgi, bilişim sektörünün ihtiyaç duyduğu nitelikli uzmanları
              yetiştiren, MEB onaylı ve uluslararası standartlarda eğitim veren
              Türkiye'nin öncü teknoloji akademisidir.
            </Text>
          </View>

          <View style={styles.cardSection}>
            <Text style={styles.sectionBaslik}>Eğitim Modelimiz</Text>
            <View style={styles.listItem}>
              <Text style={styles.listIcon}>🎓</Text>
              <Text style={styles.listText}>
                MEB Onaylı sertifika programları
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listIcon}>👨‍💻</Text>
              <Text style={styles.listText}>
                %100 Uygulamalı ve proje odaklı eğitim
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listIcon}>💼</Text>
              <Text style={styles.listText}>
                Kariyer merkezi ile staj ve iş desteği
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Yıllık Deneyim</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Mezun</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Eğitmen</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.ctaButon}
            onPress={() => navigation.navigate("List")}
            activeOpacity={0.7}
          >
            <Text style={styles.ctaButonYazi}>⚡ EĞİTİMLERİ İNCELE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  girisKonterner: {
    flex: 1,
    backgroundColor: "#0a111f",
  },
  contentPadding: {
    padding: 20,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  logoDaire: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#111c2e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#3498db",
    marginBottom: 15,
    overflow: "hidden",
  },
  logoGorsel: {
    width: 130,
    height: 130,
    marginRight: 15,
    marginTop: 10,
  },
  anaBaslik: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  altSlogan: {
    fontSize: 14,
    color: "#3498db",
  },
  cardSection: {
    backgroundColor: "#111c2e",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  sectionBaslik: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 10,
  },
  paragraf: {
    fontSize: 14,
    color: "#cbd5e0",
    lineHeight: 22,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  listIcon: {
    marginRight: 10,
  },
  listText: {
    fontSize: 14,
    color: "#cbd5e0",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#111c2e",
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 9,
    color: "#3498db",
    textAlign: "center",
    marginTop: 4,
  },
  ctaButon: {
    backgroundColor: "#3498db",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  ctaButonYazi: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
