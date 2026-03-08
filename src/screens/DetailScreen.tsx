import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";

const CONTACT_NUMBER = "905521707381";

export default function DetailScreen({ route, navigation }: any) {
  const { egitim } = route.params;

  const getEducationInfo = (name: string) => {
    const lower = name?.toLowerCase() || "";

    if (lower.includes("javascript")) {
      return {
        description:
          "JavaScript modern web geliştirme dünyasının temel teknolojilerinden biridir. Web sayfalarını dinamik hale getirmek, kullanıcı etkileşimlerini yönetmek ve modern web uygulamaları geliştirmek için kullanılır.",
        benefits:
          "Bu eğitim sayesinde katılımcılar JavaScript dilinin temellerini öğrenir, DOM manipülasyonu yapabilir, web sayfalarına etkileşim kazandırabilir ve modern frontend kütüphanelerine geçiş için güçlü bir altyapı elde eder.",
        audience:
          "Web geliştirme öğrenmek isteyen öğrenciler, frontend alanında kariyer hedefleyen kişiler ve HTML/CSS bilgisine sahip olup JavaScript ile projelerini geliştirmek isteyen katılımcılar için uygundur.",
      };
    }

    if (lower.includes("react native")) {
      return {
        description:
          "React Native, tek bir kod tabanı kullanarak hem Android hem iOS platformları için mobil uygulama geliştirmeyi sağlayan modern bir frameworktür.",
        benefits:
          "Katılımcılar bu eğitimde mobil uygulama geliştirme süreçlerini öğrenir, React Native bileşenlerini kullanarak arayüz oluşturabilir ve gerçek projeler geliştirerek mobil dünyaya adım atabilir.",
        audience:
          "JavaScript bilgisi olan geliştiriciler, mobil uygulama geliştirmeye başlamak isteyen yazılımcılar ve React bilgisi olan kişiler için uygun bir eğitimdir.",
      };
    }

    if (lower.includes("python")) {
      return {
        description:
          "Python, öğrenmesi kolay yapısı ve geniş kullanım alanı sayesinde dünyada en çok tercih edilen programlama dillerinden biridir.",
        benefits:
          "Bu eğitim ile katılımcılar Python programlama dilinin temel kavramlarını öğrenir, veri işleme, otomasyon ve temel yazılım geliştirme konularında pratik kazanır.",
        audience:
          "Yazılım öğrenmeye yeni başlayanlar, veri analizi veya yapay zeka alanına ilgi duyan kişiler ve programlama temeli oluşturmak isteyen herkes için uygundur.",
      };
    }

    if (lower.includes("siber")) {
      return {
        description:
          "Siber güvenlik, dijital sistemlerin ve verilerin korunmasını amaçlayan önemli bir teknoloji alanıdır.",
        benefits:
          "Katılımcılar bu eğitimde güvenlik açıklarını analiz etmeyi, temel siber güvenlik prensiplerini ve sistemleri korumaya yönelik yaklaşımları öğrenir.",
        audience:
          "Ağ teknolojileri ile ilgilenen kişiler, güvenlik alanında kariyer yapmak isteyenler ve sistem güvenliği konusunda bilgi sahibi olmak isteyen katılımcılar için uygundur.",
      };
    }

    if (lower.includes("web")) {
      return {
        description:
          "Web geliştirme eğitimi, internet üzerinde çalışan modern web siteleri ve uygulamaları geliştirmek için gerekli temel teknolojileri öğretir.",
        benefits:
          "Bu eğitim sayesinde katılımcılar HTML, CSS ve JavaScript kullanarak kullanıcı dostu web arayüzleri oluşturabilir ve gerçek projeler geliştirme deneyimi kazanır.",
        audience:
          "Web tasarımı ve geliştirme alanına ilgi duyan öğrenciler, kariyerini frontend geliştirme yönünde ilerletmek isteyen kişiler için uygundur.",
      };
    }

    return {
      description:
        "Bu eğitim, bilişim alanında kendini geliştirmek isteyen katılımcılar için hazırlanmıştır.",
      benefits:
        "Katılımcılar eğitim süresince teorik bilgiler ile birlikte uygulamalı çalışmalar yaparak teknik becerilerini geliştirme fırsatı elde eder.",
      audience:
        "Teknoloji alanına ilgi duyan ve yeni beceriler kazanmak isteyen herkes bu eğitime katılabilir.",
    };
  };

  const info = getEducationInfo(egitim.ad);

  const handleCall = async () => {
    try {
      await Linking.openURL(`tel:${CONTACT_NUMBER}`);
    } catch {
      Alert.alert("Hata", "Arama ekranı açılamadı.");
    }
  };

  const handleWhatsApp = async () => {
    const message = `${egitim.ad} eğitimi hakkında bilgi alabilir miyim?`;
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
    } catch {
      Alert.alert("Hata", "WhatsApp bağlantısı açılamadı.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>{egitim.ad}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.info}>📅 Tarih: {egitim.tarih}</Text>
            <Text style={styles.info}>💻 Eğitim Tipi: {egitim.tip}</Text>
          </View>

          <Text style={styles.sectionTitle}>Bu eğitim nedir?</Text>
          <Text style={styles.description}>{info.description}</Text>

          <Text style={styles.sectionTitle}>Bu eğitim ne kazandırır?</Text>
          <Text style={styles.description}>{info.benefits}</Text>

          <Text style={styles.sectionTitle}>Kimler katılabilir?</Text>
          <Text style={styles.description}>{info.audience}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Text style={styles.buttonText}>📞 Hemen Ara</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wpButton} onPress={handleWhatsApp}>
              <Text style={styles.buttonText}>💬 WhatsApp</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.priceButton}
            onPress={() => navigation.navigate("PriceRequest", { egitim })}
          >
            <Text style={styles.buttonText}>💰 Fiyat Al</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a111f",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },

  backButtonText: {
    color: "#3498db",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111c2e",
    padding: 20,
    borderRadius: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  infoBox: {
    backgroundColor: "#0d1728",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },

  info: {
    fontSize: 14,
    color: "#cbd5e0",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3498db",
    marginBottom: 8,
    marginTop: 8,
  },

  description: {
    fontSize: 14,
    color: "#cbd5e0",
    lineHeight: 22,
    marginBottom: 8,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  callButton: {
    width: "48%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    alignItems: "center",
  },

  wpButton: {
    width: "48%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#25D366",
    alignItems: "center",
  },

  priceButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f39c12",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});