import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Table = () => {
  const tableData = [
    {
      property: "Rice Flakes",
      description:
        "This is directly present in your allergy list and can cause symptoms like skin reactions, digestive issues, and respiratory problems.",
    },
    {
      property: "Rice Bran Oil",
      description:
        "As you are allergic to Edible Vegetable Oil, there is a high chance of cross-contamination with Rice Bran Oil during processing. This can cause symptoms like skin reactions, digestive issues, and respiratory problems.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tableData ? (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellHeader}>
              <Text style={styles.tableHeader}>Items</Text>
            </View>
            <View style={styles.tableCellHeader}>
              <Text style={styles.tableHeader}>Description</Text>
            </View>
          </View>
          {tableData.map((row, index) => {
            console.log("row", row, "index", index);
            return (
              <View key={index} style={styles.tableRow}>
                {/* <View style={styles.tableRow}>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableHeader}>{row.property}</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableHeader}>{row.description}</Text>
                </View>
              </View> */}
                {/* <Text className="text-lg text-yellow-300">{row.description}</Text> */}

                <View style={styles.tableCell}>
                  <Text style={styles.tableText}>{row.property}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableText}>{row.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "320px",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#FFFFFF", // Set background color to white
  },
  table: {
    width: 300,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    // flex: 1,
    width: 149,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#f0f0f0",
    // backgroundColor: "#f0f0f0",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  tableText: {
    textAlign: "center",
    color: "#fff",
  },
});

export default Table;
