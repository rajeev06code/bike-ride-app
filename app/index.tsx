import React, { useEffect, useState } from "react";
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
import Icons from "react-native-vector-icons/Feather";
import Iconss from "react-native-vector-icons/Feather";
import Iconsss from "react-native-vector-icons/Feather";
import Arrow1 from "react-native-vector-icons/Feather";


import PagerView from "react-native-pager-view";
import { MapPin, User, MessageCircle, Phone } from "lucide-react";
import LottieView from "lottie-react-native";

import animationData from "../../bike-ride-app/assets/animations/Online Delivery Service.json";
import { Link } from "expo-router";

const OnboardingScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Color palette
  const colors = {
    primary: "#F08200", // Orange
    background: "#FFFFFF", // White
    textDark: "#000000", // Black
    textLight: "#666666", // Gray
    indicator: "#D9D9D9", // Light Gray
  };

  // Onboarding slides data
  const slides = [
    {
      id: 1,
      title: "Drive and Earn up to 20,000/ month",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      image: require("../../bike-ride-app/assets/images/02.jpg"),
    },
    {
      id: 2,
      title: "Flexible Timing and Services",
      description:
        "Monitor your daily, weekly, and monthly earnings with our intuitive dashboard",
      image: require("../../bike-ride-app/assets/images/02.jpg"),
    },
    {
      id: 3,
      title: "Join Our Driver App Today",
      description: "Get insights and recommendations to boost your earnings",
      image: require("../../bike-ride-app/assets/images/02.jpg"),
    },
  ];

  // Pager reference
  const pagerRef = React.useRef(null);

  // Handle page navigation
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < slides.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    }
  };

  // Handle phone registration
  const handlePhoneRegistration = () => {
    // Implement phone registration logic
    console.log("Register with Phone");
  };

  // Animation for the page content
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <LottieView
          source={animationData}
          autoPlay
          loop
          style={styles.splashImage}
        />
          <Text style={styles.madeInIndiaText}> Made in India 🇮🇳 </Text>
          <Text style={styles.versiontext} >Version 1.0.0</Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <PagerView
        ref={pagerRef}
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={(e: any) => setCurrentPage(e.nativeEvent.position)}
      >
        {/* Feature Icons */}

        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View>
              <View style={styles.iconCircle}>
                <Icon name="map-pin" size={30} color="#F08200" />;
              </View>{" "}
              <View style={[styles.iconCircle, styles.iconTopRight]}>
                {" "}
                <Icons name="user" size={30} color="#F08200" />
              </View>
              <View style={[styles.iconCircle, styles.iconBottomLeft]}>
                <Iconss name="phone" color="#F08200" size={24} />
              </View>
              <View style={[styles.iconCircle, styles.iconBottomRight]}>
                <Iconsss name="message-circle" color="#F08200" size={24} />
              </View>
            </View>
            {/* Screen mockup image */}
            <View style={styles.mockupContainer}>
              <Image
                source={slide.image}
                style={styles.mockupImage}
                resizeMode="contain"
              />
            </View>

            {/* Content container */}
            <View style={styles.contentContainer}>
              <Text style={[styles.title, { color: colors.textDark }]}>
                {slide.title}
              </Text>
              <Text style={[styles.description, { color: colors.textLight }]}>
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </PagerView>

      {/* Bottom navigation */}
      <View style={styles.bottomContainer}>
        {currentPage < slides.length - 1 ? (
          // Navigation for first two slides
          <>
            {/* Back button */}
            <TouchableOpacity
              style={[
                styles.navButton,
                // { backgroundColor: currentPage > 0 ? colors.primary : "white" },
              ]}
              onPress={() =>
                currentPage > 0 && pagerRef.current?.setPage(currentPage - 1)
              }
            >
              <Text style={[styles.navButtonText, { color: colors.textLight }]}>
                <Arrow1 name="arrow-left-circle" size={50} color="#F08200" />
              </Text>
            </TouchableOpacity>

            {/* Page indicators */}
            <View style={styles.indicatorContainer}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        currentPage === index
                          ? colors.primary
                          : colors.indicator,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Forward button */}
            <TouchableOpacity
              // style={[styles.navButton, { backgroundColor: colors.primary }]}
              onPress={() => handlePageChange("next")}
            >
              <Text
                style={[styles.navButtonText, { color: colors.background }]}
              >
                <Arrow1 name="arrow-right-circle" size={50} color="#F08200" />
              </Text>
            </TouchableOpacity>
          </>
        ) : (
      
            <TouchableOpacity
              style={[
                styles.registerButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={handlePhoneRegistration}
            >
              <Link
                href="/OnboardForm"
                style={[
                  styles.registerButtonText,
                  { color: colors.background },
                ]}
              >
                Start Driving
              </Link>
            </TouchableOpacity>
          
            // {/* <View style={{marginHorizontal:20,}} >
            //   <Text >
            //   <Icons name="info" size={15} color="#F08200" /> Please read our <Text style={{color:"blue"}}> terms and conditions </Text>before procedding.
            //   </Text>
            // </View> */}
          
        )}
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  iconCircle: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconTopRight: {
    right: 60,
    bottom: -500,
  },
  iconBottomLeft: {
    left: 80,
    bottom: -480,
  },
  iconBottomRight: {
    right: 80,
    bottom: -10,
  },
  splashImage: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  slide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  mockupContainer: {
    width: width,
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  mockupImage: {
    width: width * 0.8,
    height: height * 0.5,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  registerButton: {
    flex: 1,
    height: 50,
    marginBottom:10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
 
  madeInIndiaText: {
    position: 'absolute',
    bottom: 70,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9933', // Saffron color
  },
  versiontext: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
   
  },
});

export default OnboardingScreen;
