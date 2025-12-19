import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Alert
} from "react-native";
import { router } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function PaymentMethods() {
    const [selectedMethod, setSelectedMethod] = useState("card"); // 'card' or 'paypal'

    // Card Form State
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState("");

    // PayPal Form State
    const [paypalEmail, setPaypalEmail] = useState("");

    const handleSave = () => {
        Alert.alert("Success", "Payment method saved successfully!");
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#E5E7EB" />
                </TouchableOpacity>
                <Text style={styles.header}>Payment Methods</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Payment Method Selector */}
                <View style={styles.selectorContainer}>
                    <TouchableOpacity
                        style={[styles.selectorButton, selectedMethod === 'card' && styles.activeSelector]}
                        onPress={() => setSelectedMethod('card')}
                    >
                        <FontAwesome name="credit-card" size={20} color={selectedMethod === 'card' ? "#FFF" : "#9CA3AF"} />
                        <Text style={[styles.selectorText, selectedMethod === 'card' && styles.activeSelectorText]}>Car / Debit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.selectorButton, selectedMethod === 'paypal' && styles.activeSelector]}
                        onPress={() => setSelectedMethod('paypal')}
                    >
                        <FontAwesome name="paypal" size={20} color={selectedMethod === 'paypal' ? "#FFF" : "#9CA3AF"} />
                        <Text style={[styles.selectorText, selectedMethod === 'paypal' && styles.activeSelectorText]}>PayPal</Text>
                    </TouchableOpacity>
                </View>

                {/* Content Area */}
                <View style={styles.card}>

                    {selectedMethod === 'card' ? (
                        <View>
                            <Text style={styles.sectionTitle}>Add Credit / Debit Card</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Card Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0000 0000 0000 0000"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="numeric"
                                    value={cardNumber}
                                    onChangeText={setCardNumber}
                                />
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                    <Text style={styles.label}>Expiry Date</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="MM/YY"
                                        placeholderTextColor="#6B7280"
                                        value={expiry}
                                        onChangeText={setExpiry}
                                    />
                                </View>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.label}>CVV</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="123"
                                        placeholderTextColor="#6B7280"
                                        keyboardType="numeric"
                                        secureTextEntry
                                        maxLength={3}
                                        value={cvv}
                                        onChangeText={setCvv}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Cardholder Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    placeholderTextColor="#6B7280"
                                    value={cardName}
                                    onChangeText={setCardName}
                                />
                            </View>

                            <View style={styles.cardIcons}>
                                <FontAwesome name="cc-visa" size={30} color="#fff" style={styles.iconSpacing} />
                                <FontAwesome name="cc-mastercard" size={30} color="#fff" style={styles.iconSpacing} />
                                <FontAwesome name="cc-amex" size={30} color="#fff" />
                            </View>

                        </View>
                    ) : (
                        <View>
                            <Text style={styles.sectionTitle}>Connect PayPal</Text>
                            <Text style={styles.subText}>You will be redirected to PayPal to authorize your account.</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>PayPal Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="email@example.com"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="email-address"
                                    value={paypalEmail}
                                    onChangeText={setPaypalEmail}
                                />
                            </View>
                        </View>
                    )}

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Payment Method</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B0F19",
        paddingTop: 50,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        color: "#E5E7EB",
        marginLeft: 15,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    selectorContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#1A1F2E',
        borderRadius: 12,
        padding: 4,
    },
    selectorButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    activeSelector: {
        backgroundColor: '#2563EB',
    },
    selectorText: {
        color: '#9CA3AF',
        fontWeight: '600',
        fontSize: 16,
    },
    activeSelectorText: {
        color: '#FFF',
    },
    card: {
        backgroundColor: "#1A1F2E",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#F3F4F6",
        marginBottom: 20,
    },
    subText: {
        color: "#9CA3AF",
        marginBottom: 20,
        lineHeight: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: "#9CA3AF",
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#0B0F19",
        borderRadius: 8,
        padding: 12,
        color: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#374151",
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
    },
    saveButton: {
        backgroundColor: "#10B981",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
    },
    cardIcons: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    iconSpacing: {
        marginRight: 15,
    }
});
