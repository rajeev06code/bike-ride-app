import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const AuthScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      id: 1,
      title: "Drive and Earn up to ₹20,000/month",
      description: "Maximize your earnings with our driver-friendly platform.",
      image: require("../../assets/images/02.jpg"),
    },
    {
      id: 2,
      title: "Flexible Timing and Services",
      description: "Control your schedule and track earnings effortlessly.",
      image: require("../../assets/images/02.jpg"),
    },
    {
      id: 3,
      title: "Join Our Driver App Today",
      description: "Sign up now and start driving in minutes!",
      image: require("../../assets/images/02.jpg"),
    },
  ];

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < slides.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else if (direction === "back" && currentPage > 0) {
      pagerRef.current?.setPage(currentPage - 1);
    }
  };

  return (
    <LinearGradient colors={["#F3F4F6", "#FFFFFF"]} style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <PagerView
          ref={pagerRef}
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={styles.slide}>
              <Image source={slide.image} style={styles.mockupImage} />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          ))}
        </PagerView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => handlePageChange("back")}>
            <Icon
              name="chevron-left"
              size={40}
              color={currentPage > 0 ? "#F08200" : "#D9D9D9"}
            />
          </TouchableOpacity>

          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  currentPage === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          {currentPage < slides.length - 1 ? (
            <TouchableOpacity onPress={() => handlePageChange("next")}>
              <Icon name="chevron-right" size={40} color="#F08200" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.registerButton}>
              <Link 
              href="/OnboardForm" 
              // href="/VerificationScreen"
               style={styles.registerButtonText}>
                Start Driving
              </Link>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeContainer: { flex: 1, justifyContent: "center" },
  viewPager: { flex: 1 },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  mockupImage: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  indicatorContainer: { flexDirection: "row", alignItems: "center" },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#F08200",
    width: 16,
    height: 8,
    borderRadius: 4,
  },
  registerButton: {
    backgroundColor: "#F08200",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  registerButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});

export default AuthScreen;
