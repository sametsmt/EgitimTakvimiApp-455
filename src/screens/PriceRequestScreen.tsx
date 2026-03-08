import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function PriceRequestScreen({ route, navigation }: any) {
  const { egitim } = route.params;

  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [telefon, setTelefon] = useState("");

  const handleNameChange = (text: string, setter: (value: string) => void) => {
    const cleanedText = text.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ\s]/g, "");
    setter(cleanedText);
  };

  const handlePhoneChange = (text: string) => {
    const cleanedPhone = text.replace(/[^0-9]/g, "");
    setTelefon(cleanedPhone);
  };

  const handleSubmit = async () => {
    if (!ad.trim() || !soyad.trim() || !telefon.trim()) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    if (telefon.length < 10) {
      Alert.alert("Hata", "Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    try {
      await addDoc(collection(db, "fiyat_talepleri"), {
        ad: ad.trim(),
        soyad: soyad.trim(),
        telefon: telefon.trim(),
        egitim: egitim.ad,
        timestamp: serverTimestamp(),
      });

      Alert.alert("Başarılı", "Fiyat talebiniz başarıyla gönderildi.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Hata", "Talep gönderilemedi.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fiyat Talebi</Text>
      <Text style={styles.subtitle}>{egitim.ad}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad"
        placeholderTextColor="#aaa"
        value={ad}
        onChangeText={(text) => handleNameChange(text, setAd)}
      />

      <TextInput
        style={styles.input}
        placeholder="Soyad"
        placeholderTextColor="#aaa"
        value={soyad}
        onChangeText={(text) => handleNameChange(text, setSoyad)}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefon"
        placeholderTextColor="#aaa"
        value={telefon}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        maxLength={11}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gönder</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a111f",
    padding: 20,
  },

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#3498db",
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#111c2e",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});