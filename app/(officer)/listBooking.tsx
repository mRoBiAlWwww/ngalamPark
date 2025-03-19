import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { StatusBar } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Sample data for bookings (based on the screenshot, with added status)
const bookingData = [
  {
    id: "1",
    day: "Senin 10 Feb 2025",
    name: "Budi Santoso",
    bookingId: "#1310281320132",
    time: "08:20",
    vehicle: "Honda Beat",
    status: "Antrian",
  },
  {
    id: "2",
    day: "Jumat 7 Feb 2025",
    name: "John Mayer",
    bookingId: "#1310281320132",
    time: "08:20",
    vehicle: "Honda Scoopy",
    status: "Sedang Parkir",
  },
  {
    id: "3",
    day: "Kamis 6 Feb 2025",
    name: "Tim Henson",
    bookingId: "#1310281320132",
    time: "08:20",
    vehicle: "Yamaha N-Max",
    status: "Selesai",
  },
  {
    id: "4",
    day: "Rabu 5 Feb 2025",
    name: "Mateus Asato",
    bookingId: "#1310281320132",
    time: "08:20",
    vehicle: "Honda Beat",
    status: "Antrian",
  },
];

const Activity: React.FC = () => {
  const [monthsIndex, setMonthsIndex] = useState(1); // February (0-based index)
  const [selectedTab, setSelectedTab] = useState("Antrian"); // Default tab

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tabs = ["Antrian", "Sedang Parkir", "Selesai"];

  const handleMonths = (index: number) => {
    if (index < 0) {
      setMonthsIndex(11); // Loop back to December
    } else if (index >= months.length) {
      setMonthsIndex(0); // Loop back to January
    } else {
      setMonthsIndex(index);
    }
  };

  // Filter booking data based on the selected tab
  const filteredBookingData = bookingData.filter(
    (booking) => booking.status === selectedTab
  );


  const renderBookingItem = ({ item }: { item: any }) => (
    <View className="my-3">
      <Text className="font-workSemiBold text-xl">{item.day}</Text>
      <View className="bg-white rounded-xl px-4 py-4 flex-row justify-between gap-2">
        <View className="flex-row gap-3 w-2/3">
          <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
            <Text className="text-lg font-workSemiBold text-gray-500">
              {item.name.charAt(0)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-workSemiBold text-base">{item.name}</Text>
            <Text className="font-work text-sm text-gray-500">
              {item.bookingId}
            </Text>
          </View>
        </View>
        <View className="flex items-end">
          <Text className="font-work text-base text-gray-500">{item.time}</Text>
          <Text className="font-work text-sm text-gray-500">{item.vehicle}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
      <ScrollView
        className="bg-defaultBackground flex"
        contentContainerStyle={{ paddingBottom: 75 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="my-10 w-[90%] mx-auto flex">
          <Text className="font-workSemiBold text-3xl justify-self-start">
            Daftar Booking
          </Text>

          {/* Tabs for Antrian, Sedang Parkir, Selesai */}
          <View className="flex-row justify-between mt-4">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className={`flex-1 py-2 rounded-lg ${
                  selectedTab === tab ? "bg-orange-500" : "bg-white"
                } mx-1`}
              >
                <Text
                  className={`text-center font-workSemiBold text-sm ${
                    selectedTab === tab ? "text-white" : "text-gray-500"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Month Selector */}
          <View className="my-3">
            <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-1">
              <TouchableOpacity
                className="rounded-full border-4 border-gray-300 p-2 my-auto"
                onPress={() => handleMonths(monthsIndex - 1)}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={20}
                  color="#01aed6"
                />
              </TouchableOpacity>
              <View className="flex-row items-center">
                <TouchableOpacity className="w-24">
                  <Text 
                    className="font-workSemiBold text-md text-gray-500 text-center"
                    numberOfLines={1}
                    ellipsizeMode="clip"
                  >
                    {monthsIndex - 1 < 0
                      ? months[11]
                      : months[monthsIndex - 1]}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-24">
                  <Text 
                    className="font-workSemiBold text-md text-orange-500 text-center"
                    numberOfLines={1}
                    ellipsizeMode="clip"
                  >
                    {months[monthsIndex]}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-24">
                    <Text
                        className="font-workSemiBold text-md text-gray-500 text-center"
                        numberOfLines={1}
                        ellipsizeMode="clip"
                    >
                    {monthsIndex + 1 >= months.length
                      ? months[0]
                      : months[monthsIndex + 1]}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="rounded-full border-4 border-gray-300 p-2 my-auto"
                onPress={() => handleMonths(monthsIndex + 1)}
              >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={20}
                  color="#01aed6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Booking List */}
        <View className="w-[90%] mx-auto">
          {filteredBookingData.length > 0 ? (
            <FlatList
              data={filteredBookingData}
              renderItem={renderBookingItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text className="text-center text-gray-500 mt-4">
              Tidak ada data untuk {selectedTab}
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Activity;