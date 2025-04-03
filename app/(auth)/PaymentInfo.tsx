import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { addBankDetails, getBankList } from "@/services/auth";
import SelectListInput from "@/components/SelectInput";
import BankSelectInput from "@/components/SelectInput";

type PaymentScreenParams = {
  paymentMethod?: "bank" | "upi";
};

type BankFormType = {
  fullName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  upiNumber: string;
};

const PaymentInformationScreen = () => {
  const params = useLocalSearchParams<PaymentScreenParams>();
  const paymentMethod = params?.paymentMethod || "bank";

  const [activeTab, setActiveTab] = useState<"bank" | "upi">(paymentMethod);
  const [loading, setLoading] = useState(false);
  const [bankForm, setBankForm] = useState<BankFormType>({
    fullName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    upiNumber: "",
  });
  const [upiId, setUpiId] = useState<string>("");
  const [bankList, setBankList] = useState([]); // You might want to get this from props or context

  const handleAddBankDetails = async () => {
    setLoading(true);
    if (activeTab === "bank") {
      // Validate bank form
      if (
        !bankForm.fullName ||
        !bankForm.accountNumber ||
        !bankForm.bankName ||
        !bankForm.ifscCode
      ) {
        setLoading(false);
        Alert.alert("Error", "Please fill all bank details");
        return;
      }
    }

    try {
      const response = await addBankDetails(
        paymentMethod,
        bankForm.fullName,
        bankForm.accountNumber,
        bankForm.ifscCode,
        bankForm.bankName,
        upiId
      );
      if (response.status === 200) {
        router.navigate("/VerificationScreen");
      }
    } catch (err: any) {
    
      Alert.alert("Error", err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

 
  const handleSelect = (value) => {
    setBankForm({...bankForm,bankName:value})
    // console.log("Selected:", value);
    // Do something with the selected value
  };

  const allBankListInfo = async () => {
    const response = await getBankList();
    if (response.status === 200) {
      // console.log(response.data);
      setBankList(response.data);
    }
  };
  useEffect(() => {
    allBankListInfo();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Tab Bar */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "bank" && styles.activeTab]}
            onPress={() => setActiveTab("bank")}
            disabled={paymentMethod !== "bank"}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "bank" && styles.activeTabText,
              ]}
            >
              Bank Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "upi" && styles.activeTab]}
            onPress={() => setActiveTab("upi")}
            disabled={paymentMethod !== "upi"}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upi" && styles.activeTabText,
              ]}
            >
              UPI ID
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bank Details Form */}
        {activeTab === "bank" && (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.headerSubtitle}>
                Your earnings will be transferred to the details you provide to
                the account details you provided below.
              </Text>
              <Text style={styles.inputLabel}>
                Full Name (as per bank account)
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={bankForm.fullName}
                onChangeText={(text) =>
                  setBankForm({ ...bankForm, fullName: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Account Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter account number"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={bankForm.accountNumber}
                onChangeText={(text) =>
                  setBankForm({ ...bankForm, accountNumber: text })
                }
              />
              <View style={{ marginVertical: 8 }}></View>
              <TextInput
                style={styles.textInput}
                placeholder="Re-Enter account number"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={bankForm.accountNumber}
                onChangeText={(text) =>
                  setBankForm({ ...bankForm, accountNumber: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select Your Bank Name</Text>
              <BankSelectInput
                banks={bankList}
                onSelect={handleSelect}
                placeholder="Select Bank Name"
              />
              {/* <TextInput
                style={styles.textInput}
                placeholder="Enter bank name"
                placeholderTextColor="#9CA3AF"
                value={bankForm.bankName}
                onChangeText={(text) =>
                  setBankForm({ ...bankForm, bankName: text })
                }
              /> */}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>IFSC Code</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter IFSC code"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
                value={bankForm.ifscCode}
                onChangeText={(text) =>
                  setBankForm({ ...bankForm, ifscCode: text })
                }
              />
            </View>
          </View>
        )}

        {/* UPI Form */}
        {activeTab === "upi" && (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>UPI ID</Text>
              <TextInput
                style={styles.textInput}
                placeholder="yourname@upi"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={upiId}
                onChangeText={setUpiId}
              />
            </View>
            <Text style={styles.noteText}>
              Ensure your UPI ID is linked to your bank account
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAddBankDetails}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>
              {activeTab === "bank" ? "Save Bank Details" : "Save UPI ID"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#F08200",
    fontWeight: "600",
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "white",
  },
  noteText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    fontStyle: "italic",
  },
  submitButton: {
    height: 56,
    backgroundColor: "#F08200",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 24,
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PaymentInformationScreen;
